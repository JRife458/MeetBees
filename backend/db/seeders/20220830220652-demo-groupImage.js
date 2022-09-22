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

     await queryInterface.bulkInsert('GroupImages', [
       {
        groupId: 1,
        url: 'https://ih1.redbubble.net/image.364942106.9816/flat,750x1000,075,f.jpg',
        preview: true
       },
       {
        groupId: 1,
        url: 'https://ih1.redbubble.net/image.364942106.9816/flat,750x1000,075,f.jpg',
        preview: false
       },
       {
        groupId: 2,
        url: 'https://ih1.redbubble.net/image.364942106.9816/flat,750x1000,075,f.jpg',
        preview: false
       },
       {
        groupId: 3,
        url: 'https://ih1.redbubble.net/image.364942106.9816/flat,750x1000,075,f.jpg',
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
     await queryInterface.bulkDelete('GroupImages', {
      groupId: [1, 2, 3]
     }, {});
  }
};
