export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function receiveLogin() {
    return { type: LOGIN_SUCCESS };
}

function loginError(payload) {
    return { type: LOGIN_FAILURE, payload };
}

function requestLogout() {
    return { type: LOGOUT_REQUEST };
}

export function receiveLogout() {
    return { type: LOGOUT_SUCCESS };
}

// Iniciar sesión
export function loginUser(creds) {
    return (dispatch) => {
        if (creds.email.length > 0 && creds.password.length > 0) {
            localStorage.setItem('authenticated', JSON.stringify(true)); // Guardar sesión
            dispatch(receiveLogin());
        } else {
            dispatch(loginError('Algo salió mal, intenta más tarde'));
        }
    };
}

// Cerrar sesión
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('authenticated'); // Eliminar sesión
    dispatch(requestLogout());
    dispatch(receiveLogout());
};
