var express = require('express');
var router = express.Router();
var request = require('sync-request');

// ****************** Helper Functions ******************
// Retrieve content items tagged to a specific taxon.
var fetchTaggedItems = function (taxonSlug) {
  endpoint = "https://www.gov.uk/api/incoming-links/alpha-taxonomy/" + taxonSlug + "?types[]=alpha_taxons";
  console.log("Fetching documents via: " + endpoint);
  var result = request('GET', endpoint);
  return JSON.parse(result.getBody('utf8')).alpha_taxons;
}

// Given an array of content items, return only those with path that begins with
// '/guidance/'.
var filterOutGuidance = function (contentItems) {
  filtered = contentItems.filter( function (contentItem) {
    regexp = /^\/guidance/;
    if ( contentItem.base_path.match(regexp) ) {
      return true;
    } else {
      return false;
    }
  });

  return filtered;
}

// ****************** Prototype Routes ******************
router.get('/', function (req, res) {
  res.render('index');
});

router.get('/education', function (req, res) {
  var taggedItems = fetchTaggedItems("education");
  var guidanceItemsOnly = filterOutGuidance(taggedItems);

  res.render('education', {taggedItems: guidanceItemsOnly});
});

router.get('/childcare-and-early-years', function (req, res) {
  var taggedItems = fetchTaggedItems("2-childcare-and-early-years");
  var guidanceItemsOnly = filterOutGuidance(taggedItems);

  if ( req.query.section === 'detailed' ) {
    res.render('childcare-and-early-years_detailed');
  }
  else if ( req.query.section === 'policy' ) {
    res.render('childcare-and-early-years_policy');
  }
  else if ( req.query.section === 'publications' ) {
    res.render('childcare-and-early-years_publications', {taggedItems: taggedItems});
  }
  else {
    res.render('childcare-and-early-years', {taggedItems: guidanceItemsOnly});
  }
});

router.get('/early-years-settings', function (req, res) {
  var taggedItems = fetchTaggedItems("3-early-years-settings");
  var guidanceItemsOnly = filterOutGuidance(taggedItems);

  res.render('early-years-settings', {taggedItems: guidanceItemsOnly});
});

router.get('/childminders', function (req, res) {
  var taggedItems = fetchTaggedItems("4-childminders");
  var guidanceItemsOnly = filterOutGuidance(taggedItems);

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

module.exports = router;