import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import ImageComponent from '../../components/ImageComponent';

const DEFAULT_IAMGE = 'http://obzwut8kj.bkt.clouddn.com/poem/cover/guo_yu.jpg';

// some image url is invalide
class ItemAuthor extends React.PureComponent {
  // _onPress = () => {
  //   this.props.onPressItem(this.props.typeItem);
  // };

  render() {
    let imageUrl = this.props.typeItem.cover === '' ? DEFAULT_IAMGE : this.props.typeItem.cover;

    return (
      <TouchableOpacity onPress={() => this.props.onPressItem(this.props.typeItem)}>
        <View style={styles.containerItem}>
          <ImageComponent style={styles.itemImg} source={{ uri: imageUrl}} defaultSource={{ uri: DEFAULT_IAMGE }} />
          <Text style={styles.title}>{this.props.typeItem.name}</Text>
        </View>
      </TouchableOpacity >
    );
  }
}


const styles = StyleSheet.create({
  itemImg: {
    width: 36,
    height: 36,
  },
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
    height: 50,
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    textAlign: 'left',
    color: 'black',
    marginLeft: 10
  }
});

export default ItemAuthor;