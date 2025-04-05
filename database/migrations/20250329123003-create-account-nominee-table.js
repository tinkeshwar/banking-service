'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('account_nominees', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      accountId: { type: Sequelize.INTEGER, field: 'account_id', allowNull: false, references: { model: 'accounts', key: 'id' } },
      name: { type: Sequelize.STRING, field: 'name', allowNull: false },
      relation: { type: Sequelize.STRING, field: 'relation', allowNull: false },
      dateOfBirth: { type: Sequelize.DATE, field: 'date_of_birth', allowNull: false },
      mobile: { type: Sequelize.STRING, field: 'mobile', allowNull: false },
      share: { type: Sequelize.DECIMAL(10, 2), field: 'share' },
      createdAt: { type: Sequelize.DATE, field: 'created_at', allowNull: false },
      updatedAt: { type: Sequelize.DATE, field: 'updated_at', allowNull: false },
      deletedAt: { type: Sequelize.DATE, field: 'deleted_at' }
    });

    await queryInterface.addIndex('account_nominees', ['account_id'], { name: 'account_nominees_account_id_idx' });
    await queryInterface.addIndex('account_nominees', ['created_at'], { name: 'account_nominees_created_at_idx' });
  },

  async down (queryInterface) {
    await queryInterface.removeConstraint('account_nominees', 'account_nominees_ibfk_1');
    await queryInterface.removeIndex('account_nominees', 'account_nominees_created_at_idx');
    await queryInterface.removeIndex('account_nominees', 'account_nominees_account_id_idx');
    await queryInterface.dropTable('account_nominees');
  }
};
