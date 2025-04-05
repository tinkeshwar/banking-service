'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('account_verifications', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      accountId: { type: Sequelize.INTEGER, field: 'account_id', references: { model: 'accounts', key: 'id' }, allowNull: false },
      aadhaarCard: { type: Sequelize.STRING, field: 'aadhaar_card' },
      panCard: { type: Sequelize.STRING, field: 'pan_card' },
      firstGuarantorId: { type: Sequelize.INTEGER, field: 'first_guarantor_id', references: { model: 'members', key: 'id' } },
      secondGuarantorId: { type: Sequelize.INTEGER, field: 'second_guarantor_id', references: { model: 'members', key: 'id' } },
      kycStatus: { type: Sequelize.ENUM('verified', 'pending', 'rejected', 'scrutiny'), field: 'kyc_status', allowNull: false },
      createdAt: { type: Sequelize.DATE, field: 'created_at', allowNull: false },
      updatedAt: { type: Sequelize.DATE, field: 'updated_at', allowNull: false },
      deletedAt: { type: Sequelize.DATE, field: 'deleted_at' }
    });

    await queryInterface.addIndex('account_verifications', ['account_id'], { name: 'idx_account_verifications_account_id' });
    await queryInterface.addIndex('account_verifications', ['first_guarantor_id'], { name: 'idx_account_verifications_first_guarantor_id' });
    await queryInterface.addIndex('account_verifications', ['second_guarantor_id'], { name: 'idx_account_verifications_second_guarantor_id' });
  },

  async down (queryInterface) {
    await queryInterface.removeConstraint('account_verifications', 'account_verifications_ibfk_1');
    await queryInterface.removeConstraint('account_verifications', 'account_verifications_ibfk_2');
    await queryInterface.removeConstraint('account_verifications', 'account_verifications_ibfk_3');
    await queryInterface.removeIndex('account_verifications', 'idx_account_verifications_account_id');
    await queryInterface.removeIndex('account_verifications', 'idx_account_verifications_first_guarantor_id');
    await queryInterface.removeIndex('account_verifications', 'idx_account_verifications_second_guarantor_id');
    await queryInterface.dropTable('account_verifications');
  }
};
