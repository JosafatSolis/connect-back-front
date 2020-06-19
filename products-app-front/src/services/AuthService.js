import axios from "axios";

// Puede ser necesario si da problemas
axios.defaults.withCredentials = true;

export const login = (credentials) => {
    return axios.post("http://localhost:3000/login", credentials, {
        withCredentials: true
    });
}

export const signup = (credentials) => {
    return axios.post("http://localhost:3000/signup", credentials);
}

