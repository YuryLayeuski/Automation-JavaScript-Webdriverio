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
  .waitForExist(target,1000)
  .pause(500)
  .click(target)
  .waitForExist('.topNavLink')
  .pause(500)
  .click('.topNavLink')
  .waitForExist('#first_name')
  .setValue('#first_name','aaron')
  .setValue('#last_name','hans')
  .setValue('#email', 'ahans'+(Math.random()*1000000000)+'@ziprealty.com')
  .setValue('#password', 'password')
  .selectByIndex('#metro',3)
  .click('#btnContactSubmit')
  .pause(3000)
  .waitForExist('#myZip')
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
      t.plan(12);
      var gaPayload = queryString.parse(payloadArr[0]);
      t.equal(gaPayload.ec,'Sign_In');
      t.equal(gaPayload.ea,'invoke');
      t.equal(gaPayload.el,'Sign_In|menu-signin');
      var gaPayload = queryString.parse(payloadArr[1]);
      t.equal(gaPayload.ec,'registration');
      t.equal(gaPayload.ea,'invoke');
      t.equal(gaPayload.el,'menu-signin');
      var gaPayload = queryString.parse(payloadArr[2]);
      t.equal(gaPayload.ec,'registration');
      t.equal(gaPayload.ea,'complete');
      t.equal(gaPayload.el,'sign_in|menu-signin');
      var gaPayload = queryString.parse(payloadArr[3]);
      t.equal(gaPayload.ec,'sign_in');
      t.equal(gaPayload.ea,'complete');
      t.equal(gaPayload.el,'sign_in|menu-signin');
    });
  })
  .pause(1000)
  .end();
