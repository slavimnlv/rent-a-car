import axios from "axios";

const apiUrl = 'http://localhost:3005/cars';

export function getCars() {
    return axios.get(apiUrl);
}

export function saveCar(carObj) {
    if(carObj.id){
        return axios.put(`${apiUrl}/${carObj.id}`, carObj)
    }

    return axios.post(apiUrl, carObj);
}

export function deleteCar(id) {
    return axios.delete(`${apiUrl}/${id}`);
}

export function getCarById(id) {
    return axios.get(`${apiUrl}/${id}`);
}