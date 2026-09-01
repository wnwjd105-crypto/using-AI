// 1. 웹 앱 접속 시 index.html 렌더링
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('교육자료신청')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// 2. 폼 데이터 스프레드시트에 저장하는 함수
function submitData(formData) {
  try {
    // 사용하실 구글 스프레드시트 URL을 입력해주세요.
    const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1FtDyO5nHm272hmo5GxfIwdgMCqIm0uNtCt-5koO73JA/edit?gid=0#gid=0';
    
    const ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
    const sheet = ss.getActiveSheet(); // 또는 ss.getSheetByName('시트이름')
    
    // 데이터 추가 (이름, 이메일, 교수님께 하고 싶은 말)
    sheet.appendRow([
      formData.name,
      formData.email,
      formData.message
    ]);
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}