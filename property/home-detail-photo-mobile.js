const test = require('tape');
const webdriverio = require('webdriverio');
var options = {
  host: '0.0.0.0',
  port: 4444,
  desiredCapabilities: {
    browserName: 'chrome'
  }
};

var client = webdriverio.remote(options);

client
  .init()
  .setViewportSize({"width":320,"height":480},true)
  .url('https://qawww.ziprealty.com/homes-for-sale/search-results/sf/detailed?showMobileOptimized=true')
  .click('#photocont0')
  .waitForExist('.photobox__label__photos .positionDisplay',1000)
  .getText('.photobox__label__photos .positionDisplay')
  .then(function(text) {
    test('x of x photos', function (t) {
      t.plan(1);
      t.ok(text.indexOf(' / ')>-1);
    });
  })
  .end();
