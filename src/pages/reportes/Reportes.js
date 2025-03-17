import React, { useState, useEffect } from "react";
import { Col, Row, Form, FormGroup, Label, Input, Button } from "reactstrap";
import Widget from "../../components/Widget/Widget";

const Reportes = () => {
  const [report, setReport] = useState({ 
    tituloreporte: "", 
    folio: "",
    cliente: "",
    clave : "",
    tiporeporte: "",
    description: "", 
    date: new Date().toISOString().split('T')[0],  
    generadopor: "",
    estatus: "",
    situacion: ""
  });

  const [roles, setRoles] = useState([]);
  const [reportes , setReportes] = useState([]);
  const [clientes , setClientes] = useState([]);

  useEffect(() => {
    showRol();
    showClientes();
  }, []);

  const showRol = () => {
    console.log('Fetching roles...');
    fetch('http://67.217.243.37:5000/roles')
      .then(response => {
        if (!response.ok) throw new Error('Error fetching roles');
        return response.json();
      })
      .then(data => {
        console.log("Roles:", data);
        setRoles(data);
      })
      .catch(error => console.error('Error fetching roles:', error));
  };

  const showClientes = () => {
    fetch('http://67.217.243.37:5000/clientes')
    .then(response =>{
      if(!response.ok) throw new Error ('Error al filtrar');
      return response.json();
    })
    .then(data =>{
      console.log('Clientes:', data);
      setClientes(data);
    })
    .catch(error => console.error('Error al filtar:', error));
  };

  const insertar_reportes = () => {
    console.log("Enviando Reporte:", report);

    fetch('http://67.217.243.37:5000/insertar_reportes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(report)
    })
    .then(response => {
      if (!response.ok) throw new Error('Error al insertar');
      return response.json();
    })
    .then(data => {
      console.log("Reporte insertado:", data);
      setReportes([...reportes, data]);
      alert ('Reporte Creado Exitosamente');

      setReport({
        tituloreporte: "", 
        folio: "",
        cliente: "",
        clave : "",
        tiporeporte: "",
        description: "", 
        date: new Date().toISOString().split('T')[0],  
        generadopor: "",
        estatus: "",
        situacion: ""
      });
    })
    .catch(error => console.error('Error al insertar:', error));
  };

  const handleChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  const handleNumericChange = (e) => {
    if (!e || !e.target) return; 
    const { name, value } = e.target;
    setReport(prev => ({ ...prev, [name]: value ? parseInt(value, 10) : "" }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    insertar_reportes();
  };

  return (
    <div>
      <Row>
        <Col lg={12}>
          <Widget title={"Crear Reporte"}>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="title">Nombre del Reporte</Label>
                <Input
                  type="text"
                  name="tituloreporte"
                  id="title"
                  placeholder="Ingresa el nombre del reporte"
                  value={report.tituloreporte}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="folio">Folio Interno</Label>
                <Input
                  type="number"
                  name="folio"
                  id="folio"
                  placeholder="Ingresa el folio"
                  value={report.folio}
                  onChange={handleNumericChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="cliente">Cliente</Label>
                <Input
                  type="select"
                  name="cliente"
                  id="cliente"
                  value={report.cliente}
                  onChange={handleNumericChange}
                >
                <option value="">Selecciona un rol

                </option>
                {clientes.map(cliente =>(
                    <option key={cliente.IdCliente} value={cliente.IdCliente}>
                       {`${cliente.Nombre} ${cliente.Ap} ${cliente.Am}`}
                    </option>

                ))}
              </Input>
              </FormGroup>

              <FormGroup>
                <Label for="clave">Clave</Label>
                <Input
                  type="number"
                  name="clave"
                  id="clave"
                  placeholder="Ingresa la clave"
                  value={report.clave}
                  onChange={handleNumericChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="tiporeporte">Tipo de Reporte</Label>
                <Input
                  type="text"
                  name="tiporeporte"
                  id="tiporeporte"
                  placeholder="Ingresa el tipo de reporte"
                  value={report.tiporeporte}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="description">Descripción</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  placeholder="Ingresa la descripción"
                  value={report.description}
                  onChange={handleChange}
                />
              </FormGroup>

              <Input type="hidden" name="date" value={report.date} />

              <FormGroup>
                <Label for="generadopor">Ingresa tu cargo</Label>
                <Input
                  type="select"
                  name="generadopor"
                  value={report.generadopor}
                  onChange={handleNumericChange}
                  required
                >
                  <option value="">Selecciona un rol</option>
                  {roles.map(rol => (
                    <option key={rol.IdRol} value={rol.IdRol}>
                      {rol.Nombre_Rol}
                    </option>
                  ))}
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="estatus">Estatus del Reporte</Label>
                <Input
                  type="text"
                  name="estatus"
                  id="estatus"
                  placeholder="Ingresa el estatus"
                  value={report.estatus}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="situacion">Situación Principal</Label>
                <Input
                  type="text"
                  name="situacion"
                  id="situacion"
                  placeholder="Ingresa la situación principal"
                  value={report.situacion}
                  onChange={handleChange}
                />
              </FormGroup>

              <Button color="primary" type="submit">
                Subir Reporte
              </Button>
            </Form>
          </Widget>
        </Col>
      </Row>
    </div>
  );
};

export default Reportes;
