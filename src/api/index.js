import axios from "axios";

export const api = axios.create({
    baseURL: 'https://rurax.com.br/api',
    headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
    }
});