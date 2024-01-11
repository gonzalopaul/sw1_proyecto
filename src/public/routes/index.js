const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Si el usuario no está logeado, se redirige a login
  if (!req.session.user) {
    res.redirect('/home');
  } else {
    // Si el usuario está loggeado, se enseña la lista de chats
    res.render('home', { title: 'Home', user: req.session.user});
  }
});

module.exports = router;
