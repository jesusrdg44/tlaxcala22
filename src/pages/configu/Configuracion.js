import React, { useState } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uuid from 'uuid/v4'
import Widget from '../../components/Widget';
import {imagenes} from '../../images/configcarpeta.png';

import {useNavigate} from "react-router-dom";

const Configuracion = () => {
  const [config, setConfig] = useState({
    siteName: '',
    siteDescription: '',
    adminEmail: '',
    itemsPerPage: 10,
  });

  
   
  

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig({ ...config, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Configuration submitted:', config);
    // Handle form submission
  };

  return (
    <div>
      <Row>
        <Col lg={12}>
          <Widget title={"Configuración"}>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
              
                <Label for="siteName">Nombre del Sitio</Label>
               
                <Input
                  type="text"
                  name="siteName"
                  id="siteName"
                  placeholder="Ingrese el nombre del sitio"
                  value={config.siteName}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="siteDescription">Descripción del Sitio</Label>
                <Input
                  type="textarea"
                  name="siteDescription"
                  id="siteDescription"
                  placeholder="Ingrese la descripción del sitio"
                  value={config.siteDescription}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="adminEmail">Correo Electrónico del Administrador</Label>
                <Input
                  type="email"
                  name="adminEmail"
                  id="adminEmail"
                  placeholder="Ingrese el correo electrónico del administrador"
                  value={config.adminEmail}
                  onChange={handleChange}
                />
              </FormGroup>
            
              <Button color="primary" type="submit">
                Guardar Cambios
              </Button>
            </Form>
          </Widget>
        </Col>
      </Row>
    </div>
  );
};

export default Configuracion;