import * as type from "../Type";

const initialState = {
    token: null,
    userName: null,
    tabLogin: null,
    error: null,
    cookie: null,
    userInfo: null,
    showMenu: true,
    treeORG: {
        label: "root",
        key: 1,
        list: [{
            label: "123",
            key: 2,
            list: [
                {
                    label: "dbc",
                    key: 5,
                    list: []
                },
                {
                    label: "dbc",
                    key: 6,
                    list: []
                }]
        },
        {
            label: "123",
            key: 3,
            list: [
                {
                    label: "dbc",
                    key: 7,
                    list: []
                },
                {
                    label: "dbc",
                    key: 8,
                    list: []
                }]
        }]
    }
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
        case type.TREE_ORG:
            return {
                ...state,
                treeORG: action.tree
            }
        default:
            return {
                ...state,
            }
    }

}