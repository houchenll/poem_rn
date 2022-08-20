import * as types from '../constants/Actions';

const initialState = {
  isRefreshing: false,
  loading: true,
  detail: {}
};

export function dynastyDetail(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_DYNASTY_DETAIL:
      return Object.assign({}, state, {
        isRefreshing: action.isRefreshing,
        loading: action.loading,
      });
    case types.RECEIVE_DYNASTY_DETAIL:
      return Object.assign({}, state, {
        isRefreshing: false,
        loading: false,
        detail: action.detail,
      });
    default:
      return state;
  }
}
