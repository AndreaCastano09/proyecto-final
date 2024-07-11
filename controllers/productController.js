const Product = require('../models/product');
const Category = require('../models/category');
const Joi = require('joi');

exports.getAllProducts = async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: [Product]
        });
        res.render('index', { categories });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.getShoppingCart = async (req, res) => {
    try {
      let products = await Product.findAll(); // Obtén los productos desde la base de datos
      res.render('shopping-cart', { products }); // Pasa los productos a la vista
    } catch (error) {
    res.status(500).send(error.message);
    }
};

exports.addToCart = (req, res) => {
    const schema = Joi.object({
        document: Joi.string().required(),
        name: Joi.string().required(),
        surname: Joi.string().required(),
        address: Joi.string().required(),
        phone: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Aquí iría la lógica para añadir el producto al carrito

    res.redirect('/shopping-cart');
};
