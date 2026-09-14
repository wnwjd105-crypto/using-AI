/**
 * ==========================================================================
 * 韓国公共交通完全攻略ガイド - メインスクリプト (main.js)
 * 1. Stickyヘダー & スクロールスパイ & モバイルハンバーガー
 * 2. 交通準備チェックリスト (localStorage同期 & リアルタイム進捗率)
 * 3. WAI-ARIA 準拠 タブUI (キーボード左右矢印・Home・Endキー対応)
 * 4. フォーカストラップ (Focus Trap) 対応 緊急モーダル
 * 5. Web Speech API (TTS) 韓国語ネイティブ音声再生
 * 6. FAB クイック運賃計算機 & FAQ ウィジェット
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initChecklist();
  initAriaTabs();
  initEmergencyModal();
  initSpeechSynthesis();
  initFabWidget();
});

/* --------------------------------------------------------------------------
   01. Navigation: Mobile Hamburger & Scrollspy
   -------------------------------------------------------------------------- */
function initNavigation() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && mainNav) {
    // 햄버거 메뉴 토글
    hamburgerBtn.addEventListener('click', () => {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', String(!isExpanded));
      mainNav.classList.toggle('is-open', !isExpanded);
    });

    // 네비게이션 링크 클릭 시 모바일 메뉴 자동 닫기
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('is-open')) {
          hamburgerBtn.setAttribute('aria-expanded', 'false');
          mainNav.classList.remove('is-open');
        }
      });
    });
  }

  // Scrollspy (스크롤 위치에 따른 nav-link 하이라이트)
  const sections = document.querySelectorAll('main section[id]');

  function onScrollSpy() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const headerOffset = 120; // 헤더 높이 여유분

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - headerOffset;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (targetLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('is-active'));
          targetLink.classList.add('is-active');
        }
      }
    });
  }

  window.addEventListener('scroll', onScrollSpy, { passive: true });
  onScrollSpy(); // 초기 실행
}

/* --------------------------------------------------------------------------
   02. Checklist with localStorage & Progress Bar
   -------------------------------------------------------------------------- */
function initChecklist() {
  const STORAGE_KEY = 'korea_transit_checklist_state_v1';
  const checkboxes = document.querySelectorAll('.checklist-checkbox');
  const statusText = document.getElementById('checklist-status');
  const progressFill = document.getElementById('progress-fill');
  const progressTrack = document.getElementById('checklist-progressbar');
  const resetBtn = document.getElementById('reset-checklist-btn');

  if (!checkboxes.length) return;

  // localStorage에서 저장된 상태 복원
  function loadSavedState() {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const checkedIndexes = JSON.parse(savedData);
        checkboxes.forEach(cb => {
          const idx = cb.getAttribute('data-index');
          cb.checked = checkedIndexes.includes(idx);
        });
      }
    } catch (e) {
      console.warn('localStorage読み込みエラー:', e);
    }
    updateProgress();
  }

  // 현재 상태를 localStorage에 저장
  function saveCurrentState() {
    try {
      const checkedIndexes = [];
      checkboxes.forEach(cb => {
        if (cb.checked) {
          checkedIndexes.push(cb.getAttribute('data-index'));
        }
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedIndexes));
    } catch (e) {
      console.warn('localStorage保存エラー:', e);
    }
  }

  // 진행률 바 실시간 업데이트
  function updateProgress() {
    const total = checkboxes.length;
    let checkedCount = 0;
    checkboxes.forEach(cb => {
      if (cb.checked) checkedCount++;
    });

    const percent = Math.round((checkedCount / total) * 100);

    if (progressFill) {
      progressFill.style.width = `${percent}%`;
    }

    if (progressTrack) {
      progressTrack.setAttribute('aria-valuenow', String(percent));
    }

    if (statusText) {
      statusText.textContent = `${percent}% 完了 (${checkedCount} / ${total})`;
    }
  }

  // 체크박스 변경 이벤트 등록
  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      saveCurrentState();
      updateProgress();
    });
  });

  // 체크리스트 리셋 버튼 이벤트
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('チェックリストをすべて初期化（リセット）しますか？')) {
        checkboxes.forEach(cb => (cb.checked = false));
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
          console.warn(e);
        }
        updateProgress();
      }
    });
  }

  // 초기 상태 로드
  loadSavedState();
}

