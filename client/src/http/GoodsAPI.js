import axios from "axios";
import { API_URL } from "../util/const";


export const GetCategories = async () => {
    const data = axios.get("http://localhost:5000/" + "api/categories");
    return data;
}


export const GetTypes = async (id) => {
    const data = axios.get("http://localhost:5000/" + "api/types" + "?id=" + id);
    return data;
}

export const GetBrands = async (id) => {
    const data = axios.get("http://localhost:5000/" + "api/brands" + "?id=" + id);
    return data;
}

function GetDevices() {
    return axios.get("api/devices");
}

export const GetBasket = async () => {
    const data = axios.get("http://localhost:5000/" + "api/basket" + "?email=" + localStorage.getItem('email'))
    return data;
}

export const getRole = async (email) => {
    const data = axios.post("http://localhost:5000/api" + "/role", {
        email
    });
    return data;
}
