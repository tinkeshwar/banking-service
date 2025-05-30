'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('members', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, field: 'user_id' },
      firstName: { type: Sequelize.STRING, field: 'first_name', allowNull: false },
      middleName: { type: Sequelize.STRING, field: 'middle_name'},
      lastName: { type: Sequelize.STRING, field: 'last_name', allowNull: false },
      guardian: { type: Sequelize.STRING },
      relationWithGuardian: { type: Sequelize.ENUM('Father', 'Mother', 'Spouse'), field: 'relation_with_guardian', allowNull: false },
      dateOfBirth: { type: Sequelize.DATE, field: 'date_of_birth', allowNull: false },
      gender: { type: Sequelize.STRING, allowNull: false },
      maritalStatus: { type: Sequelize.STRING, field: 'marital_status', allowNull: false },
      email: { type: Sequelize.STRING, unique: true, allowNull: false },
      mobile: { type: Sequelize.STRING, unique: true, allowNull: false },
      alternateNumber: { type: Sequelize.STRING, field: 'alternate_number' },
      department: { type: Sequelize.STRING, allowNull: false },
      staffType: { type: Sequelize.STRING, field: 'staff_type', allowNull: false },
      income: { type: Sequelize.DECIMAL(10,2), allowNull: false },
      employmentStatus: { type: Sequelize.ENUM('active', 'retired', 'resigned', 'terminated'), field: 'employment_status', allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false, field: 'created_at' },
      updatedAt: { type: Sequelize.DATE, allowNull: false, field: 'updated_at' },
      deletedAt: { type: Sequelize.DATE, field: 'deleted_at' }
    });

    await queryInterface.addIndex('members', ['user_id'], { name: 'members_user_id_idx' });
    await queryInterface.addIndex('members', ['email'], { name: 'members_email_idx' });
    await queryInterface.addIndex('members', ['mobile'], { name: 'members_mobile_idx' });
    await queryInterface.addIndex('members', ['staff_type'], { name: 'members_staff_type_idx' });
    await queryInterface.addIndex('members', ['employment_status'], { name: 'members_employment_status_idx' });
    await queryInterface.addIndex('members', ['created_at'], { name: 'members_created_at_idx' });  
  },
  async down (queryInterface) {
    await queryInterface.removeConstraint('members', 'members_ibfk_1');
    await queryInterface.removeIndex('members', 'members_created_at_idx');
    await queryInterface.removeIndex('members', 'members_employment_status_idx');
    await queryInterface.removeIndex('members', 'members_staff_type_idx');
    await queryInterface.removeIndex('members', 'members_mobile_idx');
    await queryInterface.removeIndex('members', 'members_email_idx');
    await queryInterface.removeIndex('members', 'members_user_id_idx');
    await queryInterface.dropTable('members');
  }
};
