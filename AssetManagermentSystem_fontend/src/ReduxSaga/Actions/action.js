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
        cookie: cookie
    }
}