const express = require('express');
const bodyParser = require('body-parser');
const productos = require('./models/productos');
const puerto = 3000;

const app = express();
app.use(bodyParser.json());

app.listen(puerto, () => {
    console.log('Servicio iniciado en el puerto', puerto);
});

const cors = require("cors");
app.use(cors());

// Create
app.post('/productos', async (req, res) => {
    try {
        const { Nombreproducto, Marca, TipoProducto, PrecioProducto, CantidadRestante } = req.body;
        const data = await productos.create({ Nombreproducto, Marca, TipoProducto, PrecioProducto, CantidadRestante });
        res.status(201).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: 'Error al crear producto', error });
    }
});

// Read
app.get('/productos', async (req, res) => {
    try {
        const data = await productos.findAll();
        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: 'Error al obtener productos', error });
    }
});

// Update
app.put('/productos/:ID', async (req, res) => {
    try {
        const {Nombreproducto, Marca, TipoProducto, PrecioProducto, CantidadRestante} = req.body;
        const { ID } = req.params;
        const data = await productos.update(
            { Nombreproducto, Marca, TipoProducto, PrecioProducto, CantidadRestante },
            { where: { ID } }
        );
        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: 'Error al actualizar producto', error });
    }
});

// Delete
app.delete('/productos/:ID', async (req, res) => {
    try {
        const { ID } = req.params;
        const data = await productos.destroy({ where: { ID } });
        res.status(200).send({ mensaje: 'Producto eliminado', resultado: data });
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: 'Error al eliminar producto', error });
    }
});
