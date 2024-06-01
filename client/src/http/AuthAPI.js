import axios from "axios";
import { jwtDecode } from "jwt-decode";


import { API_URL, REGISTRATION_ROUTE, LOGIN_ROUTE } from "../util/const";
import { $authHost } from ".";

export const check = async () => {
    const { data } = await $authHost.get(API_URL);
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

export const register = async (email, password) => {
    try {
        const response = await axios.post(API_URL + REGISTRATION_ROUTE, {
            email,
            password
        });
    }
    catch (e) {
        console.log(e)
    }
}

