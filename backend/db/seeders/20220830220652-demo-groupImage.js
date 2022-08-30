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
        url: 'demo url',
        preview: true
       },
       {
        groupId: 2,
        url: 'demo url',
        preview: false
       },
       {
        groupId: 3,
        url: 'demo url',
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
