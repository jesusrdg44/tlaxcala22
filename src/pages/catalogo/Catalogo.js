import React, { useState , useEffect } from 'react';
import {
  Row, Col, Button, Table
} from 'reactstrap';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uuid from 'uuid/v4'
import Widget from '../../components/Widget/Widget';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';




const Catalogo = () =>{
  const [catalogos, setCatalogos ] = useState([]);

  const handleChange = (e) =>{
    setCatalogos ({...catalogos , [e.target.name ]: e.target.value});
  }
  

  const handleSubmit = (e) =>{
    e.preventDefault();
    showProductos();
  }

  const showProductos = () =>{
    fetch ('http://67.217.243.37:5000/productos')
    .then((response) => {
      if(!response.ok){
        throw new Error ('Fallo al filtrar productos');
      }
      return response.json();

    })
    .then((data) => {
      console.log("Catalogos:" , data);
      setCatalogos(data);
    })
    .catch((error) => {
      console.log('Error al filtrar;', error);
    });

  };

  useEffect(() => {
    showProductos();
  } , []);



  
    
    return (
      <div className="table-container">
    <Table striped bordered hover>
        
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Categoria</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Fecha de Creacion</th>
          </tr>
        </thead>
        <tbody>
          {catalogos.length > 0 ? (
            catalogos.map((catalogo) => (
              <tr key={catalogo.IdProducto}>
                <td>{catalogo.IdProducto}</td>
                <td>{catalogo.Nombre}</td>
                <td>{catalogo.Descripcion}</td>
                <td>{catalogo.Categoria}</td>
                <td>{catalogo.Cantidad}</td>
                <td>{catalogo.Precio}</td>
                <td>{new Date(catalogo.FechaCreacion).toLocaleDateString()}</td>


              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No se encontraron usuarios</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
    );
}
export default Catalogo;