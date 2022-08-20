import { combineReducers } from 'redux';
import {
  typeBook,
  typeDynasty,
  typeTheme,
  typeAuthor,
} from './type';

import {
  bookMenu,
  bookDetail,
} from './book';

import {
  authorDetail,
} from './author';

import {
  dynastyDetail,
} from './dynasty';

import {
  themeDetail,
} from './theme';


const rootReducer = combineReducers({
  typeBook,
  typeAuthor,
  typeDynasty,
  typeTheme,
  bookMenu,
  bookDetail,
  authorDetail,
  dynastyDetail,
  themeDetail,
});

export default rootReducer;
