'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('addresses', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      memberId: { type: Sequelize.INTEGER, allowNull: false, field: 'member_id', references: { model: 'members', key: 'id' } },
      addressType: { type: Sequelize.ENUM('local', 'current', 'permanent'), allowNull: false, field: 'address_type' },
      line1: { type: Sequelize.STRING, allowNull: false },
      line2: { type: Sequelize.STRING, allowNull: true },
      city: { type: Sequelize.STRING, allowNull: false },
      state: { type: Sequelize.STRING, allowNull: false },
      country: { type: Sequelize.STRING, allowNull: false },
      postalCode: { type: Sequelize.STRING, allowNull: false, field: 'postal_code' },
      createdAt: { type: Sequelize.DATE, allowNull: false, field: 'created_at' },
      updatedAt: { type: Sequelize.DATE, allowNull: false, field: 'updated_at' },
      deletedAt: { type: Sequelize.DATE, allowNull: true, field: 'deleted_at' }
    });

    await queryInterface.addIndex('addresses', ['member_id'], { name: 'addresses_member_id_idx' });
    await queryInterface.addIndex('addresses', ['address_type'], { name: 'addresses_address_type_idx' });
    await queryInterface.addIndex('addresses', ['city'], { name: 'addresses_city_idx' });
    await queryInterface.addIndex('addresses', ['postal_code'], { name: 'addresses_postal_code_idx' });
    await queryInterface.addIndex('addresses', ['created_at'], { name: 'addresses_created_at_idx' });  },

  async down (queryInterface) {
    await queryInterface.removeConstraint('addresses', 'addresses_ibfk_1');
    await queryInterface.removeIndex('addresses', 'addresses_created_at_idx');
    await queryInterface.removeIndex('addresses', 'addresses_postal_code_idx');
    await queryInterface.removeIndex('addresses', 'addresses_city_idx');
    await queryInterface.removeIndex('addresses', 'addresses_address_type_idx');
    await queryInterface.removeIndex('addresses', 'addresses_member_id_idx');
    await queryInterface.dropTable('addresses');
  }
};
