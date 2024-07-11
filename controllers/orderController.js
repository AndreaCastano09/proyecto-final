const Joi = require('joi');
const Order = require('../models/order');
const Product = require('../models/product');

// Obtener el carrito de compras (puedes modificar la lógica según tus necesidades)
exports.getShoppingCart = async (req, res) => {
    try {
      let products = await Order.findAll(); // Obtén los productos desde la base de datos
      res.render('shopping-cart', { products }); // Pasa los productos a la vista
    } catch (error) {
    res.status(500).send(error.message);
    }
};


// Obtener todas las órdenes
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.render('admin/orders', { orders });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Crear una nueva orden
exports.createOrder = async (req, res) => {
    const schema = Joi.object({
        document: Joi.string().required(),
        name: Joi.string().required(),
        surname: Joi.string().required(),
        address: Joi.string().required(),
        phone: Joi.string().required(),
        // Suponiendo que los productos se envían como un array de IDs
        products: Joi.array().items(Joi.number().integer()).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const { document, name, surname, address, phone, products } = req.body;
        
        // Aquí deberías manejar la lógica para calcular el precio total de la orden, crear la orden, etc.
        const newOrder = await Order.create({
            document,
            name,
            surname,
            address,
            phone,
            // Suponiendo que se guarda como un JSON string, puedes cambiar esto según tu modelo
            products: JSON.stringify(products),
        });

        res.redirect('/shopping-cart');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Obtener una orden por su ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).send('Order not found');
        }
        res.render('admin/orderDetail', { order });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Actualizar una orden
exports.updateOrder = async (req, res) => {
    const schema = Joi.object({
        document: Joi.string().required(),
        name: Joi.string().required(),
        surname: Joi.string().required(),
        address: Joi.string().required(),
        phone: Joi.string().required(),
        products: Joi.array().items(Joi.number().integer()).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const { document, name, surname, address, phone, products } = req.body;

        await Order.update({
            document,
            name,
            surname,
            address,
            phone,
            products: JSON.stringify(products),
        }, {
            where: { id: req.params.id }
        });

        res.redirect('/admin/orders');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Eliminar una orden
exports.deleteOrder = async (req, res) => {
    try {
        await Order.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/orders');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
