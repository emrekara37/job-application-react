import {
    FETCH_CONTACTS_PENDING,
    FETCH_CONTACTS_FULFILLED,
    FETCH_CONTACTS_REJECTED,
    DELETE_CONTACT_PENDING,
    DELETE_CONTACT_FULFILLED,
    DELETE_CONTACT_REJECTED,
    SEARCH_CONTACT_PENDING,
    SEARCH_CONTACT_FULFILLED,
    SEARCH_CONTACT_REJECTED
} from '../actions/contacts';

const initialState = {
    fetching: false,
    contactList: [],
    pageCount:0,
    error: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CONTACTS_PENDING:
            return {
                ...state,
                fetching: true
            };
        case FETCH_CONTACTS_FULFILLED:
            return {
                ...state,
                contactList: action.payload,
                fetching: false
            };
        case FETCH_CONTACTS_REJECTED:
            return {
                ...state,
                error: action.payload,
                fetching: false
            };

        case DELETE_CONTACT_PENDING:
            return {
                ...state,
            };
        case DELETE_CONTACT_FULFILLED:
            return {
                ...state,
                contactList: state.contactList.filter(item => item.id !== action.payload.id),
            };
        case DELETE_CONTACT_REJECTED:
            return {
                ...state,
                error: action.payload,
            };
        case SEARCH_CONTACT_PENDING:
            return {
                ...state,
                fetching: true
            };
        case SEARCH_CONTACT_FULFILLED:
            return {
                ...state,
                contactList: action.payload.contacts,
                pageCount:action.payload.pageCount,
                fetching: false,
            };
        case SEARCH_CONTACT_REJECTED:
            return {
                ...state,
                error: action.payload,
                fetching: false
            };
        default:
            return state;
    }
}