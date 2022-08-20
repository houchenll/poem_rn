import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes, Image, Text, TouchableOpacity } from 'react-native';

const require('./image/active.png')

class TextArrow extends React.PureComponent {

  _onPress = () => {

  }

  localImage = '../image/orderdown.png';
  lines = 4;

  render() {

    return (
      // <TouchableOpacity onPress={this._onPress}>
      <View style={styles.containerItem}>
        <Text
          ref='text'
          style={styles.title}
          numberOfLines={lines}
          onPress={this._onPress}
          ellipsizeMode='tail' >{this.props.typeItem.name}</Text>
        <Image style={styles.itemImg} source={require(localImage)} } />
        </View>
      // </TouchableOpacity >
    );
  }
}


const styles = StyleSheet.create({
  itemImg: {
    width: 12,
    height: 8,
  },
  containerItem: {
    flexDirection: 'colunm',
    justifyContent: 'flex-start',
    // alignItems: 'center',
    backgroundColor: '#fcfcfc',
    height: 50,
    paddingLeft: 20,
  },
  title: {
    fontSize: 11,
    textAlign: 'left',
    color: 'black',
    marginLeft: 10,
    marginRight: 10,
  }


export default TextArrow;
