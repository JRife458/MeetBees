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
     await queryInterface.bulkInsert('Attendances', [
      {
        eventId: 1,
        userId: 1,
        status: 'member'
      },
      {
        eventId: 1,
        userId: 2,
        status: 'member'
      },
      {
        eventId: 1,
        userId: 3,
        status: 'member'
      },
      {
        eventId: 1,
        userId: 4,
        status: 'member'
      },
      {
        eventId: 2,
        userId: 1,
        status: 'member'
      },
      {
        eventId: 2,
        userId: 1,
        status: 'member'
      },
      {
        eventId: 3,
        userId: 3,
        status: 'member'
      },
      {
        eventId: 4,
        userId: 4,
        status: 'member'
      },
      {
        eventId: 5,
        userId: 5,
        status: 'member'
      },
      {
        eventId: 6,
        userId: 6,
        status: 'member'
      },
      {
        eventId: 7,
        userId: 3,
        status: 'member'
      },
      {
        eventId: 7,
        userId: 1,
        status: 'co-host'
      },
      {
        eventId: 7,
        userId: 2,
        status: 'pending'
      },
      {
        eventId: 7,
        userId: 4,
        status: 'pending'
      },
      {
        eventId: 7,
        userId: 5,
        status: 'pending'
      },
      {
        eventId: 7,
        userId: 6,
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
     await queryInterface.bulkDelete('Attendances', {
      userId: [1, 2, 3]
     }, {});
  }
};
