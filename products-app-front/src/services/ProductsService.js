import axios from "axios";

// Puede ser necesario si da problemas
axios.defaults.withCredentials = true;

// withCredentials indica que si se tienen cookies, se manden en la petición:
export const getProducts = () => {
    return axios.get("http://localhost:3000/products", {
        withCredentials: true
    });
}