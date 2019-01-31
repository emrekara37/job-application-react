import {
    FETCH_CONTACT_PENDING,
    FETCH_CONTACT_FULFILLED,
    FETCH_CONTACT_REJECTED,
    ADD_CONTACT_PENDING,
    ADD_CONTACT_FULFILLED,
    ADD_CONTACT_REJECTED,
    UPDATE_CONTACT_PENDING,
    UPDATE_CONTACT_FULFILLED,
    UPDATE_CONTACT_REJECTED
} from '../actions/newcontact';

const initialState = {
    fetching: false,
    done: false,
    error: {},
    contact: {
        fetching:false
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONTACT_PENDING:
            return {
                ...state,
                fetching: true,
                done: false
            };
        case ADD_CONTACT_FULFILLED:
            return {
                ...state,
                fetching: false,
                done: true,
            };
        case ADD_CONTACT_REJECTED:
            return {
                ...state,
                error: action.payload,
                fetching: false
            };
        case FETCH_CONTACT_PENDING:
            return {
                ...state,
                contact: {
                    fetching: true
                }
            };
        case FETCH_CONTACT_FULFILLED:
            return {
                ...state,
                contact: {
                    fetching:false,
                    ...action.payload
                }
            };
        case FETCH_CONTACT_REJECTED:
            return {
                ...state,
                contact: {
                    fetching: false
                }
            };
        case UPDATE_CONTACT_PENDING:
            return {
                ...state,
                fetching: true,
                done: false
            };
        case UPDATE_CONTACT_FULFILLED:
            return {
                ...state,
                fetching: false,
                done: true,
            };
        case UPDATE_CONTACT_REJECTED:
            return {
                ...state,
                error: action.payload,
                fetching: false
            };
        default:
            return state;
    }
}