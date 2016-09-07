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
  .url('https://qawww.ziprealty.com/homes-for-sale/search-results/sf/detailed')
  .click('#homephoto0')
  .waitForExist('.gallery-thumbs',1000)
  .getHTML('.gallery-thumbs')
  .then(function(html,err) {
    var num = html.indexOf('swiper-slide-active');
    test('found active thumbnail', function (t) {
      t.plan(1);
      t.ok(num>-1);
    });
  })
  .end();
