import React, { Component } from "react";
import Card from "../Card/Card";
import { getProducts } from "../../services/ProductsService";
import AppContext from "../../AppContext";

export default class Products extends Component {
  state = {
    products: [],
  };

  render() {
    const alert = (
      <div className="uk-alert-primary" uk-alert="true">
        <p>No hay Productos Registrados</p>
      </div>
    );
    return (
      <section className="uk-section">
        <div className="uk-container">
          <div className="uk-grid uk-child-width-1-3">
            {this.state.products.length > 0
              ? this.state.products.map((product, index) => (
                  <Card key={index} {...product} />
                ))
              : alert}
          </div>
        </div>
      </section>
    );
  }

  // Según https://fb.me/react-unsafe-component-lifecycles hay que colocar el código aquí:
  // Esto se ejecuta después de que el componente se dibuje, revisa si está logueado el usuario y
  // si no, redirecciona a la página de login
  componentDidMount() {
    const { history } = this.props;
    // Extrae el usuario
    const { _id } = this.context.state.user;
    // Si no existe el id, se manda al login
    if (!_id) {
      history.push("/login");
    } else {
      getProducts().then((res) => {
        const { result } = res.data;
        this.setState({ products: result });
      });
    }
  }
}

Products.contextType = AppContext;
