import React, { useState, useEffect } from "react";
import { Col, Row, Form, FormGroup, Label, Input, Button } from "reactstrap";
import Widget from "../../components/Widget/Widget";

const Informes = () => {
  const [report, setReport] = useState({
    titulo: '',
    ruta: null, 
    fecha: '',
    generadopor: ''
  });

  const [roles, setRoles] = useState([]);
  const [informes, setInformes] = useState([]);

  useEffect(() => {
    showRol();
    setReport((prevReport) => ({
      ...prevReport,
      fecha: new Date().toISOString().split('T')[0],
    }));
  }, []);

  const showRol = () => {
    console.log('Fetching roles...');
    fetch('http://67.217.243.37:5000/roles')
      .then((response) => {
        if (!response.ok) throw new Error('Error fetching roles');
        return response.json();
      })
      .then((data) => {
        console.log("Roles:", data);
        setRoles(data);
      })
      .catch((error) => {
        console.error('Error fetching roles:', error);
      });
  };

  const insertarInformes = () => {
    console.log(report);

    const formData = new FormData();
    formData.append("titulo", report.titulo);
    formData.append("generadopor", report.generadopor);
    formData.append("fecha", report.fecha);
    formData.append("ruta", report.ruta);

    fetch('http://67.217.243.37:5000/insertar_informes', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error inserting report');
        return response.json();
      })
      .then((data) => {
        console.log("Inserted report:", data);
        setInformes([...informes, data]);
        alert('Informe Creado Exitosamente');

        setReport({
          titulo: '',
          ruta: '', 
          fecha: new Date().toISOString().split('T')[0],
          generadopor: ''
        });
      })
      .catch((error) => {
        console.error('Error inserting report:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    insertarInformes();
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setReport((prevReport) => ({
      ...prevReport,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <div>
      <Row>
        <Col lg={12}>
          <Widget title={"Crear Informe"}>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="titulo">Título de Informe</Label>
                <Input
                  type="text"
                  name="titulo"
                  id="titulo"
                  placeholder="Ingrese el nombre del reporte"
                  value={report.titulo}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="rol">Ingresa tu cargo</Label>
                <select
                  className="form-control"
                  name="generadopor"
                  onChange={(e) => setReport({ ...report, generadopor: parseInt(e.target.value, 10) })}
                  value={report.generadopor}
                  required
                >
                  <option value="">Selecciona un rol</option>
                  {roles.map((rol) => (
                    <option key={rol.IdRol} value={rol.IdRol}>
                      {rol.Nombre_Rol}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup>
                <Label for="file">Archivo del Informe</Label>
                <Input
                  type="file"
                  name="ruta"
                  id="file"
                  accept=".pdf, .xlsx, .xls, .doc, .docx"
                  onChange={handleChange}
                />
              </FormGroup>
              <Input type="hidden" name="fecha" value={report.fecha} />
              <Button color="primary" type="submit">
                Guardar Informe
              </Button>
            </Form>
          </Widget>
        </Col>
      </Row>
    </div>
  );
};

export default Informes;
