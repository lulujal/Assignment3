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
   await queryInterface.bulkInsert('Photos',
   [
    {
      title: 'Foto Jadul',
      caption: 'foto yang diambil pada tahun 2000 di kota Bandung',
      image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F464785624028128896%2F&psig=AOvVaw0RGEeF5tGW3VDOqvWfF7A_&ust=1696726808241000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCIDq5Ife4oEDFQAAAAAdAAAAABAE',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'foto kenangan',
      caption: 'foto ini diambil saat saya masih kecil',
      image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmemorylaneoldtimephotos.com%2Fchildren-1&psig=AOvVaw2fzlblp9Xe1m_gfPDZ9ejp&ust=1696726934222000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCODTp8Te4oEDFQAAAAAdAAAAABAD',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'foto liburan',
      caption: 'foto ini diambil saat saya liburan di pantai',
      image_url: 'https://awsimages.detik.net.id/community/media/visual/2022/03/21/ilustrasi-objek-wisata-pantai.jpeg?w=650&q=80',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'foto malming',
      caption: 'foto ini diambil saat saya malming di kota Bandung',
      image_url: 'https://o-cdn-cas.sirclocdn.com/parenting/images/wisatakabupatenbandung-630x380.width-800.format-webp.webp',
      createdAt: new Date(),
      updatedAt: new Date(),


    },
  ],{});
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
