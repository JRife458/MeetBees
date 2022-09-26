'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: "Demo User",
        lastName: 'Last Name',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: "John",
        lastName: 'Jacob',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: "Jinglehiemer",
        lastName: 'Shmidt',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        email: 'user3@user.io',
        username: 'FakeUser3',
        firstName: "Katarina",
        lastName: 'Wilde',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        email: 'user4@user.io',
        username: 'FakeUser4',
        firstName: "Reuben",
        lastName: 'Mcdonnell',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        email: 'user5@user.io',
        username: 'FakeUser5',
        firstName: "Jeb",
        lastName: 'Straw',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        email: 'user6@user.io',
        username: 'FakeUser6',
        firstName: "Steve",
        lastName: 'Harvey',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        email: 'user7@user.io',
        username: 'FakeUser6',
        firstName: "Roseanna",
        lastName: 'Chester',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        email: 'user8@user.io',
        username: 'FakeUser7',
        firstName: "Barry",
        lastName: 'Benson',
        hashedPassword: bcrypt.hashSync('password8')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
