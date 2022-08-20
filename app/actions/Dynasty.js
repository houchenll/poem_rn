
import * as book from '../constants/Actions';

export function requestDynastyDetail(isRefreshing, loading, id) {
  return {
    type: book.REQUEST_DYNASTY_DETAIL,
    isRefreshing,
    loading,
    id
  };
}

export function fetchDynastyDetail(isRefreshing, loading) {
  return {
    type: book.FETCH_DYNASTY_DETAIL,
    isRefreshing,
    loading
  };
}



export function receiveDynastyDetail(detail) {
  return {
    type: book.RECEIVE_DYNASTY_DETAIL,
    detail
  };
}


