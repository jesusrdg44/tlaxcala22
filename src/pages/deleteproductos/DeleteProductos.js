import React from "react";
import { Table } from "reactstrap";

const DeleteProductos = () => {
  return (
    <div>
      <h1>Hola Delete</h1>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre del Producto</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Producto 1</td>
            <td>Descripción del Producto 1</td>
            <td>$10.00</td>
            <td>Categoría 1</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Producto 2</td>
            <td>Descripción del Producto 2</td>
            <td>$20.00</td>
            <td>Categoría 2</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Producto 3</td>
            <td>Descripción del Producto 3</td>
            <td>$30.00</td>
            <td>Categoría 3</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default DeleteProductos;
