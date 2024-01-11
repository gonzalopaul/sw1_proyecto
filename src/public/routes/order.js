// order.routes.js
const express = require('express');
const router = express.Router();
const { Order, Stock, User } = require('../sequelize');

// Middleware for role check
const isAdminOrUser = (req, res, next) => {
    if (req.session.user && (req.session.user.rol === 'admin' || req.session.user.rol === 'user') || req.session.user.rol === 'vipuser') {
        return next();
    }
    req.session.message = 'Access denied: Admins and Suppliers only';
    return res.redirect('/');
};


// Middleware de autenticación, ajusta según tu implementación
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
};

// Ruta para mostrar la página de pedidos
router.get('/', isAdminOrUser, async (req, res) => {
    try {
        // Obtener el ID del usuario autenticado
        const userId = req.session.userid;
        
        // Obtener los pedidos del usuario actual
        const orders = await Order.findAll({
            where: { user_id: userId.id },
            include: [
                { model: Stock },
                { model: User }
            ],
        });

        // Obtener la lista de productos disponibles para el formulario de pedido
        const availableProducts = await Stock.findAll();

        res.render('order.ejs', { orders, availableProducts ,user: req.session.user, id: req.session.userid});
    } catch (error) {
        console.error('Error al obtener los pedidos:', error);
        res.status(500).send('Error interno del servidor');
    }
});


// Ruta para manejar la creación de pedidos
router.post('/', isAuthenticated, async (req, res) => {
    try {
        const userId = req.session.userid;


        const { productName, quantity } = req.body;

        // Obtener el producto seleccionado por su nombre
        const selectedProduct = await Stock.findOne({
            where: { name: productName },
        });
        console.log(selectedProduct);
        console.log(userId.id);
        console.log(selectedProduct.dataValues.id);
        console.log(parseInt(quantity));

        if (!selectedProduct) {
            res.status(400).send('Producto no encontrado');
            return;
        }

        // Crear un nuevo pedido
        const newOrder = await Order.create({
            user_id: userId.id,
            product_id: selectedProduct.dataValues.id,
            quantity: parseInt(quantity),
            fecha: new Date(),
        });

        res.redirect('/order');
    } catch (error) {
        console.error('Error al realizar el pedido:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;
