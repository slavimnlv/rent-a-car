import axios from "axios";

const apiUrl = 'http://localhost:3005/rentals';

export function getRentals() {
    return axios.get(apiUrl);
}

export function saveRental(rentalObj) {
    if(rentalObj.id){
        return axios.put(`${apiUrl}/${rentalObj.id}`, rentalObj)
    }

    return axios.post(apiUrl, rentalObj);
}

export function deleteRental(id) {
    return axios.delete(`${apiUrl}/${id}`);
}

export function getRentalById(id) {
    return axios.get(`${apiUrl}/${id}`);
}