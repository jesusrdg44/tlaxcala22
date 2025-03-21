import {toast} from 'react-toastify';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export function receiveRegister() {
    return {
        type: REGISTER_SUCCESS
    };
}

export function registerError(payload) {
    return {
        type: REGISTER_FAILURE,
        payload,
    };
}

export function registerUser(payload) {
    return (dispatch) => {
        if (payload.creds.email.length > 0 && payload.creds.password.length > 0) {
            toast.success("Bienvenido a la Secretaria de Turismo de Tlaxcala");
            payload.history.push('/login');
        } else {
            dispatch(registerError('Algo salio mal, porfavor intenta mas tarde'));
        }
    }
}
