import * as types from '../constants/Actions';

const initialState = {
  isRefreshing: false, 
  loading: true,
  typeList: []
};

export function typeBook(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_TYPE_BOOK_LIST:
      return Object.assign({}, state, {
        isRefreshing: action.isRefreshing,
        loading: action.loading
      });
    case types.RECEIVE_TYPE_BOOK_LIST:
      return Object.assign({}, state, {
        isRefreshing: false,
        loading: false,
        typeList: action.typeList,
      });
    default:
      return state;
  }
}

export function typeTheme(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_TYPE_THEME_LIST:
      return Object.assign({}, state, {
        isRefreshing: action.isRefreshing,
        loading: action.loading
      });
    case types.RECEIVE_TYPE_THEME_LIST:
      return Object.assign({}, state, {
        isRefreshing: false,
        loading: false,
        typeList: action.typeList,
      });
    default:
      return state;
  }
}

export function typeDynasty(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_TYPE_DYNASTY_LIST:
      return Object.assign({}, state, {
        isRefreshing: action.isRefreshing,
        loading: action.loading
      });
    case types.RECEIVE_TYPE_DYNASTY_LIST:
      return Object.assign({}, state, {
        isRefreshing: false,
        loading: false,
        typeList: action.typeList,
      });
    default:
      return state;
  }
}

export function typeAuthor(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_TYPE_AUTHOR_LIST:
      return Object.assign({}, state, {  
        isRefreshing: action.isRefreshing,
        loading: action.loading
      });
    case types.RECEIVE_TYPE_AUTHOR_LIST:
      return Object.assign({}, state, {
        isRefreshing: false,
        loading: false,
        typeList: action.typeList,
      });  
    default:
      return state;
  }
}
