import React, { useState, useEffect } from "react";
import { Col, Row, Table, Button, Form, FormGroup, Label, Input } from "reactstrap";
import Widget from "../../components/Widget/Widget";
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateProductos = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleChange = (e) => {
    setSelectedProduct({ ...selectedProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct();
  };

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

  const updateProduct = () => {
    const updatedProduct = {
      ...selectedProduct,
      FechaCreacion: selectedProduct.FechaCreacion || new Date().toISOString().split('T')[0]
    };

    fetch(`http://67.217.243.37:5000/productos/${selectedProduct.IdProducto}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProduct)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al actualizar el producto');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Producto actualizado:", data);
        alert('Producto Actualizado Exitosamente');
        showProductos();
        setSelectedProduct(null);
      })
      .catch((error) => {
        console.error('Error al actualizar el producto:', error);
      });
  };

  const handleRowClick = (product) => {
    setSelectedProduct(product);
  };

  const handleNumericChange = (e) => {
    if (!e || !e.target) return;
    const { name, value } = e.target;
    setSelectedProduct(prev => ({ ...prev, [name]: value ? parseInt(value, 10) : "" }));
  };

  const handleNumericChangeFloat = (event) => {
    const { name, value } = event.target;
    setSelectedProduct({
      ...selectedProduct,
      [name]: parseFloat(value)
    });
  };

  useEffect(() => {
    showProductos();
  }, []);

  return (
    <div>
      <Row>
        <Col lg={12}>
          <Widget title={"Actualizar Productos"}>
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
                    <tr key={producto.IdProducto} onClick={() => handleRowClick(producto)}>
                      <td>{producto.IdProducto}</td>
                      <td>{producto.Nombre}</td>
                      <td>{producto.Descripcion}</td>
                      <td>{producto.Categoria}</td>
                      <td style={{ display: 'none' }}>{producto.Cantidad}</td>
                      <td style={{ display: 'none' }}>{producto.Precio}</td>
                      <td style={{ display: 'none' }}>{producto.FechaCreacion}</td>
                      <td className="text-center">
                        <Button color="success" className="mr-2" onClick={() => handleRowClick(producto)}>
                          Actualizar
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
            {selectedProduct && (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="Nombre">Nombre del Producto</Label>
                  <Input
                    type="text"
                    name="Nombre"
                    id="Nombre"
                    placeholder="Ingrese el nombre del producto"
                    value={selectedProduct.Nombre}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="Descripcion">Descripción</Label>
                  <Input
                    type="textarea"
                    name="Descripcion"
                    id="Descripcion"
                    placeholder="Ingrese la descripción del producto"
                    value={selectedProduct.Descripcion}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="Categoria">Categoría</Label>
                  <Input
                    type="text"
                    name="Categoria"
                    id="Categoria"
                    placeholder="Ingrese la categoría del producto"
                    value={selectedProduct.Categoria}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="cantidad">Cantidad a Ingresar</Label>
                  <Input
                    type="number"
                    name="Cantidad"
                    id="cantidad"
                    placeholder="Ingresa la cantidad a registrar"
                    value={selectedProduct.Cantidad}
                    onChange={handleNumericChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="price">Precio</Label>
                  <Input
                    type="number"
                    name="Precio"
                    id="price"
                    placeholder="Ingrese el precio del producto"
                    value={selectedProduct.Precio}
                    step="0.01"
                    onChange={handleNumericChangeFloat}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="hidden"
                    name="FechaCreacion"
                    id="FechaCreacion"
                    value={selectedProduct.FechaCreacion || new Date().toISOString().split('T')[0]}
                    onChange={handleChange}
                  />
                </FormGroup>
                <Button color="primary" type="submit">
                  Guardar Cambios
                </Button>
              </Form>
            )}
          </Widget>
        </Col>
      </Row>
    </div>
  );
};

export default UpdateProductos;