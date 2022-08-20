import * as types from '../constants/Actions';

const initialState = {
  isRefreshing: false,
  loading: true,
  detail: {}
};

export function authorDetail(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_AUTHOR_DETAIL:
      return Object.assign({}, state, {
        isRefreshing: action.isRefreshing,
        loading: action.loading,
      });
    case types.RECEIVE_AUTHOR_DETAIL:
      return Object.assign({}, state, {
        isRefreshing: false,
        loading: false,
        detail: action.detail,
      });
    default:
      return state;
  }
}
