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
        url: 'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=400',
        preview: true
      },
      {
        eventId: 2,
        url: 'https://images.pexels.com/photos/301930/pexels-photo-301930.jpeg?auto=compress&cs=tinysrgb&w=400',
        preview: true
      },
      {
        eventId: 3,
        url: 'https://images.pexels.com/photos/1822608/pexels-photo-1822608.jpeg?auto=compress&cs=tinysrgb&w=400',
        preview: true
      },
      {
        eventId: 4,
        url: 'https://static9.depositphotos.com/1477006/1081/i/450/depositphotos_10814995-stock-photo-industrial-workers-with-notebook-teamwork.jpg',
        preview: true
      },
      {
        eventId: 5,
        url: 'https://st4.depositphotos.com/16529236/24001/i/450/depositphotos_240011780-stock-photo-salesman-is-showing-couple-of.jpg',
        preview: true
      },
      {
        eventId: 6,
        url: 'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=400',
        preview: true
      },
      {
        eventId: 7,
        url: 'https://st.depositphotos.com/1000393/4930/i/450/depositphotos_49304735-stock-photo-power-generator.jpg',
        preview: true
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
