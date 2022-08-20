import * as types from '../constants/Actions';

const initialState = {
  isRefreshing: false,
  loading: true,
  menuList: []
};

const initialDeatilState = {
  isRefreshing: false,
  loading: true,
  detail: {}
};

export function bookMenu(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_BOOK_MENU_LIST:
      return Object.assign({}, state, {
        isRefreshing: action.isRefreshing,
        loading: action.loading
      });
    case types.RECEIVE_BOOK_MENU_LIST:
      return Object.assign({}, state, {
        isRefreshing: false,
        loading: false,
        menuList: action.menuList,
      });
    default:
      return state;
  }
}
export function bookDetail(state = initialDeatilState, action) {
  switch (action.type) {
    case types.FETCH_BOOK_MENU_DETAIL:
      return Object.assign({}, state, {
        isRefreshing: action.isRefreshing,
        loading: action.loading,
      });
    case types.RECEIVE_BOOK_MENU_DETAIL:
      return Object.assign({}, state, {
        isRefreshing: false,
        loading: false,
        detail: action.detail,
      });
    default:
      return state;
  }
}
