    const { Model, DataTypes } = require('sequelize');

    module.exports = (sequelize) => {
        class Product extends Model {
        static associate(models) {
            Product.belongsToMany(models.Category, {
            through: 'CategoryProduct',
                as: 'Categories',
                foreignKey: 'productId'
            });
        }
    }

    Product.init({
        name: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        },
        stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Product'
    });

    return Product;
    };
