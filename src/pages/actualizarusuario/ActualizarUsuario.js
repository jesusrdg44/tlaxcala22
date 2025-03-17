import React, { useState, useEffect } from "react";
import { Col, Row, Button, Table, FormGroup, Form, Label, Input } from "reactstrap";
import Widget from "../../components/Widget/Widget";
import 'bootstrap/dist/css/bootstrap.min.css';

const ActualizarUsuario = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [roles, setRoles] = useState([]);

    const showRoles = () => {
        fetch('http://67.217.243.37:5000/roles')
            .then(response => response.json())
            .then(data => setRoles(data))
            .catch(error => console.error('Error fetching roles:', error));
    };

    const fetchUsuarios = () => {
        fetch('http://67.217.243.37:5000/usuarios')
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch usuarios');
                return response.json();
            })
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching usuarios:', error));
    };

    const updateUser = () => {
        if (!selectedUser) return;

        fetch(`http://67.217.243.37:5000/usuarios/${selectedUser.IdUsuario}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(selectedUser)
        })
        .then(response => {
            if (!response.ok) throw new Error('Error al actualizar usuario');
            return response.json();
        })
        .then(data => {
            console.log("Usuario actualizado:", data);
            alert('Usuario Actualizado Exitosamente');
            setSelectedUser(null);
            fetchUsuarios();
        })
        .catch(error => console.error('Error al actualizar usuario:', error));
    };

    const handleChange = (e) => {
        setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
    };

    const handleRowClick = (usuario) => {
        setSelectedUser(usuario);
        
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser();
    };

    useEffect(() => {  
        fetchUsuarios();
        showRoles();
    }, []);

    return (
        <div>
            <Row>
                <Col lg={12}>
                    <Widget title={"Actualizar Usuario"}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Apellido Paterno</th>
                                    <th>Apellido Materno</th>
                                    <th>Correo Electrónico</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((usuario) => (
                                        <tr key={usuario.IdUsuario} onClick={() => handleRowClick(usuario)}>
                                            <td>{usuario.IdUsuario}</td>
                                            <td>{usuario.Nombre}</td>
                                            <td>{usuario.Ap}</td>
                                            <td>{usuario.Am}</td>
                                            <td>{usuario.username}</td>
                                            <td className="text-center">
                                                <Button color="success" className="mr-2">
                                                    Actualizar
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">No se encontraron usuarios</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>

                        {selectedUser && (
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="name">Nombre del Usuario</Label>
                                    <Input
                                        type="text"
                                        name="Nombre"
                                        id="name"
                                        placeholder="Ingrese el nombre del usuario"
                                        value={selectedUser.Nombre || ''}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="ap">Apellido Paterno</Label>
                                    <Input
                                        type="text"
                                        name="Ap"
                                        id="ap"
                                        placeholder="Ingrese el apellido paterno"
                                        value={selectedUser.Ap || ''}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="am">Apellido Materno</Label>
                                    <Input
                                        type="text"
                                        name="Am"
                                        id="am"
                                        placeholder="Ingresa el apellido materno"
                                        value={selectedUser.Am || ''}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Correo Electrónico</Label>
                                    <Input
                                        type="email"
                                        name="username"
                                        id="email"
                                        placeholder="Ingresa el correo electrónico"
                                        value={selectedUser.username || ''}
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
                                        value={selectedUser.password || ''}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="rol">Cargo</Label>
                                    <select
                                        className="form-control"
                                        name="IdRol"
                                        value={selectedUser.IdRol || ''}
                                        onChange={(e) => setSelectedUser({ ...selectedUser, IdRol: parseInt(e.target.value, 10) })}
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

export default ActualizarUsuario;
