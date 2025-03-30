'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    const adminUser = await queryInterface.bulkInsert('users', [{
      username: 'admin',
      password: '$2a$12$IFLKKn9SOumfvf0txlawou4tmMQIjZyHpR5H.mRjUfMpBI//3HGJi', // 'admin'
      created_at: new Date(),
      updated_at: new Date()
    }], { returning: true });
    
    await queryInterface.bulkInsert('user_profiles', [{
      user_id: adminUser,
      user_type: 'admin',
      first_name: 'Admin',
      last_name: 'User',
      email: 'admin@example.com',
      mobile: '1234567890',
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('user_profiles', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
