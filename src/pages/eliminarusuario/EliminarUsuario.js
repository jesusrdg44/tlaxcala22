import React from "react";
import { Col, Row, Button ,Table, Form, FormGroup, Label , Input} from "reactstrap";
import Widget from "../../components/Widget/Widget";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";



const EliminarUsuario = () => {

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
    
        const deleteUser = (user) => {
    
            fetch(`http://67.217.243.37:5000/usuarios/${user.IdUsuario}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedUser)
            })
            .then(response => {
                if (!response.ok) throw new Error('Error al actualizar usuario');
                return response.json();
            })
            .then(data => {
                console.log("Usuario eliminado:", data);
                alert('Usuario Eliminado Exitosamente');
                setUsers(users.filter(p => p.IdUsuario !== users.IdUsuario));
            })
            .catch(error => console.error('Error al eliminar usuario:', error));
        };
    
    
        const handleRowClick = (usuario) => {
            setSelectedUser(usuario);
            
        };
        
    
        useEffect(() => {  
            fetchUsuarios();
            showRoles();
        }, []);
  return (
    <div>
            <Row>
                <Col lg={12}>
                    <Widget title={"Eliminar Usuario"}>
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
                                                <Button color="danger" className="mr-2" onClick={() => deleteUser(usuario)}>
                                                    Eliminar
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

                       
                        
                    </Widget>
                </Col>
            </Row>
        </div>
  );
};

export default EliminarUsuario;