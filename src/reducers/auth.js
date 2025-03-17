import {
    LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
} from '../actions/user';

// Asegura que 'authenticated' sea un booleano
const authenticated = JSON.parse(localStorage.getItem('authenticated')) === true;

export default function auth(state = {
    isFetching: false,
    isAuthenticated: authenticated,
}, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                errorMessage: '',
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.payload,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
            };
        default:
            return state;
    }
}
