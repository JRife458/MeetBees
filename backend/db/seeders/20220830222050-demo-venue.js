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
     await queryInterface.bulkInsert('Venues', [
       {
        groupId: 1,
        address: '123 Demo Drive',
        city: 'Scrumville',
        state: 'SV',
        lat: '60.3555',
        lng: '100.333333'
       },
       {
        groupId: 2,
        address: '123 Demo Drive',
        city: 'Scrumville',
        state: 'SV',
        lat: '60.3555',
        lng: '100.333333'
       },
       {
        groupId: 3,
        address: '123 Demo Drive',
        city: 'Scrumville',
        state: 'SV',
        lat: '60.3555',
        lng: '100.333333'
       },
       {
        groupId: 4,
        address: '123 Demo Drive',
        city: 'Scrumville',
        state: 'SV',
        lat: '60.3555',
        lng: '100.333333'
       },
       {
        groupId: 5,
        address: '123 Demo Drive',
        city: 'Scrumville',
        state: 'SV',
        lat: '60.3555',
        lng: '100.333333'
       },
       {
        groupId: 6,
        address: '123 Demo Drive',
        city: 'Scrumville',
        state: 'SV',
        lat: '60.3555',
        lng: '100.333333'
       },
       {
        groupId: 7,
        address: '123 Demo Drive',
        city: 'Scrumville',
        state: 'SV',
        lat: '60.3555',
        lng: '100.333333'
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
     await queryInterface.bulkDelete('Venues', {
      groupId: [1, 2, 3]
     }, {});
  }
};
