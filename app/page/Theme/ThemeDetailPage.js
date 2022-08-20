import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as typeCreators from '../../actions/Theme';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';

import PropTypes from 'prop-types';
import {
  DeviceEventEmitter,
  InteractionManager,
  Platform,
  FlatList, 
  StyleSheet,
  View,
  ScrollView,
  Text
} from 'react-native';

import LoadingView from '../../components/LoadingView';
import ToastUtil from '../../utils/ToastUtil';
import { printArray, printObj, getList, getMenuListDataLength, processBookMeunData } from '../../utils/ItemsUtil';

import EmptyView from '../Type/EmptyView';
import ItemSectionHeader from '../Type/ItemSectionHeader';
import RightSectionListWords from '../Type/RightSectionListWords';
import ItemSeparator from '../Type/ItemSeparator';
import ListFooter from '../Type/ListFooter';
import ItemDetailTheme from './ItemDetailTheme';

const propTypes = {
  actions: PropTypes.object,
  themeDetail: PropTypes.object.isRequired
};

class ThemeDetailPage extends React.Component {
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
    this.props.themeDetail.loading=true; 
  }


  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      printObj(this.props.navigation.state.params);
      let name = this.props.navigation.state.params.name;
      this.props.actions.requestThemeDetail(false, true, name);
    });
  }

  _onRefresh = () => {
    this.props.actions.requestThemeDetail(false, true, this.props.navigation.state.params.name);
  };


  _keyExtractor = (item, index) => item.id;

  _onPressItem = (item) => {
    console.log('ernest', "click item:" + item);
    this.props.navigation.navigate('BookDetailPage', item); 
  };

  _renderItem = ({ item }) => (
    <ItemDetailTheme
      typeItem={item}
      onPressItem={this._onPressItem}
    />
  );

  _getDataLength = () =>{
    let num =0;
    if(this.props.themeDetail.detail.works !== undefined ){
      num =  this.props.themeDetail.detail.works.length;
    }
    return num;
  }

  _renderListFooter = ({ section }) => (
   
    <ListFooter name={this._getDataLength() + '首古诗'} />
  );


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


  // _renderSectionHeader = ({ section }) => (
  //   // to do set non empty name      
  //   <ItemSectionHeader name={section.name === '' ? this.props.navigation.state.params.name + '目录' : section.name} />
  // );

  _renderContent = () => {
    const { themeDetail } = this.props;
    if (themeDetail.loading) {
      return <LoadingView />;
    }
    const isEmpty = themeDetail.detail.name === undefined || themeDetail.detail.name === '';
    if (isEmpty) {
      return (
        <EmptyView type={themeDetail} onRefresh={this._onRefresh} />
      );
    }

    let bean = themeDetail.detail;
    printObj(bean);

    return (
      <ScrollView style={styles.container}>
       <ItemSectionHeader name={'作品数量：'+bean.count} />
       <FlatList
        data={getList(bean.works)}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        ItemSeparatorComponent={() => <ItemSeparator></ItemSeparator>}
        ListFooterComponent={this._renderListFooter}
      />
      

    </ScrollView>

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
    backgroundColor: '#EDEEF0'
  },
  content: {
    flex: 1,
    // justifyContent: 'center',
    paddingBottom: 10
  },
  center: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    width: 110,
    height: 110,
    marginTop: 50
  },
  version: {
    fontSize: 16,
    textAlign: 'center',
    color: '#aaaaaa',
    marginTop: 5
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#313131',
    marginTop: 10
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#4e4e4e'
  },
  disclaimerContent: {
    flexDirection: 'column'
  },
  disclaimer: {
    fontSize: 14,
    textAlign: 'center'
  },
  bottomContainer: {
    alignItems: 'center'
  }
});

ThemeDetailPage.propTypes = propTypes;


const mapStateToProps = (state) => {
  const { themeDetail } = state;
  return {
    themeDetail
  }
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(typeCreators, dispatch);
  return {
    actions
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ThemeDetailPage);
