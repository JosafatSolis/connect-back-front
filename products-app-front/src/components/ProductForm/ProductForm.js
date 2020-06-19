import React, { Component } from "react";
import { postNewProduct } from "../../services/PostNewProduct";
import AppContext from "../../AppContext";

export default class ProductForm extends Component {
  state = {
    product: {},
  };

  // Esto se ejecuta antes de que el componente se dibuje, revisa si está logueado el usuario y
  // si no, redirecciona a la página de login
  componentWillMount() {
    console.log(this.props);
    const { history } = this.props;
    // Extrae del usuario
    const { _id, role } = this.context.state.user;
    // Se definen los roles que tienen permisos a esta sección y se revisa
    const hasPermission = ["Admin"].includes(role);
    // Si no existe el id, significa que no está logueado, se manda al login
    if (!_id) history.push("/login");
    // Si está logueado pero no tiene permisos, lo manda al home
    if(!hasPermission) history.push("/");
  }

  handleChange = (e) => {
    let { product } = this.state;
    // Al producto, se le agregan los campos que tiene más cualquier otro que pudiera haber llegado
    product = { ...product, [e.target.name]: e.target.value };
    this.setState({ product });
    console.log(product);
  };

  handleSubmit = (e) => {
    // Evitamos el comportamiento por default del form, que es refrescar la página
    e.preventDefault();
    postNewProduct(this.state.product)
      .then((res) => {
        const { result: product } = res.data;
        console.log(`New Product Added ${product.name}`);
      })
      .catch((reason) => console.log(`Error: ${reason}`));
  };

  render() {
    return (
      <section className="uk-section">
        <div className="uk-container uk-flex uk-flex-center">
          <div className="uk-width-1-2">
            <form className="uk-width-1-1" onSubmit={this.handleSubmit}>
              <div className="uk-margin">
                {/* htmFor manda el focus al item con el nombre especificado si se da clic en el label */}
                <label className="uk-form-label" htmlFor="name">
                  Name:
                </label>
                <div className="uk-form-controls">
                  <input
                    onChange={this.handleChange}
                    className="uk-input"
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="price">
                  Price:
                </label>
                <div className="uk-form-controls">
                  <input
                    onChange={this.handleChange}
                    name="price"
                    className="uk-input"
                    id="price"
                    type="text"
                    placeholder="Price"
                  />
                </div>
              </div>
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="image">
                  Image:
                </label>
                <div className="uk-form-controls">
                  <input
                    onChange={this.handleChange}
                    name="image"
                    className="uk-input"
                    id="image"
                    type="text"
                    placeholder="Image"
                  />
                </div>
              </div>
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="description">
                  Description:
                </label>
                <div className="uk-form-controls">
                  <textarea
                    onChange={this.handleChange}
                    className="uk-textarea"
                    name="description"
                    id="description"
                    cols="30"
                    rows="5"></textarea>
                </div>
              </div>
              <button className="uk-button uk-button-primary">
                Create product
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

ProductForm.contextType = AppContext;
