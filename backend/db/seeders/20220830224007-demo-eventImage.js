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
        url: 'https://pixabay.com/get/gc36dc779e8fb547516b51e5649ec127bdfc937fa9584a6b4c1724b9469909b66b04b7dc9f6566e5c4786929fa406134a_1280.jpg',
        preview: true
      },
      {
        eventId: 2,
        url: 'https://pixabay.com/get/g6a679f39d06280b695ac2731cfb2a46197f0a6dc5c7fa6da2fdc04de2b01f0c91c0a90cef7b061fcd390538b7b9e4aba_1280.jpg',
        preview: true
      },
      {
        eventId: 3,
        url: 'https://pixabay.com/get/g4647dbbe451f7801f7a552cd585b68579c7fff52d428a2603739fbd60c3c0af865ecea1912576898a8f68a7f6d3a3e6a_1280.jpg',
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
        url: 'https://pixabay.com/get/g7f9deaa7aff1b48c426a8307495177f30b1edfc2c3375d2beb69c1ee447ecd0ec0b269069a0e106a8fedc835a9d1d078_1280.jpg',
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
