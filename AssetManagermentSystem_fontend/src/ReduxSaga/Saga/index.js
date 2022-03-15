import { all } from "redux-saga/effects";
import {
    amsWatcher
} from "./amsSaga";

export default function* sagas() {
    yield all([
        amsWatcher()
    ]);
}
