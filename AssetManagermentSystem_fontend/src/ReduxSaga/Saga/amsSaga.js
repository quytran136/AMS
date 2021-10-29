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
        cookieHandle.setCookie("BASE", token?.Response?.TokenString, 1)
        var cookie = cookieHandle.getCookie("BASE")
        yield put(amsAction.saveToken(token));
        yield put(amsAction.saveCookie(cookie));
    } catch (ex) {
        yield put(amsAction.getError(ex))
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
        yield put(amsAction.getError(ex))
    }
}

export function* signupWatcher() {
    yield takeLatest(type.SIGNUP, signupSaga);
}