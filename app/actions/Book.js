
import * as book from '../constants/Actions';

export function requestBookMenuList(isRefreshing, loading, bookId) {
  return {
    type: book.REQUEST_BOOK_MENU_LIST,
    isRefreshing,
    loading,
    bookId
  };
}

export function fetchBookMenuList(isRefreshing, loading) {
  return {
    type: book.FETCH_BOOK_MENU_LIST,
    isRefreshing,
    loading
  };
}

export function receiveBookMenuList(menuList) {
  return {
    type: book.RECEIVE_BOOK_MENU_LIST,
    menuList
  };
}


export function requestBookMenuDetail(isRefreshing, loading, contentId) {
  return {
    type: book.REQUEST_BOOK_MENU_DETAIL, 
    isRefreshing,
    loading,
    contentId
  };
}

export function fetchBookMenuDetail(isRefreshing, loading) {
  return {
    type: book.FETCH_BOOK_MENU_DETAIL,
    isRefreshing,
    loading
  };
}

export function receiveBookMenuDetail(detail) {
  return {
    type: book.RECEIVE_BOOK_MENU_DETAIL,
    detail
  };
}