/* --------------------------------------------------------------------------
   03. WAI-ARIA Accessible Tabs (키보드 좌우 화살표/Home/End 지원)
   -------------------------------------------------------------------------- */
function initAriaTabs() {
  const tabLists = document.querySelectorAll('[role="tablist"]');

  tabLists.forEach(tabList => {
    const tabs = tabList.querySelectorAll('[role="tab"]');

    tabs.forEach((tab, index) => {
      // 1. 클릭으로 탭 활성화
      tab.addEventListener('click', () => {
        activateTab(tab, tabs);
      });

      // 2. 키보드 인터랙션 (WAI-ARIA Tab Authoring Practices 1.2)
      tab.addEventListener('keydown', e => {
        let targetIndex = null;

        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowDown':
            e.preventDefault();
            targetIndex = (index + 1) % tabs.length;
            break;
          case 'ArrowLeft':
          case 'ArrowUp':
            e.preventDefault();
            targetIndex = (index - 1 + tabs.length) % tabs.length;
            break;
          case 'Home':
            e.preventDefault();
            targetIndex = 0;
            break;
          case 'End':
            e.preventDefault();
            targetIndex = tabs.length - 1;
            break;
          default:
            return;
        }

        if (targetIndex !== null) {
          tabs[targetIndex].focus();
          activateTab(tabs[targetIndex], tabs);
        }
      });
    });
  });

  // 탭 활성화 함수
  function activateTab(activeTab, tabGroup) {
    tabGroup.forEach(tab => {
      const isCurrent = tab === activeTab;
      tab.setAttribute('aria-selected', String(isCurrent));
      tab.setAttribute('tabindex', isCurrent ? '0' : '-1');

      const panelId = tab.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);

      if (panel) {
        if (isCurrent) {
          panel.removeAttribute('hidden');
          panel.classList.add('is-active');
        } else {
          panel.setAttribute('hidden', '');
          panel.classList.remove('is-active');
        }
      }
    });
  }
}

/* --------------------------------------------------------------------------
   04. Focus Trap Emergency Modal Popup
   -------------------------------------------------------------------------- */
