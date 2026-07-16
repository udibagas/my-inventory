"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        code: "FR",
        name: "Furniture",
      },
      {
        code: "MNTR",
        name: "Monitor",
      },
    ].map((d) => ({
      ...d,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("Categories", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
