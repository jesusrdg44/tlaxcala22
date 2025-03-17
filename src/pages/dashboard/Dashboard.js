import React from "react";
import { Row, Col, Table } from "reactstrap";

import usersImg from "../../images/usersImg.svg";
import smileImg from "../../images/smileImg.svg";
import totalSale from "../../images/total-sale.svg";
import orders from "../../images/orders.svg";
import stocksImg from "../../images/stocks.svg";
import stocksDownImg from "../../images/stocksDown.svg";

import { chartData } from "./chartsMock";

import Widget from "../../components/Widget";
import { useState, useEffect } from "react";

import s from "./Dashboard.module.scss";
import ApexChart from "react-apexcharts";

//people
import p1 from "../../images/people/p1.png";
import p2 from "../../images/people/p2.png";
import p3 from "../../images/people/p3.png";
import p4 from "../../images/people/p4.png";
import p5 from "../../images/userAvatar.png";

const orderValueOverride = {
  options: {
    chart: {
      height: 350,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    colors: ["rgba(255, 173, 1, 0.3)"],
    plotOptions: {
      bar: {
        columnWidth: "40%",
        distributed: true,
        endingShape: "rounded",
        startingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        show: false,
      },
    },
    grid: {
      padding: {
        left: -9,
        right: 0,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  },
};

const convertionRateOverride = {
  series: [
    {
      data: [280, 300, 170, 200, 230, 190, 260, 100, 290, 280, 300, 250, 240],
    },
  ],
  options: {
    chart: {
      height: 350,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    colors: ["rgba(246, 121, 93, 0.3)"],
    plotOptions: {
      bar: {
        columnWidth: "40%",
        distributed: true,
        endingShape: "rounded",
        startingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        show: false,
      },
    },
    grid: {
      padding: {
        left: -8,
        right: 0,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  },
};

const area = {
  series: [
    {
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  options: {
    stroke: {
      show: true,
      curve: "smooth",
      width: 3,
    },
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: 'solid',
      colors: ["rgba(252, 215, 206, .25)"]
    },
    colors: ["rgba(246, 121, 93)"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        show: false,
      },
    },
    grid: {
      padding: {
        left: 5,
        right: 0,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  },
};

const area2 = {
  series: [
    {
      data: [31, 40, 28, 51, 42, 109, 100],
    },
  ],
  options: {
    stroke: {
      show: true,
      curve: "smooth",
      width: 3,
    },
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: 'solid',
      colors: ["rgba(255, 230, 179, .25)"]
    },
    colors: ["rgba(255, 173, 1)"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        show: false,
      },
    },
    grid: {
      padding: {
        left: 5,
        right: 0,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  },
};

const splineArea = {
  series: [
    {
      name: "Ingresos",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "Salidas",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  options: {
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    fill: {
      colors: ["rgb(231, 204, 252))", 'rgba(0,0,0,0)'],
      type: 'solid'
    },
    colors: ["violet", "black"],
    legend: {
      position: "top",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    yaxis: {
      labels: {
        style: {
          colors: [
            "rgba(18, 4, 0, .5)",
            "rgba(18, 4, 0, .5)",
            "rgba(18, 4, 0, .5)",
            "rgba(18, 4, 0, .5)",
            "rgba(18, 4, 0, .5)",
            "rgba(18, 4, 0, .5)",
            "rgba(18, 4, 0, .5)",
          ],
          fontWeight: 300,
        },
      },
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
      labels: {
        style: {
          colors: [
            "rgba(18, 4, 0, .5)",
            "rgba(18, 4, 0, .5)",
            "rgba(18, 4, 0, .5)",
            "rgba(18, 4, 0, .5)",
            "rgba(18, 4, 0, .5)",
            "rgba(18, 4, 0, .5)",
            "rgba(18, 4, 0, .5)",
          ],
          fontWeight: 300,
        },
      },
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  },
};

class Dashboard extends React.Component {
 
  constructor() {
    super();
    this.forceUpdate = this.forceUpdate.bind(this)
  }
 
  state = {
    orderValue: { ...chartData.apex.column, ...orderValueOverride },
    convertionRate: { ...chartData.apex.column, ...convertionRateOverride },
    area: { ...area },
    area2: { ...area2 },
    splineArea: { ...splineArea },
    admins : [],
    numusuarios: [],
    numclientes : [],
    numinformes : [] ,
    numproductos : [],

  };

  componentDidMount() {
    this.fetchAdmins();
  
    this.fetchnumUsuarios();
    this.fetchnumClientes();
    this.fetchnumInformes();
    this.fetchnumProductos();
  }

  fetchnumProductos = () => {
    fetch("http://67.217.243.37:5000/numproductos")
    .then((response) => response.json())
    .then((data) => {
      this.setState({ numproductos: data });
    })
    .catch((error) => console.error("Error fetching numproductos:", error));
  }

  fetchnumInformes = () => {
    fetch("http://67.217.243.37:5000/numinformes")
    .then((response) => response.json())
    .then((data) => {
      this.setState({ numinformes: data });
    })
    .catch((error) => console.error("Error fetching numinformes:", error));
  };

  fetchnumClientes = () =>{
    fetch("http://67.217.243.37:5000/numclientes")

    .then((response) => response.json())
    .then((data) => {
      this.setState({ numclientes: data });
    })
    .catch((error) => console.error("Error fetching numclientes:", error));
  };

  fetchnumUsuarios = () => {  
    fetch("http://67.217.243.37:5000/numusuarios")

      .then((response) => response.json())
      .then((data) => {
        this.setState({ numusuarios: data });
      })
      .catch((error) => console.error("Error fetching numusuarios:", error));
  };



  fetchAdmins = () => {
    fetch("http://67.217.243.37:5000/admins")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ admins: data });
      })
      .catch((error) => console.error("Error fetching admins:", error));
  };

  // componentDidMount() {
  //   window.addEventListener("resize", this.forceUpdate.bind(this))
  // }

  

  forceUpdate() {
    return this.setState({})
  }

  render() {
    const {admins , numusuarios , numclientes , numinformes, numproductos} = this.state;  

    




    return (
      <div className={s.root}>
        <Row>
          <Col xl={4}>
            <Widget
              title={<p style={{ fontWeight: 700 }}>Informes Mensuales</p>}
              customDropDown
            >
              <Row className={`justify-content-between mt-3`} noGutters>
                <Col sm={8} className={"d-flex align-items-center"}>
                <h3 className={"fw-semi-bold pt-1 mb-0"}>

                
                {numinformes.length > 0 ? (
                numinformes.map((numinforme, index) => (
                  <div key={index}>
                    {/* Render the admin details here */}
                    {numinforme.NumInformes} Archivos .pdf Generados
                  </div>
                ))
                ) : (
                <p>No existen informes</p>
                )}
                </h3>




                  
                </Col>
                <Col
                  sm={4}
                  className={"d-flex align-items-center justify-content-end"}
                >
                  <img src={stocksImg} alt="" className={"mr-1"} />
                  <p className={"text-success mb-0"}>40%</p>
                </Col>
              </Row>
              <Row style={{ marginBottom: -9, marginTop: -1 }}>
                <Col sm={12}>
                  <ApexChart
                    className="sparkline-chart"
                    height={80}
                    series={this.state.orderValue.series}
                    options={this.state.orderValue.options}
                    type={"bar"}
                  />
                </Col>
              </Row>
            </Widget>
          </Col>
          <Col xl={4}>
            <Widget
              title={<p style={{ fontWeight: 700 }}>Almacen</p>}
              customDropDown
            >
              <Row className={`justify-content-between mt-3`} noGutters>
                <Col sm={8} className={"d-flex align-items-center"}>
                  <h3 className={"fw-semi-bold mb-0"}>20.7%</h3>
                </Col>
                <Col
                  sm={4}
                  className={"d-flex align-items-center justify-content-end"}
                >
                  <img src={stocksImg} alt="" className={"mr-1"} />
                  <p className={"text-success mb-0"}>15%</p>
                </Col>
              </Row>
              <Row style={{ marginBottom: -9, marginTop: -1 }}>
                <Col sm={12}>
                  <ApexChart
                    className="sparkline-chart"
                    height={80}
                    series={this.state.convertionRate.series}
                    options={this.state.convertionRate.options}
                    type={"bar"}
                  />
                </Col>
              </Row>
            </Widget>
          </Col>
          <Col xl={window.innerWidth > 1280 ? 2 : 4} sm={6}>
            <Widget>
              <Row
                className={`${s.row} justify-content-center align-items-center`}
              >
                <Col
                  sm={12}
                  className={
                    "d-flex justify-content-center align-items-center mb-2"
                  }
                >
                  <img src={usersImg} alt="" style={{ paddingTop: 30 }} />
                </Col>
                <Col
                  sm={12}
                  className={"d-flex justify-content-center align-items-center"}
                >
                  <h3 className={"fw-semi-bold pt-1 mb-0"}>

                  {numusuarios.length > 0 ? (
                numusuarios.map((numusuario, index) => (
                  <div key={index}>
                    {/* Render the admin details here */}
                    {numusuario.NumUsuarios}
                  </div>
                ))
                ) : (
                <p>No existen usuarios</p>
                )}
                     
                  </h3>

                </Col>
                <Col
                  sm={12}
                  className={"d-flex justify-content-center align-items-center"}
                >
                  <h5 className={"fw-thin pt-1 mb-0"}>Usuarios</h5>
                </Col>
                <Col
                  sm={12}
                  className={
                    "d-flex justify-content-center align-items-center pt-1"
                  }
                >
                  <img src={stocksImg} alt="" className={"mr-1"} />
                  <p className={"fw-thin text-success mb-0"}>15%</p>
                </Col>
              </Row>
            </Widget>
          </Col>
          <Col xl={2} className={`${s.dashboardBlock}`} sm={6}>
            <Widget>
              <Row
                className={`${s.row} justify-content-center align-items-center`}
              >
                <Col
                  sm={12}
                  className={
                    "d-flex justify-content-center align-items-center mb-2"
                  }
                >
                  <img src={smileImg} alt="" style={{ paddingTop: 30 }} />
                </Col>
                <Col
                  sm={12}
                  className={"d-flex justify-content-center align-items-center"}
                >
                  <h3 className={"fw-semi-bold pt-1 mb-0"}>
                  {numclientes.length > 0 ? (
                numclientes.map((numcliente, index) => (
                  <div key={index}>
                    {/* Render the admin details here */}
                    {numcliente.NumClientes}
                  </div>
                ))
                ) : (
                <p>No existen clientes</p>
                )}





                  </h3>
                </Col>
                <Col
                  sm={12}
                  className={"d-flex justify-content-center align-items-center"}
                >
                  <h5 className={"fw-thin pt-1 mb-0"}>Clientes</h5>
                </Col>
                <Col
                  sm={12}
                  className={
                    "d-flex justify-content-center align-items-center pt-1"
                  }
                >
                  <img src={stocksImg} alt="" className={"mr-1"} />
                  <p className={"fw-thin text-success mb-0"}>15%</p>
                </Col>
              </Row>
            </Widget>
          </Col>
        </Row>
        <Row>
          <Col xl={4}>
            <Widget
              title={<p style={{ fontWeight: 700 }}>Balance de Costos</p>}
              customDropDown
            >
              <Row className={`justify-content-between mt-3`} noGutters>
                <Col sm={8} className={"d-flex align-items-center"}>
                  <h3 className={"fw-semi-bold mb-0"}>20.7%</h3>
                </Col>
                <Col
                  sm={4}
                  className={"d-flex align-items-center justify-content-end"}
                >
                  <img src={stocksImg} alt="" className={"mr-1"} />
                  <p className={"text-success mb-0"}>20%</p>
                </Col>
              </Row>
              <Row style={{ marginBottom: -9, marginTop: -1 }}>
                <Col sm={12}>
                  <ApexChart
                    className="sparkline-chart"
                    height={80}
                    series={this.state.area.series}
                    options={this.state.area.options}
                    type={"area"}
                  />
                </Col>
              </Row>
            </Widget>
          </Col>
          <Col xl={4}>
            <Widget
              title={<p style={{ fontWeight: 700 }}>Productos</p>}
              customDropDown
            >
              <Row className={`justify-content-between mt-3`} noGutters>
                <Col sm={8} className={"d-flex align-items-center"}>
                  <h3 className={"fw-semi-bold mb-0"}>12</h3>
                </Col>
                <Col
                  sm={4}
                  className={"d-flex align-items-center justify-content-end"}
                >
                  <img src={stocksImg} alt="" className={"mr-1"} />
                  <p className={"text-success mb-0"}>14%</p>
                </Col>
              </Row>
              <Row style={{ marginBottom: -9, marginTop: -1 }}>
                <Col sm={12}>
                  <ApexChart
                    className="sparkline-chart"
                    height={80}
                    series={this.state.area2.series}
                    options={this.state.area2.options}
                    type={"area"}
                  />
                </Col>
              </Row>
            </Widget>
          </Col>
          <Col xl={window.innerWidth > 1280 ? 2 : 4} sm={6}>
            <Widget>
              <Row
                className={`${s.row} justify-content-center align-items-center`}
              >
                <Col
                  sm={12}
                  className={
                    "d-flex justify-content-center align-items-center mb-2"
                  }
                >
                  <img src={totalSale} alt="" style={{ paddingTop: 30 }} />
                </Col>
                <Col
                  sm={12}
                  className={"d-flex justify-content-center align-items-center"}
                >
                  <h3 className={"fw-semi-bold pt-1 mb-0"}>

                  {numinformes.length > 0 ? (
                numinformes.map((numinforme, index) => (
                  <div key={index}>
                    {/* Render the admin details here */}
                    {numinforme.NumInformes}
                  </div>
                ))
                ) : (
                <p>No existen informes</p>
                )}

                    





                  </h3>
                </Col>
                <Col
                  sm={12}
                  className={"d-flex justify-content-center align-items-center"}
                >
                  <h5 className={"fw-thin pt-1 mb-0"}>Informes</h5>
                </Col>
                <Col
                  sm={12}
                  className={
                    "d-flex justify-content-center align-items-center pt-1"
                  }
                >
                  <img src={stocksImg} alt="" className={"mr-1"} />
                  <p className={"fw-thin text-success mb-0"}>15%</p>
                </Col>
              </Row>
            </Widget>
          </Col>
          <Col xl={2} className={`${s.dashboardBlock}`} sm={6}>
            <Widget>
              <Row
                className={`${s.row} justify-content-center align-items-center`}
              >
                <Col
                  sm={12}
                  className={
                    "d-flex justify-content-center align-items-center mb-2"
                  }
                >
                  <img src={orders} alt="" style={{ paddingTop: 30 }} />
                </Col>
                <Col
                  sm={12}
                  className={"d-flex justify-content-center align-items-center"}
                >
                  <h3 className={"fw-semi-bold pt-1 mb-0"}>
                  {numproductos.length > 0 ? (
                numproductos.map((numproducto, index) => (
                  <div key={index}>
                    {/* Render the admin details here */}
                    {numproducto.NumProductos}
                  </div>
                ))
                ) : (
                <p>No existen productos</p>
                )}



                    
                  </h3>
                </Col>
                <Col
                  sm={12}
                  className={"d-flex justify-content-center align-items-center"}
                >
                  <h5 className={"fw-thin pt-1 mb-0"}>Producción</h5>
                </Col>
                <Col
                  sm={12}
                  className={
                    "d-flex justify-content-center align-items-center pt-1"
                  }
                >
                  <img src={stocksDownImg} alt="" className={"mr-1"} />
                  <p className={"fw-thin text-danger mb-0"}>15%</p>
                </Col>
              </Row>
            </Widget>
          </Col>
        </Row>
        <Row>
          <Col xl={8}>
            <Widget
              title={
                <Row>
                  <Col xs={12} sm={5}>
                    <p style={{ fontWeight: 700 }}>Balance Productos</p>
                  </Col>
                  <Col xs={12} sm={7}>
                    <div className="chart-legend" />
                  </Col>
                </Row>
              }
              customDropDown
            >
              <Row className={s.dailyLineChart}>
                <Col sm={12}>
                  <ApexChart
                    className="sparkline-chart"
                    series={this.state.splineArea.series}
                    options={this.state.splineArea.options}
                    type={"area"}
                    height={"350px"}
                  />
                </Col>
              </Row>
            </Widget>
          </Col>
          <Col xl={4}>
            <Widget
              title={<p style={{ fontWeight: 700 }}>Estatus Informes</p>}
              customDropDown
            >
              <Row
                className={`${s.row} justify-content-center`}
                noGutters
                style={{ marginBottom: 30, marginTop: 24 }}
              >
                
                <ApexChart
                  className="sparkline-chart"
                  type={"donut"}
                  height={180}
                  series={chartData.apex.pie.series}
                  options={chartData.apex.pie.options}
                />
                
              </Row>
              <Row className={`justify-content-between`}>
                <Col sm={4}>
                  <div className={`${s.pieElementsDanger} ${s.pieElements}`}>
                    <h4 className={"mt-3 mb-1"}>
                    {numinformes.length > 0 ? (
                numinformes.map((numinforme, index) => (
                  <div key={index}>
                    {/* Render the admin details here */}
                    {numinforme.NumInformes}
                  </div>
                ))
                ) : (
                <p>No existen productos</p>
                )}
                    </h4>
                    <p>Completados</p>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className={`${s.pieElementsWarning} ${s.pieElements}`}>
                    <h4 className={"mt-3 mb-1"}>
                    {numclientes.length > 0 ? (
                numclientes.map((numcliente, index) => (
                  <div key={index}>
                    {/* Render the admin details here */}
                    {numcliente.NumClientes}
                  </div>
                ))
                ) : (
                <p>No existen productos</p>
                )}
                    </h4>
                    <p>Clientes</p>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className={`${s.pieElementsBlack} ${s.pieElements}`}>
                    <h4 className={"mt-3 mb-1"}>

                    {numproductos.length > 0 ? (
                numproductos.map((numproducto, index) => (

                  <div key={index}>
                    {/* Render the admin details here */}
                    {numproducto.NumProductos}
                  </div>
                ))
                ) : (
                <p>No existen productos</p>
                )}

                    </h4>
                    <p>Productos</p>
                  </div>
                </Col>
              </Row>
            </Widget>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
          <Widget
              customDropDown
              title={<p className={"fw-bold"}>Administradores</p>}
            >
              <Table className={"mb-0"} borderless responsive>
                <thead>
                  <tr>
                    <th scope="col" className={"pl-0"}>Identificador</th>
                    <th scope="col" className={"pl-0"}>Nombre</th>
                    <th scope="col" className={"pl-0"}>Estatus</th>
                    <th scope="col" className={"pl-0"}>Cargo</th>
                  </tr>
                </thead>
                <tbody className="text-dark">
                  {admins.length > 0 ? (
                    admins.map((admin, index) => (
                      <tr key={index}>
                        <td className="fw-thin pl-0">
                          {admin.IdUsuario}
                        </td>
                        <td className="pl-0 fw-thin">
                        {/* {`${admin.Nombre} ${admin.Ap} ${admin.Am}`} */}
                        {admin.NombreCompleto}

                        </td>
                        <td className="pl-0 fw-normal">
                          {admin.Estatus}
                        </td>
                        <td className="pl-0 fw-thin">
                          {admin.Nombre_Rol}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">No admins found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
