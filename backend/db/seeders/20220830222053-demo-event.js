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
        description: "The SCRUMLords are inviting you to an insightful and productive event, the 'Round Table Meeting'. This is a unique opportunity to engage with a group of experienced and dedicated professionals and discuss the latest trends and best practices in project management. Join the conversation, share your ideas and insights, and collaborate on innovative solutions. Whether you're a seasoned project manager or just starting out, you'll find value in this open and interactive forum. Don't miss this chance to network, learn and grow with The SCRUMLords.",
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
        description: "Join the Average Chipotle Enjoyers for a delicious and compassionate cause! The group is hosting an event, 'Bring Back Vegan Chorizo', to celebrate and promote the return of this tasty and meat-free option to the menu. Whether you're a seasoned vegan or just looking to try something new, come and taste the irresistible flavors of vegan chorizo. Let's raise our voices and show our support for more plant-based options! Don't miss out on this exciting opportunity to mingle with like-minded individuals and enjoy some mouth-watering vegan food.",
        type: 'In person',
        capacity: 200,
        price: 5.99,
        startDate: '2024-10-25 20:54:00.000',
        endDate: '2024-11-25 20:54:00.000'
      },
      {
        venueId: 3,
        groupId: 3,
        name: 'Beginner Magic Workshop',
        description: "Unleash your inner magician with the 'Beginner Magic Workshop' hosted by Abra Cadabra! Learn the secrets of magic from experienced and talented performers and discover the art of illusion. This hands-on workshop is designed for beginners and is perfect for anyone who wants to learn the basics of magic. You'll learn various tricks, techniques and tips to impress your friends and family. Whether you're interested in magic as a hobby or as a future career, this workshop is the perfect starting point. Come and join the fun, the magic awaits!",
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
        description: "Do you love candy corn or are you curious about this sweet and classic treat? Then, you won't want to miss the 'Candy Corn Taste Test' hosted by the Candy Corn Enthusiasts! Join other candy corn lovers and taste a variety of flavors and brands to determine the ultimate winner. This fun and interactive event will take you on a sweet journey of discovery and enjoyment. Share your thoughts and opinions, and find new candy corn favorites. Don't miss this opportunity to indulge in one of fall's most beloved treats and be part of the candy corn conversation!",
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
        description: "The Hive is excited to invite you to a hands-on and educational event, the 'Honey Collection Practice'. Join this group of beekeeping enthusiasts and learn the art of collecting honey from beehives. You'll be guided by experienced beekeepers and have the chance to get up close and personal with these fascinating creatures. This workshop will cover everything from basic bee biology to the techniques of safely collecting honey. Whether you're a seasoned beekeeper or just starting out, you'll leave with a deeper appreciation and understanding of the beekeeping process. Don't miss this sweet opportunity to learn and grow with The Hive!",
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
        description: "Trombone 4 Life invites you to an engaging and thought-provoking event, the 'Plastic Vs Metal Debate'. Join a group of passionate trombone players as they debate the pros and cons of plastic and metal trombones. Hear from experts on both sides as they argue their case, and be a part of the discussion. This is a unique opportunity to gain insights and perspectives on the latest trombone technology, and to learn about the various factors that influence trombone choice. Whether you're a seasoned trombonist or just starting out, this event is sure to provide valuable information and stimulate interesting conversations. Come and join the debate!",
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
        description: "Get ready to bend, twist, and groove at the 4th Annual Limbo Grand Prix, hosted by the Pro Limbo League! This exciting and competitive event features some of the best limbo dancers from around the world as they compete to see who can go the lowest. With high-energy music and cheering crowds, this is a fun and unforgettable experience. Come and watch as these talented and flexible dancers push their limits and see who will be crowned the champion. Whether you're a seasoned limbo dancer or just a fan of the art, this event is sure to get you moving and grooving. Don't miss this chance to be part of the action and witness the magic of the Limbo Grand Prix!",
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
