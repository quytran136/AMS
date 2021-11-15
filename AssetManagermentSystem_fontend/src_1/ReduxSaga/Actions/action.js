import * as type from "../Type";

export const setError = (error) => {
    return {
        type: type.ERROR_API,
        error,
    };
}

export const setMessage = (message) => {
    return {
        type: type.MESSAGE,
        message,
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

export const signupSuccess = (result) => {
    return{
        type: type.SIGNUP_SUSSESS,
        result
    }
}


export const saveCookie = (cookie) => {
    return {
        type: type.COOKIE,
        cookie
    }
}

export const setShowMenu = (showMenu) => {
    return {
        type: type.SHOW_MENU,
        showMenu
    }
}

export const getDepartmentChart = (body) => {
    return {
        type: type.GET_DEPARTMENT,
        body
    }
}

export const saveDepartmentChart = (departmentChart) => {
    return {
        type: type.SAVE_DEPARTMENT,
        departmentChart
    }
}

export const saveChangeDepartmentChart = (body) => {
    return {
        type: type.SAVE_CHANGE_DEPARTMENT,
        body
    }
}

export const setDepartmentData = (department) => {
    return {
        type: type.DEPARTMENT_DATA,
        department
    }
}

export const getDepartmentDetail = (body) => {
    return {
        type: type.GET_DEPARTMENT_DETAIL,
        body
    }
}

export const saveDepartmentDetail = (department) => {
    console.log(department)
    return {
        type: type.DEPARTMENT_DETAIL,
        department
    }
}

export const getOrganizationalChart = (body) => {
    return {
        type: type.GET_ORGANIZATIONAL,
        body
    }
}

export const saveOrganizationalChart = (organizationalChart) => {
    return {
        type: type.SAVE_ORGANIZATIONAL,
        organizationalChart
    }
}

export const saveChangeOrganizationalChart = (body) => {
    return {
        type: type.SAVE_CHANGE_ORGANIZATIONAL,
        body
    }
}

export const getUsers = (body) => {
    return {
        type: type.GET_USERS,
        body
    }
}

export const getUserSuccess = (users) => {
    return {
        type: type.GET_USERS_SUCCESS,
        users
    }
}

export const getUserInfo = (body) => {
    return {
        type: type.GET_USER_INFO,
        body
    }
}

export const getUserInfoLogin = (body) => {
    return {
        type: type.GET_USER_INFO_LOGIN,
        body
    }
}

export const getUserInfoLoginSuccess = (userInfo) => {
    return{
        type: type.GET_USER_INFO_LOGIN_SUCCESS,
        userInfo
    }
}

export const getUserInfoSuccess = (userInfo) => {
    return{
        type: type.GET_USER_INFO_SUCCESS,
        userInfo
    }
}

export const getUsersByDepartment = (body) => {
    return {
        type: type.GET_USERS_BY_DEPARTMENT,
        body
    }
}

export const getUsersByDepartmentSuccess = (users) => {
    return {
        type: type.GET_USERS_BY_DEPARTMENT_SUCCESS,
        users
    }
}

export const deleteUser = (body) => {
    return {
        type: type.DELETE_USER,
        body
    }
}

export const lockOrUnlock = (body) => {
    return{
        type: type.LOCK_UNLOCK_USER,
        body
    }
}