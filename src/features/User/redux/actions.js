import {apiGet, apiPost} from "@common/crud";
import * as CONSTANTS from "./constants";
import {apiDelete} from "@common/crud/actions";

/**
 * Get User
 * @returns
 */
export function getUser(id) {
    return dispatch => {
        dispatch(getUserLoadingAction())
        dispatch(apiGet(`user/getUser/${id}`, {}, {}, getUserAction))
    };
}

function getUserAction(response) {
    return {
        type   : CONSTANTS.GET_USER,
        payload: response
    };
}

function getUserLoadingAction() {
    return {
        type   : CONSTANTS.GET_USER_LOADING,
        payload: null
    };
}

/**
 * Get User
 * @returns
 */
export function followUser(id) {
    return dispatch => {
        dispatch(followUserLoadingAction())
        dispatch(apiPost(`follow/create/${id}`, {}, {}, followUserAction))
    };
}

function followUserAction(response) {
    return {
        type   : CONSTANTS.FOLLOW_USER,
        payload: response
    };
}

function followUserLoadingAction() {
    return {
        type   : CONSTANTS.FOLLOW_USER_LOADING,
        payload: null
    };
}

/**
 * Get User
 * @returns
 */
export function unfollowUser(id) {
    return dispatch => {
        dispatch(unfollowUserLoadingAction())
        dispatch(apiDelete(`follow/delete/${id}`, {}, {}, unfollowUserAction))
    };
}
function unfollowUserAction(response) {
    return {
        type   : CONSTANTS.UNFOLLOW_USER,
        payload: response
    };
}

function unfollowUserLoadingAction() {
    return {
        type   : CONSTANTS.UNFOLLOW_USER_LOADING,
        payload: null
    };
}