function initEmergencyModal() {
  const openButtons = [
    document.getElementById('open-emergency-modal-header'),
    document.getElementById('open-emergency-modal-hero')
  ].filter(Boolean);

  const backdrop = document.getElementById('emergency-modal-backdrop');
  const modal = document.getElementById('emergency-modal');
  const closeBtn = document.getElementById('close-emergency-modal');
  const confirmBtn = document.getElementById('confirm-modal-btn');

  if (!backdrop || !modal) return;

  let lastActiveElement = null;

  // 모달 열기
  function openModal() {
    lastActiveElement = document.activeElement;
    backdrop.removeAttribute('hidden');
    document.body.style.overflow = 'hidden'; // 배경 스크롤 방지

    // 모달 내부 첫 번째 포커스 가능 요소로 포커스 이동
    const focusableElements = getFocusableElements(modal);
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    document.addEventListener('keydown', handleModalKeyDown);
  }

  // 모달 닫기
  function closeModal() {
    backdrop.setAttribute('hidden', '');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleModalKeyDown);

    // 모달을 열었던 이전 요소로 포커스 복원
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  // 모달 내부 포커스 가능 요소 탐색
  function getFocusableElements(container) {
    const selector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(container.querySelectorAll(selector));
  }

  // 포커스 트랩 키보드 이벤트 핸들러 (Tab & ESC)
  function handleModalKeyDown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
      return;
    }

    if (e.key === 'Tab') {
      const focusable = getFocusableElements(modal);
      if (focusable.length === 0) return;

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];

      if (e.shiftKey) {
        // Shift + Tab: 첫 요소에서 마지막 요소로 순환
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: 마지막 요소에서 첫 요소로 순환
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  }

  // 이벤트 바인딩
  openButtons.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (confirmBtn) confirmBtn.addEventListener('click', closeModal);

  // 배경(Backdrop) 클릭 시 닫기
  backdrop.addEventListener('click', e => {
    if (e.target === backdrop) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   05. Web Speech API (TTS) Korean Audio Pronunciation
   -------------------------------------------------------------------------- */
function initSpeechSynthesis() {
  const ttsButtons = document.querySelectorAll('.btn-tts');

  if (!('speechSynthesis' in window)) {
    ttsButtons.forEach(btn => {
      btn.title = 'お使いのブラウザは音声読み上げに対応していません';
      btn.style.opacity = '0.6';
    });
    return;
  }

  // 음성 목록 사전 로드
  let koreanVoices = [];
  function populateVoices() {
    const voices = window.speechSynthesis.getVoices();
    koreanVoices = voices.filter(v => v.lang === 'ko-KR' || v.lang.startsWith('ko'));
  }

  populateVoices();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoices;
  }

  ttsButtons.forEach(button => {
    button.addEventListener('click', () => {
      const textToSpeak = button.getAttribute('data-speech');
      if (!textToSpeak) return;

      // 이미 진행 중인 음성 취소
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.85; // 외국인이 듣기 편하도록 살짝 천천히 재생
      utterance.pitch = 1.0;

      if (koreanVoices.length > 0) {
        utterance.voice = koreanVoices[0];
      }

      // 재생 중 시각적 피드백
      button.classList.add('is-speaking');
      const originalHtml = button.innerHTML;
      button.innerHTML = '<span class="tts-icon">▶</span> 再生中...';

      utterance.onend = () => {
        button.classList.remove('is-speaking');
        button.innerHTML = originalHtml;
      };

      utterance.onerror = () => {
        button.classList.remove('is-speaking');
        button.innerHTML = originalHtml;
      };

      window.speechSynthesis.speak(utterance);
    });
  });
}

/* --------------------------------------------------------------------------
   06. Floating Action Button (FAB) & Mini Fare Calculator
   -------------------------------------------------------------------------- */
function initFabWidget() {
  const fabBtn = document.getElementById('fab-trigger-btn');
  const fabPopup = document.getElementById('fab-popup');
  const closeFabBtn = document.getElementById('close-fab-popup');
  const calcBtn = document.getElementById('btn-calc-fare');
  const distanceInput = document.getElementById('calc-distance');
  const calcResultText = document.getElementById('calc-result-text');

  if (!fabBtn || !fabPopup) return;

  // FAB 팝업 토글
  fabBtn.addEventListener('click', () => {
    const isExpanded = fabBtn.getAttribute('aria-expanded') === 'true';
    fabBtn.setAttribute('aria-expanded', String(!isExpanded));

    if (isExpanded) {
      fabPopup.setAttribute('hidden', '');
    } else {
      fabPopup.removeAttribute('hidden');
      if (distanceInput) distanceInput.focus();
    }
  });

  if (closeFabBtn) {
    closeFabBtn.addEventListener('click', () => {
      fabBtn.setAttribute('aria-expanded', 'false');
      fabPopup.setAttribute('hidden', '');
      fabBtn.focus();
    });
  }

  // 지하철 요금 계산 로직
  // 기본요금 (10km 이하): 1,400원
  // 10km ~ 50km: 매 5km당 100원 추가
  // 50km 초과: 매 8km당 100원 추가
  function calculateSubwayFare(km) {
    const baseFare = 1400;
    if (km <= 10) return { fare: baseFare, note: '基本料金内' };

    let extraFare = 0;
    if (km <= 50) {
      const extraKm = km - 10;
      extraFare = Math.ceil(extraKm / 5) * 100;
    } else {
      // 10km ~ 50km 구간 (40km / 5 = 800원)
      const midExtra = Math.ceil(40 / 5) * 100;
      const overKm = km - 50;
      const overExtra = Math.ceil(overKm / 8) * 100;
      extraFare = midExtra + overExtra;
    }

    return {
      fare: baseFare + extraFare,
      note: `基本運賃 + 加算 ${extraFare.toLocaleString()} ウォン`
    };
  }

  function handleCalculate() {
    if (!distanceInput || !calcResultText) return;

    let distance = parseFloat(distanceInput.value);
    if (isNaN(distance) || distance < 1) {
      distance = 1;
      distanceInput.value = '1';
    }

    const { fare, note } = calculateSubwayFare(distance);
    calcResultText.innerHTML = `予想カード運賃: <strong>${fare.toLocaleString()} ウォン</strong> (${note})`;
  }

  if (calcBtn) {
    calcBtn.addEventListener('click', handleCalculate);
  }

  if (distanceInput) {
    distanceInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleCalculate();
      }
    });
  }
}
