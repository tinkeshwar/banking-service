'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('nominees', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      accountId: { type: Sequelize.INTEGER, field: 'account_id', allowNull: false, references: { model: 'accounts', key: 'id' } },
      name: { type: Sequelize.STRING, field: 'name' },
      relation: { type: Sequelize.STRING, field: 'relation' },
      dateOfBirth: { type: Sequelize.DATE, field: 'date_of_birth' },
      mobile: { type: Sequelize.STRING, field: 'mobile' },
      share: { type: Sequelize.DECIMAL(10, 2), field: 'share', allowNull: true },
      createdAt: { type: Sequelize.DATE, field: 'created_at' },
      updatedAt: { type: Sequelize.DATE, field: 'updated_at' },
      deletedAt: { type: Sequelize.DATE, field: 'deleted_at' }
    });

    await queryInterface.addIndex('nominees', ['account_id'], { name: 'nominees_account_id_idx' });
    await queryInterface.addIndex('nominees', ['created_at'], { name: 'nominees_created_at_idx' });
  },

  async down (queryInterface) {
    await queryInterface.removeConstraint('nominees', 'nominees_ibfk_1');
    await queryInterface.removeIndex('nominees', 'nominees_created_at_idx');
    await queryInterface.removeIndex('nominees', 'nominees_account_id_idx');
    await queryInterface.dropTable('nominees');
  }
};
