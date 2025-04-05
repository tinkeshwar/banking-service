'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('account_transactions', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      accountId: { type: Sequelize.INTEGER, allowNull: false, field: 'account_id', references: { model: 'accounts', key: 'id' } },
      transactionType: { type: Sequelize.ENUM('credit', 'debit'), allowNull: false, field: 'transaction_type' },
      transactionAmount: { type: Sequelize.DECIMAL(10,2), allowNull: false, field: 'transaction_amount' },
      transactionMode: { type: Sequelize.ENUM('cash', 'transfer', 'cheque'), allowNull: false, field: 'transaction_mode' },
      transactionReference: { type: Sequelize.TEXT, field: 'transaction_reference' },
      balanceBeforeTransaction: { type: Sequelize.DECIMAL(10,2), allowNull: false, field: 'balance_before_transaction' },
      balanceAfterTransaction: { type: Sequelize.DECIMAL(10,2), allowNull: false, field: 'balance_after_transaction' },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
      deletedAt: { type: Sequelize.DATE },
      createdBy: { type: Sequelize.INTEGER, allowNull: false, field: 'created_by', references: { model: 'users', key: 'id' } }
    });

    await queryInterface.addIndex('account_transactions', ['account_id'], { name: 'account_transactions_account_id_idx' });
    await queryInterface.addIndex('account_transactions', ['created_by'], { name: 'account_transactions_created_by_idx' });
    await queryInterface.addIndex('account_transactions', ['transaction_type'], { name: 'account_transactions_type_idx' });
    await queryInterface.addIndex('account_transactions', ['transaction_mode'], { name: 'account_transactions_mode_idx' });
  },

  async down (queryInterface) {
    await queryInterface.removeConstraint('account_transactions', 'account_transactions_ibfk_1');
    await queryInterface.removeConstraint('account_transactions', 'account_transactions_ibfk_2');
    await queryInterface.removeIndex('account_transactions', 'account_transactions_account_id_idx');
    await queryInterface.removeIndex('account_transactions', 'account_transactions_created_by_idx');
    await queryInterface.removeIndex('account_transactions', 'account_transactions_type_idx');
    await queryInterface.removeIndex('account_transactions', 'account_transactions_mode_idx');
    await queryInterface.dropTable('account_transactions');
  }
};
