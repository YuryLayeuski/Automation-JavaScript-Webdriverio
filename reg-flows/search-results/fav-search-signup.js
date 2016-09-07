const test = require('tape');
const webdriverio = require('webdriverio');
const queryString = require('query-string');
var options = {
  host: '0.0.0.0',
  port: 4444,
  desiredCapabilities: {
    browserName: 'chrome'
  }
};
var client = webdriverio.remote(options);

var testName = 'Search results save search sign up';
var testURL = 'https://qawww.ziprealty.com/?showMobileOptimized=true';
var target = '#srSave';

client
  .init()
  .url(testURL)
  .setValue('#inputZipCode', 'Oakland, CA')
  .click('#submitBtn')
  .waitForExist(target)
  .execute(function(done) {
    window.gaData = [];
    ga('set', 'sendHitTask', function(model) {
      window.gaData.push(model.get('hitPayload'));
    });
    return "oh hi"
  })
  .then(function(ret) {
    console.log(ret.value)
    console.log('URL is '+testURL);
    console.log('clicking on '+target);
  })
  .click(target)
  .waitForExist('.topNavLink',5000)
  .pause(500)
  .click('.topNavLink')
  .waitForExist('#first_name')
  .setValue('#first_name','aaron')
  .setValue('#last_name','hans')
  .setValue('#email', 'ahans'+(Math.random()*1000000000)+'@ziprealty.com')
  .setValue('#password', 'password')
  .click('#btnContactSubmit')
  .waitForExist('a[data-panel-action="close"]',8000)
  .click('a[data-panel-action="close"]')
  .execute(function() {
    return window.gaData.toString();
  })
  .then(function(ret) {
    var payloadArr = ret.value.split(',');
    for(var i = 0;i<payloadArr.length;i++) {
      var gaPayload = queryString.parse(payloadArr[i]);
      console.log('event category: '+gaPayload.ec);
      console.log('event action: '+gaPayload.ea);
      console.log('event label: '+gaPayload.el);
    }
    test('GA payload '+testName, function (t) {
      var gaPayload = queryString.parse(payloadArr[1]);
      t.plan(3);
      t.equal(gaPayload.ec,'save_search');
      t.equal(gaPayload.ea,'complete');
      t.equal(gaPayload.el,'hd-bottom-nav');
    });
  })
  .end();
