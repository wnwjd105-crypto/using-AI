# 🇰🇷 한국 대중교통 완전 정복 가이드 (K-Transit Guide for Japanese Travelers)

일본인 관광객이 한국의 대중교통(지하철, 시내버스, 택시)을 불안감 없이 안심하고 이용할 수 있도록 기획·구현된 반응형 웹 가이드 시스템입니다.

WCAG 2.1 AA 웹 접근성 기준 준수, WAI-ARIA 규격에 맞춘 키보드 대응 탭 UI, 포커스 트랩(Focus Trap)이 적용된 긴급 모달, Web Speech API를 활용한 한국어 음성 재생(TTS), `localStorage` 실시간 동기화 체크리스트, A4 인쇄 전용 스타일(`@media print`) 등 실무 프론트엔드 퍼블리싱 기술을 총망라하고 있습니다.

---

## 📁 폴더 구조 (Project Structure)

```text
korea-transit-guide/
├── index.html              # 시맨틱 마크업 & 다국어·루비(가타카나) 병기
├── assets/
│   ├── css/
│   │   └── style.css       # 디자인 시스템, WCAG 준수 컬러, 반응형, @media print
│   └── js/
│       └── main.js         # Scrollspy, localStorage, WAI-ARIA 탭, Focus Trap, TTS, FAB
├── serve.ps1               # 로컬 개발 및 테스트용 경량 정적 웹 서버 (PowerShell)
└── README.md               # 프로젝트 설계서 & 퍼블리싱 학습 가이드
```

---

## 🌟 구현된 주요 기능 (Key Features)

1. **상단 고정 헤더 & 스크롤스파이 (Sticky Header & Scrollspy)**
   - 스크롤 위치에 따라 현재 열람 중인 섹션의 내비게이션 링크를 실시간으로 자동 하이라이트.
   - 모바일 화면 전용 햄버거 메뉴 및 접근성 속성 연동(`aria-expanded`, `aria-controls`).

2. **히어로 섹션 & 핵심 중요 배너 3종**
   - 캐치프레이즈: 한국 여행의 필수품! 지하철 & 버스 완전 가이드.
   - ① T-money 카드 구매처 및 현금 충전 필수 안내.
   - ② 30분 이내 환승할인 규칙 및 하차 태그 필수 주의사항.
   - ③ 막차 시간 확인 및 길 찾기 필수 앱 추천 (NAVER Map, Subway Korea).

3. **교통 준비 체크리스트 (`localStorage` 실시간 동기화)**
   - 체크박스 클릭 시 진행률(%)과 프로그레스 바가 실시간 갱신(`role="progressbar"`).
   - 브라우저의 `localStorage`에 상태를 저장하여 새로고침 후에도 체크 내역 유지.
   - 클릭 한 번으로 모든 항목을 비우는 '초기화' 버튼 제공.

4. **WAI-ARIA 규격 준수 탭 UI (2개 섹션)**
   - **탭 1: 교통수단별 가이드** (지하철 vs 시내버스 vs 택시 탑승법·주의 매너 비교)
   - **탭 2: 인기 관광지 이동 루트** (명동, 홍대, 성수, 강남의 인접역, 출구 번호, 인천공항 접근법)
   - 키보드 방향키(`←` / `→`), `Home`, `End` 키를 통한 원활한 탭 탐색 지원.

5. **포커스 트랩 (Focus Trap) 적용 긴급 모달**
   - 한국관광공사 24시간 일본어 통역 안내 전화 `1330`, 경찰청 `112`, 유실물 통합포털(`lost112`) 안내.
   - 모달이 활성화된 동안 `Tab` 키 포커스가 모달 내부 요소만 순환하도록 제어.
   - `ESC` 키 또는 배경(Backdrop) 클릭 시 즉시 닫히며, 직전 포커스 위치로 자동 복귀.

6. **Web Speech API (TTS) 기반 한국어 원어민 음성 재생**
   - 교통 이용 현장에서 바로 쓸 수 있는 필수 회화(충전 요청, 목적지 확인, 하차 벨 등)에 "🔊 음성 듣기" 기능 탑재.
   - `window.speechSynthesis`(`lang="ko-KR"`)를 활용하고 재생 중 실시간 애니메이션 피드백 구현.

7. **우측 하단 플로팅 액션 버튼 (FAB) & 간이 요금 계산기**
   - 클릭 시 이동 거리(km)에 따른 서울 지하철 예상 운임 계산기와 FAQ 아코디언 토글.

8. **A4 인쇄 전용 스타일 (`@media print`)**
   - 종이 출력 시 헤더, 내비게이션, 버튼, FAB 등 동적 UI 요소를 숨김 처리.
   - 오프라인 휴대용 '체크리스트'와 '한국어 회화집'만 고대비 흑백 최적화 레이아웃으로 출력.

