import * as type from '../Type';
import AMS_API from '../../ControlRequest/amsAPI';
import { call, put, takeLatest } from "redux-saga/effects";
import * as amsAction from '../Actions/action';
import * as cookieHandle from "../../Common/Cookie";

function* signinSaga(action) {
    try {
        const token = yield call(AMS_API.signin, action.body);
        // check variable
        if (token === null || token === undefined) {
            throw new Error("Không lấy được token");
        }
        if (token?.Response?.TokenString === "") {
            throw new Error("Không lấy được token");
        }
        cookieHandle.setCookie("BASE", JSON.stringify({
            token: token?.Response?.TokenString,
            userName: action.body.Data.UserName
        }) , 1)
        var cookie = JSON.parse(cookieHandle.getCookie("BASE"))
        yield put(amsAction.saveToken(token.Response.TokenString));
        yield put(amsAction.saveCookie(cookie));
        yield put(amsAction.saveUserLogin(action.body.Data.UserName))
    } catch (ex) {
        yield put(amsAction.getError({
            Code: "AMS_01",
            Message: "Có lỗi bất thường"
        }))
    }
}

export function* signinWatcher() {
    yield takeLatest(type.GET_TOKEN, signinSaga);
}

function* signupSaga(action) {
    try {
        const user = yield call(AMS_API.signup, action.body);
        if (user.Message) {
            yield put(amsAction.getError(user))
        }
    } catch (ex) {
        yield put(amsAction.getError({
            Code: "AMS_01",
            Message: "Có lỗi bất thường"
        }))
    }
}

export function* signupWatcher() {
    yield takeLatest(type.SIGNUP, signupSaga);
}

function* getUserInfoSaga(action) {
    try {
        const user = yield call(AMS_API.userInformation, action.body);
        if (user.Message) {
            yield put(amsAction.getError(user.Message))
            return;
        }

        yield put(amsAction.saveUserInfo(user))
    } catch (ex) {
        yield put(amsAction.getError({
            Code: "AMS_01",
            Message: "Có lỗi bất thường"
        }))
    }
}

export function* getUserInfoWatcher() {
    yield takeLatest(type.GET_USER_INFO, getUserInfoSaga);
}