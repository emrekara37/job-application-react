import axios from 'axios';
import {API_URL} from "../config/env";

export const FETCH_CONTACTS_PENDING = "FETCH_CONTACTS_PENDING";
export const FETCH_CONTACTS_FULFILLED = "FETCH_CONTACTS_FULFILLED";
export const FETCH_CONTACTS_REJECTED = "FETCH_CONTACTS_REJECTED";

export const DELETE_CONTACT_PENDING = "DELETE_CONTACT_PENDING";
export const DELETE_CONTACT_FULFILLED = "DELETE_CONTACT_FULFILLED";
export const DELETE_CONTACT_REJECTED = "DELETE_CONTACT_REJECTED";


export const SEARCH_CONTACT_PENDING = "SEARCH_CONTACT_PENDING";
export const SEARCH_CONTACT_FULFILLED = "SEARCH_CONTACT_FULFILLED";
export const SEARCH_CONTACT_REJECTED = "SEARCH_CONTACT_REJECTED";

export function getContacts() {
    return dispatch => {
        dispatch({
            type: "FETCH_CONTACTS",
            payload: axios.get(`${API_URL}contacts/getall`).then(result => result.data)
        });
    }
}

export function deleteContact(id) {
    return dispatch => {
        dispatch({
            type: "DELETE_CONTACT",
            payload: axios.delete(`${API_URL}contacts/delete?id=${id}`)
                .then(result => Object.assign({}, result, {id}))
        })
    }
}

export function search(parameters) {
    //axios.post(`${API_URL}contacts/search`, parameters).then(result => result.data)
    return dispatch => {
        dispatch({
            type: "SEARCH_CONTACT",
            payload: axios.post(`${API_URL}contacts/search`, parameters).then(result => result.data),
        })
        ;
    }
}