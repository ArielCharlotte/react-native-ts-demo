/**
 * @flow
 */

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Platform, StyleSheet, Animated, RefreshControl, StatusBar, Image, WebView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { List, Modal, Button } from 'antd-mobile-rn';
import { inject, observer } from "mobx-react";
// import request from '../utils/request';

const Item = List.Item;
const Brief = Item.Brief;

@inject("base")
@observer
export default class Discover extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    // fetchData().then(() => {
      this.setState({refreshing: false});
    // });
  }

  render() {

    const { base } = this.props;

    // console.log(base);

    return (
      <WebView
        source={{uri: 'https://github.com/facebook/react-native'}}
        style={{marginTop: 20}}
      />
    );
  }
}
