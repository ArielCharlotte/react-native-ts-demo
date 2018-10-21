/**
 * @flow
 */

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Platform, StyleSheet, Animated, RefreshControl, StatusBar, Image, ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { List, Modal, Button } from 'antd-mobile-rn';
import { inject, observer } from "mobx-react";
// import request from '../utils/request';

const Item = List.Item;
const Brief = Item.Brief;

const HEADER_MAX_HEIGHT = 160;
const HEADER_MIN_HEIGHT = 54;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

@inject("base", "share")
@observer
export default class Home extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
        // 0,
      ),
      refreshing: false,
    };
  }

  _renderScrollViewContent() {
    const data = Array.from({ length: 30 });
    return (
      <View style={styles.scrollViewContent}>
        {data.map((_, i) => (
          <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>
        ))}
      </View>
    );
  }

  _onRefresh = () => {
    const { share } = this.props;

    this.setState({refreshing: true});
    share.refreshList();
    this.setState({refreshing: false});
  }

  _onScroll = (event) => {
    const { base } = this.props;
    // const { scrollY } = this.state;
    const offsetY = event.nativeEvent.contentOffset.y
    // console.log(offsetY);
    if ( offsetY > -88 && base.statusBarStyle !== 'dark-content') {
      base.changeStatusBarStyle('dark-content');
    }
    if ( offsetY <= -88 && base.statusBarStyle !== 'light-content' ) {
      base.changeStatusBarStyle('light-content');
    }
  }

  render() {

    const { base, share } = this.props;
    const { scrollY } = this.state;

    // console.log(base);

    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    );
    //
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const headerHeight = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    //图片变成透明的
    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    //图片跟随滚动，但是是滚动距离的一般
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, HEADER_SCROLL_DISTANCE / 2],
      extrapolate: 'clamp',
    });
    //标题颜色
    const titleColor = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: ['#fff', '#000'],
      extrapolate: 'clamp',
    });

    const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1.5, 1, 1],
      extrapolate: 'clamp',
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [30, 0, 0],
      extrapolate: 'clamp',
    });

    // //头像大小
    // const avatarSize = scrollY.interpolate({
    //   inputRange: [0, HEADER_SCROLL_DISTANCE],
    //   outputRange: [80, 24],
    //   extrapolate: 'clamp',
    // });
    // //头像圆角
    // const avatarBorderRadius = scrollY.interpolate({
    //   inputRange: [0, HEADER_SCROLL_DISTANCE],
    //   outputRange: [0, 12],
    //   extrapolate: 'clamp',
    // });
    // //头像移动距离
    // const avatarTranslate = scrollY.interpolate({
    //   inputRange: [0, HEADER_SCROLL_DISTANCE],
    //   outputRange: [-80, 0],
    //   extrapolate: 'clamp',
    // });

    const titleTranslateX = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [-40, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.fill}>
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            {
              useNativeDriver: true,
              listener: this._onScroll,
            },
          )}
          contentInset={{
            top: HEADER_MAX_HEIGHT,
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT,
          }}
          refreshControl={
            <RefreshControl
              refreshing={share.refreshingList}
              onRefresh={this._onRefresh}
            />
          }
        >
          {this._renderScrollViewContent()}
        </Animated.ScrollView>
        <Animated.View
          style={[
            styles.header,
            { 
              transform: [{ translateY: headerTranslate }]
            },
          ]}
        >
          <Animated.Image
            style={[
              styles.headerBackground,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
            source={require('../../resource/cat.jpg')}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [
                { scale: titleScale },
                { translateY: titleTranslate },
              ],
            },
          ]}
        >
          <Text style={styles.title}>分享是一件快乐的事情</Text>
        </Animated.View>
        {/* <Animated.View
          style={[
            styles.bar,
            {
              height: headerHeight,
            },
          ]}
        >
          <Animated.Image style={[
            { width: avatarSize, height: avatarSize, borderRadius: avatarBorderRadius, },
            {
              transform: [
                { translateX: avatarTranslate },
              ],
            },
          ]} source={require('../../resource/avatar.jpg')} />
          <Animated.Text style={[
            styles.title,
            {
              color: titleColor,
              transform: [
                { translateX: titleTranslateX },
                // {translateY: titleTranslateY},
              ],
            }
          ]}>My Name</Animated.Text>
        </Animated.View> */}
      </View>
      // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      //   <Button
      //     onClick={() => this.props.navigation.navigate('Details', { id: 'test' })}
      //   >
      //     Go to Details
      //   </Button>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f5f5f6',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: 375,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: 20,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 18,
    marginTop: 6,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});