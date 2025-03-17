import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import {
  Navbar,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroupAddon,
  InputGroup,
  Input,
  Form,
  NavItem,
  NavLink,
} from "reactstrap";
import cx from "classnames";
import Notifications from "../Notifications";
import { logoutUser } from "../../actions/user";

import {
  toggleSidebar,
  openSidebar,
  closeSidebar,
  changeActiveSidebarItem,
} from "../../actions/navigation";

import userAvatar from "../../images/userAvatar.png";
import search from "../../images/search.svg";
import notify from "../../images/notify.svg";
import lightNotify from "../../images/light-notify.svg";
import messages from "../../images/messages.svg";
import lightMessages from "../../images/messages-filled.svg";
import arrowUnactive from '../../images/Arrow 6.svg'
import arrowActive from '../../images/Arrow 5.svg'


import Notificacion from '../../images/myicons/campana.png';
import Mensajes from '../../images/myicons/correo-electronico.png';
import CuentaPerfil from '../../images/myicons/perfil-del-usuario.png';
import Cuenta2 from  '../../images/myicons/usuario9.png';
import Cuenta3 from '../../images/myicons/perfil.png';


import s from "./Header.module.scss"; // eslint-disable-line css-modules/no-unused-class

class Header extends React.Component {
  static propTypes = {
    sidebarOpened: PropTypes.bool.isRequired,
    sidebarStatic: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.switchSidebar = this.switchSidebar.bind(this);
    this.toggleNotifications = this.toggleNotifications.bind(this);
    this.toggleMessages = this.toggleMessages.bind(this);
    this.toggleAccount = this.toggleAccount.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.doLogout = this.doLogout.bind(this);
    this.changeArrowImg = this.changeArrowImg.bind(this);
    this.changeArrowImgOut = this.changeArrowImgOut.bind(this);

    this.state = {
      menuOpen: false,
      notificationsOpen: false,
      messagesOpen: false,
      accountOpen: false,
      notificationsTabSelected: 1,
      focus: false,
      showNewMessage: false,
      hideMessage: true,
      run: true,
      arrowImg: arrowActive
    };
  }
  state = {
    arrowImg: 'default-arrow.png', // Cambia esto según tu imagen por defecto
    focus: false,
  };

  toggleNotifications() {
    this.setState({
      notificationsOpen: !this.state.notificationsOpen,
    });
  }

  toggleMessages() {
    this.setState({
      messagesOpen: !this.state.messagesOpen,
    });
  }

  toggleAccount() {
    this.setState({
      accountOpen: !this.state.accountOpen,
    });
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  logout = () => {
    this.props.dispatch(logoutUser());
   
  }

  changeArrowImg = () => {
    this.setState({ arrowImg: 'hover-arrow.png' }); // Cambia esto según tu imagen al pasar el mouse
  };

  changeArrowImgOut = () => {
    this.setState({ arrowImg: 'default-arrow.png' }); // Cambia esto según tu imagen por defecto
  };

  toggleFocus = () => {
    this.setState(prevState => ({ focus: !prevState.focus }));
  };



  // collapse/uncolappse
  switchSidebar() {
    if (this.props.sidebarOpened) {
      this.props.dispatch(closeSidebar());
      this.props.dispatch(changeActiveSidebarItem(null));
    } else {
      const paths = this.props.location.pathname.split("/");
      paths.pop();
      this.props.dispatch(openSidebar());
      this.props.dispatch(changeActiveSidebarItem(paths.join("/")));
    }
  }

  // tables/non-tables
  toggleSidebar() {
    this.props.dispatch(toggleSidebar());
    if (this.props.sidebarStatic) {
      localStorage.setItem("staticSidebar", "false");
      this.props.dispatch(changeActiveSidebarItem(null));
    } else {
      localStorage.setItem("staticSidebar", "true");
      const paths = this.props.location.pathname.split("/");
      paths.pop();
      this.props.dispatch(changeActiveSidebarItem(paths.join("/")));
    }
  }

  toggleMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
  }
  render() {
    const { focus } = this.state;
    const { openUsersList } = this.props;

    const user = JSON.parse(localStorage.getItem("user") || '{}');

    const firstUserLetter = (user.name || user.email || "P")[0].toUpperCase();

    return (
      <Navbar
        className={`${s.root} d-print-none`}
        style={{ zIndex: !openUsersList ? 100 : 0, backgroundColor: '#323232' }}
      >
        <NavItem className={`${s.toggleSidebarNav} d-md-none d-flex mr-2`}>
          <NavLink
            className="ml-2 pr-4 pl-3"
            id="toggleSidebar"
            onClick={this.toggleSidebar}
          >
            <i
              className={`la la-bars`}
              style={{ color: "#000" }}
            />
          </NavLink>
        </NavItem>
        <NavItem className={"d-md-down-block d-md-none ml-auto"}>
          <img
            src={search}
            alt="search"
            width="24px"
            height="23px"
            style={{ marginRight: 12 }}
          />
        </NavItem>
        <button 
          className={`btn btn-bordered ml-auto ${s.fullVersionBtn}`}
          onMouseOver={this.changeArrowImg}
          onMouseLeave={this.changeArrowImgOut}
           // Color morado
        >
          </button>
        <Form className={`d-md-down-none`} inline>
          <InputGroup
            // onFocus={this.toggleFocus}
            // onBlur={this.toggleFocus}
            className={`${cx("input-group-no-border", { focus: !!focus })}`}
          >
           
          </InputGroup>
        </Form>
        <Nav>
          <Dropdown
            nav
            isOpen={this.state.notificationsOpen}
            toggle={this.toggleNotifications}
            id="basic-nav-dropdown"
            className={`${s.notificationsMenu}`}
          >
          
            <DropdownMenu
              right
              className={`${s.notificationsWrapper} py-0 animated animated-fast fadeInUp`}
            >
              <Notifications />
            </DropdownMenu>
          </Dropdown>
        
            <DropdownMenu
              right
              className={`${s.notificationsWrapper} py-0 animated animated-fast fadeInUp`}
            >
              <Notifications notificationsTabSelected={2} />
            </DropdownMenu>

<Dropdown
        isOpen={this.state.accountOpen}
        toggle={this.toggleAccount}
        nav
      >
        <DropdownToggle
          nav
          className="text-white"
          style={{ marginLeft: 20 }}
        >
          {this.state.accountOpen ? (
            <img
              src={CuentaPerfil}
              alt="account"
              width="28px"
              height="28px"
            />
          ) : (
            <>
              <img
                src={CuentaPerfil}
                alt="account"
                width="28px"
                height="28px"
              />
              <i
                // className={`fa fa-circle text-success mb-2 ${s.emailStyle}`}
                // Usar en caso de activar notificaciones en el icono de cuenta
              />
            </>
          )}
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={this.logout}>
            Cerrar Sesion 
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
        </Nav>
      </Navbar>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
  };
}

export default withRouter(connect(mapStateToProps)(Header));
