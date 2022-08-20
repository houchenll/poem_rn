import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from '../page/Home/Home';
import Mine from '../page/Mine/Mine';
import Type from '../page/Type/Type';
import Icon from 'react-native-vector-icons/Ionicons';

import TabNavigator from 'react-native-tab-navigator';
import { TYPE_DYNASTY_LIST } from '../constants/Urls';

export var FLAG_TAB = {
  tab_home: 'tab_home',
  tab_type: 'tab_type',
  tab_mine: 'tab_mine'
}


export default class MainPage extends Component {
  constructor(props) {
    super(props);
    let selectedTab = this.props.selectedTab ? this.props.selectedTab : FLAG_TAB.flag_popularTab;
    this.state = {
      selectedTab: selectedTab
    };
  }

  _onSelected(object) {
    this.setState({
      selectedTab: object,
    })

  }

  _renderTab(Component, selectedTab, title, renderIcon) {
    return (
      <TabNavigator.Item
        selected={this.state.selectedTab === selectedTab}
        title={title}
        selectedTitleStyle={{ color: "#3e9ce9" }}
        titleStyle={styles.title}
        renderIcon={() => <Icon name={renderIcon} size={25} color={'#999999'} />}
        renderSelectedIcon={() => <Icon name={renderIcon} size={25} color={'#3e9ce9'} />}
        onPress={() => this._onSelected(selectedTab)}>
        <Component {...this.props}/> 
      </TabNavigator.Item>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <TabNavigator
          tabBarStyle={{ height: 50, opacity: 0.9 }}
          sceneStyle={{ paddingBottom: 50 }}
        >

          {this._renderTab(Home, FLAG_TAB.tab_home, '首页', 'md-home')}
          {this._renderTab(Type, FLAG_TAB.tab_type, '分类', 'md-pricetags')}
          {this._renderTab(Mine, FLAG_TAB.tab_mine, '我的', 'md-information-circle')}

        </TabNavigator>
      </View>
    )
  }
}

MainPage.defaultProps = {
  selectedTab: FLAG_TAB.tab_type, 
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#EDEEF0',
  },
  tab: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 11,
    textAlign: 'center',
    // alignSelf: 'stretch',
    marginTop: 0,
    marginBottom: 5
    // marginBottom: 1 + Layout.pixel,
  }
})

