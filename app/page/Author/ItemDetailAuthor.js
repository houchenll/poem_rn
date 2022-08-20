import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

class ItemDetailAuthor extends React.PureComponent {
  // _onPress = () => {
  //   this.props.onPressItem(this.props.typeItem);
  // };

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onPressItem(this.props.typeItem)}>
        <View style={styles.containerItem}>
          <Text style={styles.title}>{this.props.typeItem.title}</Text>
          {/* <Text style={styles.brief}>{this.props.typeItem.dynasty}·{this.props.typeItem.author}</Text> */}
        </View>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
    padding: 10,
    // borderBottomColor: '#ddd',
    // borderBottomWidth: 1,
    height: 50,
  },
  title: {
    fontSize: 16,
    textAlign: 'left',
    color: 'black',
    marginLeft: 10
  }, 
  brief: {
    fontSize: 13,
    textAlign: 'left',
    color: '#737373',
    marginLeft: 10
  }
});



export default ItemDetailAuthor;