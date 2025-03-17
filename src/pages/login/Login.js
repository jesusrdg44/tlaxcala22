import React from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Alert, Button, Label, Input, FormGroup } from "reactstrap";
import Widget from "../../components/Widget";
import { loginUser } from "../../actions/user";
import s from './Login.module.scss';
import signinImg from "../../images/tlaxcala-intro.jpg";
import logo from "../../images/nuevo-tlax.png";
import img1 from "../../images/Vector-1.svg";
import img2 from "../../images/Vector-2.svg";
import img3 from "../../images/Vector-3.svg";
import img4 from "../../images/Vector-4.svg";
import FondoTlax from "../../images/myicons/palaciot.jpg";

class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  static isAuthenticated(token) {
    if (token) return true;
  }

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.doLogin = this.doLogin.bind(this);
    this.googleLogin = this.googleLogin.bind(this);
    this.microsoftLogin = this.microsoftLogin.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.signUp = this.signUp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); // Add this line
  }

  changeEmail(event) {
    this.setState({ email: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  doLogin(e) {
    e.preventDefault();
    const { email, password } = this.state;

    fetch('http://67.217.243.37:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('authenticated', JSON.stringify(true));
          this.props.history.push('/app');
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  googleLogin() {
    this.props.dispatch(loginUser({ social: "google" }));
  }

  microsoftLogin() {
    this.props.dispatch(loginUser({ social: "microsoft" }));
  }

  signUp() {
    this.props.history.push("/register");
  }

  handleSubmit(e) {
    e.preventDefault();
    this.doLogin(e);
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/app' } }; // eslint-disable-line

    // cant access login page while logged in
    if (Login.isAuthenticated(JSON.parse(localStorage.getItem('authenticated')))) {
      return (
          <Redirect to={from} />
      );
    }

    return (
     
      <div style={{
        position : 'relative',  
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${FondoTlax})`,
        backgroundColor: 'rgba(79, 32, 103, 0.6)', 
        zIndex: '1',  
        cover: 'cover',
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
          <h2 style={{ color: '#007bff', fontWeight: 'bold' }}>Inicio de Sesión</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Nombre de Usuario"
                // value={this.state.email}
                onChange={this.changeEmail}
                required
                style={{ borderRadius: '25px' }}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Contraseña"
                // value={this.state.password}
                onChange={this.changePassword}
                required
                style={{ borderRadius: '25px' }}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg w-100" style={{ borderRadius: '25px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>Iniciar Sesión</button>
            <p className="mt-3">
              No tienes cuenta?
              <Link to="register" className="ml-1" style={{ color: '#007bff', fontWeight: 'bold' }}> Crear Cuenta</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
