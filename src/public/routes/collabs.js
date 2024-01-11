const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('collabs', {user:req.session.user});
});

module.exports = router;