/**
 * @flow
 */

import React from 'react';
import { Platform, StyleSheet, StatusBar, Image, Text, View, Button } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
// import Ionicons from 'react-native-vector-icons/Ionicons';

import { gColors } from '../common/contants'

import LoginScreen from './Login';
import HomeScreen from './Home';
import SessionScreen from "./Session";
import DetailsScreen from './Session/Details';
import DiscoverScreen from './Discover'
import MeScreen from './Me';
import SettinsScreen from './Me/Settings';
import { inject, observer } from "mobx-react";

// const HomeStack = createStackNavigator({
//   Home: HomeScreen,
//   Details: DetailsScreen,
// });

// const MeStack = createStackNavigator({
//   Me: MeScreen,
// });

const TabNav = createBottomTabNavigator(
  {
    HomeTab: {
      screen: HomeScreen,
      path: '/home',
      navigationOptions: {
        title: 'Welcome',
        header: null,
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor, focused }) => (
          <Image
            source={focused?require('../resource/tabs/daily_02.png'):require('../resource/tabs/daily_01.png')}
            style={[{ tintColor: tintColor }]}
          />
        ),
      },
    },
    SessionTab: {
      screen: SessionScreen,
      path: '/session',
      navigationOptions: {
        title: 'Session',
        tabBarLabel: 'Session',
        tabBarIcon: ({ tintColor, focused }) => (
          <Image
            source={focused?require('../resource/tabs/message_02.png'):require('../resource/tabs/message_01.png')}
            style={[{ tintColor: tintColor }]}
          />
        ),
      },
    },
    DiscoverTab: {
      screen: DiscoverScreen,
      path: '/discover',
      navigationOptions: {
        title: 'Discover',
        header: null,
        tabBarLabel: 'Discover',
        tabBarIcon: ({ tintColor, focused }) => (
          <Image
            source={focused?require('../resource/tabs/daily_02.png'):require('../resource/tabs/daily_01.png')}
            style={[{ tintColor: tintColor }]}
          />
        ),
      },
    },
    // ContactsTab: {
    //   screen: ContactsScreen,
    //   path: '/contacts',
    //   navigationOptions: {
    //     title: '通讯录',
    //     tabBarLabel: 'Contacts',
    //     tabBarIcon: ({ tintColor, focused }) => (
    //       <Image
    //         source={focused?require('../resource/tabs/message_02.png'):require('../resource/tabs/message_01.png')}
    //         style={[{ tintColor: tintColor }]}
    //       />
    //     ),
    //   },
    // },
    MeTab: {
      screen: MeScreen,
      path: '/me',
      navigationOptions: {
        title: 'Me',
        tabBarIcon: ({ tintColor, focused }) => (
          <Image
            source={focused?require('../resource/tabs/personal_02.png'):require('../resource/tabs/personal_01.png')}
            style={[{ tintColor: tintColor }]}
          />
        ),
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: gColors.brandPrimary, // 文字和图片选中颜色
      inactiveTintColor: '#999', // 文字和图片默认颜色
      showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
      indicatorStyle: { height: 0 }, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
      style: {
        backgroundColor: '#303030', // TabBar 背景色
      },
      // labelStyle: {
      //     fontSize: 10, // 文字大小
      // },
      // tabStyle: {
      //     width: 100,
      // },
      iconStyle: {
        width: 40,
      }
    },
  }
);

TabNav.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let title;
  let header;
  if (routeName === 'HomeTab') {
    title = 'Home';
    header = null;
  } else if (routeName === 'SessionTab') {
    title = 'Session';
  } else if (routeName === 'DiscoverTab') {
    title = 'Discover';
  } else if (routeName === 'MeTab') {
    title = 'Me';
  }
  return {
    title,
    header,
  };
};

const StacksOverTabs = createStackNavigator(
  {
    Root: {
      screen: TabNav,
      // path: '/',
    },
    Login: {
      screen: LoginScreen,
      // path: '/login',
      navigationOptions: {
        title: 'Login',
      },
    },
    Details: {
      screen: DetailsScreen,
      // path: '/detail/:id',
      navigationOptions: {
        title: 'Detail',
      },
    },
    Settings: {
      screen: SettinsScreen,
      navigationOptions: {
        title: 'Settins',
      },
    }
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#303030',
        elevation: 0,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTintColor: '#fff',
      // headerTransparent: true,
      // headerBackground: Platform.select({
      //   ios: (
      //     <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' }} />
      //   ),
      //   android: (
      //     <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' }} />
      //   ),
      // }),
    }
  },
);

@inject("base")
@observer
export default class App extends React.Component<{}> {
  render() {
    const { base } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent barStyle={base.statusBarStyle} />
        <StacksOverTabs />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
});
