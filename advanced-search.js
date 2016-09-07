const test = require('tape');
const webdriverio = require('webdriverio');
const queryString = require('query-string');
const webdriverOptions = require('./includes/webdriverOptions.js');
const envOptions = require('./includes/envOptions.js');
const client = webdriverio.remote(webdriverOptions);

const testURL = 'https://stgwww.ziprealty.com'; //envOptions.targetServer;

// This test will:
// open search page
// expand all search options
// check all boxes
// submit form
// re expand all search options
// make sure everything is still checked
test('make sure everything is clicked', function (t) {
  t.plan(46);

client
  .init()
  .url(testURL)
  .setViewportSize({"width":1280,"height":800},true)
  .setValue('#searchformlocbox input', 'Oakland, CA')
  .click('#searchformbtn')
  .waitForExist('#advanced-search-link')
  .click('#advanced-search-link')
  .pause(500)
  .waitForExist('#input-keywords')
  .setValue('#input-keywords','basement')
  .selectByValue('select[name=home_sq_feet]','750')
  .selectByValue('select[name=lot_sq_feet]','2000')
  .selectByValue('select[name=year_built_from]','1850')
  .selectByValue('select[name=year_built_to]','1850')
  .selectByValue('select[name=last_visit]','3')
  .click('input[name=property_type_or][value=SFR]')
  .click('input[name=property_type_or][value=LAND]')
  .click('input[name=property_type_or][value=CONDO]')
  .click('input[name=property_type_or][value=TOWNHOUSE]')
  .click('input[name=property_type_or][value=MFR]')
  .waitForExist('select[name=num_mfr_units]')
  .selectByValue('select[name=num_mfr_units]','2')
  //.selectByValue('select[name=is_featured_home]','1')
  //.selectByValue('select[name=is_mls_open_home]','true')
  .selectByValue('select[name=only_photos]','Y')
  .selectByValue('select[name=is_foreclosure]','1')
  .selectByValue('select[name=is_short_sale]','1')
  .selectByValue('select[name=is_new_construction]','1')
  .selectByValue('select[name=is_fixer_upper]','1')
  .click('#psMoreFeaturesBlockLink')
  .pause(1000)
  .waitForExist('input[name=localized_parameter][value="40257"]')
  .click('input[name=localized_parameter][value="40257"]')
  .click('input[name=localized_parameter][value="40258"]')
  .click('input[name=localized_parameter][value="40259"]')
  .click('input[name=localized_parameter][value="40260"]')
  .click('input[name=localized_parameter][value="40269"]')
  .click('input[name=localized_parameter][value="40261"]')
  .click('input[name=localized_parameter][value="40256"]')
  .click('input[name=localized_parameter][value="40255"]')
  .click('input[name=localized_parameter][value="40254"]')
  .click('input[name=localized_parameter][value="40268"]')
  .click('input[name=localized_parameter][value="40239"]')
  .click('input[name=localized_parameter][value="40263"]')
  .click('input[name=localized_parameter][value="40267"]')
  .click('input[name=localized_parameter][value="40266"]')
  .click('input[name=localized_parameter][value="40251"]')
  .click('input[name=localized_parameter][value="40252"]')
  .click('input[name=localized_parameter][value="40253"]')
  .click('input[name=localized_parameter][value="40245"]')
  .click('input[name=localized_parameter][value="40246"]')
  .click('input[name=localized_parameter][value="40247"]')
  .click('input[name=localized_parameter][value="40248"]')
  .click('input[name=localized_parameter][value="40249"]')
  .click('input[name=localized_parameter][value="40250"]')
  .click('input[name=localized_parameter][value="40262"]')
  .click('input[name=localized_parameter][value="40265"]')
  .click('input[name=localized_parameter][value="40264"]')
  // add the missing pull down fields
  .pause(1000)
  .click('button[name=submitbtn]')
  .pause(2000)
  .waitForExist('#advanced-search-link')
  .click('#advanced-search-link')
  .pause(1000)
  .click('#psMoreFeaturesBlockLink')
  .getValue('#input-keywords')
  .then(function(value) {
    t.equal(value,'basement');
  })
  .getValue('select[name=home_sq_feet]').then(function(value) {
    t.equal(value,'750');
  })
  .getValue('select[name=lot_sq_feet]').then(function(value) {
    t.equal(value,'2000');
  })
  .getValue('select[name=year_built_from]').then(function(value) {
    t.equal(value,'1850');
  })
  .getValue('select[name=year_built_to]').then(function(value) {
    t.equal(value,'1850');
  })
  .getValue('select[name=last_visit]').then(function(value) {
    t.equal(value,'3');
  })
  .getAttribute('input[name=property_type_or][value=SFR]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=property_type_or][value=LAND]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=property_type_or][value=CONDO]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=property_type_or][value=TOWNHOUSE]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=property_type_or][value=MFR]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getValue('select[name=num_mfr_units]').then(function(value) {
    t.equal(value,'2');
  })
  .getValue('select[name=is_featured_home]').then(function(value) {
    t.equal(value,'1');
  })
  .getValue('select[name=is_featured_home]').then(function(value) {
    t.equal(value,'1');
  })
  .getValue('select[name=is_mls_open_home]').then(function(value) {
    t.equal(value,'true');
  })
  .getValue('select[name=only_photos]').then(function(value) {
    t.equal(value,'Y');
  })
  .getValue('select[name=is_foreclosure]').then(function(value) {
    t.equal(value,'1');
  })
  .getValue('select[name=is_short_sale]').then(function(value) {
    t.equal(value,'1');
  })
  .getValue('select[name=is_new_construction]').then(function(value) {
    t.equal(value,'1');
  })
  .getValue('select[name=is_fixer_upper]').then(function(value) {
    t.equal(value,'1');
  })
  .getAttribute('input[name=localized_parameter][value="40257"]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=localized_parameter][value="40258"]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=localized_parameter][value="40259"]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=localized_parameter][value="40260"]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=localized_parameter][value="40269"]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=localized_parameter][value="40261"]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=localized_parameter][value="40256"]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=localized_parameter][value="40255"]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=localized_parameter][value="40254"]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=localized_parameter][value="40268"]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=localized_parameter][value="40239"]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=localized_parameter][value="40263"]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=localized_parameter][value="40267"]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=localized_parameter][value="40266"]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=localized_parameter][value="40251"]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=localized_parameter][value="40252"]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=localized_parameter][value="40253"]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=localized_parameter][value="40245"]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=localized_parameter][value="40246"]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=localized_parameter][value="40247"]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=localized_parameter][value="40248"]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=localized_parameter][value="40249"]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=localized_parameter][value="40250"]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=localized_parameter][value="40262"]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=localized_parameter][value="40265"]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .getAttribute('input[name=localized_parameter][value="40264"]','checked')
  .then(function(value) {
    t.equal(value,'true');
  })
  .pause(3000)
  .end();

})
