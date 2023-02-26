import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import historyCommon from "./historyCommon";
import {reducer as CrudReducer} from "./crud/reducer"
import {reducer as CommonReducer} from "@features/Common/redux/reducer"
import {reducer as AuthReducer} from "@features/Auth/redux/reducer"
import {reducer as HomeReducer} from "@features/Home/redux/reducer"
//import {reducer as EventReducer} from "@features/Event/redux/reducer"

const reducerMap = {
    router             : connectRouter(historyCommon),
    common             : CommonReducer,
    crud               : CrudReducer,
    auth               : AuthReducer,
    home               : HomeReducer,
    //event              : EventReducer,
};

export default combineReducers(reducerMap);
