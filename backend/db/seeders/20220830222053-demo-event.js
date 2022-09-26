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
        name: 'Round Table Meeting',
        description: 'Eu adipisicing veniam aute exercitation culpa non proident laborum sunt cupidatat. Et culpa culpa pariatur in excepteur sunt voluptate ea id velit. Veniam irure amet eu esse excepteur aute esse. Aliquip anim deserunt nulla nulla cillum ea duis.',
        type: 'Online',
        capacity: 200,
        price: 5.99,
        startDate: '2024-10-25 20:54:00.000',
        endDate: '2024-11-25 20:54:00.000'
      },
      {
        venueId: 2,
        groupId: 2,
        name: 'Bring back Vegan Chorizo',
        description: 'Velit laboris dolore incididunt adipisicing. Cupidatat ipsum enim consequat velit do est. Occaecat enim ea reprehenderit eu officia non exercitation mollit occaecat est adipisicing commodo. Sit laboris consequat dolor veniam dolor. Minim sint excepteur laboris eu. Veniam elit sit do id ea nisi aute. Non fugiat ut occaecat reprehenderit esse magna voluptate aliqua id sint ullamco consectetur fugiat.',
        type: 'In person',
        capacity: 200,
        price: 5.99,
        startDate: '2024-10-25 20:54:00.000',
        endDate: '2024-11-25 20:54:00.000'
      },
      {
        venueId: 3,
        groupId: 3,
        name: 'Begginer Magic Workshop',
        description: 'Irure irure eiusmod nisi dolore reprehenderit occaecat amet commodo cupidatat consectetur elit pariatur incididunt. Excepteur dolor duis dolor sint. Ad consequat sit nulla proident. Id ad ipsum sint eiusmod mollit qui aliquip aute officia. Nulla culpa nisi proident mollit est tempor commodo sunt. Commodo aliquip consequat incididunt reprehenderit dolore Lorem. Dolore ut tempor cillum in aute veniam fugiat amet enim occaecat laboris exercitation.',
        type: 'In person',
        capacity: 200,
        price: 5.99,
        startDate: '2024-10-25 20:54:00.000',
        endDate: '2024-11-25 20:54:00.000'
      },
      {
        venueId: 4,
        groupId: 4,
        name: 'Candy Corn Taste Test',
        description: 'Consectetur quis do officia ex enim ut nostrud ut aliquip qui aliqua cupidatat. Minim Lorem labore sunt occaecat anim Lorem fugiat duis dolore officia pariatur ullamco ipsum. Quis pariatur aliquip cillum nulla cupidatat sint sunt. Occaecat sit sit duis reprehenderit culpa. Nostrud cillum esse laborum pariatur velit fugiat ex consequat.',
        type: 'In person',
        capacity: 200,
        price: 5.99,
        startDate: '2024-10-25 20:54:00.000',
        endDate: '2024-11-25 20:54:00.000'
      },
      {
        venueId: 5,
        groupId: 5,
        name: 'Honey Collection Practice',
        description: 'Dolore veniam aute duis consectetur nostrud in consectetur commodo. Commodo adipisicing id exercitation est sint est. Excepteur et veniam Lorem consectetur non. Enim veniam deserunt aliqua labore laboris adipisicing culpa laborum.',
        type: 'In person',
        capacity: 200,
        price: 5.99,
        startDate: '2024-10-25 20:54:00.000',
        endDate: '2024-11-25 20:54:00.000'
      },
      {
        venueId: 6,
        groupId: 6,
        name: 'Plastic Vs Metal Debate',
        description: 'Non aliquip voluptate reprehenderit sit minim ullamco quis ut magna et quis elit. Nulla labore quis tempor laborum amet incididunt id proident ad ut dolore sint nisi cupidatat. Ut quis esse id esse ea. Reprehenderit fugiat consectetur voluptate commodo proident nulla.',
        type: 'In person',
        capacity: 200,
        price: 5.99,
        startDate: '2024-10-25 20:54:00.000',
        endDate: '2024-11-25 20:54:00.000'
      },
      {
        venueId: 7,
        groupId: 7,
        name: '4th Annual Limbo Grand Prix',
        description: 'Excepteur ullamco et fugiat ea cillum excepteur sint excepteur duis consectetur duis laborum. Nulla est aliquip ullamco nisi aute in in cupidatat incididunt laboris fugiat aliqua ex ut. Mollit magna fugiat ut dolore cillum. Amet irure nulla nisi est eu. Incididunt pariatur reprehenderit officia esse ea cillum duis sunt deserunt tempor velit cupidatat et.',
        type: 'In person',
        capacity: 200,
        price: 5.99,
        startDate: '2024-10-25 20:54:00.000',
        endDate: '2024-11-25 20:54:00.000'
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
