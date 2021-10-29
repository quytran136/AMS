import * as type from "../Type";

const initialState = {
    token: null,
    tabLogin: null,
    error: null,
    cookie: null,
}

export const amsReducer = (state = initialState, action) => {
    switch (action?.type) {
        case type.ERROR_API:
            return {
                ...state,
                error: action.error
            }
        case type.SAVE_TOKEN:
            return {
                ...state,
                token: action.token
            }
        case type.COOKIE:
            return {
                ...state,
                cookie: action.cookie
            }
        case type.SET_TAB_LOGIN:
            return {
                ...state,
                tabLogin: action.tab
            }
        default:
            return {
                ...state,
            }
    }

}