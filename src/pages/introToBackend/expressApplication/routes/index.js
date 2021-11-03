var express = require('express');
var router = express.Router();

/* GET home page. */
//matches routes like /,  /?username=Some%20Name, and /?username=name
router.get('/', function(req, res, next) {
  const username = req.query.username;
  res.render('index', { title: username });
});

router.get('/default/', function(req, res, next) {
  res.render('index', { title: "Default Name" });
});

module.exports = router;
