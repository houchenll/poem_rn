import { put, take, call, fork } from 'redux-saga/effects';
import store from 'react-native-simple-store';

import * as types from '../constants/Actions';
import ToastUtil from '../utils/ToastUtil';
import RequestUtil from '../utils/RequestUtil';
import { printObj, printArray } from '../utils/ItemsUtil';

import {
  DYNASTY_DETAIL
} from '../constants/Urls';
import {
  fetchDynastyDetail,
  receiveDynastyDetail,
} from '../actions/Dynasty';


export function* requestDynastyDetail(isRefreshing, loading, a) {

  try {
    yield put(fetchDynastyDetail(isRefreshing, loading));
    const book = yield call(RequestUtil.request, DYNASTY_DETAIL, 'post', JSON.stringify({ "dynastyId": a }));
    yield put(receiveDynastyDetail(book.data));
    yield call(store.save, 'detail', book.data);
    const errorMessage = book.retMsg;
    if (book.retCode !== 0 && errorMessage !== '') {
      yield ToastUtil.showShort(errorMessage);
    }
  } catch (error) {
    yield put(receiveDynastyDetail([]));
    yield ToastUtil.showShort('网络发生错误，请重试');
  }
}

export function* watchRequestDynastyDetail() {
  while (true) {
    const {
      isRefreshing, loading, id
    } = yield take(types.REQUEST_DYNASTY_DETAIL);
    yield fork(
      requestDynastyDetail,
      isRefreshing,
      loading,
      id
    );
  }
}
