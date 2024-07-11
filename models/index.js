        const fs = require('fs');
        const path = require('path');
        const Sequelize = require('sequelize');
        const sequelize = require('../config/database');
        const basename = path.basename(__filename);
        const env = process.env.NODE_ENV || 'development';
        const config = require(__dirname + '/../config/config.json')[env]
        // Definir el objeto db
        const db = {};

        // Importar modelos
        const User = require('./user');
        const Product = require('./product');
        const Category = require('./category');
        const Order = require('./order');


        db.Sequelize = Sequelize;
        db.sequelize = sequelize;

        // Definir el objeto db


        // Asignar modelos al objeto db
        db.User = User(sequelize, Sequelize.DataTypes);
        db.Product = Product(sequelize, Sequelize.DataTypes);
        db.Category = Category(sequelize, Sequelize.DataTypes);
        db.Order = Order(sequelize, Sequelize.DataTypes);


        // Asignar asociaciones si existen
        Object.values(db)
        .filter(model => typeof model.associate === 'function')
        .forEach(model => model.associate(db));

        module.exports = db;
