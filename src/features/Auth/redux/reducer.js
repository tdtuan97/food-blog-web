import initialState from "./initialState";
import {
    SET_TOKEN_ACTION, CLEAR_TOKEN_ACTION, ARG_TOKEN, LOGIN_LOADING, UPDATE_TOKEN_ACTION, REGISTER_LOADING, REGISTER
} from "./constants";
import {pushMessageSuccess} from "@layouts";
import * as CONSTANTS_COMMON from "@features/Common/redux/constants";

export function reducer(state = initialState, action) {
    const stateLocal = loadStateFromLocal();
    switch (action.type) {
        /**
         * Reset action
         */
        case CONSTANTS_COMMON.RESET_ACTION:
            return {
                ...state,
                ...initialState
            }
        case LOGIN_LOADING:
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: true
                }
            };
        case UPDATE_TOKEN_ACTION:
            updateStateLocal(action.payload)
            return {
                ...state,
                ...stateLocal,
            };
        case SET_TOKEN_ACTION:
        case CLEAR_TOKEN_ACTION:
            return {
                ...state,
                ...stateLocal,
                login: {
                    loading: false
                }
            };

        case REGISTER_LOADING:
            return {
                ...state,
                register: {
                    ...state.register,
                    loading: true
                }
            };
        case REGISTER:
            let payload = action.payload ?? {}
            if (payload.success === true) {
                pushMessageSuccess(payload.message);
            }
            return {
                ...state,
                register: {
                    ...state.register,
                    loading: false,
                    data   : action.payload
                }
            };
        default:
            return {
                ...state,
                ...stateLocal,
            };
    }
}

function updateStateLocal(dataNew = {}) {
    try {
        // Load data from local
        let dataLocal = JSON.parse(localStorage.getItem(ARG_TOKEN));

        let nameNew    = dataNew.name ?? null
        let logoUrlNew = dataNew.logoUrl ?? null

        let portfolioCurrent     = dataLocal.data.portfolio ?? {}
        portfolioCurrent         = {
            ...portfolioCurrent,
            name   : nameNew,
            logoUrl: logoUrlNew,
        }
        dataLocal.data.portfolio = portfolioCurrent;

        // Update local storage
        localStorage.setItem(ARG_TOKEN, JSON.stringify(dataLocal))
    } catch (e) {
        console.log(e)
    }
}

export function loadStateFromLocal() {
    let stateFromLocal;
    try {
        // Load data from local
        let dataLocal = JSON.parse(localStorage.getItem(ARG_TOKEN));

        // Load data auth
        let token = dataLocal.data

        // Render config homepage
        stateFromLocal = {
            user   : {
                id       : dataLocal._id ?? '',
                name     : dataLocal.name ?? '',
                email    : dataLocal.email ?? '',
            },
            meta   : {
                token      : token,
            },
            configs: {
                homepage: '/'
            },
        }
    } catch (e) {
        localStorage.removeItem(ARG_TOKEN)
        stateFromLocal = {
            ...initialState
        }
    }
    return stateFromLocal;
}