'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add multiple authors to database
    return queryInterface.bulkInsert('authors', [
      {
        id: 1,
        name: 'George',
        lastName: 'Orwell',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Ray',
        lastName: 'Bradbury',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    // Remove all authors from database
    return queryInterface.bulkDelete('authors', null, {});
  }
};
