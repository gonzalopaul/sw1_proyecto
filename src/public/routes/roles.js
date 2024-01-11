const express = require('express');
const router = express.Router();
const { User } = require('../sequelize');

// Middleware for admin check
const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.rol === 'admin') {
        return next();
    }
    req.session.message = 'Access denied: Admins only';
    return res.redirect('/');
};

// Route to display the roles page
router.get('/', isAdmin, async (req, res) => {
    try {
        const users = await User.findAll();
        res.render('roles', { users, user: req.session.user });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to update user roles
router.post('/update', isAdmin, async (req, res) => {
    try {
        const { userId, newRole } = req.body;
        await User.update({ rol: newRole }, { where: { id: userId } });
        res.redirect('/roles');
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;