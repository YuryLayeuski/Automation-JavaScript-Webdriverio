const test = require('tape');
const webdriverio = require('webdriverio');
const queryString = require('query-string');
var webdriverOptions = require('../../includes/webdriverOptions.js');
var envOptions = require('../../includes/envOptions.js');
var client = webdriverio.remote(webdriverOptions);

var testURL = envOptions.targetServer+'/?showMobileOptimized=true';
var target = '#requestShowing';

client
  .init()
  .url(testURL)
  .setValue('#inputZipCode', 'Oakland, CA')
  .click('#submitBtn')
  .click('#homephoto0')
  .execute(function(done) {
    window.gaData = [];
    ga('set', 'sendHitTask', function(model) {
      window.gaData.push(model.get('hitPayload'));
    });
    return "GA listener setup"
  })
  .then(function(ret) {
    console.log(ret.value)
    console.log('URL is '+testURL);
    console.log('clicking on '+target);
  })
  .click(target)
  .waitForExist('.topNavLink')
  .pause(300)
  .click('.topNavLink')
  .waitForExist('#first_name')
  .setValue('#first_name','aaron')
  .setValue('#last_name','hans')
  .setValue('#email', 'ahans'+(Math.random()*1000000000)+'@ziprealty.com')
  .setValue('#phone','6508861234')
  .setValue('#password', 'password')
  .click('#btnContactSubmit')
  .waitForExist('a[data-panel-action="close"]')
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
    test('GA payload property request showing sign up', function (t) {
      t.plan(12);
      var gaPayload = queryString.parse(payloadArr[0]);
      t.equal(gaPayload.ec,'Visit');
      t.equal(gaPayload.ea,'invoke');
      t.equal(gaPayload.el,'Visit|hd-body');
      var gaPayload = queryString.parse(payloadArr[2]);
      t.equal(gaPayload.ec,'registration');
      t.equal(gaPayload.ea,'invoke');
      t.equal(gaPayload.el,'hd-body');
      for(var i = 3;i<payloadArr.length;i++) {
        var gaPayload = queryString.parse(payloadArr[i]);
        if(gaPayload.ec == 'registration' && gaPayload.el.trim().toLowerCase() == 'visit|hd-body') {
          t.equal(gaPayload.ec,'registration');
          t.equal(gaPayload.ea,'complete');
          t.equal(gaPayload.el,'visit|hd-body');
        }
        if(gaPayload.ec.toLowerCase() == 'visit') {
          t.equal(gaPayload.ec,'visit');
          t.equal(gaPayload.ea,'complete');
          t.equal(gaPayload.el,'visit|hd-body');
        }
      }
    });
  })
  .pause(1000)
  .end();
