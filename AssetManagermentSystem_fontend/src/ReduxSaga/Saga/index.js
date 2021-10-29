import { all } from "redux-saga/effects";
import {
    signinWatcher,
    signupWatcher,
} from "./amsSaga";

export default function* sagas() {
    yield all([
        signinWatcher(),
        signupWatcher()
    ]);
}
