import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { lang } from 'moment';

class ItemSeparator extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.line}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // paddingLeft: 20,
    // paddingRight: 20, 
    height: 0.5,
    backgroundColor: '#fcfcfc',
  },
  line: {
    marginLeft: 20,
    marginRight: 26,
    height: 0.5,
    backgroundColor: '#d7dade',
    // borderBottomColor: '#d7dade', 
    // borderBottomWidth: 0.5, 
  },
});

export default ItemSeparator;