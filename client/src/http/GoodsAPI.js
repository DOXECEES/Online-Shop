import axios from "axios";


function GetCategories() {
    return axios.get("api/categories");
}

function GetTypes() {
    return axios.get("api/types");
}

function GetBrands() {
    return axios.get("api/brands");
}

function GetDevices() {
    return axios.get("api/devices");
}
