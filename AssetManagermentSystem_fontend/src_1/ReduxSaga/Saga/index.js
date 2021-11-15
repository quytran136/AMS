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
    lockOrUnlockUserWatcher
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
        lockOrUnlockUserWatcher()
    ]);
}
