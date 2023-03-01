import initialState from "./initialState";
import * as CONSTANTS from "./constants";

export function reducer(state = initialState, action) {
    let payload = action.payload;
    let data
    switch (action.type) {
        /**
         * Reset action
         */
        case CONSTANTS.RECIPE_DETAIL:
            data = payload.data ?? {}
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: false,
                    data   : data ?? {}
                },
            }
        case CONSTANTS.RECIPE_DETAIL_LOADING: {
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: true,
                },
            }
        }
        case CONSTANTS.RECIPE_COMMENTS:
            data = payload.data ?? {}
            return {
                ...state,
                comments: {
                    ...state.comments,
                    loading: false,
                    data   : data ?? []
                },
            }
        case CONSTANTS.RECIPE_COMMENTS_LOADING: {
            return {
                ...state,
                comments: {
                    ...state.comments,
                    loading: true,
                },
            }
        }
        case CONSTANTS.RECIPE_COMMENT_POST:
            data = payload.data ?? {}
            return {
                ...state,
                postComment: {
                    ...state.postComment,
                    loading: false,
                    data   : data ?? []
                },
            }
        case CONSTANTS.RECIPE_COMMENT_POST_LOADING: {
            return {
                ...state,
                postComment: {
                    ...state.postComment,
                    loading: true,
                },
            }
        }
        default:
            return state;
    }
}