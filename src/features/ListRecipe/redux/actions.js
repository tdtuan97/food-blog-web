import {apiGet, apiPost, apiPut} from "@common/crud";
import * as CONSTANTS from "./constants";
import {apiDelete} from "@common/crud/actions";

/**
 * Get recipe all
 * @returns
 */
export function getListRecipeManagement(userId) {
    return dispatch => {
        dispatch(getListRecipeManagementLoadingAction())
        dispatch(apiGet(`recipeList/getRecipeList`, {
            userId:userId
        }, {}, getListRecipeManagementAction))
    };
}

function getListRecipeManagementAction(response) {
    return {
        type   : CONSTANTS.LIST_RECIPE_MANAGEMENT,
        payload: response
    };
}

function getListRecipeManagementLoadingAction() {
    return {
        type   : CONSTANTS.LIST_RECIPE_MANAGEMENT_LOADING,
        payload: null
    };
}

/**
 * Get recipe by id
 * @returns
 */
export function getListRecipe(id) {
    return dispatch => {
        dispatch(getListRecipeLoadingAction())
        dispatch(apiGet(`recipe/getListRecipe/${id}`, {}, {}, getListRecipeAction))
    };
}

function getListRecipeAction(response) {
    return {
        type   : CONSTANTS.LIST_RECIPE_DETAIL,
        payload: response
    };
}

function getListRecipeLoadingAction() {
    return {
        type   : CONSTANTS.LIST_RECIPE_DETAIL_LOADING,
        payload: null
    };
}

/**
 * Add recipe by id
 * @returns
 */
export function postListRecipe(data) {
    return dispatch => {
        dispatch(postListRecipeLoadingAction())
        dispatch(apiPost(`recipeList/createRecipeList/`, {
            name: data.name ?? "",
            file: data.file ?? null,
        }, {}, postListRecipeAction))
    };
}

function postListRecipeAction(response) {
    return {
        type   : CONSTANTS.LIST_RECIPE_ADD,
        payload: response
    };
}

function postListRecipeLoadingAction() {
    return {
        type   : CONSTANTS.LIST_RECIPE_ADD_LOADING,
        payload: null
    };
}

/**
 * Update recipe by id
 * @returns
 */
export function updateListRecipe(id, data) {
    return dispatch => {
        dispatch(updateListRecipeLoadingAction())
        dispatch(apiPut(`recipe/updateListRecipe/${id}`, {
            name       : data.name ?? "",
            amount     : data.amount ?? "",
            status     : data.status ?? "",
            prepareTime: data.prepareTime ?? "",
            cookTime   : data.cookTime ?? "",
            ingredient : data.ingredient ?? [],
            step       : data.step ?? [],
        }, {}, updateListRecipeAction))
    };
}

function updateListRecipeAction(response) {
    return {
        type   : CONSTANTS.LIST_RECIPE_UPDATE,
        payload: response
    };
}

function updateListRecipeLoadingAction() {
    return {
        type   : CONSTANTS.LIST_RECIPE_UPDATE_LOADING,
        payload: null
    };
}

/**
 * delete recipe by id
 * @returns
 */
export function deleteListRecipe(id) {
    return dispatch => {
        dispatch(deleteListRecipeLoadingAction())
        dispatch(apiPut(`recipe/deleteListRecipe/${id}`, {}, {}, deleteListRecipeAction))
    };
}

function deleteListRecipeAction(response) {
    return {
        type   : CONSTANTS.LIST_RECIPE_DELETE,
        payload: response
    };
}

function deleteListRecipeLoadingAction() {
    return {
        type   : CONSTANTS.LIST_RECIPE_DELETE_LOADING,
        payload: null
    };
}