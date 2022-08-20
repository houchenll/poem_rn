import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

class ItemSectionHeader extends React.PureComponent {
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
    paddingLeft: 20,
    height: 24,
    backgroundColor: '#EDEEF0',
  },
  headerText: {
    // textAlign:'center',
    // justifyContent: 'center',
    // flex: 1,
    color: '#737373',
    fontSize: 12,
  },

});



export default ItemSectionHeader;