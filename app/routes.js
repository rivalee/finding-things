var express = require('express');
var router = express.Router();

var taxonHelpers = require('./taxon-helpers.js');

router.get('/', function (req, res) {
  res.render('index');
});

// ****************** Education Routes BEGIN ******************
router.get('/education', function (req, res) {
  var taxonSlug = "education";

  var taggedItems = taxonHelpers.fetchTaggedItems(taxonSlug);
  var guidanceItemsOnly = taxonHelpers.filterOutGuidance(taggedItems);
  var childTaxons = taxonHelpers.fetchChildTaxons(taxonSlug);

  res.render('education', {taggedItems: guidanceItemsOnly, childTaxons: childTaxons});
});

router.get('/childcare-and-early-years', function (req, res) {
  var taxonSlug = "2-childcare-and-early-years";

  var taggedItems = taxonHelpers.fetchTaggedItems(taxonSlug);
  var guidanceItemsOnly = taxonHelpers.filterOutGuidance(taggedItems);
  var childTaxons = taxonHelpers.fetchChildTaxons(taxonSlug);

  if ( req.query.section === 'detailed' ) {
    res.render('childcare-and-early-years_detailed', {childTaxons: childTaxons});
  }
  else if ( req.query.section === 'policy' ) {
    res.render('childcare-and-early-years_policy', {childTaxons: childTaxons});
  }
  else if ( req.query.section === 'publications' ) {
    res.render('childcare-and-early-years_publications', {taggedItems: taggedItems, childTaxons: childTaxons});
  }
  else {
    res.render('childcare-and-early-years', {taggedItems: guidanceItemsOnly, childTaxons: childTaxons});
  }
});

router.get('/early-years-settings', function (req, res) {
  var taxonSlug = "3-early-years-settings";

  var taggedItems = taxonHelpers.fetchTaggedItems(taxonSlug);
  var guidanceItemsOnly = taxonHelpers.filterOutGuidance(taggedItems);
  var childTaxons = taxonHelpers.fetchChildTaxons(taxonSlug);

  res.render('early-years-settings', {taggedItems: guidanceItemsOnly, childTaxons: childTaxons});
});

router.get('/childminders', function (req, res) {
  var taxonSlug = "4-childminders";

  var taggedItems = taxonHelpers.fetchTaggedItems(taxonSlug);
  var guidanceItemsOnly = taxonHelpers.filterOutGuidance(taggedItems);

  if ( req.query.section === 'detailed' ) {
    res.render('childminders_detailed');
  }
  else if ( req.query.section === 'policy' ) {
    res.render('childminders_policy');
  }
  else if ( req.query.section === 'publications' ) {
    res.render('childminders_publications', {taggedItems: taggedItems});
  }
  else {
    res.render('childminders', {taggedItems: guidanceItemsOnly});
  }
});
// ****************** Education Routes END ******************

// ****************** Driving Routes BEGIN ******************
router.get('/driving-and-vehicles', function (req, res) {
  var taxonSlug = "driving-and-vehicles";

  var taggedItems = taxonHelpers.fetchTaggedItems(taxonSlug);
  var guidanceItemsOnly = taxonHelpers.filterOutGuidance(taggedItems);
  var childTaxons = taxonHelpers.fetchChildTaxons(taxonSlug);

  res.render('driving-and-vehicles', {taggedItems: guidanceItemsOnly, childTaxons: childTaxons});
});

router.get('/driving-and-vehicle-businesses', function (req, res) {
  var taxonSlug = "driving-and-vehicle-businesses";

  var taggedItems = taxonHelpers.fetchTaggedItems(taxonSlug);
  var guidanceItemsOnly = taxonHelpers.filterOutGuidance(taggedItems);
  var childTaxons = taxonHelpers.fetchChildTaxons(taxonSlug);

  if ( req.query.section === 'detailed' ) {
    res.render('driving-and-vehicle-businesses_detailed', {childTaxons: childTaxons});
  }
  else if ( req.query.section === 'policy' ) {
    res.render('driving-and-vehicle-businesses_policy', {childTaxons: childTaxons});
  }
  else if ( req.query.section === 'publications' ) {
    res.render('driving-and-vehicle-businesses_publications', {taggedItems: taggedItems, childTaxons: childTaxons});
  }
  else {
    res.render('driving-and-vehicle-businesses', {taggedItems: guidanceItemsOnly, childTaxons: childTaxons});
  }
  var taxonSlug = "driving-and-vehicle-businesses";
});
// ****************** Driving Routes END ******************
module.exports = router;