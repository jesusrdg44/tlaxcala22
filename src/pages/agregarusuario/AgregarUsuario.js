import React, { useState, useEffect } from "react";
import { Col, Row, Button, FormGroup, Form, Label, Input } from "reactstrap";
import Widget from "../../components/Widget/Widget";
import 'bootstrap/dist/css/bootstrap.min.css';

const AgregarUsuario = () => {
    const [user, setUser] = useState({
        nombre: '',
        ap: '',
        am: '',
        username: '',
        password: '',
        IdRol: '',
        estatus : 1

    });

    const [roles, setRoles] = useState([]);

    const showRoles = () => {
        fetch('http://67.217.243.37:5000/roles')
            .then(response => response.json())
            .then(data => {
                setRoles(data);
            })
            .catch(error => {
                console.error('Error fetching roles:', error);
            });
    };

    const insertar_usuario = () => {
        console.log(user);
        fetch('http://67.217.243.37:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        
            body: JSON.stringify(user)
    
        }
    )    
            .then(response => {
                if (!response.ok) throw new Error('Error al insertar');
                return response.json();
            })
            .then(data => {
                console.log("En usuario:", user);
                if (data.success) {
                    console.log("Usuario insertado:", data);
                    alert('Usuario Registrado Exitosamente');
                    setUser({
                        nombre: '',
                        ap: '',
                        am: '',
                        username: '',
                        password: '',
                        IdRol: '',
                        estatus : ''
                    });
                } else {
                    console.error("Error en la respuesta del servidor:", data.message);
                }
            })
            .catch(error => console.error('Error al insertar:', error));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        insertar_usuario();
    };

    useEffect(() => {
        showRoles();
    }, []);

    return (
        <div>
            <Row>
                <Col lg={12}>
                    <Widget title={"Registrar Usuario"}>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="name">Nombre del Usuario</Label>
                                <Input
                                    type="text"
                                    name="nombre"
                                    id="name"
                                    placeholder="Ingrese el nombre del usuario"
                                    value={user.nombre}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="ap">Apellido Paterno</Label>
                                <Input
                                    type="text"
                                    name="ap"
                                    id="ap"
                                    placeholder="Ingrese el apellido paterno"
                                    value={user.ap}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="am">Apellido Materno</Label>
                                <Input
                                    type="text"
                                    name="am"
                                    id="am"
                                    placeholder="Ingresa el apellido materno"
                                    value={user.am}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Correo Electrónico</Label>
                                <Input
                                    type="email"
                                    name="username"
                                    id="email"
                                    placeholder="Ingresa el correo electronico"
                                    value={user.username}
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
                                <Label for="rol">Cargo</Label>
                                <select
                                    className="form-control"
                                    name="IdRol"
                                    value={user.IdRol}
                                    onChange={(e) => setUser({ ...user, IdRol: parseInt(e.target.value, 10) })}
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
                            <div className="d-flex justify-content-between">
                                <Button color="primary" type="submit">
                                    Registrar Usuario
                                </Button>
                            </div>
                        </Form>
                    </Widget>
                </Col>
            </Row>
        </div>
    );
};

export default AgregarUsuario;
