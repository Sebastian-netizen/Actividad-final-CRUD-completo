const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    {
        dialect: 'sqlite',
        storage: './Productos.db',
    }
);

module.exports = sequelize;