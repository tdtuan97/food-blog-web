import initialState from "./initialState";
import * as CONSTANTS from "./constants";

export function reducer(state = initialState, action) {
    let payload = action.payload;
    switch (action.type) {
        /**
         * Reset action
         */

        /**
         * Reset action
         */
        case CONSTANTS.INGREDIENT:
            return {
                ...state,
                ingredientList: {
                    ...state.ingredientList,
                    loading: false,
                    data   : payload.data ?? []
                },
            }
        case CONSTANTS.INGREDIENT_LOADING: {
            return {
                ...state,
                ingredientList: {
                    ...state.ingredientList,
                    loading: true,
                },
            }
        }
        case CONSTANTS.RECIPE_ALL: {
            return {
                ...state,
                recipeAll: {
                    ...state.recipeAll,
                    loading: false,
                    data   : payload.data ?? []
                },
            }
        }
        case CONSTANTS.RECIPE_ALL_LOADING: {
            return {
                ...state,
                recipeAll: {
                    ...state.recipeAll,
                    loading: true,
                },
            }
        }
        case CONSTANTS.RECIPE_BY_FOLLOW_USER: {
            return {
                ...state,
                recipeByFollowUser: {
                    ...state.recipeByFollowUser,
                    loading: false,
                    data   : payload.data ?? []
                },
            }
        }
        case CONSTANTS.RECIPE_BY_FOLLOW_USER_LOADING: {
            return {
                ...state,
                recipeByFollowUser: {
                    ...state.recipeByFollowUser,
                    loading: true,
                },
            }
        }
        case CONSTANTS.RECIPE_BY_POPULAR: {
            return {
                ...state,
                recipeByPopular: {
                    ...state.recipeByPopular,
                    loading: false,
                    data   : payload.data ?? []
                },
            }
        }
        case CONSTANTS.RECIPE_BY_POPULAR_LOADING: {
            return {
                ...state,
                recipeByPopular: {
                    ...state.recipeByPopular,
                    loading: true,
                },
            }
        }
        case CONSTANTS.RECIPE_BY_INGREDIENT: {
            return {
                ...state,
                recipeByIngredient: {
                    ...state.recipeByIngredient,
                    loading: false,
                    data   : payload.data ?? []
                },
            }
        }
        case CONSTANTS.RECIPE_BY_INGREDIENT_LOADING: {
            return {
                ...state,
                recipeByIngredient: {
                    ...state.recipeByIngredient,
                    loading: true,
                },
            }
        }
        case CONSTANTS.SEARCH_REICPE: {
            return {
                ...state,
                recipeBySearch: {
                    ...state.recipeBySearch,
                    loading: false,
                    data   : payload.data ?? []
                },
            }
        }
        case CONSTANTS.SEARCH_REICPE_LOADING: {
            return {
                ...state,
                recipeBySearch: {
                    ...state.recipeBySearch,
                    loading: true,
                    keyword: payload.keyword,
                },
            }
        }
        default:
            return state;
    }
}