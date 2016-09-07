const test = require('tape');
const webdriverio = require('webdriverio');
const queryString = require('query-string');
var webdriverOptions = require('../includes/webdriverOptions.js');
var envOptions = require('../includes/envOptions.js');
var client = webdriverio.remote(webdriverOptions);

var testURL = envOptions.targetServer+'/homes-for-sale/list/oakland/by-city/Oakland,CA/detailed?showMobileOptimized=true';
var target = '.js-favorite-me--results';

var testTarget = '.searchResults-autoComplete'
client.init()
  .url(testURL)
  .setValue(testTarget, 's', function() {
    return client.setValue(testTarget, 'test everything right now')
      .pause(3000)
  })
  .pause(2000)
  .then(function() {
    console.log('bye')
  })
  .setValue(testTarget, 'I will get set later')
/*
client
  .init()
  .url(testURL)
    .execute(function() {
      window.gaData = [];
      ga('set', 'sendHitTask', function(model) {
        window.gaData.push(model.get('hitPayload'));
      });
    })
  })
  .click(target,function() {
    client.waitForExist('#usr')
      .pause(300) // element is not immediately visible when added to DOM, have to wait for it to animate into view
      .click('.topNavLink')
      .waitForExist('#first_name')
      .setValue('#first_name','aaron')
      .setValue('#last_name','hans')
      .setValue('#email', 'ahans'+(Math.random()*1000000000)+'@ziprealty.com')
      .setValue('#password', 'password')
      .click('#btnContactSubmit')
      .waitForExist('a[data-panel-action="close"]',8000)
      .click('a[data-panel-action="close"]')
  })
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
    test('GA payload search results save home signup', function (t) {
      t.plan(12);
      var gaPayload = queryString.parse(payloadArr[0]);
      t.equal(gaPayload.ec,'save_home');
      t.equal(gaPayload.ea,'invoke');
      t.equal(gaPayload.el,'save_home|sr-list');
      var gaPayload = queryString.parse(payloadArr[1]);
      t.equal(gaPayload.ec,'registration');
      t.equal(gaPayload.ea,'invoke');
      t.equal(gaPayload.el,'sr-list');
      var gaPayload = queryString.parse(payloadArr[2]);
      t.equal(gaPayload.ec,'registration');
      t.equal(gaPayload.ea,'complete');
      t.equal(gaPayload.el,'save_home|sr-list');
      var gaPayload = queryString.parse(payloadArr[3]);
      t.equal(gaPayload.ec,'save_home');
      t.equal(gaPayload.ea,'complete');
      t.equal(gaPayload.el,'save_home|sr-list');
    });
  })
  .end();
*/
