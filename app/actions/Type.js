
import * as types from '../constants/Actions';

export function requestTypeBookList(isRefreshing, loading) {
  return {
    type: types.REQUEST_TYPE_BOOK_LIST,
    isRefreshing,
    loading
  };
}

export function fetchTypeBookList(isRefreshing, loading) {
  return {
    type: types.FETCH_TYPE_BOOK_LIST,
    isRefreshing,
    loading
  };
}

export function receiveTypeBookList(typeList) {
  return {
    type: types.RECEIVE_TYPE_BOOK_LIST,
    typeList
  };
}




export function requestTypeAuthorList(isRefreshing, loading) {
  return {
    type: types.REQUEST_TYPE_AUTHOR_LIST,
    isRefreshing,
     loading
  };
}

export function fetchTypeAuthorList(isRefreshing, loading) {
  return {
    type: types.FETCH_TYPE_AUTHOR_LIST,
    isRefreshing, 
    loading
  };
}

export function receiveTypeAuthorList(typeList) {
  return {
    type: types.RECEIVE_TYPE_AUTHOR_LIST,
    typeList
  };
}

export function requestTypeThemeList(isRefreshing, loading) {
  return {
    type: types.REQUEST_TYPE_THEME_LIST,
    isRefreshing,
    loading
  };
}

export function fetchTypeThemeList(isRefreshing, loading) {
  return {
    type: types.FETCH_TYPE_THEME_LIST,
    isRefreshing,
    loading
  };
}

export function receiveTypeThemeList(typeList) {
  return {
    type: types.RECEIVE_TYPE_THEME_LIST,
    typeList
  };
}


export function requestTypeDynastyList(isRefreshing, loading) {
  return {
    type: types.REQUEST_TYPE_DYNASTY_LIST,
    isRefreshing, 
    loading
  };
}

export function fetchTypeDynastyList(isRefreshing, loading) {
  return {
    type: types.FETCH_TYPE_DYNASTY_LIST,
    isRefreshing, 
    loading
  };
}

export function receiveTypeDynastyList(typeList) {
  return {
    type: types.RECEIVE_TYPE_DYNASTY_LIST,
    typeList
  };
}
