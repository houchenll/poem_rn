import React from 'react';
import { StyleSheet, Image, Text, Linking, View, PanResponder } from 'react-native';

import DeviceInfo from 'react-native-device-info';
import Button from '../../components/Button';
import Swiper from 'react-native-swiper';



class Mine extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerTitle: '我的',
    headerStyle: {
      backgroundColor: screenProps ?
        screenProps.themeColor :
        '#4ECBFC'
    },
  })

  render() {
    return (
      <Swiper style={styles.wrapper}
      dot={<View style={{ backgroundColor: 'rgba(0,0,0,.5)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />}
      activeDot={<View style={{ backgroundColor: '#3e9ce9', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
       >
        <View style={styles.slide1}>
          <Image style={styles.img} source={require('../../image/m001.jpg')} />
        </View>
        <View style={styles.slide1}>
          <Image style={styles.img} source={require('../../image/m003.jpg')} />
        </View>
        <View style={styles.slide1}>
          <Image style={styles.img} source={require('../../image/m009.jpg')} />
        </View>
        <View style={styles.slide1}>
          <Image style={styles.img} source={require('../../image/m010.jpg')} />
        </View>

      </Swiper >
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    // width: 110,
    // height: 110, 
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#9DD6EB',
    resizeMode: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 10
  },
  center: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    width: 110,
    height: 110,
    marginTop: 50
  },
  version: {
    fontSize: 16,
    textAlign: 'center',
    color: '#aaaaaa',
    marginTop: 5
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#313131',
    marginTop: 10
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#4e4e4e'
  },
  disclaimerContent: {
    flexDirection: 'column'
  },
  disclaimer: {
    fontSize: 14,
    textAlign: 'center'
  },
  bottomContainer: {
    alignItems: 'center'
  }
});

export default Mine;
