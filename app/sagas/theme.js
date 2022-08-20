import { put, take, call, fork } from 'redux-saga/effects';
import store from 'react-native-simple-store';

import * as types from '../constants/Actions';
import ToastUtil from '../utils/ToastUtil';
import RequestUtil from '../utils/RequestUtil';
import { printObj, printArray } from '../utils/ItemsUtil';

import {
  THEME_DETAIL
} from '../constants/Urls';
import {
  fetchThemeDetail,
  receiveThemeDetail,
} from '../actions/Theme';
import { fetchDynastyDetail } from '../actions/Dynasty';


export function* requestThemeDetail(isRefreshing, loading, name) {

  try {
    yield put(fetchThemeDetail(isRefreshing, loading));
    const book = yield call(RequestUtil.request, THEME_DETAIL, 'post', JSON.stringify({ "tag": name }));
    yield put(receiveThemeDetail(book.data));
    yield call(store.save, 'detail', book.data);
    const errorMessage = book.retMsg;
    if (book.retCode !== 0 && errorMessage !== '') {
      yield ToastUtil.showShort(errorMessage);
    }
  } catch (error) {
    yield put(receiveThemeDetail([]));
    yield ToastUtil.showShort('网络发生错误，请重试');
  }
}

export function* watchRequestThemeDetail() {
  while (true) {
    const {
      isRefreshing, loading, id
    } = yield take(types.REQUEST_THEME_DETAIL);
    yield fork(
      requestThemeDetail,
      isRefreshing,
      loading,
      id
    );
  }
}
