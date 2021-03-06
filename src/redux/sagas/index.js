import { all, fork } from "redux-saga/effects";
import authSaga from "./authSaga";
import boardsSaga from "./boardsSaga";
import profileSaga from "./profileSaga";
import commentSaga from "./commentSaga";
import tradeSaga from "./tradeSaga";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL;

//제너레이터
export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(boardsSaga),
    fork(profileSaga),
    fork(commentSaga),
    fork(tradeSaga),
  ]);
}
