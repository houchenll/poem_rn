import * as types from '../constants/Actions';

const initialState = {
  isRefreshing: false,
  loading: true,
  detail: {}
};

export function themeDetail(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_THEME_DETAIL:
      return Object.assign({}, state, {
        isRefreshing: action.isRefreshing,
        loading: action.loading,
      });
    case types.RECEIVE_THEME_DETAIL:
      return Object.assign({}, state, {
        isRefreshing: false,
        loading: false,
        detail: action.detail,
      });
    default:
      return state;
  }
}
