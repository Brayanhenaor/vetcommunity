import { type } from "../utils/types";

const initUiReducer = {
    loading: false,
    snackbar: {
        open: false,
        message: '',
        severity: 'success'
    }
}

export const uiReducer = (state = initUiReducer, action) => {
    switch (action.type) {
        case type.startLoading:
            return {
                loading: true
            }

        case type.stopLoading:
            return {
                loading: false
            }

        case type.showSnack:
            return {
                ...state,
                snackbar: {
                    open: true,
                    ...action.payload
                }
            }

        case type.hideSnack:
            return {
                ...state,
                snackbar: {
                    ...state.snackbar,
                    open: false
                }
            }

        default:
            return state;
    }
}
