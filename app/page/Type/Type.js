import React from 'react';

import TypeBook from './TypeBook';
import TypeTheme from './TypeTheme';
import TypeAuthor from './TypeAuthor';
import TypeDynasty from './TypeDynasty';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as typeBookCreators from '../../actions/Type';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  PanResponder
} from 'react-native';

import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import { TabNavigator } from 'react-navigation';

// const Type = TabNavigator({
//   TypeBook: {
//     screen: TypeBook,
//     navigationOptions: {
//       headerLeft: null,
//       title: '分类'
//     }
//   },
//   TypeTheme: {
//     screen: TypeTheme,
//     navigationOptions: {
//       headerLeft: null,
//       title: '主题'
//     }
//   },
//   TypeAuthor: {
//     screen: TypeAuthor,
//     navigationOptions: {
//       headerLeft: null,
//       title: '作者'
//     }
//   },
//   TypeDynasty: {
//     screen: TypeDynasty,
//     navigationOptions: {
//       headerLeft: null,
//       title: '朝代'
//     }
//   },
// }, {
//     lazy: true,
//     // tabBarComponent: 'TabBarTop',  
//     tabBarPosition: 'top',
//     animationEnabled: false,
//     // backBehavior: none,
//     tabBarOptions: {
//       activeTintColor: '#3e9ce9',
//       inactiveTintColor: '#999999',
//       pressColor: '#999999',
//       pressOpacity: 0.8,
//       labelStyle: {
//         fontSize: 15,
//         marginTop: 5,
//       },
//       indicatorStyle: {
//         // width:ScreenWidth/4,
//         height: 2,
//         backgroundColor: '#3e9ce9',
//       },
//       style: {
//         backgroundColor: '#fff',
//         // borderColor:'#3e9ce9', 
//         height: 45,
//         // alignItems: 'center', 
//       },
//       tabStyle: {

//       }
//     }

//   });


class Type extends React.Component {
  // navigationOptions: {
  //   headerLeft: null,
  //   title: '分类', 
  // }

  render() {

    return (
      <ScrollableTabView
        style={{ height: 45 }}
        initialPage={0}
        renderTabBar={() => <ScrollableTabBar backgroundColor='#ffffff' />}
        tabBarUnderlineStyle={styles.lineStyle}
        tabBarActiveTextColor='#3e9ce9'
        tabBarInactiveTextColor='#737373'
        tabBarTextStyle={{ fontSize: 15 }}
      >
        <TypeBook tabLabel="类型" {...this.props}/>
        <TypeTheme tabLabel="主题" {...this.props}/>
        <TypeAuthor tabLabel="作者" {...this.props}/>
        <TypeDynasty tabLabel="朝代" {...this.props}/>

      </ScrollableTabView >
    );

  }
}

const styles = StyleSheet.create({
  lineStyle: {
    // width:ScreenWidth/4,
    height: 2,
    backgroundColor: '#3e9ce9',
  },
  tabView: {
    flex: 1,
    padding: 0,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});

export default Type;

