import {apiGet, apiPost} from "@common/crud";
import * as CONSTANTS from "./constants";

/**
 * Get recipe all
 * @returns
 */
export function getRecipeManagement() {
    return dispatch => {
        dispatch(getRecipeManagementLoadingAction())
        dispatch(apiGet('recipe/getAllRecipe', {}, {}, getRecipeManagementAction))
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