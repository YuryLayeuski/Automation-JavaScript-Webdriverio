// this is an experiment to figure out how to reuse some of the chained steps

var webdriverio = require('webdriverio');
var webdriverOptions = require('../includes/webdriverOptions.js');
var client = webdriverio.remote(webdriverOptions);
const test = require('tape');

var page = require('./page')

test('should visit DuckDuckGo', function (t) {
  t.plan(1);

  var myPage = new page(client);

  myPage.open('https://duckduckgo.com/',function(title) {
    console.log('called back to test')
    t.equal(title, "DuckDuckGo")
  });

});
