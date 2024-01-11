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
router.post('/', isAdminOrSupplierOrVip, function(req, res, next) {
  req.session.chat = 'group-chat';
  res.redirect('/chat');
});

module.exports = router;
