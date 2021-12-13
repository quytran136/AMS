import { all } from "redux-saga/effects";
import {
    signinWatcher,
    signupWatcher,
    getOrganizationalChartWatcher,
    getDepartmentChartWatcher,
    saveChangeDepartmentChartWatcher,
    saveChangeOrganizationalChartWatcher,
    getDepartmentDetailWatcher,
    getUserInfoWatcher,
    getUserInfoLoginWatcher,
    getUsersWatcher,
    getUsersByDepartmentWatcher,
    deleteUserWatcher,
    lockOrUnlockUserWatcher,
    requestProcessFlowWatcher,
    requestWarehouseWatcher,
    requestAssetWatcher,
    requestConfigCommonWatcher,
    requestTicketWatcher,
    notificationWatcher,
    reportWatcher
} from "./amsSaga";

export default function* sagas() {
    yield all([
        signinWatcher(),
        signupWatcher(),
        getOrganizationalChartWatcher(),
        getDepartmentChartWatcher(),
        saveChangeDepartmentChartWatcher(),
        saveChangeOrganizationalChartWatcher(),
        getDepartmentDetailWatcher(),
        getUserInfoWatcher(),
        getUserInfoLoginWatcher(),
        getUsersWatcher(),
        getUsersByDepartmentWatcher(),
        deleteUserWatcher(),
        lockOrUnlockUserWatcher(),
        requestProcessFlowWatcher(),
        requestWarehouseWatcher(),
        requestAssetWatcher(),
        requestConfigCommonWatcher(),
        requestTicketWatcher(),
        notificationWatcher(),
        reportWatcher()
    ]);
}
