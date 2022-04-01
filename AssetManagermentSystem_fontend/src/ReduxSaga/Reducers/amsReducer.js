import { getAssetSuccess } from "../Actions";
import * as type from "../Type";

const initialState = {
    token: null,
    userName: null,
    tabLogin: null,
    error: null,
    cookie: null,
    userInfo: null,
    userInfoLogin: null,
    users: [],
    showMenu: true,
    organizationalChart: null,
    departmentChart: null,
    message: null,
    departmentData: null,
    organizationData: null,
    departmentDetail: null,
    signupSuccess: false,
    processFlows: null,
    warehouseAction: null,
    assetClassifies: null,
    configCommon: null,
    ticket: null,
    notifications: null,
    requestID: null,
    functionTitle: "",
    report: null,
    result: null,
    supplier: null,
    chatList: [],
    hadMessage: null,
    chatMessage: null
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
        case type.SIGNUP_SUSSESS:
            return {
                ...state,
                signupSuccess: action.result
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
        case type.GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.users
            }
        case type.GET_USER_INFO_LOGIN_SUCCESS:
            return {
                ...state,
                userInfoLogin: action.userInfo
            }
        case type.GET_USER_INFO_SUCCESS:
            return {
                ...state,
                userInfo: action.userInfo
            }
        case type.GET_USERS_BY_DEPARTMENT_SUCCESS:
            return {
                ...state,
                users: action.users
            }
        case type.SAVE_PROCESS_FLOW:
            return {
                ...state,
                processFlows: action.processFlows
            }
        case type.GET_WAREHOUSE_SUCCESS:
            return {
                ...state,
                warehouses: action.warehouses
            }
        case type.GET_SUPPLIER_SUCCESS:
            return {
                ...state,
                supplier: action.supplier
            }
        case type.GET_ASSETCLASSIFIES_SUCCESS:
            return {
                ...state,
                assetClassifies: action.assetClassifies
            }
        case type.SET_WAREHOUSE_ACTION:
            return {
                ...state,
                warehouseAction: action.warehouseAction
            }
        case type.GET_CONFIG_COMMON:
            return {
                ...state,
                configCommon: action.configCommon
            }
        case type.GET_TICKET:
            return {
                ...state,
                ticket: action.ticket
            }
        case type.GET_NOTIFICATION_SUCCESS:
            return {
                ...state,
                notifications: action.notifications
            }
        case type.REQUEST_ID:
            return {
                ...state,
                requestID: action.requestID
            }
        case type.SET_FUNC_TITLE:
            return {
                ...state,
                functionTitle: action.functionTitle
            }
        case type.GET_REPORT_SUCCESS:
            return {
                ...state,
                result: action.result
            }
        case type.ADD_CHAT_LIST:
            var listChatTem = state.chatList
            var list = state.chatList.filter(item => item.ID === action.item.ID)
            if (list && list.length === 0) {
                if (state.chatList > 2) {
                    listChatTem.shift();
                }
                listChatTem.push(action.item)
            }
            return {
                ...state,
                chatList: listChatTem
            }
        case type.REMOVE_CHAT_LIST:
            var list = state.chatList.filter(item => item.ID !== action.item.ID)
            return {
                ...state,
                chatList: list
            }
        case type.HAD_MESSAGE:
            return {
                ...state,
                hadMessage: action.content
            }
        case type.CHAT_HISTORY_SUCCESS:
            return {
                ...state,
                chatMessage: action.result
            }
        default:
            return {
                ...state,
            }
    }

}