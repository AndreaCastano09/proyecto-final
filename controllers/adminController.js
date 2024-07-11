    const Category = require('../models/category');
    const Product = require('../models/product');
    const Order = require('../models/order');
    const User = require('../models/user');
    const Joi = require('joi');

// Categorías
exports.getCategories = async (req, res) => {
    const categories = await Category.findAll();
    res.render('admin/categories', { categories });
};

exports.createCategory = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        await Category.create(req.body);
        res.redirect('/admin/categories');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.updateCategory = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        await Category.update(req.body, { where: { id: req.params.id } });
        res.redirect('/admin/categories');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        await Category.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/categories');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Productos
exports.getProducts = async (req, res) => {
    const products = await Product.findAll();
    res.render('admin/products', { products });
};

exports.createProduct = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        categoryId: Joi.number().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        await Product.create(req.body);
        res.redirect('/admin/products');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.updateProduct = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        categoryId: Joi.number().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        await Product.update(req.body, { where: { id: req.params.id } });
        res.redirect('/admin/products');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/products');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Órdenes
exports.getOrders = async (req, res) => {
    const orders = await Order.findAll();
    res.render('admin/orders', { orders });
};

// Usuarios
exports.getUsers = async (req, res) => {
    const users = await User.findAll();
    res.render('admin/users', { users });
};

exports.createUser = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({ ...req.body, password: hashedPassword });
        res.redirect('/admin/users');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.updateUser = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.update({ ...req.body, password: hashedPassword }, { where: { id: req.params.id } });
        res.redirect('/admin/users');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/users');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};


    // Similarmente se crean los métodos para productos, órdenes y usuarios

    // Método de autenticación
    exports.isAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    };
