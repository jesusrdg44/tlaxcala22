import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { dismissAlert } from "../../actions/alerts";
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup/LinksGroup";
import {
  changeActiveSidebarItem
} from "../../actions/navigation";
import { logoutUser } from "../../actions/user";

import lightDashboardIcon from "../../images/light-dashboard.svg";
import darkDashboardIcon from "../../images/dark-dashboard.svg";
import lightTables from "../../images/tables.svg";
import darkTables from "../../images/tables-dark.svg";
import lightUI from "../../images/ui-elements.svg";
import darkUI from "../../images/ui-elements-dark.svg";

import IconReportes from '../../images/myicons/dinero.png';
import IconInformes from '../../images/myicons/info.png';
import IconProductos from '../../images/myicons/agregar-producto.png';
import IconMenu from '../../images/myicons/casa.png'; 
import IconConfig from '../../images/myicons/configuracion-de-sincronizacion.png';
import IconCuenta from '../../images/myicons/la-configuracion-de-privacidad.png';
import IconSalir from '../../images/myicons/cerrar-sesion.png'; 
import Usuarios from '../../images/myicons/persona.png';
import Produccion from "../../images/myicons/produccion.png";
import Estadisticas from "../../images/myicons/grafico.png";


import darkTypography from "../../images/Typography-dark.svg";
import logo from "../../images/nuevo-tlax.png";
import settingsIcon from "../../images/settings.svg";
import logoutIcon from "../../images/logout.svg";
import accountIcon from "../../images/account.svg";

class Sidebar extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    activeItem: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string
    }).isRequired
  };

  static defaultProps = {
    sidebarStatic: true,
    sidebarOpened: true,
    activeItem: ""
  };

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
  }

  dismissAlert(id) {
    this.props.dispatch(dismissAlert(id));
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  render() {
    return (
        <div className={`${(!this.props.sidebarOpened && !this.props.sidebarStatic ) ? s.sidebarClose : ''} ${s.sidebarWrapper}`} id={"sidebar-drawer"}>
        <nav className={s.root}>
          <header className={s.logo}>
            <img src={logo} alt="logo" className={s.logoStyle} style={{width:'180px', height:'auto'}}/>

          </header>
          <h5 className={s.navTitle}>Opciones</h5>
          <ul className={s.nav}>
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Menú Principal"
              isHeader
              link="/app/main/dashboard"
              index="main"
            >
              {window.location.href.includes("dashboard") ? (
                <img
                  src={IconMenu}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              ) : (
                <img
                  src={IconMenu}  
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              )}
            </LinksGroup>
          </ul>
          <h5 className={s.navTitle}>Herramientas</h5>
          <ul className={s.nav}>
    
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Reportes"
              isHeader
              link="/app/reportes"
              index="main"
            >
              {window.location.href.includes("reportes") ? (
                <img
                  src={IconReportes}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              ) : (
                <img
                  src={IconReportes}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              )}
            </LinksGroup>
            

            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Informes"
              isHeader
              link="/app/informes"
              index="main"
            >
              {window.location.href.includes("informes") ? (
                <img
                  src={IconInformes}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              ) : (
                <img
                  src={IconInformes}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              )}
            </LinksGroup>

       
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Usuarios"
              isHeader
              link="/app/ui"
              index="ui"
              exact={false}
              childrenLinks={[
                {
                  header: "Agregar Usuario",
                  link: "/app/ui/agregarusuario"
                },
                {
                  header: "Actualizar Usuario",
                  link: "/app/ui/actualizarusuario"
                },
              
                {
                  header: "Mostrar Usuarios",
                  link: "/app/usuarios"
                }
                
                
              ]}
            >
              {window.location.href.includes("usuarios") ? (
                <img
                  src={Usuarios}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              ) : (
                <img
                  src={Usuarios}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              )}
            </LinksGroup>


            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Inventario"
              isHeader
              link="/app/ui"
              index="ui"
              exact={false}
              childrenLinks={[
                {
                  header: "Agregar Producto",
                  link: "/app/ui/productos"
                },
                {
                  header: "Actualizar Producto",
                  link: "/app/ui/updateproductos"
                },
                {
                  header: "Eliminar Producto",
                  link: "/app/ui/deleteproductos"
                },
                {
                  header: "Catalogo Completo",
                  link: "/app/ui/catalogo"
                }
              ]}
            >
              {window.location.href.includes("ui") ? (
                <img
                  src={IconProductos}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              ) : (
                <img
                  src={IconProductos}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              )}
            </LinksGroup>
          </ul>
          <ul className={s.downNav}>
            <hr />
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              header="Produccion"
              isHeader
              link="/app/ui/notifications"
              index="main"
            >
              <img
                src={Produccion}
                alt="lightDashboard"
                width={"24px"}
                height={"24px"}
              />
            </LinksGroup>
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              header="Estadisticas"
              link="/app/ui/charts"
              isHeader
            >
              <img
                src={Estadisticas}
                alt="lightDashboard"
                width={"24px"}
                height={"24px"}
              />
            </LinksGroup>
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              header="Cerrar Sesion"
              link="/login"
              isHeader
              onClick={() => this.doLogout()}
            >
              {window.location.href.includes("another-page") ? (
                <img
                  src={IconSalir}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              ) : (
                <img
                  src={IconSalir}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              )}
            </LinksGroup>
          </ul>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    alertsList: store.alerts.alertsList,
    activeItem: store.navigation.activeItem,
    navbarType: store.navigation.navbarType,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
