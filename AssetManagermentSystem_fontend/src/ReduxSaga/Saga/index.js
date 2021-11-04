import { all } from "redux-saga/effects";
import {
    signinWatcher,
    signupWatcher,
    getUserInfoWatcher,
    getOrganizationalChartWatcher,
    getDepartmentChartWatcher,
} from "./amsSaga";

export default function* sagas() {
    yield all([
        signinWatcher(),
        signupWatcher(),
        getUserInfoWatcher(),
        getOrganizationalChartWatcher(),
        getDepartmentChartWatcher(),
    ]);
}
