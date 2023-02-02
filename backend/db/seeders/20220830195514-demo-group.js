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
       about: "The SCRUMLords are a group of dedicated and knowledgeable professionals who share a passion for project management. With a focus on the SCRUM methodology, this group provides a forum for members to exchange ideas, learn from each other, and collaborate on innovative solutions. Whether you're a seasoned project manager or just starting out, you'll find value in the insightful discussions, round-table meetings, and workshops offered by The SCRUMLords. Join this supportive community and take your project management skills to the next level!",
       type: 'Online',
       private: false,
       city: "Scrumville",
       state: 'SV'
     },
     {
      organizerId: 2,
      name: "Average Chipotle Enjoyers",
      about: "Average Chipotle Enjoyers is a group of food lovers who share a passion for all things Chipotle. Whether you're a fan of their burritos, bowls, tacos, or salads, this group is for you! With regular meetups, taste tests, and social events, Average Chipotle Enjoyers provides a fun and friendly community for Chipotle fans to come together and enjoy their favorite cuisine. Join this group and taste the difference with Average Chipotle Enjoyers!",
      type: 'Online',
      private: false,
      city: "Scrumville",
      state: 'SV'
    },
    {
      organizerId: 3,
      name: "Abra Cadabra",
      about: "Abra Cadabra is a community of aspiring and experienced magicians who share a love for the art of magic. From illusions and sleight of hand to mentalism and escape artistry, this group covers it all! With regular workshops, meetings, and performances, Abra Cadabra provides a supportive and inspiring environment for magicians of all levels to grow their skills and share their love of magic. Whether you're just starting out or you're a seasoned performer, join this group and be a part of the magic with Abra Cadabra!",
      type: 'Online',
      private: false,
      city: "Scrumville",
      state: 'SV'
    },
    {
      organizerId: 4,
      name: "Candy Corn Enthusiasts",
      about: "Candy Corn Enthusiasts is a group of sweet-tooth lovers who share a passion for this classic treat. Whether you love the classic flavor or you're curious about the many variations, this group is for you! With regular taste tests, social events, and candy-making workshops, Candy Corn Enthusiasts provides a fun and engaging community for candy corn lovers to come together and celebrate this sweet delight. Join this group and indulge in the world of candy corn with Candy Corn Enthusiasts!",
      type: 'Online',
      private: true,
      city: "Scrumville",
      state: 'SV'
    },
    {
      organizerId: 5,
      name: "The Hive",
      about: "The Hive is a group of passionate beekeepers and enthusiasts who share a love for these fascinating creatures. With regular workshops, meetings, and field trips, The Hive provides a supportive and educational environment for its members to learn about the art and science of beekeeping. Whether you're a beginner or an experienced beekeeper, this group offers a wealth of knowledge and resources to help you grow your skills and deepen your appreciation of these important insects. Join this vibrant and supportive community and become a part of The Hive!",
      type: 'Online',
      private: true,
      city: "Scrumville",
      state: 'SV'
    },
    {
      organizerId: 6,
      name: "Trombone 4 Life",
      about: "Trombone 4 Life is a group of musicians and music enthusiasts who share a love for the rich, soulful sound of the trombone. With regular concerts, jam sessions, and workshops, Trombone 4 Life provides a supportive and musical environment for trombone players and fans alike. Whether you're an experienced trombonist or just enjoy the music, this group offers a fun and engaging way to experience the beauty of the trombone. Join this vibrant and musical community and be a part of Trombone 4 Life!",
      type: 'Online',
      private: false,
      city: "Scrumville",
      state: 'SV'
    },
    {
      organizerId: 1,
      name: "Pro Limbo League",
      about: "Pro Limbo League is a group of athletic and energetic individuals who share a love for the classic party game of Limbo. With regular tournaments, training sessions, and workshops, Pro Limbo League provides a fun and competitive environment for Limbo enthusiasts to hone their skills and show off their moves. Whether you're a seasoned pro or just starting out, this group offers a great way to get active, make new friends, and have a blast while playing Limbo. Join this exciting and energetic community and become a part of the Pro Limbo League!",
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
