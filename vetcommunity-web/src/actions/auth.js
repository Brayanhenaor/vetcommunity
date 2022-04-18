import { type } from "../utils/types";

export const login = (userData) => ({
    type: type.login,
    payload: {
        ...userData
    }
});

export const logout = () => ({
    type: type.logout
});