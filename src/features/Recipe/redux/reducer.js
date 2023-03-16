import initialState from "./initialState";
import * as CONSTANTS from "./constants";
import { RESET_ACTION } from "@features/Common/redux/constants";
import { pushMessageSuccess } from "@src/layouts";

export function reducer(state = initialState, action) {
    let payload = action.payload;
    let data
    switch (action.type) {
        /**
         * Reset action
         */
        case RESET_ACTION:
            return {
                ...state,
                ...initialState
            }
        case CONSTANTS.RECIPE_MANAGEMENT:
            data = payload.data ?? []
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    data: data ?? []
                },
            }
        case CONSTANTS.RECIPE_MANAGEMENT_LOADING: {
            return {
                ...state,
                add: {
                    ...state.add,
                    loading: true,
                },
            }
        }
        case CONSTANTS.RECIPE_ADD:
            data = payload.data ?? {}
            return {
                ...state,
                add: {
                    ...state.add,
                    loading: false,
                    data: data ?? {}
                },
            }
        case CONSTANTS.RECIPE_ADD_LOADING: {
            return {
                ...state,
                add: {
                    ...state.add,
                    loading: true,
                },
            }
        }
        case CONSTANTS.RECIPE_DELETE:
            data = payload.data ?? {}
            return {
                ...state,
                delete: {
                    ...state.delete,
                    loading: false,
                    data: data ?? {}
                },
            }
        case CONSTANTS.RECIPE_DELETE_LOADING: {
            return {
                ...state,
                delete: {
                    ...state.delete,
                    loading: true,
                },
            }
        }
        case CONSTANTS.RECIPE_DETAIL:
            data = payload.data ?? {}
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: false,
                    data: data ?? {}
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
        case CONSTANTS.RECIPE_UPDATE:
            data = payload.data ?? {}
            return {
                ...state,
                update: {
                    ...state.update,
                    loading: false,
                    data: data ?? {}
                },
            }
        case CONSTANTS.RECIPE_UPDATE_LOADING: {
            return {
                ...state,
                update: {
                    ...state.update,
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
                    data: data ?? []
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
                    data: data ?? {}
                },
                deleteComment: {
                    ...state.deleteComment,
                    data: false
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
        case CONSTANTS.RECIPE_COMMENT_UPDATE:
            data = payload.data ?? {}
            return {
                ...state,
                updateComment: {
                    ...state.updateComment,
                    loading: false,
                    data: data ?? {}
                },
                deleteComment: {
                    ...state.deleteComment,
                    data: false
                },
            }
        case CONSTANTS.RECIPE_COMMENT_UPDATE_LOADING: {
            return {
                ...state,
                updateComment: {
                    ...state.updateComment,
                    loading: true,
                },
            }
        }
        case CONSTANTS.RECIPE_COMMENT_DELETE:
            return {
                ...state,
                deleteComment: {
                    ...state.deleteComment,
                    loading: false,
                    data: payload.success === true
                },
            }
        case CONSTANTS.RECIPE_COMMENT_DELETE_LOADING: {
            return {
                ...state,
                deleteComment: {
                    ...state.deleteComment,
                    loading: true,
                },
            }
        }

        case CONSTANTS.RECIPE_LIKE:
            data = payload.data ?? {}
            if (payload.success) {
                pushMessageSuccess('Bạn đã thích công thức này.')
            }
            return {
                ...state,
                likeRecipe: {
                    ...state.likeRecipe,
                    loading: false,
                    uuid: null,
                    data: data ?? {}
                },
                unlikeRecipe: {
                    ...state.unlikeRecipe,
                    uuid: null,
                    data: {}
                },
            }
        case CONSTANTS.RECIPE_LIKE_LOADING: {
            return {
                ...state,
                likeRecipe: {
                    ...state.likeRecipe,
                    uuid: payload.uuid,
                    loading: true,
                },
            }
        }
        case CONSTANTS.RECIPE_UNLIKE:
            if (payload.success) {
                pushMessageSuccess('Bạn đã bỏ thích công thức này.')
            }
            return {
                ...state,
                unlikeRecipe: {
                    ...state.unlikeRecipe,
                    loading: false,
                    uuid: null,
                    data: payload.success === true
                },
                likeRecipe: {
                    ...state.likeRecipe,
                    uuid: null,
                    data: {}
                },
            }
        case CONSTANTS.RECIPE_UNLIKE_LOADING: {
            return {
                ...state,
                unlikeRecipe: {
                    ...state.unlikeRecipe,
                    loading: true,
                    uuid: payload.uuid,
                },
            }
        }
        default:
            return state;
    }
}