import axios from "axios";

const apiUrl = 'http://localhost:3005/customers';

export function getCustomers() {
    return axios.get(apiUrl);
}

export function saveCustomer(customerObj) {
    if(customerObj.id){
        return axios.put(`${apiUrl}/${customerObj.id}`, customerObj)
    }

    return axios.post(apiUrl, customerObj);
}

export function deleteCustomer(id) {
    return axios.delete(`${apiUrl}/${id}`);
}

export function getCustomerById(id) {
    return axios.get(`${apiUrl}/${id}`);
}