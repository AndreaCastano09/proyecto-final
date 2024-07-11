    // models/user.js
    const { Model, DataTypes } = require('sequelize');

    module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
        // Definir asociaciones aquí
        // Un usuario tiene muchos pedidos
    User.hasMany(models.Order, { foreignKey: 'userId' });
        }
    }
    
    User.init({
        username: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        email: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        password: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'User'
    });

    return User;
    };
