import { type } from "../utils/types";

const initAuthReducer = {
    isLogued: false,
    token: '',
    expiration:null
}

export const authReducer = (state = initAuthReducer, action) => {
    switch (action.type) {
        case type.login:
            return {
                isLogued: true,
                ...action.payload
            }

        case type.logout:
            return {
                isLogued: false,
                ...initAuthReducer
            }

        default:
            return state;
    }
}
