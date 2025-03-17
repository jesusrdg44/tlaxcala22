import React, { useState, useEffect } from "react";
import { Col, Row, Form, FormGroup, Label, Input, Button, Table } from "reactstrap";
import Widget from "../../components/Widget/Widget";
import s from "./Usuarios.scss"; // Assuming you are importing the styles
import 'bootstrap/dist/css/bootstrap.min.css';

const Usuarios = () => {
  const [report, setReport] = useState({ title: "", description: "", date: "" });
  const [usuarios, setUsuarios] = useState([]); // State for storing fetched usuarios data

  const handleChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doUsuarios();
  };

  const doUsuarios = () => {
    console.log("Fetching usuarios...");
    fetch('http://67.217.243.37:5000/usuarios')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch usuarios');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Usuarios data:", data);
        setUsuarios(data);
      })
      .catch((error) => {
        console.log('Error fetching usuarios:', error);
      });
  };
  
  useEffect(() => {
    doUsuarios(); 
  }, []);

  return (
    <div className="table-container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Correo Electronico</th>
          
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <tr key={usuario.IdUsuario}>
                <td>{usuario.IdUsuario}</td>
                <td>{usuario.Nombre}</td>
                <td>{usuario.Ap}</td>
                <td>{usuario.Am}</td>
                <td>{usuario.username}</td>
                
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
};

export default Usuarios;
