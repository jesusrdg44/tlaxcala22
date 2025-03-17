import React from 'react';
import { Row, Col, Button, Table } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import Widget from '../../components/Widget';
import s from './Notifications.module.scss';
import imagentt from "../../images/myicons/produ.png";
import { backgroundColor } from 'echarts/lib/theme/dark';


class Notifications extends React.Component {
  state = {
    options: {
      position: "top-right",
      autoClose: 5000,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
    },
    setCatalogos: [],
  };

  showProductos = async () => {
    try {
      const response = await fetch('http://67.217.243.37:5000/productosmax');
      if (!response.ok) throw new Error('Failed to fetch products');

      const data = await response.json();
      console.log("Catalogos:", data);
      this.setState({ setCatalogos: data });

    } catch (error) {
      console.error('Error fetching products:', error);
      this.setState({ setCatalogos: [] });
    }
  };

  componentDidMount() {
    this.showProductos();
    toast.success('Gracias por revisar la producción!', {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true
    });
  }

  render() {
    const { setCatalogos } = this.state;
    return (
      <div className={s.root}>
        <Widget title={<p style={{ fontWeight: 700 }}>Notificaciones de Producción</p>} customDropDown>
          <Row>
            <Col lg="4" xs="12">
              <h5 className="m-t-1">Los Mejores...</h5>
              <p>Aqui encontraras los productos mas vendidos</p>
              <div className="m-t-1" style={{ textAlign: 'center', margin: 'auto', width: '100px', height: '100px' }}>             
              <img src={imagentt} alt="Imagen" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>

            </Col>

            <div className="m-t-1">
            <Table striped bordered hover style={{ backgroundColor: 'rgb(217, 179, 231)', color: 'white'}}>
              <thead style={{ backgroundColor: 'rgb(217, 179, 231)', color: 'white' }}> 
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Categoría</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Fecha de Creación</th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: 'rgb(217, 179, 231)', color: 'black'}}>
                {setCatalogos.length > 0 ? (
                  setCatalogos.map((catalogo) => (
                    <tr key={catalogo.IdProducto}>
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
                      <td colSpan="7">No se encontraron productos</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Row>
        </Widget>
      </div>
    );
  }
}

export default Notifications;
