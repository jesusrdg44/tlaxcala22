import React from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Alert, Button, Label, FormGroup, Input } from "reactstrap";
import Widget from "../../components/Widget";
import { registerUser, registerError } from "../../actions/register";
import { loginUser } from "../../actions/user";
import Login from "../login";
import logo from "../../images/nuevo-tlax.png";
import FondoTlax from  '../../images/hua.png';
import signupImg from "../../images/signupImg.svg";
import s from './Register.module.scss';


import img1 from "../../images/Vector-1.svg";
import img2 from "../../images/Vector-2.svg";
import img3 from "../../images/Vector-3.svg";
import img4 from "../../images/Vector-4.svg";

class Register extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      nombre: "",
      ap: "",
      am: "",
      rol: "",
      roles: []
    };

    this.doRegister = this.doRegister.bind(this);
    this.googleLogin = this.googleLogin.bind(this);
    this.microsoftLogin = this.microsoftLogin.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeConfirmPassword = this.changeConfirmPassword.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.isPasswordValid = this.isPasswordValid.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeNombre = this.changeNombre.bind(this);
    this.changeap = this.changeap.bind(this);
    this.changeam = this.changeam.bind(this);
    this.changeRole = this.changeRole.bind(this);
    this.fetchRoles = this.fetchRoles.bind(this);
  }

  componentDidMount() {
    this.fetchRoles();
  }

  changeEmail(event) {
    this.setState({ email: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  changeConfirmPassword(event) {
    this.setState({ confirmPassword: event.target.value });
  }

  changeNombre(event) {
    this.setState({ nombre: event.target.value });
  }

  changeap(event) {
    this.setState({ ap: event.target.value });
  }

  changeam(event) {
    this.setState({ am: event.target.value });
  }

  changeRole(event) {
    this.setState({ rol: event.target.value });
  }

  fetchRoles() {
    fetch('http://localhost:5000/roles')
      .then(response => response.json())
      .then(data => {
        this.setState({ roles: data });
      })
      .catch(error => {
        console.error('Error fetching roles:', error);
      });
  }



  checkPassword() {
    if (!this.isPasswordValid()) {
      if (!this.state.password) {
        this.props.dispatch(registerError("Password field is empty"));
      } else {
        this.props.dispatch(registerError("Passwords are not equal"));
      }
      setTimeout(() => {
        this.props.dispatch(registerError());
      }, 3 * 1000);
    }
  }

  isPasswordValid() {
    return (
      this.state.password && this.state.password === this.state.confirmPassword
    );
  }
  

  doRegister(e) {
    e.preventDefault();
    const { email, password, nombre, ap, am,  rol } = this.state;
    const estatus=1;

    if ( !email || !password || !nombre || !ap ||  !am || !estatus || !rol){
      alert ('Todos los campos son requeridos');
      return;
    }

    // console.log("Enviando datos:", JSON.stringify({ 
    //   username: email, 
    //   password, 
    //   nombre, 
    //   ap, 
    //   am, 
    //   estatus, 
    //   IdRol: rol 
    // }));
  
    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         username: email, password, nombre, ap, am, estatus, IdRol: rol }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.props.dispatch(registerUser({
            creds: { email, password },
            history: this.props.history,
          }));
        } else {
          this.props.dispatch(registerError(data.message));
        }
      })
      .catch(error => {
        console.error('Error:', error);
        this.props.dispatch(registerError('Fallo en el registro'));
      });
  }
  

  googleLogin() {
    this.props.dispatch(loginUser({ social: "google" }));
  }

  microsoftLogin() {
    this.props.dispatch(loginUser({ social: "microsoft" }));
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };
  

  handleSubmit(e) {
  e.preventDefault();    
      this.doRegister(e);
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/app" },
    }; // eslint-disable-line

    // cant access login page while logged in
    if (Login.isAuthenticated(localStorage.getItem("authenticated"))) {
      return <Redirect to={from} />;
    }

    return (
       <div style={{
             position : 'absolute', 
             top: 0,
             left : 0,      
             height: '100%',
             display: 'flex',
             justifyContent: 'cover',
             alignItems: 'cover',
             backgroundImage: `url(${FondoTlax})`,
             zIndex: '1',  
             cover: 'center',

             backgroundAttachment: 'fixed',
             width: '100%'
           }}>
             <div style={{
               background: 'white',
               padding: '40px',
               borderRadius: '10px',
               boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
               width: '350px',
               textAlign: 'center'
             }}>
               <img src={logo} alt="Logo" width="150" style={{ marginBottom: '20px' }} />
               <h2 style={{ color: '#007bff', fontWeight: 'bold' }}>Crear Cuenta</h2>
               <form onSubmit={this.handleSubmit} noValidate>
               <div className="form-group mb-3">
                   <input
                     type="text"
                     name="nombre"
                     className="form-control form-control-lg"
                     placeholder="Nombre"
                     value={this.state.nombre}
                     onChange={this.changeNombre}
                     required
                     style={{ borderRadius: '25px' }}
                   />
                 </div>
                 
                 <div className="form-group mb-3">
                   <input
                     type="text"
                     name="ap"
                     className="form-control form-control-lg"
                     placeholder="Apellido Paterno"
                     value={this.state.ap}
                     onChange={this.changeap}
                     required
                     style={{ borderRadius: '25px' }}
                   />
                 </div>
                 <div className="form-group mb-3">
                   <input
                     type="text"
                     name="am"
                     className="form-control form-control-lg"
                     placeholder="Apellido Materno"
                     value={this.state.am}
                     onChange={this.changeam}
                     required
                     style={{ borderRadius: '25px' }}
                   />
                 </div>
                 <div className="form-group mb-3">
                   <input
                     type="email"
                     name="email"
                     className="form-control form-control-lg"
                     placeholder="Correo Electrónico"
                     value={this.state.email}
                     onChange={this.changeEmail}
                     required
                     style={{ borderRadius: '25px' }}
                   />
                 </div>
                 <div className="form-group mb-3">
                   <input
                     type="password"
                     name="password"
                     className="form-control form-control-lg"
                     placeholder="Contraseña"
                     value={this.state.password}
                     onChange={this.changePassword}
                     required
                     style={{ borderRadius: '25px' }}
                   />
                 </div>
                 <div className="form-group mb-3">
                   <input
                     type="password"
                     name="confirmPassword"
                     className="form-control form-control-lg"
                     placeholder="Confirmar Contraseña"
                     value={this.state.confirmPassword}
                     onChange={this.changeConfirmPassword}
                     required
                     style={{ borderRadius: '25px' }}
                   />
                 </div>
                 <div className="form-group mb-3">
                 <select className="form-control" name="IdRol" onChange={(e) => this.setState({rol: parseInt(e.target.value, 10)})} required>
                  <option value="">Selecciona un rol</option>
                  {this.state.roles.map((rol) => (
                    <option key={rol.IdRol} value={rol.IdRol} name="IdRol">
                      {rol.Nombre_Rol}
                    </option>
                  ))}
                  </select>
                 </div>
                 <button type="submit" className="btn btn-primary btn-lg w-100" style={{ borderRadius: '25px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>Crear Cuenta</button>
                 <p className="mt-3">
                   Ya tienes cuenta?
                   <Link to="login" className="ml-1" style={{ color: '#007bff', fontWeight: 'bold' }}> Iniciar Sesión</Link>
                 </p>
               </form>
             </div>
           </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.register.isFetching,
    errorMessage: state.register.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(Register));
