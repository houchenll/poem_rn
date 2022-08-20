import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as typeCreators from '../../actions/Book';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';

import PropTypes from 'prop-types';
import {
  DeviceEventEmitter,
  InteractionManager,
  Platform,
  SectionList,
  StyleSheet,
  View,
  Text
} from 'react-native';

import LoadingView from '../../components/LoadingView';
import ToastUtil from '../../utils/ToastUtil';
import { printArray, printObj, getList, getMenuListDataLength, processBookMeunData } from '../../utils/ItemsUtil';

import EmptyView from '../Type/EmptyView';
import ItemBookMenu from './ItemBookMenu';
import ItemSectionHeader from '../Type/ItemSectionHeader';
import RightSectionListWords from '../Type/RightSectionListWords';
import ItemSeparator from '../Type/ItemSeparator';
import ListFooter from '../Type/ListFooter';

const propTypes = {
  actions: PropTypes.object,
  bookMenu: PropTypes.object.isRequired
};

const ITEM_HEIGHT = 50; //item的高度
const HEADER_HEIGHT = 24;  //分组头部的高度
const SEPARATOR_HEIGHT = 0.5;  //分割线的高度 

class BookMeunPage extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    // 这里面的属性和App.js的navigationOptions是一样的。
    headerTitle: navigation.state.params.name,
    // headerStyle: {
    //   backgroundColor: screenProps ?
    //     screenProps.themeColor :
    //     '#4ECBFC'
    // },
  });


  constructor(props) {
    super(props)
    this.props.bookMenu.loading=true; 

    console.log('ernest','constructor');

    this._getItemLayout = sectionListGetItemLayout({
      // The height of the row with rowData at the given sectionIndex and rowIndex
      getItemHeight: (rowData, sectionIndex, rowIndex) => ITEM_HEIGHT,

      // These four properties are optional
      // getSeparatorHeight: () => 1 / PixelRatio.get(), // The height of your separators
      getSeparatorHeight: () => SEPARATOR_HEIGHT, // The height of your separators
      getSectionHeaderHeight: () => HEADER_HEIGHT, // The height of your section headers
      getSectionFooterHeight: () => 0, // The height of your section footers
      listHeaderHeight: 0, // The height of your list header
    })
  }


  componentDidMount() {
    console.log('ernest','componentDidMount');
    InteractionManager.runAfterInteractions(() => {
      printObj(this.props.navigation.state.params);
      let bookId = this.props.navigation.state.params.bookId;
      console.log('ernest', 'bookId:' + bookId);
      this.props.actions.requestBookMenuList(false, true, bookId);
    });
  }

  _onRefresh = () => {
    this.props.actions.requestBookMenuList(false, true, 0);
  };

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (item) => {
    // updater functions are preferred for transactional updates
    console.log('ernest', "click item:" + item);
    // this.setState((state) => {
    //   // copy the map rather than modifying state.
    //   const selected = new Map(state.selected);
    //   selected.set(id, !selected.get(id)); // toggle
    //   return {selected};
    // });

    this.props.navigation.navigate('BookDetailPage', item); 
  };

  _renderItem = ({ item }) => ( 
    <ItemBookMenu
      typeItem={item}
      onPressItem={this._onPressItem}
    />
  );


  _onSectionSelect = (section, index) => {
    this.refs.list.scrollToLocation({
      sectionIndex: index,
      itemIndex: 0,
      viewOffset: HEADER_HEIGHT,
    });
  }

  _renderSectionHeader = ({ section }) => (
    // to do set non empty name      
      <ItemSectionHeader name={section.name === '' ? this.props.navigation.state.params.name+'目录' : section.name} />
  );

_renderListFooter = () => (
  <ListFooter name={getMenuListDataLength(this.props.bookMenu.menuList) + '篇'} />
);


_renderContent = () => {
  const { bookMenu } = this.props;
  if (bookMenu.loading) {
    return <LoadingView />;
  }

  const isEmpty = bookMenu.menuList === undefined || bookMenu.menuList.length === 0;
  if (isEmpty) {
    return (
      <EmptyView type={bookMenu} onRefresh={this._onRefresh} />
    );
  }

  let data = processBookMeunData(bookMenu.menuList);
  if (data.sections.length === 1) {
    return (
      <View style={{ paddingTop: Platform.OS === 'android' ? 0 : 20 }}>
        <View>
          <SectionList
            ref='list'
            renderItem={this._renderItem}
            renderSectionHeader={this._renderSectionHeader}
            keyExtractor={this._keyExtractor}
            sections={data}
            getItemLayout={this._getItemLayout}
            ItemSeparatorComponent={() => <ItemSeparator></ItemSeparator>}
            ListFooterComponent={this._renderListFooter}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={{ paddingTop: Platform.OS === 'android' ? 0 : 20 }}>
      <View>
        <SectionList
          ref='list'
          renderItem={this._renderItem}
          renderSectionHeader={this._renderSectionHeader}
          keyExtractor={this._keyExtractor}
          sections={data}
          getItemLayout={this._getItemLayout}
          ItemSeparatorComponent={() => <ItemSeparator></ItemSeparator>}
          ListFooterComponent={this._renderListFooter}
        />

        <RightSectionListWords
          sections={data.sections}
          onSectionSelect={this._onSectionSelect} />
      </View>
    </View>
  );
};

render() {
  console.log('ernest','render');
  return (
    this._renderContent()
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  }
});

BookMeunPage.propTypes = propTypes;


const mapStateToProps = (state) => {
  console.log('ernest','mapStateToProps');
  const { bookMenu } = state;
  return {
    bookMenu
  }
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(typeCreators, dispatch);
  return {
    actions
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BookMeunPage);
