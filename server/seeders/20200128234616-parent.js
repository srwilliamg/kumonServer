'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    let arrayParents = [];
    let arraySons = [];
    let arrayParentHasSon = [];

    for (let i = 1; i <= 10; i++) {
      arrayParents.push(
        {
          id_parent: "" + i,
          username: "dummy" + i,
          password: "$2b$10$LbLrdjyb0jcyNXDdw.bFpuBx8omFjkUphD8UynLakKnRjbcdhKWdi",
          name: "dummy" + i,
          lastname: "dummy" + i,
          email: "dummy" + i + "@gmail.com",
          token: "12313154",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      );

      arraySons.push(
        {
          id_son: "" + i,
          name: "name" + i,
          lastname: "lastname" + i,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      );

      arrayParentHasSon.push(
        {
          id_parent_has_son: "" + i,
          id_parent: "" + i,
          id_son: "" + i,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      );
    }

    arrayParents.push(
      {
        id_parent: "11",
        username: "srwilliamg",
        password: "$2b$10$LbLrdjyb0jcyNXDdw.bFpuBx8omFjkUphD8UynLakKnRjbcdhKWdi",
        name: "William",
        lastname: "Salazar",
        email: "srwilliamg@gmail.com",
        token: "12313154",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    );

    arrayParents.push(
      {
        id_parent: "12",
        username: "Nathalia",
        password: "$2b$10$LbLrdjyb0jcyNXDdw.bFpuBx8omFjkUphD8UynLakKnRjbcdhKWdi",
        name: "Nathalia",
        lastname: "Bernal",
        email: "nathalia.bernal@utp.edu.co",
        token: "12313154",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    );

    for (let index = 0; index < arraySons.length; index++) {

      arrayParentHasSon.push(
        {
          id_parent_has_son: "1",
          id_parent: "11",
          id_son: arraySons[index].id_son,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      );

      arrayParentHasSon.push(
        {
          id_parent_has_son: "1",
          id_parent: "12",
          id_son: arraySons[index].id_son,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      );

    }

    for (let j = 0; j < arrayParentHasSon.length; j++) {
      arrayParentHasSon[j].id_parent_has_son = ""+j;
    }

    await queryInterface.bulkInsert('parents', arrayParents, {});
    await queryInterface.bulkInsert('sons', arraySons, {});
    return await queryInterface.bulkInsert('parent_has_sons', arrayParentHasSon, {});
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('parent_has_sons', null, {});
    queryInterface.bulkDelete('sons', null, {});
    return queryInterface.bulkDelete('parents', null, {});
  }
};
