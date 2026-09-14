# 📄 Smart Doc Compressor

> 브라우저 환경에서 안전하게 문서를 압축하고 용량을 절감할 수 있는 클라이언트 사이드 웹 애플리케이션입니다. 외부 서버로 파일이 전송되지 않아 개인정보 유출 위험이 없습니다[cite: 1, 2].

---

## ✨ 주요 기능

* **🔒 프라이버시 보장 (Client-Side Processing)**: 모든 파일 압축 작업은 사용자의 브라우저 내부에서 이루어집니다[cite: 1, 2].
* **📂 다양한 포맷 지원**: PDF, PPT, PPTX, DOC, DOCX 및 이미지 파일(`JPG`, `PNG`, `WebP`)을 지원합니다[cite: 1, 2].
* **⚡ 실시간 독립 프로그레스 바**: 여러 파일을 동시에 업로드해도 파일별로 개별 작업 진행 상황과 상태를 실시간으로 확인할 수 있습니다[cite: 2].
* **📥 간편한 다운로드**: 압축이 완료되면 원본 용량과 절감된 용량(`-%`)이 표시되며, 클릭 한 번에 `compressed_원본파일명` 형식으로 바로 저장됩니다[cite: 2].
* **🚫 예외 처리**: 브라우저에서 직접 처리하기 번거로운 HWP/HWPX 파일은 업로드 시 안내 메시지와 함께 제외 처리됩니다[cite: 2].

---

## 🛠️ 사용 기술 (Tech Stack)

* **Frontend**: HTML5, CSS3, JavaScript (ES6+)
* **Libraries**:
  * [JSZip](https://stuk.github.io/jszip/): 오피스 문서(DOCX, PPTX) 내부 리소스 압축[cite: 1, 2]
  * [PDF.js](https://mozilla.github.io/pdf.js/): PDF 문서 렌더링 및 페이지 분석[cite: 1, 2]
  * [jsPDF](https://github.com/parallax/jsPDF): 압축된 PDF 문서 재조립[cite: 1, 2]
  * [FontAwesome](https://fontawesome.com/): UI 아이콘[cite: 1, 2]

---

## 🚀 시작하기 (How to Run)

별도의 백엔드 서버 구축이나 복잡한 설치 과정 없이, HTML 파일 하나로 구동할 수 있습니다.

1. 저장소의 코드를 `index.html` 파일로 저장합니다.
2. 프로젝트 폴더 내에 로고 이미지 파일명(`logo.png`)을 위치시킵니다. (선택 사항)
3. `index.html` 파일을 크롬(Chrome)이나 엣지(Edge) 등 모던 웹 브라우저로 엽니다.

---

## 💡 사용 방법

1. 화면 좌상단의 로고를 클릭하면 **NanaLab**(`https://nanalab.kr`) 사이트로 이동합니다.
2. 화면 중앙의 업로드 박스에 파일을 **드래그 앤 드롭**하거나 **[파일 선택하기]** 버튼을 눌러 문서를 업로드합니다.
3. 파일별로 진행되는 프로그레스 바와 실시간 상태 메시지를 확인합니다.
4. 압축이 완료되면 활성화되는 **다운로드 버튼**을 눌러 `compressed_원본파일명`으로 결과물을 다운로드합니다.
