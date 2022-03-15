import * as type from '../Type';
import AMS_API from '../../ControlRequest/amsAPI';
import { call, put, takeLatest, select } from "redux-saga/effects";
import * as amsAction from '../Actions';
import * as cookieHandle from "../../Common/Cookie";

export function* amsWatcher() {
    yield takeLatest(type.GET_TOKEN, signinSaga);
    yield takeLatest(type.SIGNUP, signupSaga);
    yield takeLatest(type.GET_DEPARTMENT, getDepartmentChartSaga);
    yield takeLatest(type.SAVE_CHANGE_DEPARTMENT, saveChangeDepartmentChartSaga);
    yield takeLatest(type.GET_ORGANIZATIONAL, getOrganizationalChartSaga);
    yield takeLatest(type.SAVE_CHANGE_ORGANIZATIONAL, saveChangeOrganizationalChartSaga);
    yield takeLatest(type.GET_DEPARTMENT_DETAIL, getDepartmentDetailSaga);
    yield takeLatest(type.GET_USERS, getUsersSaga);
    yield takeLatest(type.GET_USER_INFO, getUserInfoSaga);
    yield takeLatest(type.GET_USER_INFO_LOGIN, getUserInfoLoginSaga);
    yield takeLatest(type.GET_USERS_BY_DEPARTMENT, getUsersByDepartmentSaga);
    yield takeLatest(type.DELETE_USER, deleteUserSaga);
    yield takeLatest(type.LOCK_UNLOCK_USER, lockOrUnlockUserSaga);
    yield takeLatest(type.REQUEST_PROCESS_FLOW, requestProcessFlowSaga);
    yield takeLatest(type.REQUEST_WAREHOUSE, requestWarehouseSaga);
    yield takeLatest(type.REQUEST_SUPPLIER, requestSupplierSaga);
    yield takeLatest(type.REQUEST_ASSET, requestAssetSaga);
    yield takeLatest(type.REQUEST_CONFIG_COMMON, requestConfigCommonSaga);
    yield takeLatest(type.REQUEST_CREATE_TICKET, requestTicketSaga);
    yield takeLatest(type.GET_NOTIFICATION, notificationSaga);
    yield takeLatest(type.GET_REPORT, reportSaga);
}

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
            yield put(amsAction.saveUserLogin(action.body.Data.UserName))
            yield put(amsAction.saveCookie(cookie));
        }
    } catch (ex) {
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

function* signupSaga(action) {
    try {
        yield put(amsAction.signupSuccess(false))
        const user = yield call(AMS_API.signup, action.body);
        if (user.Message) {
            yield put(amsAction.setError(user))
        } else {
            yield put(amsAction.signupSuccess(true))
            if (action.body.Key.includes('UPDATE')) {
                yield put(amsAction.setMessage("Cập nhật thành công"))
            } else {
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
                UserNameRequest: reducer?.amsReducer?.userName
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
                UserNameRequest: reducer?.amsReducer?.userName,
                Data: {
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

function* getUsersSaga(action) {
    try {
        const users = yield call(AMS_API.userInformation, action.body)

        if (!users) {
            throw new Error("Không lấy được danh sách nhân viên")
        }

        if (!users.Message) {
            yield put(amsAction.getUserSuccess(users.Response.Users))
        } else {
            yield put(amsAction.setError(users))
        }
    } catch (ex) {
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

function* getUserInfoSaga(action) {
    try {
        const userinfo = yield call(AMS_API.userInformation, action.body)

        if (!userinfo) {
            throw new Error("Không lấy được thông tin nhân viên")
        }

        if (userinfo.Message) {
            yield put(amsAction.setError(userinfo))
        } else {
            if (!userinfo.Response) {
                throw new Error("Không lấy được thông tin nhân viên")
            } else {
                yield put(amsAction.getUserInfoSuccess(userinfo.Response))
            }
        }
    } catch (ex) {
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

function* getUserInfoLoginSaga(action) {
    try {
        const userinfo = yield call(AMS_API.userInformation, action.body)

        if (!userinfo) {
            throw new Error("Không lấy được thông tin nhân viên")
        }

        if (userinfo.Message) {
            yield put(amsAction.setError(userinfo))
        } else {
            if (!userinfo.Response) {
                throw new Error("Không lấy được thông tin nhân viên")
            } else {
                yield put(amsAction.getUserInfoLoginSuccess(userinfo.Response))
            }
        }
    } catch (ex) {
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

function* getUsersByDepartmentSaga(action) {
    try {
        const users = yield call(AMS_API.userInformation, action.body)

        if (!users) {
            throw new Error("Không lấy được danh sách nhân viên")
        }

        if (!users.Message) {
            yield put(amsAction.getUserSuccess(users.Response.Users))
        } else {
            if (!users.Response) {
                throw new Error("Không lấy được danh sách nhân viên")
            }
            yield put(amsAction.setError(users))
        }
    } catch (ex) {
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

function* deleteUserSaga(action) {
    try {
        const user = yield call(AMS_API.userInformation, action.body)

        if (!user) {
            throw new Error("Xóa không thành công")
        }

        if (!user.Message) {
            yield put(amsAction.setMessage("Xóa thành công"))
        } else {
            if (!user.Response) {
                throw new Error("Xóa không thành công")
            }
            yield put(amsAction.setError(user))
        }
    } catch (ex) {
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

function* lockOrUnlockUserSaga(action) {
    try {
        const user = yield call(AMS_API.userInformation, action.body)

        if (!user) {
            throw new Error("Thao tác không thành công")
        }

        if (!user.Message) {
            if (action.body.Key.includes('UNLOCK')) {
                yield put(amsAction.setMessage("Mở khóa thành công"))
            } else {
                yield put(amsAction.setMessage("Khóa thành công"))
            }
        } else {
            yield put(amsAction.setError(user))
        }
    } catch (ex) {
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

function* requestProcessFlowSaga(action) {
    try {
        const process = yield call(AMS_API.processFlow, action.body)
        if (!process) {
            throw new Error("Thao tác không thành công")
        }

        if (!process.Message) {
            switch (action.body.Key) {
                case "UPDATE_PROCESS":
                    // yield put(amsAction.saveProcessFlow(null))
                    yield put(amsAction.setMessage("Câp nhật dữ liệu thành công"))
                    break;
                case "GET_PROCESS":
                    yield put(amsAction.saveProcessFlow(process))
                    yield put(amsAction.setMessage("Lấy dữ liệu thành công"))
                    break;
                case "GET_PROCESS_DETAIL":
                    yield put(amsAction.saveProcessFlow(process))
                    break;
                default:
                    break;
            }
        } else {
            yield put(amsAction.setError(process))
        }
    } catch (ex) {
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

function* requestWarehouseSaga(action) {
    try {
        const warehouse = yield call(AMS_API.warehouse, action.body)
        if (!warehouse) {
            throw new Error("Thao tác không thành công")
        }

        if (!warehouse.Message) {
            switch (action.body.Key) {
                case "UPDATE_WAREHOUSE":
                    // yield put(amsAction.saveProcessFlow(null))
                    yield put(amsAction.setMessage("Câp nhật dữ liệu thành công"))
                    break;
                case "GET_WAREHOUSE":
                    yield put(amsAction.getWarehouseSuccess(warehouse))
                    yield put(amsAction.setMessage("Lấy dữ liệu thành công"))
                    break;
                case "GET_WAREHOUSE_DETAIL":
                    yield put(amsAction.getWarehouseSuccess(warehouse))
                    break;
                default:
                    break;
            }
        } else {
            yield put(amsAction.setError(warehouse))
        }
    } catch (ex) {
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

function* requestSupplierSaga(action) {
    try {
        const supplier = yield call(AMS_API.supplier, action.body)
        if (!supplier) {
            throw new Error("Thao tác không thành công")
        }

        if (!supplier.Message) {
            switch (action.body.Key) {
                case "UPDATE_SUPPLIER":
                    yield put(amsAction.setMessage("Câp nhật dữ liệu thành công"))
                    break;
                case "GET_SUPPLIER":
                    yield put(amsAction.getSupplierSuccess(supplier))
                    break;
                case "GET_SUPPLIER_DETAIL":
                    yield put(amsAction.getSupplierSuccess(supplier))
                    break;
                default:
                    break;
            }
        } else {
            yield put(amsAction.setError(supplier))
        }
    } catch (ex) {
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

function* requestAssetSaga(action) {
    try {
        const asset = yield call(AMS_API.asset, action.body)
        if (!asset) {
            throw new Error("Thao tác không thành công")
        }

        if (!asset.Message) {
            switch (action.body.Key) {
                case "UPDATE_ASSET_CLASSIFY":
                    yield put(amsAction.setMessage("Câp nhật dữ liệu thành công"))
                    break;
                case "GET_ASSET_CLASSIFY":
                    yield put(amsAction.getAssetClassifiesSuccess(asset))
                    break;
                case "GET_ASSET_CLASSIFY_DETAIL":
                    yield put(amsAction.getAssetClassifiesSuccess(asset))
                    break;
                case "GET_ASSET_ALLOCATION":
                    yield put(amsAction.getAssetClassifiesSuccess(asset))
                    break;
                default:
                    break;
            }
        } else {
            yield put(amsAction.setError(asset))
        }
    } catch (ex) {
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

function* requestConfigCommonSaga(action) {
    try {
        const configCommon = yield call(AMS_API.config, action.body)
        if (!configCommon) {
            throw new Error("Thao tác không thành công")
        }

        if (!configCommon.Message) {
            switch (action.body.Key) {
                case "UPDATE_CONFIG_COMMON":
                    // yield put(amsAction.saveProcessFlow(null))
                    yield put(amsAction.setMessage("Câp nhật dữ liệu thành công"))
                    break;
                case "GET_CONFIG_COMMON":
                    yield put(amsAction.getConfigCommonSuccess(configCommon))
                    break;
                default:
                    break;
            }
        } else {
            yield put(amsAction.setError(configCommon))
        }
    } catch (ex) {
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

function* requestTicketSaga(action) {
    try {
        const ticket = yield call(AMS_API.ticket, action.body)
        if (!ticket) {
            throw new Error("Thao tác không thành công")
        }
        if (!ticket.Message) {
            yield put(amsAction.getTicketSuccess(ticket))
        } else {
            yield put(amsAction.setError(ticket))
        }
    } catch (ex) {
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

function* notificationSaga(action) {
    try {
        const notification = yield call(AMS_API.notification, action.body)
        if (!notification) {
            throw new Error("Thao tác không thành công")
        }
        yield put(amsAction.requestNotificationSuccess(null))
        const reducer = yield select()
        if (!notification.Message) {
            if (action.body.Key === "GET_NOTIFICATION") {
                if (reducer?.amsReducer?.notifications?.Response?.Notifications.length !== notification?.Response?.Notifications.length) {
                    yield put(amsAction.requestNotificationSuccess(notification))
                }
            }
        } else {
            yield put(amsAction.setError(notification))
        }
    } catch (ex) {
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}

function* reportSaga(action) {
    try {
        const report = yield call(AMS_API.report, action.body)
        if (!report) {
            throw new Error("Thao tác không thành công")
        }

        if (!report.Message) {
            yield put(amsAction.getReportSuccess(report))
        } else {
            yield put(amsAction.setError(report))
        }
    } catch (ex) {
        yield put(amsAction.setError({
            Code: "AMS_01",
            Message: ex.message
        }))
    }
}