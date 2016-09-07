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
  .url('https://qawww.ziprealty.com/homes-for-sale/list/oakland/by-city/Oakland,CA/mapped?showMobileOptimized=true')

  // maybe get the bounds of the map
  // perform api call to get some markers
  // then generate a click on one of them...
  /*
  var mev = {
    stop: null,
    latLng: new google.maps.LatLng(40.0,-90.0)
  }
    // see if this works manually
    // map has to be on window
  google.maps.event.trigger(map, 'click', mev);
  */

  // there should be some markers
  .getText('.test-filters').then(function(text) {
    console.log('text is: '+text)
    initialPropText = text;
  })
  // click on a marker
  .click('#searchBtn') // google.maps.event.trigger(markers[i], 'click');
  // see some property details
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
