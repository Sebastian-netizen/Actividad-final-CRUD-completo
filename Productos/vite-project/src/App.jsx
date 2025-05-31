import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    ID: "",
    Nombreproducto: "",
    Marca: "",
    TipoProducto: "",
    PrecioProducto: "",
    CantidadRestante: "",
  });

  const obtenerProductos = async () => {
    const res = await fetch("http://localhost:3000/productos");
    const data = await res.json();
    setProductos(data);
  };

  const manejarCambio = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const agregarProducto = async () => {
    await fetch("http://localhost:3000/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    obtenerProductos();
  };

  const modificarProducto = async () => {
    await fetch(`http://localhost:3000/productos/${formData.ID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    obtenerProductos();
  };

  const eliminarProducto = async () => {
    await fetch(`http://localhost:3000/productos/${formData.ID}`, {
      method: "DELETE",
    });
    obtenerProductos();
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <div>
      <div className="navbar">Vida Extra</div>

      <div className="container">
        <h2>REGISTRO DE INVENTARIO</h2>
        <div className="input-container">
          <input type="number" name="ID" placeholder="ID" onChange={manejarCambio} />
          <input type="text" name="Nombreproducto" placeholder="Nombre" onChange={manejarCambio} />
          <input type="text" name="Marca" placeholder="Marca" onChange={manejarCambio} />
          <input type="text" name="TipoProducto" placeholder="Tipo" onChange={manejarCambio} />
          <input type="number" name="PrecioProducto" placeholder="Precio" onChange={manejarCambio} />
          <input type="number" name="CantidadRestante" placeholder="Cantidad" onChange={manejarCambio} />
        </div>
        <div className="button-container">
          <button onClick={agregarProducto}>Agregar</button>
          <button onClick={modificarProducto}>Modificar</button>
          <button onClick={eliminarProducto}>Eliminar</button>
          <button onClick={obtenerProductos}>Consultar</button>
        </div>
      </div>

      <h2>Inventario Actual</h2>
      <div className="product-list">
        {productos.map((p) => (
          <div key={p.ID} className="product-card">
            <img src="https://via.placeholder.com/150" alt="Producto" />
            <h3>{p.Nombreproducto}</h3>
            <p>Marca: {p.Marca}</p>
            <p>Tipo: {p.TipoProducto}</p>
            <p>Precio: ${p.PrecioProducto}</p>
            <p>Stock: {p.CantidadRestante}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
