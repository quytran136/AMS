import * as type from "../Type";

const initialState = {
    token: null,
    userName: null,
    tabLogin: null,
    error: null,
    cookie: null,
    userInfo: null,
    showMenu: true,
    organizationalChart: null,
    departmentChart: null,
    message: null,
    departmentData: null,
    organizationData: null,
    departmentDetail: null
}

export const amsReducer = (state = initialState, action) => {
    switch (action?.type) {
        case type.ERROR_API:
            return {
                ...state,
                error: action.error
            }
        case type.MESSAGE:
            return {
                ...state,
                message: action.message
            }
        case type.SAVE_TOKEN:
            return {
                ...state,
                token: action.token
            }
        case type.SAVE_USER_LOGIN:
            return {
                ...state,
                userName: action.userName
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
        case type.SAVE_USER_INFO:
            return {
                ...state,
                userInfo: action.userInfo
            }
        case type.SHOW_MENU:
            return {
                ...state,
                showMenu: action.showMenu
            }
        case type.SAVE_DEPARTMENT:
            return {
                ...state,
                departmentChart: action.departmentChart
            }
        case type.DEPARTMENT_DATA:
            return {
                ...state,
                departmentData: action.department
            }
        case type.DEPARTMENT_DETAIL:
            return {
                ...state,
                departmentDetail: action.department
            }
        case type.SAVE_ORGANIZATIONAL:
            return {
                ...state,
                organizationalChart: action.organizationalChart
            }
        case type.ORGANIZATION_DATA:
            return {
                ...state,
                organizationData: action.organizational
            }
        default:
            return {
                ...state,
            }
    }

}