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
        url: 'https://images.unsplash.com/photo-1549057446-9f5c6ac91a04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
        preview: true
       },
       {
        groupId: 1,
        url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjB8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
        preview: false
       },
       {
        groupId: 1,
        url: 'https://images.unsplash.com/photo-1543269865-4430f94492b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
        preview: false
       },
       {
        groupId: 1,
        url: 'https://images.unsplash.com/photo-1450609283058-0ec52fa7eac4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MzB8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
        preview: false
       },
       {
        groupId: 2,
        url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NDh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
        preview: true
       },
       {
        groupId: 3,
        url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NTJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
        preview: true
       },
       {
        groupId: 4,
        url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NTh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
        preview: true
       },
       {
        groupId: 5,
        url: 'https://images.unsplash.com/photo-1499428665502-503f6c608263?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Njd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
        preview: true
       },
       {
        groupId: 6,
        url: 'https://images.unsplash.com/photo-1491485326079-8713ae1e00a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NzB8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
        preview: true
       },
       {
        groupId: 7,
        url: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8ODB8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
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
