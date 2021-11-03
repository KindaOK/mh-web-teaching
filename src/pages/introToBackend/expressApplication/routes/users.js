var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:name/', function(req, res, next) {
  const name = req.params.name ?? "blank";
  res.json({key: "value", number: 1, name: name});
});

// the more specific route will run if possible
router.get('/Someone/', function(req, res, next) {
  res.json({name: "Someone", id: 1});
});

module.exports = router;
