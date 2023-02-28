import {apiGet} from "@common/crud";
import * as CONSTANTS from "./constants";

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