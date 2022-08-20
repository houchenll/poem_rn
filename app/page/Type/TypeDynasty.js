import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as typeCreators from '../../actions/Type';

import PropTypes from 'prop-types';
import {
  DeviceEventEmitter,
  InteractionManager,
  FlatList,
  StyleSheet,
  View
} from 'react-native';

import LoadingView from '../../components/LoadingView';
import ToastUtil from '../../utils/ToastUtil';
import { getList, printObj, printArray } from '../../utils/ItemsUtil';
import ItemDynasty from './ItemDynasty';
import Footer from './Footer';
import ListFooter from './ListFooter';
import EmptyView from './EmptyView';
import ItemSeparator from './ItemSeparator';


const propTypes = {
  actions: PropTypes.object,
  typeDynasty: PropTypes.object.isRequired
};

class TypeDynasty extends React.Component {

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.actions.requestTypeDynastyList(false, true);
    });
  }

  _onRefresh = () => {
    this.props.actions.requestTypeDynastyList(true, false);
  };

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (item) => {
    console.log('ernest', "click item:" + item);
    this.props.navigation.navigate('DynastyDetailPage', item); 
  };

  _renderItem = ({ item }) => (
    <ItemDynasty
      typeItem={item}
      onPressItem={this._onPressItem}
    />
  );

  _renderListFooter = ({ section }) => (
    <ListFooter name={this.props.typeDynasty.typeList.length + '个朝代'} />
  );

  _renderContent = () => {
    const { typeDynasty } = this.props;
    if (typeDynasty.loading) {
      return <LoadingView />;
    }

    const isEmpty = typeDynasty.typeList.length === 0;
    if (isEmpty) {
      return (
        <EmptyView type={typeDynasty} onRefresh={this._onRefresh} />
      );
    }

    return (
      <FlatList
        data={getList(typeDynasty.typeList)}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        ItemSeparatorComponent={() => <ItemSeparator></ItemSeparator>}
        ListFooterComponent={this._renderListFooter}

      />
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

TypeDynasty.propTypes = propTypes;


const mapStateToProps = (state) => {
  const { typeDynasty } = state;
  return {
    typeDynasty
  }
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(typeCreators, dispatch);
  return {
    actions
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TypeDynasty);
