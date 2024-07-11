'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Products', // nombre de la tabla
      'categoryId', // nombre de la nueva columna
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Categories', // nombre de la tabla relacionada
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'categoryId');
  }
};
