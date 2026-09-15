# MMDD_portfolio_v2

> **Full-Stack Embedded & System Engineer Portfolio**  
> **Developer:** 주정훈 (JOO JEONGHOON)  
> **Affiliation:** 경성대학교 전자공학과 (Kyungsung University, Dept. of Electronic Engineering) - 2027년 졸업 예정  
> **Global Career Track:** K-Move Global Engineer Training Program (Japan Target)

---

## 1. 프로젝트 개요 (Overview)

본 프로젝트는 하드웨어 물리 계층부터 최상위 웹 서버 및 데이터베이스 인프라까지 전 계층을 아우르는 **융합형 임베디드 시스템 엔지니어 주정훈**의 3단계 리뉴얼 포트폴리오 웹사이트입니다.

전자기학 및 회로 설계 역량을 기반으로, C/Python 기반 MCU 제어, UART/CAN/MQTT 통신 계층, 그리고 Apache/MySQL 기반 웹 인프라를 연결하는 통합 엔지니어링 철학을 고급스러운 다크 글래스모피즘(Deep Navy & Neon Cyan) 디자인과 인터랙티브 가로 슬라이드 트랙으로 시각화하였습니다.

---

## 2. 프로젝트 폴더 구조 (Project Structure)

본 프로젝트는 `assets/` 하위 폴더 분리 표준을 엄격히 준수하여 정적 리소스의 유지보수성과 확장성을 극대화하였습니다.

```
MMDD_portfolio_v2/
│
├── index.html                  # 메인 엔트리포인트 (SEO, 시맨틱 구조, 6개 가로 슬라이드 섹션)
├── readme.md                   # 프로젝트 메타 및 아키텍처 기술 문서
│
└── assets/                     # 정적 에셋 격리 디렉토리
    ├── css/
    │   └── style.css           # WCAG 2.1 AA 준수 다크 테마, Flex 트랙, 터미널 & 글래스 UI
    ├── js/
    │   └── main.js             # 슬라이드 컨트롤러, 터미널 타이핑 엔진, 프로그레스 트리거
    └── img/
        ├── profile.jpg         # 엔지니어 프로필 이미지
        ├── pov-project.jpg     # POV 디스플레이 플래그십 하드웨어 프로젝트 이미지
        └── iot-project.jpg     # IoT 텔레메트리 & 웹 플랫폼 프로젝트 이미지
```

---

## 3. 핵심 기술 스택 (Technical Stack)

| 영역 (Domain) | 핵심 기술 및 툴체인 |
| :--- | :--- |
| **Hardware & Circuit** | 회로 설계, KiCad, OrCAD, 2층 PCB 레이아웃, 오실로스코프, 로직 아날라이저, SMD 납땜, 홀센서 회로 |
| **Low-Level & Embedded** | Embedded C (C99/C11), Python 3, STM32 (Cortex-M4), AVR ATmega, Bare-Metal 제어, 타이머 ISR, FreeRTOS |
| **Network & Communication**| UART, SPI, I2C, CAN Bus, TCP/IP Socket, MQTT, Modbus RS-485, CRC-16 패킷 검증 |
| **Web & Database** | Apache HTTP Server, MySQL / MariaDB (복합 인덱싱), Vanilla HTML5/CSS3, Modern ES6+ JavaScript |
| **Global Readiness** | 한국어 (Native), 日本語 (JLPT N2 비즈니스 회화 가능 / N1 대비 중), K-Move 일본 연수 |

---

## 4. 핵심 구현 기능 및 아키텍처 상세

### 4.1 가로 슬라이드 트랙 레이아웃 (`.track` Controller)
- **CSS Flex & Transform 연동:** 6개 섹션(Home, About, Skills, Projects, Timeline, Contact)을 `600vw` 너비의 수평 트랙 컨테이너에 배치하고, `transform: translateX(-N * 100vw)`와 `cubic-bezier(0.16, 1, 0.3, 1)` 가속 곡선을 적용하여 앱 수준의 부드러운 화면 전환을 구현했습니다.
- **다중 네비게이션 트리거:**
  - 상단 고정 헤더 네비게이션 메뉴 (현재 위치 자동 하이라이트 및 ARIA 상태 갱신)
  - 하단 좌측 인디케이터 도트(Dots) 및 카운터 (`01 / 06`)
  - 하단 우측 이전/다음 화살표 버튼 (`#prevBtn`, `#nextBtn`)
  - 키보드 좌/우 방향키 (`ArrowLeft`, `ArrowRight`, `PageUp`, `PageDown`)
  - 모바일/태블릿 터치 스와이프 제스처 지원 (`touchstart`, `touchend`)
  - 휠(Wheel) 스크롤 디바운싱 기반 부드러운 수평 전환

