import * as type from "../Type";

export const getError = (error) => {
    return {
        type: type.ERROR_API,
        error,
    };
}

export const getToken = (body) => {
    return {
        type: type.GET_TOKEN,
        body,
    };
};

export const saveToken = (token) => {
    return {
        type: type.SAVE_TOKEN,
        token,
    }
}

export const saveUserLogin = (userName) => {
    return {
        type: type.SAVE_USER_LOGIN,
        userName,
    }
}

export const setTabLogin = (tab) => {
    return {
        type: type.SET_TAB_LOGIN,
        tab,
    }
}

export const signup = (body) => {
    return {
        type: type.SIGNUP,
        body
    }
}


export const saveCookie = (cookie) => {
    return {
        type: type.COOKIE,
        cookie
    }
}

export const getUserInfo = (body) => {
    return {
        type: type.GET_USER_INFO,
        body
    }
}

export const saveUserInfo = (userInfo) => {
    return {
        type: type.SAVE_USER_INFO,
        userInfo
    }
}

export const setShowMenu = (showMenu) => {
    return {
        type: type.SHOW_MENU,
        showMenu
    }
}

export const getDepartmentChart = (body) => {
    return{
        type: type.GET_DEPARTMENT,
        body
    }
}

export const saveDepartmentChart = (departmentChart) => {
    return{
        type: type.SAVE_DEPARTMENT,
        departmentChart
    }
}

export const getOrganizational = (body) => {
    return{
        type: type.GET_ORGANIZATIONAL,
        body
    }
}

export const saveOrganizational = (organizationalChart) => {
    return{
        type: type.SAVE_ORGANIZATIONAL,
        organizationalChart
    }
}