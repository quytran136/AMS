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
    return {
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
    return {
        type: type.GET_USER_INFO_LOGIN_SUCCESS,
        userInfo
    }
}

export const getUserInfoSuccess = (userInfo) => {
    return {
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
    return {
        type: type.LOCK_UNLOCK_USER,
        body
    }
}

export const requestProcessFlow = (body) => {
    return {
        type: type.REQUEST_PROCESS_FLOW,
        body
    }
}

export const saveProcessFlow = (processFlows) => {
    return {
        type: type.SAVE_PROCESS_FLOW,
        processFlows
    }
}

export const requestWarehouse = (body) => {
    return {
        type: type.REQUEST_WAREHOUSE,
        body
    }
}

export const requestSupplier = (body) => {
    return {
        type: type.REQUEST_SUPPLIER,
        body
    }
}


export const getWarehouseSuccess = (warehouses) => {
    return {
        type: type.GET_WAREHOUSE_SUCCESS,
        warehouses
    }
}

export const getSupplierSuccess = (supplier) => {
    return {
        type: type.GET_SUPPLIER_SUCCESS,
        supplier
    }
}

export const setWarehouseAction = (warehouseAction) => {
    return {
        type: type.SET_WAREHOUSE_ACTION,
        warehouseAction
    }
}

export const requestAsset = (body) => {
    return {
        type: type.REQUEST_ASSET,
        body
    }
}

export const getAssetClassifiesSuccess = (assetClassifies) => {
    return {
        type: type.GET_ASSETCLASSIFIES_SUCCESS,
        assetClassifies
    }
}

export const requestConfigCommon = (body) => {
    return {
        type: type.REQUEST_CONFIG_COMMON,
        body
    }
}

export const getConfigCommonSuccess = (configCommon) => {
    return {
        type: type.GET_CONFIG_COMMON,
        configCommon
    }
}

export const requestTicket = (body) => {
    return {
        type: type.REQUEST_CREATE_TICKET,
        body
    }
}

export const getTicketSuccess = (ticket) => {
    return {
        type: type.GET_TICKET,
        ticket
    }
}

export const requestNotification = (body) => {
    return {
        type: type.GET_NOTIFICATION,
        body
    }
}

export const requestNotificationSuccess = (notifications) => {
    return {
        type: type.GET_NOTIFICATION_SUCCESS,
        notifications
    }
}

export const setRequestID = (requestID) => {
    return {
        type: type.REQUEST_ID,
        requestID
    }
}

export const setFunctionTitle = (functionTitle) => {
    return {
        type: type.SET_FUNC_TITLE,
        functionTitle
    }
}

export const getReport = (body) => {
    return {
        type: type.GET_REPORT,
        body
    }
}

export const getReportSuccess = (result) => {
    return {
        type: type.GET_REPORT_SUCCESS,
        result
    }
}

export const addChatList = (item) => {
    return {
        type: type.ADD_CHAT_LIST,
        item
    }
}

export const removeChatList = (item) => {
    return {
        type: type.REMOVE_CHAT_LIST,
        item
    }
}

export const hadMessage = (content) => {
    return {
        type: type.HAD_MESSAGE,
        content
    }
}

export const getChatHistory = (body) => {
    return {
        type: type.CHAT_HISTORY,
        body
    }
}

export const getChatHistorySuccess = (result) => {
    return {
        type: type.CHAT_HISTORY_SUCCESS,
        result
    }
}

export const getAssetSuccess = (result) => {
    return{
        type: type.GET_ASSET_SUCCESS,
        result 
    }
}