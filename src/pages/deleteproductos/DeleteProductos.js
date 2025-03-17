import React, { useState, useEffect } from "react";
import { Col, Row, Table, Button } from "reactstrap";
import Widget from "../../components/Widget/Widget";
import 'bootstrap/dist/css/bootstrap.min.css';

const DeleteProductos = () => {
  const [products, setProducts] = useState([]);

  const showProductos = () => {
    fetch('http://67.217.243.37:5000/productos')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Fallo al filtrar productos');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Productos:", data);
        setProducts(data);
      })
      .catch((error) => {
        console.log('Error al filtrar:', error);
      });
  };

  const deleteProduct = (product) => {
    fetch(`http://67.217.243.37:5000/productos/${product.IdProducto}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al eliminar el producto');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Producto eliminado:", data);
        alert('Producto Eliminado Exitosamente');
        setProducts(products.filter(p => p.IdProducto !== product.IdProducto));
      })
      .catch((error) => {
        console.error('Error al eliminar el producto:', error);
      });
  };

  useEffect(() => {
    showProductos();
  }, []);

  return (
    <div>
      <Row>
        <Col lg={12}>
          <Widget title={"Eliminar Productos"}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((producto) => (
                    <tr key={producto.IdProducto}>
                      <td>{producto.IdProducto}</td>
                      <td>{producto.Nombre}</td>
                      <td>{producto.Descripcion}</td>
                      <td>{producto.Categoria}</td>
                      <td className="text-center">  
                        <Button color="danger" className="mr-2" onClick={() => deleteProduct(producto)}>  
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No se encontraron productos</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Widget>
        </Col>
      </Row>
    </div>
  );
};

export default DeleteProductos;
