import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Widget from '../../components/Widget';
import ApexChart from 'react-apexcharts';

class Charts extends Component {
  state = {
    usuarios: [],
    clientes: [],
    productos: [],
  };

  componentDidMount() {
    this.fetchUsuarios();
    this.fetchClientes();
    this.fetchProductos();
  }

  fetchUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:5000/usuarios');
      const data = await response.json();
      this.setState({ usuarios: data });
    } catch (error) {
      console.error('Error fetching usuarios:', error);
    }
  };

  fetchClientes = async () => {
    try {
      const response = await fetch('http://localhost:5000/clientes');
      const data = await response.json();
      this.setState({ clientes: data });
    } catch (error) {
      console.error('Error fetching clientes:', error);
    }
  };

  fetchProductos = async () => {
    try {
      const response = await fetch('http://localhost:5000/productos');
      const data = await response.json();
      this.setState({ productos: data });
    } catch (error) {
      console.error('Error fetching productos:', error);
    }
  };

  render() {
    const { usuarios, clientes, productos } = this.state;

    const usuariosChart = {
      series: [{
        name: 'Usuarios',
        data: usuarios.map((u) => u.IdUsuario),
      }],
      options: {
        chart: { type: 'bar' },
        xaxis: { categories: usuarios.map((u) => u.Nombre) },
      },
    };

    const clientesChart = {
      series: clientes.map((c) => c.IdCliente),
      options: {
        labels: clientes.map((c) => c.Nombre),
        chart: { type: 'pie' },
      },
    };

    const productosChart = {
      series: [{
        name: 'Productos',
        data: productos.map((p) => p.Precio),
      }],
      options: {
        chart: { type: 'bar' },
        xaxis: { categories: productos.map((p) => p.Nombre) },
      },
    };

    return (
      <div>
        <Row>
          <Col lg={6} xs={12}>
            <Widget title={<p style={{ fontWeight: 700 }}>Usuarios</p>}>
              <ApexChart options={usuariosChart.options} series={usuariosChart.series} type='bar' height={300} />
            </Widget>
          </Col>
          <Col lg={6} xs={12}>
            <Widget title={<p style={{ fontWeight: 700 }}>Clientes</p>}>
              <ApexChart options={clientesChart.options} series={clientesChart.series} type='pie' height={300} />
            </Widget>
          </Col>
          <Col lg={12} xs={12}>
            <Widget title={<p style={{ fontWeight: 700 }}>Productos</p>}>
              <ApexChart options={productosChart.options} series={productosChart.series} type='bar' height={300} />
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Charts;