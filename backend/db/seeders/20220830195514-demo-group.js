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

     await queryInterface.bulkInsert('Groups', [
      {
       organizerId: 1,
       name: "Group1",
       about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
       type: 'Online',
       private: false,
       city: "Scrumville",
       state: 'SV'
     },
     {
      organizerId: 2,
      name: "Group2",
      about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      type: 'Online',
      private: false,
      city: "Scrumville",
      state: 'SV'
    },
    {
      organizerId: 3,
      name: "Group3",
      about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      type: 'Online',
      private: false,
      city: "Scrumville",
      state: 'SV'
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
     await queryInterface.bulkDelete('Groups', {
      name: ['Group1', 'Group2', 'Group3']
     }, {});
  }
};
