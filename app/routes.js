var express = require('express');
var router = express.Router();

// Example:
// router.get('/examples/template-data', function (req, res) {
//   res.render('examples/template-data', { 'name' : 'Foo' });
// });

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/education', function (req, res) {
  res.render('education');
});

router.get('/childcare-and-early-years', function (req, res) {
  if ( req.query.section === 'detailed' ) {
    res.render('childcare-and-early-years_detailed');
  }
  else if ( req.query.section === 'policy' ) {
    res.render('childcare-and-early-years_policy');
  }
  else if ( req.query.section === 'publications' ) {
    res.render('childcare-and-early-years_publications');
  }
  else {
    res.render('childcare-and-early-years');
  }
});

router.get('/early-years-settings', function (req, res) {
  res.render('early-years-settings');
});

router.get('/childminders', function (req, res) {
  if ( req.query.section === 'detailed' ) {
    res.render('childminders_detailed');
  }
  else if ( req.query.section === 'policy' ) {
    res.render('childminders_policy');
  }
  else if ( req.query.section === 'publications' ) {
    res.render('childminders_publications');
  }
  else {
    res.render('childminders');
  }
});
// add your routes here

module.exports = router;