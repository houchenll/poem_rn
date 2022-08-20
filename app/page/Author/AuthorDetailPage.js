import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as typeCreators from '../../actions/Author';
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
import { printArray, printObj, getList, getAuthorWorksDataLength, stringJustEmpty, processAuthorWorksData } from '../../utils/ItemsUtil';

import EmptyView from '../Type/EmptyView';
import ItemSectionHeader from '../Type/ItemSectionHeader';
import ItemSeparator from '../Type/ItemSeparator';
import ListFooterColored from './ListFooterColored';
import ItemDetailAuthor from './ItemDetailAuthor';

const propTypes = {
  actions: PropTypes.object,
  authorDetail: PropTypes.object.isRequired
};

// const DEFAULT_IAMGE = 'http://img.gushiwen.org/authorImg/changjian.jpg';

class AuthorDetailPage extends React.Component {
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
    this.props.authorDetail.loading=true; 
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      printObj(this.props.navigation.state.params);
      let id = this.props.navigation.state.params.id;
      console.log('ernest', 'contentId:' + id);
      this.props.actions.requestAuthorDetail(false, true, id);
    });
  }

  _onRefresh = () => {
    this.props.actions.requestAuthorDetail(false, true, this.props.navigation.state.params.id);
  };

  _keyExtractor = (item, index) => item.contentId;
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
    item.id = item.contentId;
    this.props.navigation.navigate('BookDetailPage', item);
  };

  _renderItem = ({ item }) => (
    <ItemDetailAuthor
      typeItem={item}
      onPressItem={this._onPressItem}
    />
  );


  _renderSectionHeader = ({ section }) => (
    <ItemSectionHeader name={section.name} />
  );

  _renderListFooter = () => (
    <ListFooterColored name={getAuthorWorksDataLength(this.props.authorDetail.detail.works) + '篇古籍'} />
  );



  // DEFAULT_IAMGE = 'http://img.gushiwen.org/authorImg/changjian.jpg'; 

  _renderContent = () => {
    const { authorDetail } = this.props;
    if (authorDetail.loading) {
      return <LoadingView />;
    }
    const isEmpty = authorDetail.detail.name === undefined || authorDetail.detail.name === '';
    if (isEmpty) {
      return (
        <EmptyView type={authorDetail} onRefresh={this._onRefresh} />
      );
    }


    let bean = authorDetail.detail;
    let data = processAuthorWorksData(authorDetail.detail.works);
    printObj(bean);

    let imageUrl = (bean.avatar === '') ? 'http://img.gushiwen.org/authorImg/changjian.jpg' : bean.avatar;
    console.log('ernest', 'image:' + bean.avatar + ',imageUrl:' + imageUrl);

    if (getAuthorWorksDataLength(bean.works) == 0) {
      return (
        <ScrollView style={styles.container}>

          <View style={styles.containerItem}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{bean.name}</Text>
              <Text style={styles.author}>[{bean.dynasty}]</Text>
            </View>
            <Image style={styles.itemImg} source={{ uri: imageUrl }} />
          </View>

          <Text style={styles.tips}>简介</Text>
          <Text style={styles.tipsInfo}>{stringJustEmpty(bean.intro)}</Text>
          <Text style={styles.tipsLast}>作品/{bean.count}</Text>

        </ScrollView>
      );
    }

    return (

      <ScrollView style={styles.container}>

        <View style={styles.containerItem}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{bean.name}</Text>
            <Text style={styles.author}>[{bean.dynasty}]</Text>
          </View>
          <Image style={styles.itemImg} source={{ uri: bean.avatar }} />
        </View>

        <Text style={styles.tips}>简介</Text>
        <Text style={styles.tipsInfo}>{stringJustEmpty(bean.intro)}</Text>
        <Text style={styles.tipsLast}>作品/{bean.count}</Text>

        <SectionList
          ref='list'
          renderItem={this._renderItem}
          renderSectionHeader={this._renderSectionHeader}
          keyExtractor={this._keyExtractor}
          sections={data}
          // getItemLayout={this._getItemLayout}
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
  itemImg: {
    width: 60,
    height: 80,
    marginRight: 80,
    marginTop: 10,
    // justifyContent: 'flex-end', 
  },
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    textAlign: 'left',
    color: 'black',
    marginLeft: 10
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'column',
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
  author: {
    fontSize: 16,
    textAlign: 'left',
    color: '#000000',
    marginTop: 15,
    marginLeft: 20,
    marginBottom: 5,
  },

  tips: {
    fontSize: 15,
    textAlign: 'left',
    color: '#900f06',
    marginTop: 10,
    marginBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
  },
  tipsLast: {
    fontSize: 15,
    textAlign: 'left',
    color: '#900f06',
    marginTop: 10,
    marginBottom: 20,
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
  },
});

AuthorDetailPage.propTypes = propTypes;


const mapStateToProps = (state) => {
  const { authorDetail } = state;
  return {
    authorDetail
  }
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(typeCreators, dispatch);
  return {
    actions
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthorDetailPage);
