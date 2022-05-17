import axios from "axios";
import { type } from "../utils/types";

const initAuthReducer = {
    isLogued: false,
    token: '',
    expiration: null,
    roles: []
}

const initializeAuth = () => {
    const user = localStorage.getItem('VETUSER');
    if (user !== null) {
        const userData = JSON.parse(user)
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
        return userData;
    }

    return initAuthReducer;
}

export const authReducer = (state = initializeAuth(), action) => {
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
