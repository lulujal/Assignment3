'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Photos",[{
        title:"Photo 1-uid1",
        caption:"nothing, it's just the first photo",
        image_url:"thisIsTheFirstPhoto.jpg",
        UserId:1,
        createdAt:new Date(),
        updatedAt:new Date()
    },
    {
      title:"Photo 2-uid1",
      caption:"nothing, it's just the second photo",
      image_url:"thisIsTheSecondPhoto.jpg",
      UserId:1,
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      title:"Photo 3-uid1",
      caption:"nothing, it's just the third photo",
      image_url:"thisIsTheThirdPhoto.jpg",
      UserId:1, 
      createdAt:new Date(),
      updatedAt:new Date()
    },
  ],{})

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
