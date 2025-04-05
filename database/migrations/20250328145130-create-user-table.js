'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      username: { type: Sequelize.STRING, allowNull: false },
      password: { type: Sequelize.STRING, allowNull: false },
      lastLogin: { type: Sequelize.DATE, field: 'last_login' },
      createdAt: { type: Sequelize.DATE, allowNull: false, field: 'created_at' },
      updatedAt: { type: Sequelize.DATE, allowNull: false, field: 'updated_at' },
      deletedAt: { type: Sequelize.DATE, field: 'deleted_at' }
    });
    await queryInterface.addIndex('users',['username'], {unique: true, name: 'users_username_unique'});
    await queryInterface.addIndex('users', ['created_at'], {name: 'users_created_at_idx'});  },

  async down (queryInterface) {
    await queryInterface.removeIndex('users', 'users_created_at_idx');
    await queryInterface.removeIndex('users', 'users_username_unique');
    await queryInterface.dropTable('users');
  }
};
