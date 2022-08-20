import { put, take, call, fork } from 'redux-saga/effects';
import store from 'react-native-simple-store';

import * as types from '../constants/Actions';
import ToastUtil from '../utils/ToastUtil';
import RequestUtil from '../utils/RequestUtil';
import { printObj, printArray } from '../utils/ItemsUtil';

import {
  AUTHOR_DETAIL
} from '../constants/Urls';
import {
  fetchAuthorDetail,
  receiveAuthorDetail,
} from '../actions/Author';


export function* requestAuthorDetail(isRefreshing, loading, id) {

  try {
    yield put(fetchAuthorDetail(isRefreshing, loading));
    const book = yield call(RequestUtil.request, AUTHOR_DETAIL, 'post', JSON.stringify({ "authorId": id}));
    yield put(receiveAuthorDetail(book.data));
    yield call(store.save, 'detail', book.data);
    const errorMessage = book.retMsg;
    if (book.retCode !== 0 && errorMessage !== '') {
      yield ToastUtil.showShort(errorMessage);
    }
  } catch (error) {
    yield put(receiveAuthorDetail([]));
    yield ToastUtil.showShort('网络发生错误，请重试');
  }
}

export function* watchRequestAuthorDetail() {
  while (true) {
    const {
      isRefreshing, loading, id
    } = yield take(types.REQUEST_AUTHOR_DETAIL);
    yield fork(
      requestAuthorDetail,
      isRefreshing,
      loading,
      id
    );
  }
}
