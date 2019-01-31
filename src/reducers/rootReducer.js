import {combineReducers} from 'redux'
import contacts from './contacts'
import newContact from './newcontact';

export default combineReducers(
    {
        contacts,
        newContact
    })