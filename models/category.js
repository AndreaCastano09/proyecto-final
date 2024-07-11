    const { Model, DataTypes } = require('sequelize');
    const sequelize = require('../config/database');

    module.exports = (sequelize) => {
        class Category extends Model {
        static associate(models) {
            Category.belongsToMany(models.Product, {
            through: 'CategoryProduct',
                as: 'Products',
                foreignKey: 'categoryId'
            });
        }
        }
        
    Category.init({
        name: {
        type: DataTypes.STRING,
        allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Category'
    });

    return Category;
    };
