import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as typeCreators from '../../actions/Dynasty';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';

import PropTypes from 'prop-types';
import {
  DeviceEventEmitter,
  InteractionManager,
  Platform,
  SectionList,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text
} from 'react-native';

import LoadingView from '../../components/LoadingView';
import ToastUtil from '../../utils/ToastUtil';
import { printArray, printObj, getList, getMenuListDataLength, stringJustEmpty } from '../../utils/ItemsUtil';

import EmptyView from '../Type/EmptyView';
import ItemSectionHeader from '../Type/ItemSectionHeader';
import RightSectionListWords from '../Type/RightSectionListWords';
import ItemSeparator from '../Type/ItemSeparator';
import ListFooter from '../Type/ListFooter';

const propTypes = {
  actions: PropTypes.object,
  dynastyDetail: PropTypes.object.isRequired
};

class DynastyDetailPage extends React.Component {
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
    this.props.dynastyDetail.loading=true; 
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      printObj(this.props.navigation.state.params);
      let id = this.props.navigation.state.params.id;
      this.props.actions.requestDynastyDetail(false, true, id);
    });
  }

  _onRefresh = () => {
    this.props.actions.requestDynastyDetail(false, true, this.props.navigation.state.params.id);
  };



  _onPressItem = (item) => {
    // updater functions are preferred for transactional updates
    console.log('ernest', "click item:" + item);
    // this.setState((state) => {
    //   // copy the map rather than modifying state.
    //   const selected = new Map(state.selected);
    //   selected.set(id, !selected.get(id)); // toggle
    //   return {selected};
    // });
  };


  _renderSectionHeader = ({ section }) => (
    // to do set non empty name      
    <ItemSectionHeader name={section.name === '' ? this.props.navigation.state.params.name + '目录' : section.name} />
  );



  _renderContent = () => {
    const { dynastyDetail } = this.props;
    if (dynastyDetail.loading) {
      return <LoadingView />;
    }
    const isEmpty = dynastyDetail.detail.name === undefined || dynastyDetail.detail.name === '';
    if (isEmpty) {
      return (
        <EmptyView type={dynastyDetail} onRefresh={this._onRefresh} />
      );
    }

    let bean = dynastyDetail.detail;
    printObj(bean);

    return (

      <ScrollView style={styles.container}>

        <Text style={styles.title}>{bean.name}</Text>
        <View style={styles.containerItem}>
          <Image style={styles.itemImg} source={{ uri: bean.photo }} />
        </View>

        <Text style={styles.tips}>简介</Text>
        <Text style={styles.tipsInfo}>{stringJustEmpty(bean.intro)}</Text>

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
  itemImg: {
    width: 200,
    height: 200, 
    resizeMode: 'center',
    // justifyContent: 'flex-end', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    textAlign: 'left',
    color: 'black',
    marginLeft: 10
  },
  
  container: {
    // flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    // paddingBottom: 20,
  },
  title: {
    fontSize: 21,
    textAlign: 'left',
    color: '#000000',
    marginTop: 20,
    marginLeft: 20,
  },
 

  tips: {
    fontSize: 15,
    textAlign: 'left',
    color: '#900f06',
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
  },

  tipsInfo: {
    fontSize: 14,
    textAlign: 'left',
    color: '#000000',
    // marginTop: 10,   
    // marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    lineHeight: 26,
    letterSpacing: 4,
    marginBottom: 40,
  },
});

DynastyDetailPage.propTypes = propTypes;


const mapStateToProps = (state) => {
  const { dynastyDetail } = state;
  return {
    dynastyDetail
  }
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(typeCreators, dispatch);
  return {
    actions
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DynastyDetailPage);
