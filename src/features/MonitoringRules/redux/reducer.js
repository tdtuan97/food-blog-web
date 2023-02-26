import initialState from "./initialState";
import * as CONSTANTS from "./constants";
import * as CONSTANTS_COMMON from "@features/Common/redux/constants";
import {pushMessageSuccess} from "@layouts";
import {CODE_SUCCESS} from "@common/crud";

export function reducer(state = initialState, action) {
    let payload = action.payload ?? {};
    switch (action.type) {
        /**
         * Reset action
         */
        case CONSTANTS_COMMON.RESET_ACTION:
            return {
                ...state,
                ...initialState
            }

        /**
         * Reset action
         */
        case CONSTANTS.CLEAR_FORM_RULE:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    ...initialState.detail
                },
                create: {
                    ...state.create,
                    ...initialState.create
                },
                update: {
                    ...state.update,
                    ...initialState.update
                },
            }

        /**
         * Get meta conditions
         */
        case CONSTANTS.GET_META_CONDITIONS:
            return {
                ...state,
                meta: {
                    ...state.meta,
                    loading: false,
                    data   : payload.data ?? {},
                },
            }
        case CONSTANTS.GET_META_CONDITIONS_LOADING:
            return {
                ...state,
                meta: {
                    ...state.meta,
                    loading: true,
                },
            }

        /**
         * Get rule list
         */
        case CONSTANTS.GET_RULE_LIST:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    data   : payload ? payload.data : [],
                },
            }
        case CONSTANTS.GET_RULE_LIST_LOADING:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: true,
                },
            }

        /**
         * Get rule detail
         */
        case CONSTANTS.GET_RULE_DETAIL:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: false,
                    data   : payload.data ?? {},
                    errors : payload.errors ?? {},
                },
            }
        case CONSTANTS.GET_RULE_DETAIL_LOADING:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: true,
                },
            }

        /**
         * Create rule
         */
        case CONSTANTS.CREATE_RULE:
            if (payload.code === CODE_SUCCESS){
                pushMessageSuccess("Create rule success.");
            }
            return {
                ...state,
                create: {
                    ...state.create,
                    loading: false,
                    data   : payload.data ?? {},
                    errors : payload.errors ?? {},
                },
            }
        case CONSTANTS.CREATE_RULE_LOADING:
            return {
                ...state,
                create: {
                    ...state.create,
                    loading: true,
                },
            }

        /**
         * Update rule
         */
        case CONSTANTS.UPDATE_RULE:
            if (payload.code === CODE_SUCCESS){
                pushMessageSuccess("Update rule success.");
            }
            return {
                ...state,
                update: {
                    ...state.update,
                    loading: false,
                    data   : payload.data ?? {},
                    errors : payload.errors ?? {},
                },
            }
        case CONSTANTS.UPDATE_RULE_LOADING:
            return {
                ...state,
                update: {
                    ...state.update,
                    loading: true,
                },
            }

        /**
         * Delete rule
         */
        case CONSTANTS.DELETE_RULE:
            if (payload.code === CODE_SUCCESS){
                pushMessageSuccess("Delete rule success.");
            }
            return {
                ...state,
                delete: {
                    ...state.delete,
                    loading: false,
                    data   : payload.data ?? {},
                    errors : payload.errors ?? {},
                },
            }
        case CONSTANTS.DELETE_RULE_LOADING:
            return {
                ...state,
                delete: {
                    ...state.delete,
                    loading: true,
                },
            }

        default:
            return state;
    }
}