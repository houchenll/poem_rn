import { all, fork } from 'redux-saga/effects';

import {
  watchRequestTypeBookList, watchRequestTypeAuthorList,
  watchRequestTypeThemeList, watchRequestTypeDynastyList
} from './type';
import {
  watchRequestBookMenuList, watchRequestBookMenuDetail
} from './book';
import {
  watchRequestAuthorDetail,
} from './author';
import {
  watchRequestDynastyDetail,
} from './dynasty';
import {
  watchRequestThemeDetail,
} from './theme';


export default function* rootSaga() {
  yield all([
    fork(watchRequestTypeBookList),
    fork(watchRequestTypeThemeList),
    fork(watchRequestTypeDynastyList),
    fork(watchRequestTypeAuthorList),

    fork(watchRequestBookMenuList),
    fork(watchRequestBookMenuDetail),
    fork(watchRequestAuthorDetail),
    fork(watchRequestDynastyDetail),
    fork(watchRequestThemeDetail),
  ]);
}