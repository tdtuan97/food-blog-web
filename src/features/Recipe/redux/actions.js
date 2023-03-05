import {apiGet, apiPost, apiPut} from "@common/crud";
import * as CONSTANTS from "./constants";
import {apiDelete} from "@common/crud/actions";

/**
 * Get recipe all
 * @returns
 */
export function getRecipeManagement(userId) {
    return dispatch => {
        dispatch(getRecipeManagementLoadingAction())
        dispatch(apiGet(`recipe/getRecipeByUserId/${userId}`, {}, {}, getRecipeManagementAction))
    };
}

function getRecipeManagementAction(response) {
    return {
        type   : CONSTANTS.RECIPE_MANAGEMENT,
        payload: response
    };
}

function getRecipeManagementLoadingAction() {
    return {
        type   : CONSTANTS.RECIPE_MANAGEMENT_LOADING,
        payload: null
    };
}

/**
 * Get recipe by id
 * @returns
 */
export function getRecipe(id) {
    return dispatch => {
        dispatch(getRecipeLoadingAction())
        dispatch(apiGet(`recipe/getRecipe/${id}`, {}, {}, getRecipeAction))
    };
}

function getRecipeAction(response) {
    return {
        type   : CONSTANTS.RECIPE_DETAIL,
        payload: response
    };
}

function getRecipeLoadingAction() {
    return {
        type   : CONSTANTS.RECIPE_DETAIL_LOADING,
        payload: null
    };
}

/**
 * Add recipe by id
 * @returns
 */
export function postRecipe(data) {
    return dispatch => {
        dispatch(postRecipeLoadingAction())
        dispatch(apiPost(`recipe/createRecipe`, {
            name       : data.name ?? "",
            amount     : data.amount ?? "",
            status     : data.status ?? "",
            prepareTime: data.prepareTime ?? "",
            cookTime   : data.cookTime ?? "",
            ingredient : data.ingredient ?? [],
            step       : data.step ?? [],
        }, {}, postRecipeAction))
    };
}

function postRecipeAction(response) {
    return {
        type   : CONSTANTS.RECIPE_ADD,
        payload: response
    };
}

function postRecipeLoadingAction() {
    return {
        type   : CONSTANTS.RECIPE_ADD_LOADING,
        payload: null
    };
}

/**
 * Update recipe by id
 * @returns
 */
export function updateRecipe(id, data) {
    return dispatch => {
        dispatch(updateRecipeLoadingAction())
        dispatch(apiPut(`recipe/updateRecipe/${id}`, {
            name       : data.name ?? "",
            amount     : data.amount ?? "",
            status     : data.status ?? "",
            prepareTime: data.prepareTime ?? "",
            cookTime   : data.cookTime ?? "",
            ingredient : data.ingredient ?? [],
            step       : data.step ?? [],
        }, {}, updateRecipeAction))
    };
}

function updateRecipeAction(response) {
    return {
        type   : CONSTANTS.RECIPE_UPDATE,
        payload: response
    };
}

function updateRecipeLoadingAction() {
    return {
        type   : CONSTANTS.RECIPE_UPDATE_LOADING,
        payload: null
    };
}

/**
 * delete recipe by id
 * @returns
 */
export function deleteRecipe(id) {
    return dispatch => {
        dispatch(deleteRecipeLoadingAction())
        dispatch(apiPut(`recipe/deleteRecipe/${id}`, {}, {}, deleteRecipeAction))
    };
}

function deleteRecipeAction(response) {
    return {
        type   : CONSTANTS.RECIPE_DELETE,
        payload: response
    };
}

function deleteRecipeLoadingAction() {
    return {
        type   : CONSTANTS.RECIPE_DELETE_LOADING,
        payload: null
    };
}

/**
 * Get recipe by id
 * @returns
 */
export function getRecipeComments(recipeId) {
    return dispatch => {
        dispatch(getRecipeCommentsLoadingAction())
        dispatch(apiGet(`comment/getCommentOfRecipe/${recipeId}`, {}, {}, getRecipeCommentsAction))
    };
}

function getRecipeCommentsAction(response) {
    return {
        type   : CONSTANTS.RECIPE_COMMENTS,
        payload: response
    };
}

function getRecipeCommentsLoadingAction() {
    return {
        type   : CONSTANTS.RECIPE_COMMENTS_LOADING,
        payload: null
    };
}

/**
 * Get recipe by id
 * @returns
 */
export function postRecipeComment(recipeId, comment) {
    return dispatch => {
        dispatch(postRecipeCommentLoadingAction())
        dispatch(apiPost(`comment/createComment/${recipeId}`, {
            comment: comment ?? ""
        }, {}, postRecipeCommentAction))
    };
}

function postRecipeCommentAction(response) {
    return {
        type   : CONSTANTS.RECIPE_COMMENT_POST,
        payload: response
    };
}

function postRecipeCommentLoadingAction() {
    return {
        type   : CONSTANTS.RECIPE_COMMENT_POST_LOADING,
        payload: null
    };
}

/**
 * Update recipe by id
 * @returns
 */
export function updateRecipeComment(recipeId, comment) {
    return dispatch => {
        dispatch(updateRecipeCommentLoadingAction())
        dispatch(apiPut(`comment/updateComment/${recipeId}`, {
            comment: comment ?? ""
        }, {}, updateRecipeCommentAction))
    };
}

function updateRecipeCommentAction(response) {
    return {
        type   : CONSTANTS.RECIPE_COMMENT_UPDATE,
        payload: response
    };
}

function updateRecipeCommentLoadingAction() {
    return {
        type   : CONSTANTS.RECIPE_COMMENT_UPDATE_LOADING,
        payload: null
    };
}

/**
 * Delete recipe by id
 * @returns
 */
export function deleteRecipeComment(recipeId) {
    return dispatch => {
        dispatch(deleteRecipeCommentLoadingAction())
        dispatch(apiDelete(`comment/deleteComment/${recipeId}`, {}, deleteRecipeCommentAction))
    };
}

function deleteRecipeCommentAction(response) {
    return {
        type   : CONSTANTS.RECIPE_COMMENT_DELETE,
        payload: response
    };
}

function deleteRecipeCommentLoadingAction() {
    return {
        type   : CONSTANTS.RECIPE_COMMENT_DELETE_LOADING,
        payload: null
    };
}