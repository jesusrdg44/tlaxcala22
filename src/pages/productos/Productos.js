import React, { useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uuid from 'uuid/v4'
import Widget from '../../components/Widget';

const Productos = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    categoria: '',
    date: new Date().toISOString().split('T')[0],  
    cantidad : '',
  });


  const insertar_productos = () => {
    console.log("Enviando producto:", product);
  
    fetch('http://67.217.243.37:5000/insertar_productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
    .then(response => {
      if (!response.ok) throw new Error('Error al insertar');
      return response.json();
    })
    .then(data => {
      if (data.success) {
        console.log("Producto insertado:", data);
        alert ('Producto Registrado Exitosamente');
        setProduct({
          name: "",
          description: "",
          categoria: "",
          cantidad: "",
          price: "",
          date: new Date().toISOString().slice(0, 16) 
        });
        
      } else {
        console.error("Error en la respuesta del servidor:", data.message);
      }
    })
    .catch(error => console.error('Error al insertar:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleNumericChange = (e) => {
    if (!e || !e.target) return;
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value ? parseInt(value, 10) : "" }));
  };

  const handleNumericChangeFloat = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: parseFloat(value) 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    insertar_productos();
  };


  return (
    <div>
      <Row>
        <Col lg={12}>
          <Widget title={"Registrar Producto"}>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="name">Nombre del Producto</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Ingrese el nombre del producto"
                  value={product.name}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Descripción</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  placeholder="Ingrese la descripción del producto"
                  value={product.description}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="categoria">Categoria</Label>
                <Input 
                  type="text"
                  name="categoria"
                  id="categoria"
                  placeholder="Ingresa la categoria"
                  value={product.categoria}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="cantidad">Cantidad a Ingresar</Label>
                <Input 
                  type="number"
                  name="cantidad"
                  id="cantidad"
                  placeholder="Ingresa la cantidad a registrar"
                  value={product.cantidad}
                  onChange={handleNumericChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="price">Precio</Label>
                <Input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Ingrese el precio del producto"
                  value={product.price}
                  step="0.01"
                  onChange={handleNumericChangeFloat}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="hidden"
                  name="date"
                  id="date"
                  value={product.date}
                  onChange={handleChange}
                />
              </FormGroup>
              <div className="d-flex justify-content-between">
                <Button color="primary" type="submit">
                  Registrar Producto
                </Button>
                
              </div>
            </Form>
          </Widget>
        </Col>
      </Row>
    </div>
  );
};

export default Productos;
