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
  ScrollView,
  Text
} from 'react-native';

import LoadingView from '../../components/LoadingView';
import ToastUtil from '../../utils/ToastUtil';
import { printArray, printObj, getList, getMenuListDataLength, processBookMeunData,stringJustEmpty} from '../../utils/ItemsUtil';

import EmptyView from '../Type/EmptyView';
import ItemBookMenu from './ItemBookMenu';
import ItemSectionHeader from '../Type/ItemSectionHeader';
import RightSectionListWords from '../Type/RightSectionListWords';
import ItemSeparator from '../Type/ItemSeparator';
import ListFooter from '../Type/ListFooter';

const propTypes = {
  actions: PropTypes.object,
  bookDetail: PropTypes.object.isRequired
};

class BookDetailPage extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    // 这里面的属性和App.js的navigationOptions是一样的。
    headerTitle: navigation.state.params.title,
    // headerStyle: {
    //   backgroundColor: screenProps ?
    //     screenProps.themeColor :
    //     '#4ECBFC'
    // },
  });


  constructor(props) {
    super(props)
    this.props.bookDetail.loading=true; 
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      printObj(this.props.navigation.state.params);
      let contentId = this.props.navigation.state.params.id;
      console.log('ernest', 'contentId:' + contentId);
      this.props.actions.requestBookMenuDetail(false, true, contentId);
    });
  }

  _onRefresh = () => {
    this.props.actions.requestBookMenuDetail(false, true, this.props.navigation.state.params.id);
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

  _renderListFooter = () => (
    <ListFooter name={getMenuListDataLength(this.props.bookDetail.reads) + '篇'} />
  );

  _renderContent = () => {
    const { bookDetail } = this.props;
    if (bookDetail.loading) {
      return <LoadingView />;
    }
    printObj(bookDetail);
    const isEmpty = bookDetail.detail.content === undefined || bookDetail.content === '';
    if (isEmpty) {
      return (
        <EmptyView type={bookDetail} onRefresh={this._onRefresh} />
      );
    }

    let bean = bookDetail.detail;
    printObj(bean);

    return (

      <ScrollView style={styles.container}>

        <Text style={styles.title}>{bean.title} {bean.subTitle}</Text>
        <Text style={styles.author}>[{bean.dynastyName}] {bean.authorName}</Text> 
        <Text style={styles.content}>{bean.content}</Text>

        {/* <Text style={styles.tips}>序</Text> 
        <Text style={styles.tipsInfo}>{bean.preface}</Text> */}
        <Text style={styles.tips}>体裁</Text>
        <Text style={styles.tipsInfo}>{stringJustEmpty(bean.genre)}</Text>
        <Text style={styles.tips}>注释</Text>
        <Text style={styles.tipsInfo}>{stringJustEmpty(bean.notes)}</Text>
        <Text style={styles.tips}>译文</Text>
        <Text style={styles.tipsInfo}>{stringJustEmpty(bean.translate)}</Text>
        <Text style={styles.tips}>赏析</Text>
        <Text style={styles.tipsInfo}>{stringJustEmpty(bean.appr)}</Text>

        <Text style={styles.tips}>背景</Text>
        <Text style={styles.tipsInfoLast}>{stringJustEmpty(bean.background)}</Text>  
        
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
    // flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    // paddingBottom: 20,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000000',
    marginTop: 20
  },
  author: {
    fontSize: 15,
    textAlign: 'center',
    color: '#000000',
    marginTop: 15,
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000000',
    lineHeight: 30,
    paddingLeft:40,
    paddingRight:40, 
    marginBottom:10,
  },
  tips: {
    fontSize: 14,
    textAlign: 'left',
    color: '#900f06',
    marginTop: 10,
    marginBottom: 0,
    paddingLeft:20,
    paddingRight:20, 
  },
  tipsInfo: {
    fontSize: 13,
    textAlign: 'left',
    color: '#505050', 
    // marginTop: 10,   
    // marginBottom: 10,
    paddingLeft:20,
    paddingRight:20, 
    lineHeight:24, 
    letterSpacing: 4,
  },
  tipsInfoLast: {
    fontSize: 13,
    textAlign: 'left',
    color: '#505050', 
    // marginTop: 10,   
    marginBottom: 40,
    paddingLeft:20,
    paddingRight:20, 
    lineHeight:24, 
    letterSpacing: 4,
  },
});

BookDetailPage.propTypes = propTypes;

const mapStateToProps = (state) => {
  const { bookDetail } = state;
  return {
    bookDetail
  }
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(typeCreators, dispatch);
  return {
    actions
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BookDetailPage);
