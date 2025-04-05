'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('account_details', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      accountId: { type: Sequelize.INTEGER, references: { model: 'accounts', key: 'id' }, field: 'account_id', allowNull: false },
      interestRate: { type: Sequelize.DECIMAL(10,2), field: 'interest_rate' },
      interestCalculation: { type: Sequelize.ENUM('monthly', 'quarterly', 'yearly'), field: 'interest_calculation' },
      principalAmount: { type: Sequelize.DECIMAL(10,2), field: 'principal_amount' },
      installments: { type: Sequelize.INTEGER },
      installmentAmount: { type: Sequelize.DECIMAL(10,2), field: 'installment_amount' },
      paymentMode: { type: Sequelize.ENUM('cash', 'transfer', 'cheques'), field: 'payment_mode', allowNull: false },
      paymentReceipt: { type: Sequelize.STRING, field: 'payment_receipt' },
      createdAt: { type: Sequelize.DATE, field: 'created_at', allowNull: false },
      updatedAt: { type: Sequelize.DATE, field: 'updated_at', allowNull: false },
      deletedAt: { type: Sequelize.DATE, field: 'deleted_at' }
    });

    await queryInterface.addIndex('account_details', ['account_id'], { name: 'account_details_account_id_idx' });
    await queryInterface.addIndex('account_details', ['payment_mode'], { name: 'account_details_payment_mode_idx' });
  },

  async down (queryInterface) {
    await queryInterface.removeConstraint('account_details', 'account_details_ibfk_1');
    await queryInterface.removeIndex('account_details', 'account_details_account_id_idx');
    await queryInterface.removeIndex('account_details', 'account_details_payment_mode_idx');
    await queryInterface.dropTable('account_details');
  }
};
