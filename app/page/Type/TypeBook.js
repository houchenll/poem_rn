import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as typeBookCreators from '../../actions/Type';
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
import { printArray, printObj, getList, getTypeThemeDataLength, processTypeBookData, getTypeBookDataLength } from '../../utils/ItemsUtil';
import Footer from './Footer';
import EmptyView from './EmptyView';
import ItemTheme from './ItemTheme';
import ItemSectionHeader from './ItemSectionHeader';
import RightSectionListWords from './RightSectionListWords';
import ItemBook from './ItemBook';
import ItemSeparator from './ItemSeparator';
import ListFooter from './ListFooter';

const propTypes = {
  actions: PropTypes.object,
  typeBook: PropTypes.object.isRequired
};

const ITEM_HEIGHT = 50; //item的高度
const HEADER_HEIGHT = 24;  //分组头部的高度
const SEPARATOR_HEIGHT = 0.5;  //分割线的高度 

class TypeBook extends React.Component {

  constructor(props) {
    super(props)

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

    // 监听是否需要刷新数据，跨页面通信
    // DeviceEventEmitter.addListener('changeCategory', (typeIds) => {
    //   typeIds.forEach((typeId) => {
    //     readActions.requestArticleList(false, true, typeId);
    //     pages.push(1);
    //   });
    //   this.setState({
    //     typeIds
    //   });
    // });

    InteractionManager.runAfterInteractions(() => {
      this.props.actions.requestTypeBookList(false, true);
      // store.get('typeList').then(typeList =>
      //   this.setState({
      //     typeList
      //   }));
    });
  }

  // 页面销毁时，解除监听 
  // componentWillUnmount() {
  //   DeviceEventEmitter.removeAllListeners('changeCategory');
  // }


  _onRefresh = () => {
    this.props.actions.requestTypeBookList(true, false);
  };

  // _keyExtractor = (item, index) => item.id;
  _keyExtractor = (item, index) => item.name;

  _onPressItem = (item) => {
    // updater functions are preferred for transactional updates
    console.log('ernest', "click item:" + item);
    printObj(item);
    // this.setState((state) => {
    //   // copy the map rather than modifying state.
    //   const selected = new Map(state.selected);
    //   selected.set(id, !selected.get(id)); // toggle
    //   return {selected};
    // });

    this.props.navigation.navigate('BookMeunPage', item); 
  };

  _renderItem = ({ item }) => (
    <ItemBook
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
    <ItemSectionHeader name={section.name} />
  );

  _renderListFooter = () => (
    <ListFooter name={getTypeBookDataLength(this.props.typeBook.typeList) + '本古籍'} />
  );


  _renderContent = () => {
    const { typeBook } = this.props;
    if (typeBook.loading) {
      return <LoadingView />;
    }
    const isEmpty = typeBook.typeList.length === 0;
    if (isEmpty) {
      return (
        <EmptyView type={typeBook} onRefresh={this._onRefresh} />
      );
    }
    let data = processTypeBookData(typeBook.typeList);

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

TypeBook.propTypes = propTypes;

const mapStateToProps = (state) => {
  const { typeBook } = state;
  return {
    typeBook
  }
};

// only run once
const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(typeBookCreators, dispatch);
  return {
    actions
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TypeBook);
