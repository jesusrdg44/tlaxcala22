import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Hammer from "rc-hammerjs";

import Dashboard from "../../pages/dashboard";
import Header from "../Header";
import Sidebar from "../Sidebar";
import {
  openSidebar,
  closeSidebar,
  toggleSidebar,
} from "../../actions/navigation";
import s from "./Layout.module.scss";
import BreadcrumbHistory from "../BreadcrumbHistory";

// pages

import Typography from "../../pages/typography/Typography";
import Reportes from "../../pages/reportes/Reportes";
import Usuarios from "../../pages/usuarios/Usuarios";
import Informes from "../../pages/informes/Informes";
import Inventario from "../../pages/productos/Productos";
import Configuracion from "../../pages/configu/Configuracion";
import UpdateProductos from "../../pages/updateproductos/UpdateProductos";
import DeleteProductos from "../../pages/deleteproductos/DeleteProductos";
import Catalogo  from "../../pages/catalogo/Catalogo";  
import AgregarUsuario from "../../pages/agregarusuario/AgregarUsuario";
import ActualizarUsuario from "../../pages/actualizarusuario/ActualizarUsuario";
import EliminarUsuario from "../../pages/eliminarusuario/EliminarUsuario";  
import Cuenta from "../../pages/cuenta/Cuenta";
import Maps from "../../pages/maps";
import Notifications from "../../pages/notifications/Notifications";
import Icons from "../../pages/icons";
import Tables from "../../pages/tables";
import Charts from "../../pages/charts";




class Layout extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sidebarStatic: true,
    sidebarOpened: true,
  };

  constructor(props) {
    super(props);

    this.handleSwipe = this.handleSwipe.bind(this);
    this.handleCloseSidebar = this.handleCloseSidebar.bind(this);
  }

  componentDidMount() {

    this.handleResize();
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize.bind(this));
  }

  handleResize() {
    if (window.innerWidth <= 768) {
      this.props.dispatch(toggleSidebar());
    } else if (window.innerWidth >= 768) {
      this.props.dispatch(openSidebar());
    }
  }

  handleCloseSidebar(e) {
    if (e.target.closest("#sidebar-drawer") == null && this.props.sidebarOpened && window.innerWidth <= 768) {
      this.props.dispatch(toggleSidebar());
    }
  }

  handleSwipe(e) {
    if ("ontouchstart" in window) {
      if (e.direction === 4) {
        this.props.dispatch(openSidebar());
        return;
      }

      if (e.direction === 2 && this.props.sidebarOpened) {
        this.props.dispatch(closeSidebar());
        return;
      }
    }
  }

  render() {
    return (
      <div
        className={[
          s.root,
          !this.props.sidebarOpened ? s.sidebarClose : "",
          "flatlogic-one",
          "dashboard-light",
        ].join(" ")}
        onClick={e => this.handleCloseSidebar(e)}
      >
        <Sidebar />
        <div className={s.wrap}>
          <Header />

          <Hammer onSwipe={this.handleSwipe}>
            <main className={s.content}>
              <BreadcrumbHistory url={this.props.location.pathname} />
              <TransitionGroup>
                <CSSTransition
                  key={this.props.location.key}
                  classNames="fade"
                  timeout={200}
                >
                  <Switch>
                    <Route
                      path="/app/main"
                      exact
                      render={() => <Redirect to="/app/main/dashboard" />}
                    />
                    <Route
                      path="/app/main/dashboard"
                      exact
                      component={Dashboard}
                    />
                    <Route path={"/app/typography"} component={Typography} />
                    <Route path={"/app/reportes"} component={Reportes} />
                    <Route path={"/app/usuarios"} component={Usuarios} />
                    <Route path={"/app/tables"} component={Tables} />
                    <Route path={"/app/informes"} component={Informes} />
                    <Route path={"/app/ui/maps"} component={Maps} />
                    <Route path={"/app/configuracion"} component={Configuracion} />
                    <Route path={"/app/cuenta"} component={Cuenta} />
                    <Route path={"/app/ui/productos"} component={Inventario} />
                    <Route
                      path={"/app/ui/notifications"}
                      component={Notifications}
                    />
                    <Route path={"/app/ui/icons"} component={Icons} />
                    <Route path={"/app/ui/charts"} component={Charts} />
                    <Route path={"/app/ui/updateproductos"} component={UpdateProductos}/>
                    <Route path={"/app/ui/deleteproductos"} component={DeleteProductos} />
                    <Route path={"/app/ui/agregarusuario"} component={AgregarUsuario} />
                    <Route path={"/app/ui/actualizarusuario"} component={ActualizarUsuario} />
                    <Route path={"/app/ui/eliminarusuario"} component={EliminarUsuario} />
                    <Route path={"/app/ui/catalogo"} component={Catalogo} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </main>
          </Hammer>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
