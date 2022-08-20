import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as typeCreators from '../../actions/Type';
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
import { printArray, printObj, getList, getTypeThemeDataLength, processTypeThemeData } from '../../utils/ItemsUtil';
import Footer from './Footer';
import EmptyView from './EmptyView';
import ItemTheme from './ItemTheme';
import ItemSectionHeader from './ItemSectionHeader';
import RightSectionListWords from './RightSectionListWords';
import ItemAuthor from './ItemAuthor';
import ItemSeparator from './ItemSeparator';
import ListFooter from './ListFooter';


const propTypes = {
  actions: PropTypes.object,
  typeTheme: PropTypes.object.isRequired
};

const ITEM_HEIGHT = 50; //item的高度
const HEADER_HEIGHT = 24;  //分组头部的高度
const SEPARATOR_HEIGHT = 0.5;  //分割线的高度 

class TypeTheme extends React.Component {
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
    const { actions } = this.props;

    InteractionManager.runAfterInteractions(() => {
      actions.requestTypeThemeList(false, true);
    });
  }

  _onRefresh = () => {
    this.props.actions.requestTypeThemeList(true, false);
  };

  _keyExtractor = (item, index) => item.id;
  // _keyExtractor = (item, index) => item.name;

  _onPressItem = (item) => {
    // updater functions are preferred for transactional updates
    console.log('ernest', "click item:" + item);
    // this.setState((state) => {
    //   // copy the map rather than modifying state.
    //   const selected = new Map(state.selected);
    //   selected.set(id, !selected.get(id)); // toggle
    //   return {selected};
    // });
    this.props.navigation.navigate('ThemeDetailPage', item);
  };

  _renderItem = ({ item }) => (
    <ItemTheme
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
    <ListFooter name={getTypeThemeDataLength(this.props.typeTheme.typeList) + '种主题'} />
  );


  _renderContent = () => {
    const { typeTheme } = this.props;
    if (typeTheme.loading) {
      return <LoadingView />;
    }
    const isEmpty = typeTheme.typeList.length === 0;
    if (isEmpty) {
      return (
        <EmptyView type={typeTheme} onRefresh={this._onRefresh} />
      );
    }

    let data = processTypeThemeData(typeTheme.typeList);

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

TypeTheme.propTypes = propTypes;


const mapStateToProps = (state) => {
  const { typeTheme } = state;
  return {
    typeTheme
  }
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(typeCreators, dispatch);
  return {
    actions
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TypeTheme);
