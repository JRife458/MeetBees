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
     await queryInterface.bulkInsert('Events', [
      {
        venueId: null,
        groupId: 1,
        name: 'Demo Event 1',
        description: 'Demo Description',
        type: 'Online',
        capacity: 200,
        price: 5.99,
        startDate: '05/12/2023',
        endDate: '05/13/2023'
      },
      {
        venueId: 2,
        groupId: 2,
        name: 'Demo Event 2',
        description: 'Demo Description',
        type: 'In Person',
        capacity: 200,
        price: 5.99,
        startDate: '05/12/2023',
        endDate: '05/13/2023'
      },
      {
        venueId: 3,
        groupId: 3,
        name: 'Demo Event 3',
        description: 'Demo Description',
        type: 'In Person',
        capacity: 200,
        price: 5.99,
        startDate: '05/12/2023',
        endDate: '05/13/2023'
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
     await queryInterface.bulkDelete('Events', {
      venueId: [1, 2, 3]
     }, {});
  }
};