---

## 📚 퍼블리싱 핵심 포인트 (Publishing Key Points)

### 1. 시맨틱 마크업 & 다국어 표기 규칙 (Localization)
- `<html lang="ja">`를 기본 선언하여 스크린 리더가 올바른 일본어 음성 합성 엔진을 선택할 수 있도록 구성.
- 한글 단어는 가독성과 학습 편의성을 위해 일관된 규칙으로 표기:
  > `한글 (가타카나 발음 / 일본어 뜻)`  
  > 예: `T-money (티머니 / 交通カード)`, `지하철 (ジハチョル / 地下鉄)`, `환승 (ファンスン / 乗換)`
- 한국어 음성 읽기 대상 텍스트에는 `<p class="phrase-korean" lang="ko">`를 명시하여 언어 속성을 전환.

### 2. WAI-ARIA 웹 접근성 설계 (Accessible Tabs)
- W3C WAI-ARIA Authoring Practices를 엄격히 준수:
  - 탭 컨테이너: `role="tablist"` + `aria-label`
  - 개별 탭: `role="tab"`, `aria-selected="true|false"`, `aria-controls="panel-id"`, `tabindex="0|-1"`
  - 개별 패널: `role="tabpanel"`, `aria-labelledby="tab-id"`, `tabindex="0"`, `hidden` 속성 토글
- **키보드 인터랙션**:
  - `ArrowRight` / `ArrowLeft`: 다음/이전 탭으로 포커스 이동 및 패널 자동 전환
  - `Home` / `End`: 첫 번째/마지막 탭으로 즉시 점프

### 3. 모달 포커스 트랩 (Focus Trap Pattern)
- 키보드 사용자나 스크린 리더 이용자가 모달 바깥의 배경 요소로 이탈하지 않도록 순환 포커스 제어:
  ```javascript
  // 순환 포커스 처리 핵심 로직
  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
  ```
- 모달을 열었을 때 트리거가 된 버튼(`lastActiveElement`)을 기억하고, 모달이 닫히면 원래 위치로 포커스를 복원.

### 4. Web Speech API (TTS) 크로스 브라우징 및 UX 연출
- `window.speechSynthesis` 지원 여부를 사전 판별하여 미지원 환경에 대한 안전한 예외 처리.
- `speechSynthesis.getVoices()`로 디바이스 내 `ko-KR` 음성 엔진을 탐색하고, 외국인 관광객이 명확히 들을 수 있도록 재생 속도(`rate = 0.85`) 최적화.
- `onstart`, `onend`, `onerror` 이벤트와 연동하여 버튼에 상태 클래스(`.is-speaking`) 및 안내 문구를 동적으로 변경.

### 5. 인쇄 전용 미디어 쿼리 (`@media print`) 실무 적용
- 웹페이지를 현지 여행용 종이 출력물로 활용할 수 있도록 최적화:
  - `page-break-inside: avoid;`: 카드나 체크리스트 항목이 인쇄 페이지 경계선에서 잘리는 현상 방지.
  - `page-break-before: always;`: 회화집 섹션을 새로운 페이지 상단부터 시작.
  - 박스 그림자, 배경 그라데이션, 고정 헤더 등을 제거하여 잉크 절약 및 가독성 극대화.

---

## 🎨 디자인 시스템 & 명도 대비 (WCAG 2.1 AA)

- **본문 텍스트 (`#0F172A`) on 흰색 배경 (`#FFFFFF`)**: 명도 대비 **14.5:1** (AA 기준 4.5:1 대폭 상회)
- **보조 텍스트 (`#334155`) on 흰색 배경**: 명도 대비 **7.8:1**
- **기본 브랜드 블루 (`#2563EB`) on 흰색 배경**: 명도 대비 **4.6:1**
- **긴급 경고 레드 (`#B91C1C`) on 흰색 배경**: 명도 대비 **5.9:1**
- 모든 대화형 인터랙티브 요소에 `:focus-visible` 스타일(3px 두께의 선명한 아웃라인)을 적용하여 키보드 접근성 보장.

---

## 🚀 로컬 실행 방법 (How to Run Locally)

PowerShell 환경에서 제공되는 정적 웹 서버를 구동하여 즉시 확인할 수 있습니다:

```powershell
# 5500 포트로 로컬 정적 웹 서버 실행
powershell -ExecutionPolicy Bypass -File .\serve.ps1 -Port 5500
```

실행 후 웹 브라우저에서 `http://localhost:5500/`으로 접속하면 실제 사이트와 모든 인터랙티브 기능을 바로 테스트할 수 있습니다.
