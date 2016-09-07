const test = require('tape');
const webdriverio = require('webdriverio');
const queryString = require('query-string');
var webdriverOptions = require('../../includes/webdriverOptions.js');
var envOptions = require('../../includes/envOptions.js');
var client = webdriverio.remote(webdriverOptions);

var testURL = envOptions.targetServer+'/?showMobileOptimized=true';
var target = '#navcontent #signin';

client
  .init()
  .url(testURL)
  .execute(function(done) {
    window.gaData = [];
    ga('set', 'sendHitTask', function(model) {
      window.gaData.push(model.get('hitPayload'));
      localStorage['gaData'] = window.gaData.toString();
    });
    return 'setup GA override listener'
  })
  .then(function(ret) {
    console.log(ret.value);
    console.log('URL is '+testURL);
    console.log('clicking on #signin');
  })
  .click('#myZip')
  .waitForExist(target)
  .pause(300)
  .click(target)
  .waitForExist('#usr')
  .setValue('#usr', 'ahans@ziprealty.com')
  .setValue('#pwd', 'password')
  .click('input[value="Sign In"]')
  .execute(function() {
    return localStorage['gaData'];
  })
  .then(function(ret) {
    var payloadArr = ret.value.split(',');
    for(var i = 0;i<payloadArr.length;i++) {
      var gaPayload = queryString.parse(payloadArr[i]);
      console.log('event category: '+gaPayload.ec);
      console.log('event action: '+gaPayload.ea);
      console.log('event label: '+gaPayload.el);
    }
    test('GA payload homepage hamburger menu sign in', function (t) {
      var gaPayload = queryString.parse(payloadArr[0]);
      t.plan(3);
      t.equal(gaPayload.ec,'Sign_In');
      t.equal(gaPayload.ea,'invoke');
      t.equal(gaPayload.el,'Sign_In|menu-signin');
    });
  })
  .pause(1000)
  .end();
