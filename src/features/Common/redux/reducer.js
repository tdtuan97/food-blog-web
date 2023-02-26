import initialState from "./initialState";
import * as CONSTANTS from './constants'
import {LOCATION_CHANGE} from "connected-react-router";

export function reducer(state = initialState, action) {
    switch (action.type) {
        case LOCATION_CHANGE:
            return {
                ...state,
                ...initialState
            }
        case CONSTANTS.COMMON_RESET:
            return {
                ...state,
                ...initialState
            }
        case CONSTANTS.TOGGLE_SIDER_ACTION:
            return {
                ...state,
                siderCollapsed: !state.siderCollapsed
            };
        default:
            return state;
    }
}
