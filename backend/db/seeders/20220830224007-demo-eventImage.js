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
     await queryInterface.bulkInsert('EventImages', [
      {
        eventId: 1,
        url: 'demo url',
        preview: true
      },
      {
        eventId: 2,
        url: 'demo url',
        preview: true
      },
      {
        eventId: 3,
        url: 'demo url',
        preview: false
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
  }
};
