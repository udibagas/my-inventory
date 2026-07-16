"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Buildings", [
      {
        name: "Gedung A",
        code: "G-A",
        description: "Gedung Utama",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Gedung B",
        code: "G-B",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Gedung C",
        code: "G-C",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Buildings", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  },
};
