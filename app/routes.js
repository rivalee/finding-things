var express = require('express');
var router = express.Router();
var request = require('sync-request');

// ****************** Helper Functions ******************
var baseUrls= {
  dev:  "http://content-store.dev.gov.uk/",
  prod: "https://www.gov.uk/",
}

// Set this to one of the baseUrls above to change source of data for fetch
// functions below.
var hostName = baseUrls.prod;

// Retrieve content items tagged to a specific taxon.
var fetchTaggedItems = function (taxonSlug) {
  endpoint = hostName + "api/incoming-links/alpha-taxonomy/" + taxonSlug + "?types[]=alpha_taxons";
  console.log("Fetching documents via: " + endpoint);
  var result = request('GET', endpoint);
  return JSON.parse(result.getBody('utf8')).alpha_taxons;
}

// Retrieve array containing title and modified slug of all child taxons.
var fetchChildTaxons = function (taxonSlug) {
  var childrenEndpoint = hostName + "api/incoming-links/alpha-taxonomy/" + taxonSlug + "?types[]=parent" + "&" + (new Date).getTime();
  console.log("Fetching children of " + childrenEndpoint);
  childTaxons = JSON.parse(
    request('GET', childrenEndpoint).getBody('utf8')
  ).parent;

  childTaxons = childTaxons.map( function (taxon) {
    return {
      // Strip any leading digits indicating the taxon 'level'
      title: taxon.title.replace(/^\d - /, ''),
      //  Convert the content store slug into one that's suitable for linking to pages within the prototype
      localHref: taxon.base_path.replace(/^\/alpha-taxonomy\//, '').replace(/^\d-/, '')
    }
  });

  return childTaxons;
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
  var taxonSlug = "education";

  var taggedItems = fetchTaggedItems(taxonSlug);
  var guidanceItemsOnly = filterOutGuidance(taggedItems);
  var childTaxons = fetchChildTaxons(taxonSlug);

  res.render('education', {taggedItems: guidanceItemsOnly, childTaxons: childTaxons});
});

router.get('/childcare-and-early-years', function (req, res) {
  var taxonSlug = "2-childcare-and-early-years";

  var taggedItems = fetchTaggedItems(taxonSlug);
  var guidanceItemsOnly = filterOutGuidance(taggedItems);
  var childTaxons = fetchChildTaxons(taxonSlug);

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

  var taggedItems = fetchTaggedItems(taxonSlug);
  var guidanceItemsOnly = filterOutGuidance(taggedItems);
  var childTaxons = fetchChildTaxons(taxonSlug);

  res.render('early-years-settings', {taggedItems: guidanceItemsOnly, childTaxons: childTaxons});
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