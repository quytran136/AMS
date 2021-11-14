import * as type from '../Type';
import AMS_API from '../../ControlRequest/amsAPI';
import { call, put, takeLatest, select } from "redux-saga/effects";
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

        if (token.Message) {
            yield put(amsAction.setError(token))
        } else {
            cookieHandle.setCookie("BASE", JSON.stringify({
                token: token?.Response?.TokenString,
                userName: action.body.Data.UserName
            }), 1)
            var cookie = JSON.parse(cookieHandle.getCookie("BASE"))
            yield put(amsAction.saveToken(token.Response.TokenString));
            yield put(amsAction.saveCookie(cookie));
            yield put(amsAction.saveUserLogin(action.body.Data.UserName))
        }
    } catch (ex) {
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

export function* signinWatcher() {
    yield takeLatest(type.GET_TOKEN, signinSaga);
}

function* signupSaga(action) {
    try {
        yield put(amsAction.signupSuccess(false))
        const user = yield call(AMS_API.signup, action.body);
        if (user.Message) {
            yield put(amsAction.setError(user))
        }else{
            yield put(amsAction.signupSuccess(true))
            if(action.body.Key.includes('UPDATE')){
                yield put(amsAction.setMessage("Cập nhật thành công"))
            }else{
                yield put(amsAction.setMessage("Đăng ký thành công"))
            }
        }
    } catch (ex) {
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

export function* signupWatcher() {
    yield takeLatest(type.SIGNUP, signupSaga);
}

function* getDepartmentChartSaga(action) {
    try {
        const departmentChart = yield call(AMS_API.departmentChart, action.body)

        if (departmentChart === null || departmentChart === undefined) {
            throw new Error("Không lấy được sơ đồ phòng ban")
        }

        if (!departmentChart?.Response) {
            throw new Error("Không có sơ đồ phòng ban")
        }

        if (departmentChart.Message) {
            yield put(amsAction.setError(departmentChart))
        } else {
            yield put(amsAction.saveDepartmentChart(departmentChart.Response.Department))
        }
    } catch (ex) {
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

export function* getDepartmentChartWatcher() {
    yield takeLatest(type.GET_DEPARTMENT, getDepartmentChartSaga);
}

function* saveChangeDepartmentChartSaga(action) {
    try {
        const departmentChart = yield call(AMS_API.departmentChart, action.body)

        if (departmentChart === null || departmentChart === undefined) {
            throw new Error("Không lưu được sơ đồ phòng ban")
        }

        if (departmentChart.Message) {
            yield put(amsAction.setError(departmentChart))
        } else {
            yield put(amsAction.setMessage("Lưu Thành công"))
            yield put(amsAction.saveDepartmentChart(null))
            const reducer = yield select()
            const body = {
                Token: reducer?.amsReducer?.token,
                Key: "DEPARTMENT_CHART",
                Data: {
                    UserNameRequest: reducer?.amsReducer?.userName
                }
            }
            yield call(getDepartmentChartSaga, {
                body: body
            })
        }
    } catch (ex) {
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

export function* saveChangeDepartmentChartWatcher() {
    yield takeLatest(type.SAVE_CHANGE_DEPARTMENT, saveChangeDepartmentChartSaga);
}

function* getOrganizationalChartSaga(action) {
    try {
        const organizationalChart = yield call(AMS_API.organizationalChart, action.body)
        if (organizationalChart === null || organizationalChart === undefined) {
            throw new Error("Không lưu được sơ đồ phòng ban")
        }
        
        if (!organizationalChart?.Response) {
            throw new Error("Không có sơ đồ tổ chức phòng ban")
        }

        if (organizationalChart.Message) {
            yield put(amsAction.setError(organizationalChart))
        } else {
            yield put(amsAction.saveOrganizationalChart(organizationalChart.Response.Organizational))
        }
    } catch (ex) {
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

export function* getOrganizationalChartWatcher() {
    yield takeLatest(type.GET_ORGANIZATIONAL, getOrganizationalChartSaga);
}

function* saveChangeOrganizationalChartSaga(action) {
    try {
        const organizationalChart = yield call(AMS_API.organizationalChart, action.body)

        if (organizationalChart === null || organizationalChart === undefined) {
            throw new Error("Không lưu được sơ đồ tổ chức phòng ban")
        }

        if (organizationalChart.Message) {
            yield put(amsAction.setError(organizationalChart))
        } else {
            yield put(amsAction.setMessage("Lưu Thành công"))
            yield put(amsAction.saveOrganizationalChart(null))
            const reducer = yield select()
            const body = { 
                Token: reducer?.amsReducer?.token,
                Key: "ORGANIZATIONAL_CHART",
                Data: {
                    UserNameRequest: reducer?.amsReducer?.userName,
                    DepartmentID: reducer?.amsReducer?.departmentData.ID
                }
            }
            yield call(getOrganizationalChartSaga, {
                body: body
            })
        }
    } catch (ex) {
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

export function* saveChangeOrganizationalChartWatcher() {
    yield takeLatest(type.SAVE_CHANGE_ORGANIZATIONAL, saveChangeOrganizationalChartSaga);
}

function* getDepartmentDetailSaga(action) {
    try {
        const departmentDetail = yield call(AMS_API.departmentChart, action.body)

        if (departmentDetail === null || departmentDetail === undefined) {
            throw new Error("Không lấy được thông tin phòng ban 1")
        }
        
        if (!departmentDetail?.Response) {
            throw new Error("Không lấy được thông tin phòng ban 2")
        }

        if (departmentDetail.Message) {
            yield put(amsAction.setError(departmentDetail))
        } else {
            yield put(amsAction.saveDepartmentDetail(departmentDetail.Response.Department))
        }
    } catch (ex) {
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

export function* getDepartmentDetailWatcher() {
    yield takeLatest(type.GET_DEPARTMENT_DETAIL, getDepartmentDetailSaga);
}

function* getUsersSaga(action){
    try{
        const users = yield call(AMS_API.userInformation, action.body)

        if(!users){
            throw new Error("Không lấy được danh sách nhân viên")
        }

        if(!users.Message){
            yield put(amsAction.getUserSuccess(users.Response.Users))
        }else{
            yield put(amsAction.setError(users))
        }
    }catch(ex){
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

export function* getUsersWatcher() {
    yield takeLatest(type.GET_USERS, getUsersSaga);
}

function* getUserInfoSaga(action){
    try{
        const userinfo = yield call(AMS_API.userInformation, action.body)

        if(!userinfo){
            throw new Error("Không lấy được thông tin nhân viên")
        }

        if(userinfo.Message){
            yield put(amsAction.setError(userinfo))
        }else{
            if(!userinfo.Response){
                throw new Error("Không lấy được thông tin nhân viên")
            }else{
                yield put(amsAction.getUserInfoSuccess(userinfo.Response))
            }
        }
    }catch(ex){
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

export function* getUserInfoWatcher() {
    yield takeLatest(type.GET_USER_INFO, getUserInfoSaga);
}

function* getUserInfoLoginSaga(action){
    try{
        const userinfo = yield call(AMS_API.userInformation, action.body)

        if(!userinfo){
            throw new Error("Không lấy được thông tin nhân viên")
        }

        if(userinfo.Message){
            yield put(amsAction.setError(userinfo))
        }else{
            if(!userinfo.Response){
                throw new Error("Không lấy được thông tin nhân viên")
            }else{
                yield put(amsAction.getUserInfoLoginSuccess(userinfo.Response))
            }
        }
    }catch(ex){
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

export function* getUserInfoLoginWatcher() {
    yield takeLatest(type.GET_USER_INFO_LOGIN, getUserInfoLoginSaga);
}

function* getUsersByDepartmentSaga(action){
    try{
        const users = yield call(AMS_API.userInformation, action.body)

        if(!users){
            throw new Error("Không lấy được danh sách nhân viên")
        }

        if(!users.Message){
            yield put(amsAction.getUserSuccess(users.Response.Users))
        }else{
            if(!users.Response){
                throw new Error("Không lấy được danh sách nhân viên")
            }
            yield put(amsAction.setError(users))
        }
    }catch(ex){
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

export function* getUsersByDepartmentWatcher() {
    yield takeLatest(type.GET_USERS_BY_DEPARTMENT, getUsersByDepartmentSaga);
}

function* deleteUserSaga(action){
    try{
        const user = yield call(AMS_API.userInformation, action.body)

        if(!user){
            throw new Error("Xóa không thành công")
        }

        if(!user.Message){
            yield put(amsAction.setMessage("Xóa thành công"))
        }else{
            if(!user.Response){
                throw new Error("Xóa không thành công")
            }
            yield put(amsAction.setError(user))
        }
    }catch(ex){
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

export function* deleteUserWatcher() {
    yield takeLatest(type.DELETE_USER, deleteUserSaga);
}

function* lockOrUnlockUserSaga(action){
    try{
        const user = yield call(AMS_API.userInformation, action.body)

        if(!user){
            throw new Error("Thao tác thành công")
        }

        if(!user.Message){
            if(action.body.Key.includes('UNLOCK')){
                yield put(amsAction.setMessage("Mở khóa thành công"))
            }else{
                yield put(amsAction.setMessage("Khóa thành công"))
            }
        }else{
            if(!user.Response){
                throw new Error("Thao tác thành công")
            }
            yield put(amsAction.setError(user))
        }
    }catch(ex){
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

export function* lockOrUnlockUserWatcher() {
    yield takeLatest(type.LOCK_UNLOCK_USER, lockOrUnlockUserSaga);
}
