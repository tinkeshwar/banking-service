'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('member_addresses', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      memberId: { type: Sequelize.INTEGER, allowNull: false, field: 'member_id', references: { model: 'members', key: 'id' } },
      addressType: { type: Sequelize.ENUM('local', 'current', 'permanent'), allowNull: false, field: 'address_type' },
      line1: { type: Sequelize.STRING, allowNull: false },
      line2: { type: Sequelize.STRING },
      city: { type: Sequelize.STRING, allowNull: false },
      state: { type: Sequelize.STRING, allowNull: false },
      country: { type: Sequelize.STRING, allowNull: false },
      postalCode: { type: Sequelize.STRING, allowNull: false, field: 'postal_code' },
      createdAt: { type: Sequelize.DATE, allowNull: false, field: 'created_at' },
      updatedAt: { type: Sequelize.DATE, allowNull: false, field: 'updated_at' },
      deletedAt: { type: Sequelize.DATE, field: 'deleted_at' }
    });

    await queryInterface.addIndex('member_addresses', ['member_id'], { name: 'member_addresses_member_id_idx' });
    await queryInterface.addIndex('member_addresses', ['address_type'], { name: 'member_addresses_address_type_idx' });
    await queryInterface.addIndex('member_addresses', ['city'], { name: 'member_addresses_city_idx' });
    await queryInterface.addIndex('member_addresses', ['postal_code'], { name: 'member_addresses_postal_code_idx' });
    await queryInterface.addIndex('member_addresses', ['created_at'], { name: 'member_addresses_created_at_idx' });  },

  async down (queryInterface) {
    await queryInterface.removeConstraint('member_addresses', 'member_addresses_ibfk_1');
    await queryInterface.removeIndex('member_addresses', 'member_addresses_created_at_idx');
    await queryInterface.removeIndex('member_addresses', 'member_addresses_postal_code_idx');
    await queryInterface.removeIndex('member_addresses', 'member_addresses_city_idx');
    await queryInterface.removeIndex('member_addresses', 'member_addresses_address_type_idx');
    await queryInterface.removeIndex('member_addresses', 'member_addresses_member_id_idx');
    await queryInterface.dropTable('member_addresses');
  }
};
