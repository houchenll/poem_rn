
import * as book from '../constants/Actions';

export function requestAuthorDetail(isRefreshing, loading, id) {
  return {
    type: book.REQUEST_AUTHOR_DETAIL,
    isRefreshing,
    loading,
    id
  };
}

export function fetchAuthorDetail(isRefreshing, loading) {
  return {
    type: book.FETCH_AUTHOR_DETAIL,
    isRefreshing,
    loading
  };
}



export function receiveAuthorDetail(detail) {
  return {
    type: book.RECEIVE_AUTHOR_DETAIL,
    detail
  };
}


