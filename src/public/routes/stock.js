const express = require('express');
const router = express.Router();
const { Stock } = require('../sequelize');


// Middleware for role check
const isAdminOrSupplier = (req, res, next) => {
    if (req.session.user && (req.session.user.rol === 'admin' || req.session.user.rol === 'supplier')) {
        return next();
    }
    req.session.message = 'Access denied: Admins and Suppliers only';
    return res.redirect('/');
};

// Ruta para mostrar la página con la tabla de productos y el formulario
router.get('/', isAdminOrSupplier, async (req, res) => {
    try {
        // Asegúrate de tener la instancia de Sequelize disponible
        const stocks = await Stock.findAll();


        if (stocks && stocks.length > 0) {
            res.render('stock.ejs', { stocks, user: req.session.user });
        } else {
            res.render('stock.ejs', { stocks: [], message: 'No hay productos en la tabla.', user: req.session.user });
        }
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).send('Error interno del servidor');
    }
});


// Ruta para procesar el formulario y agregar un nuevo producto
router.post('/add', async (req, res) => {
    try {
        const { name, category, quantity } = req.body;
        await Stock.create({ name, category, quantity });
        res.redirect('/stock');
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;
