import React, { useState } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Widget from '../../components/Widget';

const Cuenta = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User account submitted:', user);
    // Handle form submission
  };

  return (
    <div>
      <Row>
        <Col lg={12}>
          <Widget title={"Cuenta de Usuario"}>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="username">Nombre de Usuario</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Ingrese el nombre de usuario"
                  value={user.username}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Correo Electrónico</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Ingrese el correo electrónico"
                  value={user.email}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Contraseña</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Ingrese la contraseña"
                  value={user.password}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="confirmPassword">Confirmar Contraseña</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirme la contraseña"
                  value={user.confirmPassword}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="firstName">Nombre</Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Ingrese el nombre"
                  value={user.firstName}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Apellido</Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Ingrese el apellido"
                  value={user.lastName}
                  onChange={handleChange}
                />
              </FormGroup>
              <Button color="primary" type="submit">
                Guardar Cuenta
              </Button>
            </Form>
          </Widget>
        </Col>
      </Row>
    </div>
  );
};

export default Cuenta;