### 4.2 macOS 터미널 UI & 자바스크립트 타이핑 엔진
- macOS 특유의 트래픽 라이트(Red/Yellow/Green) 윈도우 컨트롤과 고대비 모노스페이스(`JetBrains Mono`) 콘솔 창을 구성했습니다.
- `main.js`의 타이핑 엔진이 다음 미션 스테이트먼트를 자연스러운 타속 변동(30~55ms)을 주며 한 글자씩 실시간 타이핑합니다:
  > *"Connecting Hardware, Communication, and Software. I am Joo Jeonghoon, a Full-Stack Systems Engineer."*
- 하드웨어 클록 주파수(168MHz), 통신 버스 상태, K-Move 글로벌 타깃 등 엔지니어링 메타데이터를 시스템 진단 형태로 표기합니다.

### 4.3 정량적 엔지니어링 지표 (Verified Specs) 적용
단순한 주관적 설명 대신, 수치 기반의 신뢰할 수 있는 엔지니어링 성과를 전면에 배치했습니다:
- **POV (Persistence of Vision) 디스플레이 프로젝트:**
  - **홀센서 인터럽트 제어로 RPM 측정 오차 ±1% 이내 달성:** 1480~1800 RPM 동적 모터 회전 속도 변화에 1회전 단위 인터럽트로 즉각 동기화.
  - **microsecond 단위 타이밍 제어로 60 FPS 수준의 정밀 잔상 구현:** 10µs 하드웨어 타이머 ISR 기반 LED 슬라이스 렌더링으로 지터(Jitter) 제거.
  - **기계 조립 및 회로 레이아웃 직접 설계:** 원심력 하중을 견디는 대칭형 양면 PCB 및 아크릴 프레임 직접 제작.
- **산업용 IoT 텔레메트리 & 웹 플랫폼 프로젝트:**
  - **무손실 패킷 파이프라인:** CRC-16 무결성 검증을 통해 115200 bps 고속 전송 중 패킷 손실률 `0.00%` 달성.
  - **초저지연 데이터베이스 인덱싱:** 다채널 센서 100Hz 샘플링 및 MySQL B-Tree 복합 인덱스 설계를 통해 쿼리 지연 시간 `< 50ms` 유지.

### 4.4 4단계 기술 스택 세분화 & 프로그레스 인터랙션
기술 스택을 단순 나열하지 않고 하드웨어부터 소프트웨어까지 4단계 계층으로 분리하였습니다:
1. `[Hardware & Circuit]` (Layer 01 : Physical)
2. `[Low-Level & Embedded (C/Python)]` (Layer 02 : Firmware)
3. `[Network & Communication]` (Layer 03 : Protocol)
4. `[Web & Database (MySQL / Apache)]` (Layer 04 : Application)
- Skills 섹션 진입 시 각 역량별 프로그레스 바가 부드럽게 채워지는 인터랙티브 애니메이션을 탑재했습니다.

### 4.5 글로벌 / 일본 해외취업 타깃팅 최적화
- 헤더 및 Contact 섹션에 **"K-Move Global Engineer Training Program (Japan Target)"** 뱃지 배치.
- 일본 현지 개발팀과의 원활한 협업을 증명하는 **일본어 대응 준비도 (JLPT N2 수준 비즈니스 회화, 기술 사양서 독해)** 명시.
- 모국어인 한국어와 IT/공학 영어 독해 능력을 함께 제시하여 글로벌 임베디드 프로젝트 적합성 강조.

---

## 5. 실행 및 로컬 확인 방법 (How to Run)

본 프로젝트는 외부 라이브러리나 무거운 프레임워크 빌드 과정 없이 표준 웹 표준 기술(HTML5, Vanilla CSS3, Modern JavaScript)로 제작되어 브라우저에서 즉시 실행 가능합니다.

1. 웹 브라우저(Chrome, Edge, Safari 등)에서 `index.html` 파일을 직접 더블 클릭하여 실행하거나,
2. 로컬 웹 서버(VS Code Live Server, Python `http.server`, 또는 Apache)를 통해 구동합니다:
   ```bash
   # Python 내장 웹 서버 실행 예시
   python -m http.server 8080
   # 브라우저 접속: http://localhost:8080
   ```

---

## 6. 라이선스 및 저작권 (License)

Copyright (c) 2024-2027 Joo Jeonghoon (주정훈). All Rights Reserved.
