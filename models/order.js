    // models/order.js
    const { Model, DataTypes } = require('sequelize');

    module.exports = (sequelize) => {
    class Order extends Model {
        static associate(models) {

        // Un pedido pertenece a un usuario
    Order.belongsTo(models.User, { foreignKey: 'userId' });

      // Un pedido puede tener muchos productos
    Order.belongsToMany(models.Product, { through: 'OrderProducts' });
        }
    }

    Order.init({
        document: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        name: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        surname: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        address: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        phone: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Order'
    });

    return Order;
    };
