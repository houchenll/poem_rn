import React from 'react';
import { StyleSheet, Image, Text, Linking, FlatList, View } from 'react-native';

import DeviceInfo from 'react-native-device-info';
import Button from '../../components/Button';
import Swiper from 'react-native-swiper';



class Home extends React.Component {

  // static navigationOptions = ({navigation}) => ({
  //   title: ‘首页’,
  // });

  // static navigationOptions = ({ navigation }) => ({
  //   title: '建议',
  //   tabBarIcon: ({ tintColor }) => (
  //     <Icon name="md-thumbs-up" size={25} color={tintColor} />
  //   ),
  //   headerRight: (
  //     <Icon.Button
  //       name="md-checkmark"
  //       backgroundColor="transparent"
  //       underlayColor="transparent"
  //       activeOpacity={0.8}
  //       onPress={() => {
  //         navigation.state.params.handleCheck();
  //       }}
  //     />
  //   )
  // });


  render() {
    return (
      <Swiper style={styles.wrapper}
        dot={<View style={{ backgroundColor: 'rgba(0,0,0,.5)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />}
        activeDot={<View style={{ backgroundColor: '#3e9ce9', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
      >
        <View style={styles.slide1}>
          <Image style={styles.img} source={require('../../image/h001.jpg')} />
        </View>
        <View style={styles.slide1}>
          <Image style={styles.img} source={require('../../image/h002.jpg')} />
        </View>
        <View style={styles.slide1}>
          <Image style={styles.img} source={require('../../image/h003.jpg')} />
        </View>
        <View style={styles.slide1}>
          <Image style={styles.img} source={require('../../image/h004.jpg')} />
        </View>
  
      </Swiper>
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
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
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
  img: {
    // width: 110,
    // height: 110, 
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#9DD6EB', 
    resizeMode: 'center',
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

export default Home;
