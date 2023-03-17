import initialState from "./initialState";
import {RESPONSE_ACTION, PENDING_ACTION} from "./constants";
import {LOCATION_CHANGE} from 'connected-react-router';
import {pushMessageError} from "@layouts";
import * as CONSTANTS_COMMON from "@features/Common/redux/constants";

export function reducer(state = initialState, action) {
    let payload = action.payload;
    switch (action.type) {
        case LOCATION_CHANGE:
        case CONSTANTS_COMMON.RESET_ACTION:
            return {
                ...state,
                ...initialState,
                loading: false
            };
        case PENDING_ACTION:
            return {
                ...state,
                loading: true
            };
        case RESPONSE_ACTION:
            if (payload.status >= 400 && ([
                428,
                432,
                438,
                436,
                439,
                441,
                442,
            ].indexOf(payload.status) === -1)) {
                pushMessageError(payload.message);
            }

            return {
                ...state,
                data      : payload.data,
                code      : payload.code,
                message   : payload.message,
                errors    : payload.errors ?? [],
                loading   : false,
                status    : payload.status,
                statusText: payload.status,
            };
        default:
            return state;
    }
}