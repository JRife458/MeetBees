'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Memberships', [
       {
        userId: 1,
        groupId: 1,
        status: 'cohost'
       },
       {
        userId: 2,
        groupId: 1,
        status: 'member'
       },
       {
        userId: 3,
        groupId: 1,
        status: 'member'
       },
       {
        userId: 2,
        groupId: 2,
        status: 'member'
       },
       {
        userId: 3,
        groupId: 2,
        status: 'member'
       },
       {
        userId: 3,
        groupId: 3,
        status: 'member'
      },
      {
        userId: 2,
        groupId: 4,
        status: 'member'
       },
       {
        userId: 2,
        groupId: 5,
        status: 'member'
       },
       {
        userId: 2,
        groupId: 6,
        status: 'member'
       },
       {
        userId: 2,
        groupId: 7,
        status: 'member'
       },
       {
        userId: 2,
        groupId: 8,
        status: 'member'
       },
       {
        userId: 7,
        groupId: 1,
        status: 'cohost'
       },
       {
        userId: 4,
        groupId: 4,
        status: 'cohost'
       },
       {
        userId: 5,
        groupId: 5,
        status: 'cohost'
       },
       {
        userId: 6,
        groupId: 6,
        status: 'cohost'
       },
       {
        userId: 1,
        groupId: 7,
        status: 'cohost'
       },
       {
        userId: 3,
        groupId: 7,
        status: 'pending'
       },
       {
        userId: 4,
        groupId: 7,
        status: 'pending'
       },
       {
        userId: 5,
        groupId: 7,
        status: 'pending'
       },
       {
        userId: 6,
        groupId: 7,
        status: 'pending'
       },
       {
        userId: 7,
        groupId: 7,
        status: 'pending'
       },

      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Memberships', {
      userId: [1, 2, 3]
     }, {});
  }
};
