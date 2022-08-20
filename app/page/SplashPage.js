import React from 'react';
import { Dimensions, Animated, Easing } from 'react-native';
import store from 'react-native-simple-store';
import AV from 'leancloud-storage';
import NavigationUtil from '../utils/NavigationUtil';

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;

const splashImg = require('../image/splash_1.jpg');

class SplashPage extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(1),
      // fadeInOpacity: new Animated.Value(0.5) // 初始值
    };
    // registerApp('wxb24c445773822c79');
    if (!AV.applicationId) {
      AV.init({
        appId: 'Tfi1z7dN9sjMwSul8sYaTEvg-gzGzoHsz',
        appKey: '57qmeEJonefntNqRe17dAgi4'
      });
    }
  }

  componentDidMount() {
    const { navigate } = this.props.navigation;
    Animated.timing(this.state.bounceValue, {
      toValue: 1.2,
      duration: 500
    }).start(); 

    // Animated.timing(this.state.fadeInOpacity, {
    //   toValue: 1, // 目标值
    //   duration: 1000, // 动画时间
    //   // easing: Easing.linear // 缓动函数
    // }).start();

    this.timer = setTimeout(() => {
      // store.get('isInit').then((isInit) => {
      //   if (!isInit) {
      //     navigate('Category', { isFirst: true });
      //   } else {
      NavigationUtil.reset(this.props.navigation, 'MainPage');
      //   }
      // });
      // NavigationUtil.reset(this.props.navigation, 'Home');
    }, 500);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <Animated.Image
        style={{
          width: maxWidth,
          height: maxHeight,
          transform: [{ scale: this.state.bounceValue }]
          // opacity: this.state.fadeInOpacity
        }}
        source={splashImg}
      />
    );
  }
}

export default SplashPage;
