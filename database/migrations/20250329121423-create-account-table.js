'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('accounts', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      memberId: { type: Sequelize.INTEGER, field: 'member_id', allowNull: false, references: { model: 'members', key: 'id' } },
      accountType: { type: Sequelize.ENUM('saving', 'loan', 'current', 'fixed', 'recurring'), field: 'account_type' },
      accountStatus: { type: Sequelize.ENUM('active', 'freeze', 'closed', 'scrutiny', 'pending'), defaultValue: 'pending', field: 'account_status' },
      lastBalance: { type: Sequelize.DECIMAL(10, 2), field: 'last_balance', defaultValue: 0.00 },
      currentBalance: { type: Sequelize.DECIMAL(10, 2), field: 'current_balance', defaultValue: 0.00 },
      createdAt: { type: Sequelize.DATE, field: 'created_at' },
      updatedAt: { type: Sequelize.DATE, field: 'updated_at' },
      deletedAt: { type: Sequelize.DATE, field: 'deleted_at', allowNull: true }    
    });

    await queryInterface.addIndex('accounts', ['member_id'], { name: 'idx_accounts_member_id' });
    await queryInterface.addIndex('accounts', ['account_type'], { name: 'idx_accounts_account_type' });
    await queryInterface.addIndex('accounts', ['account_status'], { name: 'idx_accounts_account_status' });
    await queryInterface.addIndex('accounts', ['created_at'], { name: 'idx_accounts_created_at' });
  },

  async down (queryInterface) {
    await queryInterface.removeConstraint('accounts', 'accounts_ibfk_1');
    await queryInterface.removeIndex('accounts', 'idx_accounts_created_at');
    await queryInterface.removeIndex('accounts', 'idx_accounts_account_status');
    await queryInterface.removeIndex('accounts', 'idx_accounts_account_type');
    await queryInterface.removeIndex('accounts', 'idx_accounts_member_id');
    await queryInterface.dropTable('accounts');
  }
};
