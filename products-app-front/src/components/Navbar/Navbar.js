import React from "react";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";

const Navbar = () => (
  // Esta es la otra forma de leer el contexto:
  <AppContext.Consumer>
    {(value) => {
      //console.log("Navbar.value:", value);
      const { user } = value.state;
      const { logout } = value;
      // Se definen los roles que tienen permisos a esta sección y se revisa
      const hasPermission = ["Admin"].includes(user.role);
      return (
        <header>
          <nav className="uk-navbar-container" uk-navbar="true">
            <div className="uk-navbar-left">
              <ul className="uk-navbar-nav">
                <li className="uk-active">
                  <Link to="/">Home</Link>
                </li>
                {hasPermission ? (
                  <li>
                    <Link to="/new">New Product</Link>
                  </li>
                ) : null}
              </ul>
            </div>
            <div className="uk-navbar-right">
              <ul className="uk-navbar-nav">
                {user._id ? (
                  <li>
                    <Link to="/profile">{user.email}</Link>
                    <div className="uk-navbar-dropdown">
                      <ul className="uk-nav uk-navbar-dropdown-nav">
                        <li className="uk-active">
                          <Link onClick={() => logout()} to="/login">Logout</Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </header>
      );
    }}
  </AppContext.Consumer>
);

export default Navbar;
