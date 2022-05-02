import { type } from "../utils/types";

export const showSnack = (message, severity) => ({
    type: type.showSnack,
    payload: {
        message: message,
        severity: severity
    }
});

export const hideSnack = () => ({
    type: type.hideSnack,
});