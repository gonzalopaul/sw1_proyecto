const express = require('express');
const router = express.Router();


const isAdminOrSupplierOrVip = (req, res, next) => {
  if (req.session.user && (req.session.user.rol === 'admin' || req.session.user.rol === 'supplier' || req.session.user.rol === 'vipuser' )) {
      return next();
  }
  req.session.message = 'Access denied: Admins, Suppliers and VIP only';
  return res.redirect('/');
};

/* GET home page. */
router.get('/', isAdminOrSupplierOrVip, function(req, res, next) {
  // Se crea una página para el chat seleccionado
  res.render('chat',{ title: `Chat: ${req.session.chat}`, chat: req.session.chat, user: req.session.user.username });
});

module.exports = router;