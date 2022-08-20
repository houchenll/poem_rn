
import * as book from '../constants/Actions';

export function requestThemeDetail(isRefreshing, loading, id) {
  return {
    type: book.REQUEST_THEME_DETAIL,
    isRefreshing,
    loading,
    id
  };
}

export function fetchThemeDetail(isRefreshing, loading) {
  return {
    type: book.FETCH_THEME_DETAIL,
    isRefreshing,
    loading
  };
}



export function receiveThemeDetail(detail) {
  return {
    type: book.RECEIVE_THEME_DETAIL,
    detail
  };
}


