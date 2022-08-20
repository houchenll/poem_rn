import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as typeCreators from '../../actions/Type';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'

import PropTypes from 'prop-types';
import {
  DeviceEventEmitter,
  InteractionManager,
  SectionList,
  StyleSheet,
  View,
  Text,
  Platform
} from 'react-native';

import LoadingView from '../../components/LoadingView';
import ToastUtil from '../../utils/ToastUtil';
import { printArray, printObj, getList, processTypeAuthorData } from '../../utils/ItemsUtil';
import Footer from './Footer';
import EmptyView from './EmptyView';
import ItemSectionHeader from './ItemSectionHeader';
import RightSectionList from './RightSectionList';
import ItemAuthor from './ItemAuthor';
import ItemSeparator from './ItemSeparator';
import ListFooter from './ListFooter';



const propTypes = {
  actions: PropTypes.object,
  typeAuthor: PropTypes.object.isRequired
};

const ITEM_HEIGHT = 50; //item的高度
const HEADER_HEIGHT = 24;  //分组头部的高度
const SEPARATOR_HEIGHT = 0.5;  //分割线的高度 

class TypeAuthor extends React.Component {
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
      actions.requestTypeAuthorList(false, true);
    });
  }

  _onRefresh = () => {
    this.props.actions.requestTypeAuthorList(true, false);
  };

  _keyExtractor = (item, index) => item.id + '';
  // _keyExtractor = (item, index) => item.name;

  _onPressItem = (item) => {
    // console.log('ernest', "click item:" + item);
    this.props.navigation.navigate('AuthorDetailPage', item);  
  };

  _renderItem = ({ item }) => (
    <ItemAuthor
      typeItem={item}
      onPressItem={this._onPressItem}
    />
  );

  // _getItemLayout(data, index) {
  //   let [length, separator, header] = [ITEM_HEIGHT, SEPARATOR_HEIGHT, HEADER_HEIGHT];
  //   return { length, offset: (length + separator) * index + header, index };
  // }


  _onSectionSelect = (section, index) => {
    this.refs.list.scrollToLocation({
      sectionIndex: index,
      itemIndex: 0,
      viewOffset: HEADER_HEIGHT,
    });
  }

  _renderSectionHeader = ({ section }) => (
    <ItemSectionHeader name={section.name.toUpperCase()} />
  );

  _renderListFooter = ({ section }) => (
    <ListFooter name={this.props.typeAuthor.typeList.length + '位先贤'} />
  );


  _renderContent = () => {
    const { typeAuthor } = this.props;

    if (typeAuthor.loading) {
      return <LoadingView />;
    }

    let isEmpty = typeAuthor.typeList.length === 0;
    if (isEmpty) {
      return (
        <EmptyView type={typeAuthor} onRefresh={this._onRefresh} />
      );
    }

    let data = processTypeAuthorData(typeAuthor.typeList);

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

          <RightSectionList
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
  },

  headerView: {
    justifyContent: 'center',
    height: HEADER_HEIGHT,
    paddingLeft: 20,
    backgroundColor: '#eee'
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3cb775'
  },
  itemView: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    height: ITEM_HEIGHT
  }
});

TypeAuthor.propTypes = propTypes;


const mapStateToProps = (state) => {
  const { typeAuthor } = state;
  return {
    typeAuthor
  }
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(typeCreators, dispatch);
  return {
    actions
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TypeAuthor);
