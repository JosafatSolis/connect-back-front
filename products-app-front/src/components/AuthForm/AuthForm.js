import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signup, login } from "../../services/AuthService";
import AppContext from "../../AppContext";
import UIKit from "uikit";

class AuthForm extends Component {
  state = {
    user: {},
  };

// Esto se ejecuta antes de que el componente se dibuje, revisa si está logueado el usuario y
  // si no, redirecciona a la página de login
  componentWillMount() {
    //console.log(this.props);
    const { history } = this.props;
    // Extrae el usuario
    const { _id } = this.context.state.user;
    // Si no existe el id, se manda al login
    if (_id) {
      history.push("/");
    } 
  }

  handleChange = (e) => {
    let { user } = this.state;
    // Agrega o sobreescribe cualquier propiedad en el objeto user, con el nombre/valor recibidos:
    user = { ...user, [e.target.name]: e.target.value };
    this.setState({ user });
  };

  handleSubmit = (e) => {
    // Evita el refresh en automático de la página
    e.preventDefault();
    // Revisa si estamos en login o en signup
    const isLogin = this.props.location.pathname === "/login";
    // console.log("AuthForm.handleSubmit:", this.state.user);
    const { user } = this.state;
    // Extrae el método setUser que se mandó en el Context
    const { setUser } = this.context;
    // Se extrae el objeto history que viene desde el Router, para poder redireccionar
    const { history } = this.props;
    // Si estamos en /login , después de habernos logueado nos va a mandar a home, en signup nos manda a login:
    const nextRoute = isLogin ? "/" : "/login";
    // ++ Atención: Define el método que se va a utilizar de los importados desde AuthService:
    const action = isLogin ? login : signup;
    // Ejecuta el método de AuthService que corresponda:
    action(user)
      .then((res) => {
        // Como respuesta nos llegan los datos del usuario (Ver si en el caso de signup también)
        const { userWithoutPassword } = res.data;
        // Para almacenar en el LocalStorage, es necesario guardarlo como texto porque
        // no se pueden guardar objetos
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
        setUser(userWithoutPassword);
        history.push(nextRoute);
      })
      .catch((error) => {
        // ** Al parecer el catch se ejecuta porque no se recibe el token, VERIFICAR **
        // Axios genera un objeto error si recibe un status code distinto a 2xx*, y los detalles llegan en .response.data
        console.log("Error: ", error);
        UIKit.notification({
          message: `<span ui-icon='icon: close'></span> ${error.response.data.mensaje}`,
          status: "danger",
          pos: "top-right"
        });
      });
  };

  render() {
    const isLogin = this.props.location.pathname === "/login";
    return (
      <section className="uk-section">
        <div className="uk-container uk-flex uk-flex-center">
          <div className="uk-width-1-4">
            <h3>{isLogin ? "Login" : "Signup"}</h3>
            <form
              onSubmit={this.handleSubmit}
              className="uk-width-1-1 uk-form-stacked uk-flex uk-flex-center uk-flex-column">
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="email">
                  Email:
                </label>
                <div className="uk-inline">
                  <span
                    className="uk-form-icon uk-form-icon-flip"
                    uk-icon="icon: mail"></span>
                  <input
                    id="email"
                    className="uk-input"
                    type="text"
                    required
                    onChange={this.handleChange}
                    name="email"
                  />
                </div>
                <div className="uk-margin">
                  <label className="uk-form-label" htmlFor="password">
                    Password:
                  </label>
                  <div className="uk-inline">
                    <span
                      className="uk-form-icon uk-form-icon-flip"
                      uk-icon="icon: lock"></span>
                    <input
                      id="password"
                      className="uk-input"
                      type="password"
                      required
                      onChange={this.handleChange}
                      name="password"
                    />
                  </div>
                </div>
              </div>
              {isLogin ? (
                <div className="uk-text-meta">
                  Aún no tienes cuenta?
                  <Link to="/signup" className="uk-text-primary">
                    Crear una cuenta
                  </Link>
                </div>
              ) : null}
              <button className="uk-button uk-button-primary">
                {isLogin ? "Login" : "Signup"}
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

// Se establece como AppContext de este componente, necesario para tener acceso al context:
// https://reactjs.org/docs/context.html
AuthForm.contextType = AppContext;

export default AuthForm;
