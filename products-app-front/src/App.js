import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import Routes from "./Routes";
import "./App.css";
import Cookies from "js-cookie";

// https://reactjs.org/docs/context.html
// Es equivalente a:
// const AppContext = React.createContext();
import AppContext from "./AppContext";

// El provider se puede poner en otro lugar si sólo quieres que los datos
// estén disponibles sólo para ciertos componentes.

// El valor manejado por el provider puede ser un valor, no un objeto, u otra cosa.

class App extends Component {
  state = {
    user: JSON.parse(localStorage.getItem("user")) || {},
  };

  setUser = (user) => {
    //console.log("App.js", user);
    this.setState({user});
  }

  logout = () => {
    localStorage.removeItem("user");
    Cookies.remove("token");
    this.setState({user:{}});
  }

  render() {
    const { state, setUser, logout } = this;
    return (
      // state:state, setUser:setUser
      // Se manda el valor del estado y también la función como referencia
      // para que se pueda cambiar el usuario desde otrol lado
      <AppContext.Provider value={{ state, setUser, logout }}>
        <div className="App">
          <Navbar />
          <Routes />
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
