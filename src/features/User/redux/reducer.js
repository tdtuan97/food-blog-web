import initialState from "./initialState";
import * as CONSTANTS from "./constants";
import {RESET_ACTION} from "@features/Common/redux/constants";

export function reducer(state = initialState, action) {
    let payload = action.payload;
    switch (action.type) {
        /**
         * Reset action
         */
        case RESET_ACTION:
            return {
                ...state,
                ...initialState
            }

        case CONSTANTS.GET_USER: {
            return {
                ...state,
                user: {
                    ...state.user,
                    loading: false,
                    data   : payload.data ?? {}
                },
            }
        }
        case CONSTANTS.GET_USER_LOADING: {
            return {
                ...state,
                user: {
                    ...state.user,
                    loading: true,
                },
            }
        }
        case CONSTANTS.FOLLOW_USER: {
            return {
                ...state,
                follow: {
                    ...state.follow,
                    loading: false,
                    data   : payload.data ?? {}
                },
            }
        }
        case CONSTANTS.FOLLOW_USER_LOADING: {
            return {
                ...state,
                follow: {
                    ...state.follow,
                    loading: true,
                },
            }
        }
        case CONSTANTS.UNFOLLOW_USER: {
            return {
                ...state,
                unfollow: {
                    ...state.unfollow,
                    loading: false,
                    data   : payload.data ?? {}
                },
            }
        }
        case CONSTANTS.UNFOLLOW_USER_LOADING: {
            return {
                ...state,
                unfollow: {
                    ...state.unfollow,
                    loading: true,
                },
            }
        }
        default:
            return state;
    }
}