import { put, take, call, fork } from 'redux-saga/effects';
import store from 'react-native-simple-store';

import * as types from '../constants/Actions';
import ToastUtil from '../utils/ToastUtil';
import RequestUtil from '../utils/RequestUtil';
import processTypeThemeData from '../utils/ItemsUtil';


import {
  TYPE_BOOK_LIST, TYPE_THEME_LIST,
  TYPE_DYNASTY_LIST, TYPE_AUTHOR_LIST
} from '../constants/Urls';
import {
  fetchTypeBookList, receiveTypeBookList, fetchTypeAuthorList, receiveTypeAuthorList,
  fetchTypeThemeList, receiveTypeThemeList, fetchTypeDynastyList, receiveTypeDynastyList
} from '../actions/Type';

export function* requestTypeBookList(isRefreshing, loading) {
  try {
    yield put(fetchTypeBookList(isRefreshing, loading));
    const typeList = yield call(RequestUtil.request, TYPE_BOOK_LIST, 'get');
    yield put(receiveTypeBookList(typeList.data.types));
    // yield call(store.save, 'typeList', typeList.data.types);
    const errorMessage = typeList.retMsg;
    if (typeList.retCode !== 0 && errorMessage !== '') {
      yield ToastUtil.showShort(errorMessage);
    }
  } catch (error) {
    yield put(receiveTypeBookList([]));
    yield ToastUtil.showShort('网络发生错误，请重试');
  }
}

export function* watchRequestTypeBookList() {
  while (true) {
    const {
      isRefreshing, loading
    } = yield take(types.REQUEST_TYPE_BOOK_LIST);
    yield fork(
      requestTypeBookList,
      isRefreshing,
      loading
    );
  }
}


export function* requestTypeThemeList(isRefreshing, loading) {
  try {
    yield put(fetchTypeThemeList(isRefreshing, loading));
    const typeList = yield call(RequestUtil.request, TYPE_THEME_LIST, 'post');
    // let result = processTypeThemeData(typeList.data.themes);
    yield put(receiveTypeThemeList(typeList.data.themes));
    yield call(store.save, 'typeList', typeList.data.themes);
    const errorMessage = typeList.retMsg;
    if (typeList.retCode !== 0 && errorMessage !== '') {
      yield ToastUtil.showShort(errorMessage);
    }
  } catch (error) {
    yield put(receiveTypeThemeList([]));
    yield ToastUtil.showShort('网络发生错误，请重试');
  }
}

// function testPin() {

//   console.log('ernest', pinyin("中心", {
//     heteronym: true               // 启用多音字模式
//   }));                            // [ [ 'zhōng', 'zhòng' ], [ 'xīn' ] ]
//   // console.log(pinyin("中心", {
//   //   heteronym: true,              // 启用多音字模式
//   //   segment: true                 // 启用分词，以解决多音字问题。
//   // }));                            // [ [ 'zhōng' ], [ 'xīn' ] ]
//   // console.log(pinyin("中心", {
//   //   style: pinyin.STYLE_INITIALS, // 设置拼音风格
//   //   heteronym: true
//   // }));                            // [ [ 'zh' ], [ 'x' ] ]
// }


export function* watchRequestTypeThemeList() {
  while (true) {
    const {
      isRefreshing, loading
    } = yield take(types.REQUEST_TYPE_THEME_LIST);
    yield fork(
      requestTypeThemeList,
      isRefreshing,
      loading
    );
  }
}



export function* requestTypeAuthorList(isRefreshing, loading) {
  try {
    yield put(fetchTypeAuthorList(isRefreshing, loading));
    const typeList = yield call(RequestUtil.request, TYPE_AUTHOR_LIST, 'post');
    yield put(receiveTypeAuthorList(typeList.data.authors));
    yield call(store.save, 'typeList', typeList.data.authors);
    const errorMessage = typeList.retMsg;
    if (typeList.retCode !== 0 && errorMessage !== '') {
      yield ToastUtil.showShort(errorMessage);
    }
  } catch (error) {
    yield put(receiveTypeAuthorList([]));
    yield ToastUtil.showShort('网络发生错误，请重试');
  }
}

export function* watchRequestTypeAuthorList() {
  while (true) {
    const {
      isRefreshing, loading
    } = yield take(types.REQUEST_TYPE_AUTHOR_LIST);
    yield fork(
      requestTypeAuthorList,
      isRefreshing,
      loading
    );
  }
}



export function* requestTypeDynastyList(isRefreshing, loading) {
  try {
    yield put(fetchTypeDynastyList(isRefreshing, loading));
    // const typeList = yield call(RequestUtil.request, TYPE_DYNASTY_LIST, 'post', { 'type': 1 });
    const typeList = yield call(RequestUtil.request, TYPE_DYNASTY_LIST, 'post');
    yield put(receiveTypeDynastyList(typeList.data.dynasties));
    yield call(store.save, 'typeList', typeList.data.dynasties);
    const errorMessage = typeList.retMsg;
    if (typeList.retCode !== 0 && errorMessage !== '') {
      yield ToastUtil.showShort(errorMessage);
    }
  } catch (error) {
    yield put(receiveTypeDynastyList([]));
    yield ToastUtil.showShort('网络发生错误，请重试');
  }
}

export function* watchRequestTypeDynastyList() {
  while (true) {
    const {
      isRefreshing, loading
    } = yield take(types.REQUEST_TYPE_DYNASTY_LIST); 
    yield fork(
      requestTypeDynastyList,
      isRefreshing,
      loading
    );
  }
}