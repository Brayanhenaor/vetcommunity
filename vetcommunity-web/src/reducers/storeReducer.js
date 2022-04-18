import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { uiReducer } from "./uiReducer";

export const storeReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer
});