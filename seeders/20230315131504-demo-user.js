'use strict';

/** @type {import('sequelize-cli').Migration} */
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
      // Example:
      await queryInterface.bulkInsert('Users', [
        {
        id:2,
        names:"samuel kwizera",
        email:"user@gmail.com",
        createdAt:new Date(),
        updatedAt:new Date(),
       
        },
 
        {
          id:3,
          names:"Juju kwizera",
          email:"usertwo@gmail.com",
          createdAt:new Date(),
          updatedAt:new Date(),
         
          },
          {
            id:4,
            names:"jimmy fabien",
            email:"userthreee@gmail.com",
            createdAt:new Date(),
            updatedAt:new Date(),
           
            },
      ], 
      
      {});


       await queryInterface.bulkInsert('BooksTbs', [
        {
         id: 1,
         bookisbn:"239373674894",
         bookauthor:"kamari",
         booktitle:"the got has died",
         bookgnre:"drama",
         bookowner:"kazungu",
         createdAt:new Date(),
         updatedAt:new Date(),
        
       }
      ], 
      {});

      await queryInterface.bulkInsert('BrowerTbs', [
        {
         id: 1,
         bookisbn:"239373674894",
         browername:"jeje",
         createdAt:new Date(),
         updatedAt:new Date(),
       }
      ], 
      {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
