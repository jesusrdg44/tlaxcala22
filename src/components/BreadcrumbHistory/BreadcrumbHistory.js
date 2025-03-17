import React, { Component } from "react";
import axios from "axios"; // Asegúrate de que axios está instalado
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
} from "reactstrap";
import s from "./BreadcrumbHistory.module.scss";

class BreadcrumbHistory extends Component {
  state = {
    date: "22 Febrero 2025",
    informes: [], // Lista de informes disponibles
    informeSeleccionado: null, // Informe seleccionado
  };

  componentDidMount() {
    this.cargarInformes();
  }
  
  cargarInformes = async () => {
    try {
      const res = await axios.get("http://67.217.243.37:5000/informes");
      this.setState({ informes: res.data });
    } catch (error) {
      console.error("Error al obtener informes:", error);
    }
  };

  seleccionarInforme = (informe) => {
    this.setState({ informeSeleccionado: informe });
  };

  descargarInforme = async () => {
    const { informeSeleccionado } = this.state;
    
    if (!informeSeleccionado) {
      console.error("Error: No se ha seleccionado ningún informe");
      return;
    }

    try {
      const res = await axios.get(`http://67.217.243.37:5000/informes/${informeSeleccionado.IdInforme}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${informeSeleccionado.Titulo}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error al descargar el informe:", error);
    }
  };

  renderBreadCrumbs = () => {
    let route = this.props.url
      .split("/")
      .slice(1)
      .slice(1)
      .map((route) =>
        route
          .split("-")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" ")
      );
    const length = route.length;
    return route.map((item, index) =>
      length === index + 1 ? (
        <BreadcrumbItem key={index} className={"active"}>
          {item}
        </BreadcrumbItem>
      ) : (
        <BreadcrumbItem key={index}>{item}</BreadcrumbItem>
      )
    );
  };

  render() {
    return (
      <>
        {this.props.url !== "/app/chat" ? (
          <Row noGutters>
            <Col lg={5}>
              <Breadcrumb tag="nav" listTag="div">
                {this.renderBreadCrumbs()}
              </Breadcrumb>
            </Col>
            {this.props.url === "/app/main/dashboard" ? (
              <Col lg={7} className={`d-flex align-items-start justify-content-center pr-0 ${s.dashboardButtons} mt-1`}>
                {/* Dropdown para seleccionar informe */}
                <UncontrolledButtonDropdown className="ml-lg-auto ml-md-0">
                  <DropdownToggle caret color="default" className={`dropdown-toggle-split ${s.customDropdown}`}>
                    {this.state.informeSeleccionado ? this.state.informeSeleccionado.Titulo : "Seleccionar Informe"} &nbsp;&nbsp;
                  </DropdownToggle>
                  <DropdownMenu>
                    {this.state.informes.length > 0 ? (
                      this.state.informes.map((informe) => (
                        <DropdownItem key={informe.IdInforme} onClick={() => this.seleccionarInforme(informe)}>
                          {informe.Titulo}
                        </DropdownItem>
                      ))
                    ) : (
                      <DropdownItem disabled>No hay informes</DropdownItem>
                    )}
                  </DropdownMenu>
                </UncontrolledButtonDropdown>

                {/* Botón para descargar informe */}
                <Button
                  color={"danger"}
                  className={`${s.btnShadow}`}
                  style={{ borderRadius: "35px", backgroundColor: "rgb(181, 124, 227)" }}
                  onClick={this.descargarInforme}
                >
                  Descargar Informe
                </Button>
              </Col>
            ) : null}
          </Row>
        ) : null}
      </>
    );
  }
}

export default BreadcrumbHistory;
