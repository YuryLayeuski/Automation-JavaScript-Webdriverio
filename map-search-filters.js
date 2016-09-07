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
    .setValue('#inputZipCode', 'San Francisco, CA')
    .click('#submitBtn')
    .click('#srMap')
    .waitForExist('#searchBtn',1000)
    .getTitle().then(function(title) {
      console.log('Title was: ' + title);
    })
    .click('#searchBtn')
    .click("#filter-beds li[data-beds='2']")
    .click("#filter-baths li[data-baths='0']")
    .waitForExist('#btnPrimarySearch',1000)
    .click('#btnPrimarySearch')
    .waitForExist('#addlMapresults',10000)
    .getHTML('#addlMapresults').then(function(text) {
      console.log('results found is: '+text);
    })
    //.getText('#showAllResults').then(function(text) {
    //  console.log(text);
    //})
    .end();
