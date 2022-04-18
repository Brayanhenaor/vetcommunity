import { combineReducers } from "redux";
import { authReducer } from "./authReducer";

export const storeReducer = combineReducers({
    auth: authReducer
});