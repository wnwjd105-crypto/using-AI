function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('모임 메뉴 & 장소 설문조사')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function submitSurvey(formData) {
  try {
    // 현재 열려있는 스프레드시트를 자동으로 가져옴 (URL 불필요)
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    
    sheet.appendRow([
      formData.name,
      formData.lunch,
      formData.dinner,
      formData.activity
    ]);
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}
