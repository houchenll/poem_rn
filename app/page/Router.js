
import { StackNavigator, TabNavigator } from 'react-navigation';
import React from 'react';
import SplashPage from './SplashPage';
import MainPage from './MainPage';
import BookMeunPage from './Book/BookMeunPage';
import BookDetailPage from './Book/BookDetailPage';
import ThemeDetailPage from './Theme/ThemeDetailPage';
import DynastyDetailPage from './Dynasty/DynastyDetailPage';
import AuthorDetailPage from './Author/AuthorDetailPage';
import Icon from 'react-native-vector-icons/Ionicons';

import { View, StyleSheet, Dimensions } from 'react-native';

const Router = StackNavigator(
  {
    SplashPage: { screen: SplashPage },
    MainPage: {
      screen: MainPage,
      navigationOptions: {
        headerLeft: null,
        headerTitle: '主页'
      }
    },
    BookMeunPage: {
      screen: BookMeunPage,
    },
    BookDetailPage: {
      screen: BookDetailPage,
    },
    AuthorDetailPage: {
      screen: AuthorDetailPage,
    },
    ThemeDetailPage: {
      screen: ThemeDetailPage,
    },
    DynastyDetailPage: {
      screen: DynastyDetailPage,
    },

    // Web: { screen: WebViewPage }
  },
  {
    headerMode: 'screen',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#3e9ce9',
        height: 45
      },
      headerTitleStyle: {
        color: '#fff',
        fontSize: 16,
      },
      headerTintColor: '#fff'
    }
  }
);

export default Router;
