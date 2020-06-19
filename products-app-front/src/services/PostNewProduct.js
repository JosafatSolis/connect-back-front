import axios from "axios";

// Puede ser necesario si da problemas
axios.defaults.withCredentials = true;

export function postNewProduct(newProduct) {
    //const params = {...newProduct}
    return axios.post("http://localhost:3000/products", newProduct);
}