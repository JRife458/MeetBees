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
       organizerId: 7,
       name: "The SCRUMLords",
       about: 'Excepteur et do eu nulla consectetur qui ut fugiat Lorem duis. Fugiat aliqua ad et elit consectetur velit laboris aliqua est voluptate. Nisi incididunt ea sint ut cillum adipisicing do. Sunt enim aute et sit aute adipisicing consectetur incididunt pariatur. Proident consectetur aliquip minim irure.',
       type: 'Online',
       private: false,
       city: "Scrumville",
       state: 'SV'
     },
     {
      organizerId: 2,
      name: "Average Chipotle Enjoyers",
      about: 'Labore irure dolore consectetur esse eu nostrud cupidatat est. Anim sint ipsum sint qui reprehenderit reprehenderit officia qui ad aliquip consectetur. Mollit occaecat culpa sint nostrud minim magna amet.',
      type: 'Online',
      private: false,
      city: "Scrumville",
      state: 'SV'
    },
    {
      organizerId: 3,
      name: "Abra Cadabra",
      about: 'Excepteur enim id ad ullamco. Lorem in laborum duis et commodo cupidatat mollit mollit tempor ad adipisicing non ad nisi. Laborum non eu ex sint dolore magna aute qui anim elit laborum ipsum ullamco cillum. Aliquip aute adipisicing nulla ipsum eu laboris. Ex ut cupidatat eu commodo anim. Anim officia exercitation commodo nisi exercitation deserunt amet anim consequat id cillum occaecat.',
      type: 'Online',
      private: false,
      city: "Scrumville",
      state: 'SV'
    },
    {
      organizerId: 4,
      name: "Candy Corn Enthusiasts",
      about: 'Aute ut Lorem cillum est laboris est ipsum. Ex magna anim proident aliqua eu ad reprehenderit. Id consequat officia pariatur proident irure irure consectetur proident occaecat. Lorem irure do culpa magna sint ex enim nostrud. Aute cillum ad sit aliqua minim nostrud exercitation laborum fugiat commodo excepteur nisi labore.',
      type: 'Online',
      private: true,
      city: "Scrumville",
      state: 'SV'
    },
    {
      organizerId: 5,
      name: "The Hive",
      about: 'Commodo ullamco enim elit ad sint officia sit sunt cillum adipisicing. Ipsum Lorem aute veniam sunt incididunt culpa nulla eiusmod voluptate voluptate aliqua. Aliquip anim officia incididunt aliquip sunt do ut occaecat ad deserunt ullamco duis. Nulla dolor cupidatat in esse nulla ea laboris amet id dolor commodo. Lorem occaecat esse cupidatat minim occaecat cillum deserunt nulla veniam cillum adipisicing laborum.',
      type: 'Online',
      private: true,
      city: "Scrumville",
      state: 'SV'
    },
    {
      organizerId: 6,
      name: "Trombone 4 Life",
      about: 'Non eiusmod fugiat do laboris do id nisi ad deserunt id elit sint. Sit elit quis consectetur non pariatur deserunt cillum. Exercitation officia do nulla exercitation. Consectetur eu veniam minim aliquip voluptate adipisicing. Reprehenderit consectetur nisi in culpa laboris voluptate aliqua amet dolore magna duis minim esse sint. Amet aute occaecat elit proident est aliqua ut proident sit occaecat. Eu qui adipisicing irure veniam adipisicing.',
      type: 'Online',
      private: false,
      city: "Scrumville",
      state: 'SV'
    },
    {
      organizerId: 1,
      name: "Pro Limbo League",
      about: 'Veniam enim fugiat ipsum laborum adipisicing id dolore magna. Aliquip ullamco reprehenderit consectetur ut ea. Qui do reprehenderit consequat eiusmod incididunt aliqua incididunt ea. Do sunt et dolor nulla elit amet nisi ea laborum minim non. Veniam eu sit irure eu dolor exercitation amet irure dolore voluptate. Sunt dolor excepteur aliqua et. Ex magna anim labore ad ipsum non mollit.',
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
