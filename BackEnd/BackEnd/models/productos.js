const { DataTypes } = require('sequelize');
const sequelize = require('../conexion');

const Producto = sequelize.define('Producto', {
    ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Nombreproducto: { type: DataTypes.STRING},
    TipoProducto: {type: DataTypes.STRING},
    Marca: { type: DataTypes.STRING },
    PrecioProducto: { type: DataTypes.FLOAT },
    CantidadRestante: { type: DataTypes.INTEGER },
},
{
    tableName: 'InventarioProductos',
    timestamps: false,
});

module.exports = Producto;