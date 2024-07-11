const { Category, Product } = require('../models');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: [{
                model: Product,
                as: 'Products'
            }]
        });
        res.json(categories);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
