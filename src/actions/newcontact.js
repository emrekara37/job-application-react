import axios from 'axios';
import {API_URL} from "../config/env";

export const FETCH_CONTACT_PENDING = "FETCH_CONTACT_PENDING";
export const FETCH_CONTACT_FULFILLED = "FETCH_CONTACT_FULFILLED";
export const FETCH_CONTACT_REJECTED = "FETCH_CONTACT_REJECTED";
export const ADD_CONTACT_PENDING = "ADD_CONTACT_PENDING";
export const ADD_CONTACT_FULFILLED = "ADD_CONTACT_FULFILLED";
export const ADD_CONTACT_REJECTED = "ADD_CONTACT_REJECTED";
export const UPDATE_CONTACT_PENDING = "UPDATE_CONTACT_PENDING";
export const UPDATE_CONTACT_FULFILLED = "UPDATE_CONTACT_FULFILLED";
export const UPDATE_CONTACT_REJECTED = "UPDATE_CONTACT_REJECTED";

export function getContact(id) {
    return dispatch => {
        dispatch({
            type: "FETCH_CONTACT",
            payload: axios.get(`${API_URL}contacts/get?id=${id}`).then(result => result.data)
        });
    }
}

export function addContact(contact) {
    return dispatch => {
        dispatch({
            type: "ADD_CONTACT",
            payload: axios.post(`${API_URL}contacts/insert`, {
                FirstName: contact.firstName,
                LastName: contact.lastName,
                PhoneNumber: contact.phoneNumber
            }).then(result => result.data)
        });
    }
}

export function updateContact(contact) {
    return dispatch => {
        dispatch({
            type: "UPDATE_CONTACT",
            payload: axios.post(`${API_URL}contacts/update`, {
                FirstName: contact.firstName,
                LastName: contact.lastName,
                PhoneNumber: contact.phoneNumber,
                Id: contact.id
            }).then(result => result.data)
        });
    }
}