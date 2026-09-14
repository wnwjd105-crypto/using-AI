# 🎨 Smart GIF Studio

> 사용자의 브라우저 안에서 안전하고 간편하게 GIF 파일을 리사이징하고 편집할 수 있는 클라이언트 사이드 웹 애플리케이션입니다.

---

## ✨ 주요 기능

* **🔒 프라이버시 보장 (Client-Side Processing)**: 모든 GIF 파일 변환 및 편집 작업은 사용자의 브라우저 내부에서 처리되어 서버로 파일이 유출되지 않습니다.
* **📊 상세 파일 정보 및 레터박스 제거**: 업로드된 GIF의 용량, 해상도, Frame Rate, 총 프레임 수를 실시간으로 출력하며, 깔끔한 시각화를 위해 레터박스를 제거했습니다.
* **🎛️ 9가지 Editor Tools 메뉴**: Resize, Crop, Downsizing, Format Convert, Rotate, Optimize, Reverse, Speed, Cut 등 다양한 편집 툴을 직관적인 아이콘과 함께 제공합니다.
* **📐 리사이즈(Resize) 상세 기능**: 
  * X축 및 Y축 슬라이더를 통한 자유로운 크기 조절 (현재 크기의 5% ~ 300% 범위)
  * 자물쇠(Lock) 아이콘을 통한 **비율 유지 및 개별 조절 모드** 전환 지원
* **📥 전용 결과물 패널 및 맞춤형 다운로드**: 작업 완료 시 `Resized_<원본파일명>` 형식으로 즉시 다운로드할 수 있는 결과물 패널을 제공합니다.

---

## 🛠️ 사용 기술 (Tech Stack)

* **Frontend**: HTML5, CSS3, JavaScript (ES6+, Canvas API)
* **Libraries**:
  * [gifshot](https://github.com/yahoo/gifshot): 자바스크립트 기반 GIF 인코딩 및 처리 라이브러리
  * [FontAwesome](https://fontawesome.com/): UI 아이콘

---

## 🚀 시작하기 (How to Run)

별도의 백엔드 서버 구축이나 복잡한 설치 과정 없이 단일 HTML 파일로 실행할 수 있습니다.

1. 저장소의 코드를 `index.html` 파일로 저장합니다.
2. 프로젝트 폴더 내에 로고 이미지 파일명(`logo.png`)을 위치시킵니다. (선택 사항)
3. `index.html` 파일을 크롬(Chrome)이나 엣지(Edge) 등 모던 웹 브라우저로 엽니다.

---

## 💡 사용 방법

1. 화면 좌상단의 로고를 클릭하면 **NanaLab**(`https://nanalab.kr`) 사이트로 이동합니다.
2. 드래그 앤 드롭 영역 또는 **[Choose File]** 버튼을 통해 GIF 파일을 업로드합니다.
3. 업로드된 파일 정보와 미리보기를 확인한 뒤, 우측 **Editor Tools**에서 **Resize** 등의 기능을 선택합니다.
4. 슬라이더와 자물쇠 버튼을 이용해 원하는 크기를 조절한 뒤 **[Go!]** 버튼을 눌러 변환을 실행합니다.
5. 변환 완료 후 생성되는 **[Download Resized GIF]** 버튼을 클릭하여 결과물을 저장합니다.
