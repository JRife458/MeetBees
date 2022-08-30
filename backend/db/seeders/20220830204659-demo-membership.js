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
        groupId: 2,
        status: 'member'
       },
       {
        userId: 3,
        groupId: 3,
        status: 'pending'
      }

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
