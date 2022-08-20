import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

const DEFAULT_IAMGE = 'http://img.gushiwen.org/authorImg/changjian.jpg';


class ItemAuthor extends React.PureComponent {
  // _onPress = () => {
  //   this.props.onPressItem(this.props.typeItem);
  // };

  render() {
    let imageUrl = this.props.typeItem.avatar === '' ? DEFAULT_IAMGE : this.props.typeItem.avatar;
    return (
      <TouchableOpacity onPress={() => this.props.onPressItem(this.props.typeItem)}>
        <View style={styles.containerItem}>
          <Image style={styles.itemImg} source={{ uri: imageUrl }} />
          <Text style={styles.title}>{this.props.typeItem.name}</Text>
          {/* <Text style={styles.brief}>{this.props.typeItem.dynasty}</Text> */}
          {/* <Text style={styles.brief}>{this.props.typeItem.dynasty}·古籍{this.props.typeItem.count}</Text> */}
        </View>
      </TouchableOpacity >
    );
  }
}


const styles = StyleSheet.create({
  itemImg: {
    width: 36,
    height: 36,
    marginLeft: 20,
  },
  containerItem: {
    flexDirection: 'row', 
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
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

export default ItemAuthor;