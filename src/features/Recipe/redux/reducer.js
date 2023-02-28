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
        case CONSTANTS.RECIPE_DETAIL:
            let data = payload.data ?? {}
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: false,
                    data   : payload.data ?? {}
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
        default:
            return state;
    }
}