'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', 
    [
      {
      title: 'Supernova',
      author: 'Dewi Lestari',
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Bumi Manusia',
      author: 'Pramoedya Ananta Toer',
      isRead: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Bukan Pasar Malam',
      author: 'Pramoedya Ananta Toer',
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Blink',
      author: 'Malcolm Gadwel',
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
