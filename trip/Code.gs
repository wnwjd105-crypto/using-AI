function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('나의 멋진 웹사이트')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
