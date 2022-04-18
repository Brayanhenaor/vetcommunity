import { type } from "../utils/types";

const initUiReducer = {
    loading: false
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

        default:
            return state;
    }
}
