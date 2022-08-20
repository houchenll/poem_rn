import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

class ListFooterColored extends React.PureComponent {
  // _onPress = () => {
  //   this.props.onPressItem(this.props.typeItem);
  // };

  render() {
    return (
      <View style={styles.containerItem}>
        <Text style={styles.headerText}>{this.props.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerItem: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent:'center',
    // paddingLeft: 20,
    height: 50,
    backgroundColor: '#EDEEF0',
  },
  headerText: {
    // textAlign:'center',
    // justifyContent: 'center', 
    // flex: 1,
    color: '#737373',
    fontSize: 16,
  },

});



export default ListFooterColored;