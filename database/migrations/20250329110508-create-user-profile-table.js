'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_profiles', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, field: 'user_id' },
      userType: { type: Sequelize.ENUM('admin', 'employee', 'consumer'), allowNull: false, defaultValue: 'employee', field: 'user_type' },
      firstName: { type: Sequelize.STRING, allowNull: false, field: 'first_name' },
      middleName: { type: Sequelize.STRING, field: 'middle_name' },
      lastName: { type: Sequelize.STRING, allowNull: false, field: 'last_name' },
      email: { type: Sequelize.STRING, field: 'email' },
      mobile: { type: Sequelize.STRING, allowNull: false, field: 'mobile' },
      profileStatus: { type: Sequelize.ENUM('active', 'inactive', 'pending'), allowNull: false, defaultValue: 'active', field: 'profile_status' },
      createdAt: { type: Sequelize.DATE, allowNull: false, field: 'created_at' },
      updatedAt: { type: Sequelize.DATE, allowNull: false, field: 'updated_at' },
      deletedAt: { type: Sequelize.DATE, field: 'deleted_at' }
    });

    await queryInterface.addIndex('user_profiles', ['user_id'], { name: 'user_profiles_user_id_index' });
    await queryInterface.addIndex('user_profiles', ['user_type'], { name: 'user_profiles_user_type_index' });
    await queryInterface.addIndex('user_profiles', ['email'], { name: 'user_profiles_email_index' });
    await queryInterface.addIndex('user_profiles', ['mobile'], { name: 'user_profiles_mobile_index' });
    await queryInterface.addIndex('user_profiles', ['profile_status'], { name: 'user_profiles_profile_status_index' });
    await queryInterface.addIndex('user_profiles', ['created_at'], { name: 'user_profiles_created_at_index' });
  },

  async down (queryInterface) {
    await queryInterface.removeConstraint('user_profiles', 'user_profiles_ibfk_1');
    await queryInterface.removeIndex('user_profiles', 'user_profiles_created_at_index');
    await queryInterface.removeIndex('user_profiles', 'user_profiles_profile_status_index');
    await queryInterface.removeIndex('user_profiles', 'user_profiles_mobile_index');
    await queryInterface.removeIndex('user_profiles', 'user_profiles_email_index');
    await queryInterface.removeIndex('user_profiles', 'user_profiles_user_type_index');
    await queryInterface.removeIndex('user_profiles', 'user_profiles_user_id_index');
    await queryInterface.dropTable('user_profiles');
  }
};
