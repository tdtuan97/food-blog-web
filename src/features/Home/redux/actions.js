import {apiGet} from "@common/crud";
import * as CONSTANTS from "./constants";

/**
 * Get Ingredient By Season
 * @returns
 */
export function getIngredientBySeason() {
    return dispatch => {
        dispatch(getIngredientBySeasonLoadingAction())
        dispatch(apiGet('ingredient/getIngredientBySeason', {}, {}, getIngredientBySeasonAction))
    };
}

function getIngredientBySeasonAction(response) {
    return {
        type   : CONSTANTS.INGREDIENT,
        payload: response
    };
}

function getIngredientBySeasonLoadingAction() {
    return {
        type   : CONSTANTS.INGREDIENT_LOADING,
        payload: null
    };
}

/**
 * Get recipe all
 * @returns
 */
export function getRecipeAll() {
    return dispatch => {
        dispatch(getRecipeAllLoadingAction())
        dispatch(apiGet('recipe/getAllRecipe', {}, {}, getRecipeAllAction))
    };
}

function getRecipeAllAction(response) {
    return {
        type   : CONSTANTS.RECIPE_ALL,
        payload: response
    };
}

function getRecipeAllLoadingAction() {
    return {
        type   : CONSTANTS.RECIPE_ALL_LOADING,
        payload: null
    };
}

/**
 * Get recipe by follow user
 * @returns
 */
export function getRecipeByFollowUser() {
    return dispatch => {
        dispatch(getRecipeByFollowUserLoadingAction())
        dispatch(apiGet('recipe/getAllRecipe', {}, {}, getRecipeByFollowUserAction))
    };
}

function getRecipeByFollowUserAction(response) {
    return {
        type   : CONSTANTS.RECIPE_BY_FOLLOW_USER,
        payload: response
    };
}

function getRecipeByFollowUserLoadingAction() {
    return {
        type   : CONSTANTS.RECIPE_BY_FOLLOW_USER_LOADING,
        payload: null
    };
}

/**
 * Get recipe by follow user
 * @returns
 */
export function getRecipePopular() {
    return dispatch => {
        dispatch(getRecipePopularLoadingAction())
        dispatch(apiGet('recipe/getPopularRecipe', {}, {}, getRecipePopularAction))
    };
}

function getRecipePopularAction(response) {
    return {
        type   : CONSTANTS.RECIPE_BY_POPULAR,
        payload: response
    };
}

function getRecipePopularLoadingAction() {
    return {
        type   : CONSTANTS.RECIPE_BY_POPULAR_LOADING,
        payload: null
    };
}

/**
 * Get recipe by ingredient slug
 * @returns
 */
export function getRecipeIngredient(ingredientSlug) {
    return dispatch => {
        dispatch(getRecipeIngredientLoadingAction())
        dispatch(apiGet(`recipe/getRecipeByIngredient/${ingredientSlug}`, {}, {}, getRecipeIngredientAction))
    };
}

function getRecipeIngredientAction(response) {
    return {
        type   : CONSTANTS.RECIPE_BY_INGREDIENT,
        payload: response
    };
}

function getRecipeIngredientLoadingAction() {
    return {
        type   : CONSTANTS.RECIPE_BY_INGREDIENT_LOADING,
        payload: null
    };
}

/**
 * Search recipe
 * @returns
 */
 export function getRecipeByKeyword(keyword) {
    return dispatch => {
        dispatch(getRecipeByKeywordLoadingAction(keyword))
        if(keyword){
            dispatch(apiGet(`recipe/searchRecipe`, {
                q: keyword
            }, {}, getRecipeByKeywordAction))
        }
        dispatch(getRecipeByKeywordAction({}))
    };
}

function getRecipeByKeywordAction(response) {
    return {
        type   : CONSTANTS.SEARCH_REICPE,
        payload: response
    };
}

function getRecipeByKeywordLoadingAction(keyword) {
    return {
        type   : CONSTANTS.SEARCH_REICPE_LOADING,
        payload: {
            keyword: keyword
        }
    };
}