'use strict';

const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const SALT_ROUNDS = 12;
    
    // Hash passwords
    const adminPassword = await bcrypt.hash('Admin@123', SALT_ROUNDS);
    const userPassword = await bcrypt.hash('User@123', SALT_ROUNDS);

    const users = [
      {
        id: uuidv4(),
        email: 'admin@admin.com',
        password: adminPassword,
        firstName: 'Admin',
        lastName: 'User',
        phoneNumber: '+1234567890',
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        email: 'user@user.com',
        password: userPassword,
        firstName: 'Regular',
        lastName: 'User',
        phoneNumber: '+0987654321',
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: ['admin@admin.com', 'user@user.com']
    }, {});
  }
}; 