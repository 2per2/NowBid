'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.renameColumn('Reservations', 'name', 'title');
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.renameColumn('Reservations', 'title', 'name');
    }
};
