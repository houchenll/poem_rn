import { put, take, call, fork } from 'redux-saga/effects';
import store from 'react-native-simple-store';

import * as types from '../constants/Actions';
import ToastUtil from '../utils/ToastUtil';
import RequestUtil from '../utils/RequestUtil';
import { printObj, printArray } from '../utils/ItemsUtil';


import {
  BOOK_MENU_DETAIL, BOOK_MENU_LIST
} from '../constants/Urls';
import {
  fetchBookMenuList,
  receiveBookMenuList,
  fetchBookMenuDetail,
  receiveBookMenuDetail,
} from '../actions/Book';

export function* requestBookMenuList(isRefreshing, loading, bookId) {

  try {
    yield put(fetchBookMenuList(isRefreshing, loading));
    const book = yield call(RequestUtil.request, BOOK_MENU_LIST, 'post', JSON.stringify({ "bookId": bookId }));
    printObj(book);
    printArray(book.data.menus);

    yield put(receiveBookMenuList(book.data.menus));
    yield call(store.save, 'menuList', book.data.menus);
    const errorMessage = book.retMsg;
    if (book.retCode !== 0 && errorMessage !== '') {
      yield ToastUtil.showShort(errorMessage);
    }
  } catch (error) {
    yield put(receiveBookMenuList([]));
    yield ToastUtil.showShort('网络发生错误，请重试');
  }
}

export function* watchRequestBookMenuList() {
  while (true) {
    const {
      isRefreshing, loading, bookId
    } = yield take(types.REQUEST_BOOK_MENU_LIST);
    yield fork(
      requestBookMenuList,
      isRefreshing,
      loading,
      bookId
    );
  }
}


export function* requestBookMenuDetail(isRefreshing, loading, contentId) {

  try {
    yield put(fetchBookMenuDetail(isRefreshing, loading));
    const book = yield call(RequestUtil.request, BOOK_MENU_DETAIL, 'post', JSON.stringify({ "contentId": contentId }));
    yield put(receiveBookMenuDetail(book.data));
    yield call(store.save, 'detail', book.data);
    const errorMessage = book.retMsg;
    if (book.retCode !== 0 && errorMessage !== '') {
      yield ToastUtil.showShort(errorMessage);
    }
  } catch (error) {
    yield put(receiveBookMenuDetail([])); 
    yield ToastUtil.showShort('网络发生错误，请重试');
  }
}

export function* watchRequestBookMenuDetail() {
  while (true) {
    const {
      isRefreshing, loading, contentId
    } = yield take(types.REQUEST_BOOK_MENU_DETAIL);
    yield fork(
      requestBookMenuDetail,
      isRefreshing,
      loading,
      contentId
    );
  }
}
