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
var initialPropText = '';

client
    .init()
    .url('https://qawww.ziprealty.com/?showMobileOptimized=true')
    .setValue('#inputZipCode', 'Oakland, CA')
    .click('#submitBtn')
    .getTitle().then(function(title) {
      console.log('Title was: ' + title);
    })
    .getText('.test-filters').then(function(text) {
      console.log('text is: '+text)
      initialPropText = text;
    })
    .click('#searchBtn')
    .click("#filter-beds li[data-beds='5']")
    .waitForExist('#btnPrimarySearch',1000)
    .click('#btnPrimarySearch')
    .getText('.test-filters').then(function(text) {
      test('search', function (t) {
        t.plan(2);
        t.ok(initialPropText.indexOf('properties found')>-1);
        t.notEqual(text,initialPropText);
      });
      console.log('text is: '+text+' and text was '+initialPropText)
    })
    .end();
