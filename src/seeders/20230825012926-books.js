'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add multiple books to database
    return queryInterface.bulkInsert("books", [
      {
        id: 1,
        name: '1984',
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Animal Farm',
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: 'Fahrenheit 451',
        authorId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    // Remove all books from database
    return queryInterface.bulkDelete('books', null, {});
  }
};
