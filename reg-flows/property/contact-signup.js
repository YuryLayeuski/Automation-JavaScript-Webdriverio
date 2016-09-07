const test = require('tape');
const webdriverio = require('webdriverio');
const queryString = require('query-string');
var webdriverOptions = require('../../includes/webdriverOptions.js');
var envOptions = require('../../includes/envOptions.js');
var client = webdriverio.remote(webdriverOptions);

var testURL = envOptions.targetServer+'/?showMobileOptimized=true';
var target = '#btnContact';

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
  .pause(500)
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
    test('GA payload property contact sign up', function (t) {
      t.plan(12);
      var gaPayload = queryString.parse(payloadArr[0]);
      t.equal(gaPayload.ec,'Contact');
      t.equal(gaPayload.ea,'invoke');
      t.equal(gaPayload.el,'Contact|hd-bottom-nav');
      var gaPayload = queryString.parse(payloadArr[1]);
      t.equal(gaPayload.ec,'registration');
      t.equal(gaPayload.ea,'invoke');
      t.equal(gaPayload.el,'hd-bottom-nav');
      for(var i = 2;i<payloadArr.length;i++) {
        var gaPayload = queryString.parse(payloadArr[i]);
        if(gaPayload.ec == 'registration') {
          t.equal(gaPayload.ec,'registration');
          t.equal(gaPayload.ea,'complete');
          t.equal(gaPayload.el,'contact|hd-bottom-nav');
        }
        if(gaPayload.ec == 'contact') {
          t.equal(gaPayload.ec,'contact');
          t.equal(gaPayload.ea,'complete');
          t.equal(gaPayload.el,'contact|hd-bottom-nav');
        }
      }
    });
  })
  .pause(1000)
  .end();
