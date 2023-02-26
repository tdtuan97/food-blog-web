import {
    LOGIN_LOADING,
    SET_TOKEN_ACTION,
    CLEAR_TOKEN_ACTION,
    ARG_TOKEN, REGISTER_LOADING, REGISTER,
} from "./constants";

import {apiPost} from "@common/crud";

export function login(params) {
    return dispatch => {
        dispatch(loginLoadingAction())
        dispatch(apiPost('auth/login', {
            accountName: params.accountName,
            password: params.password,
        }, {}, setTokenAction))
    }
}

export function loginLoadingAction() {
    return {
        type   : LOGIN_LOADING,
        payload: null
    };
}

export function setTokenAction(data) {
    if (data.success === true) {
        localStorage.setItem(ARG_TOKEN, JSON.stringify(data))
    }
    return {
        type   : SET_TOKEN_ACTION,
        payload: null
    };
}

export function clearToken() {
    localStorage.removeItem(ARG_TOKEN)
    return dispatch => {
        dispatch(clearTokenAction())
    };
}

export function clearTokenAction() {
    return {
        type   : CLEAR_TOKEN_ACTION,
        payload: null
    };
}

export function register(data) {
    return dispatch => {
        dispatch(registerLoadingAction())
        dispatch(apiPost('auth/register', {
            fullName   : data.fullName ?? null,
            email      : data.email ?? null,
            accountName: data.accountName ?? null,
            password   : data.password ?? null,
            password2  : data.password2 ?? null,
        }, {}, registerAction))
    }
}

export function registerLoadingAction() {
    return {
        type   : REGISTER_LOADING,
        payload: null
    };
}

export function registerAction(data) {
    return {
        type   : REGISTER,
        payload: data
    };
}