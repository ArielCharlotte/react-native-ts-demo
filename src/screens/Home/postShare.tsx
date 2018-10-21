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

@inject("share")
@observer
export default class Home extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
    };
  }

  render() {

    const { share } = this.props;

    return (
      <View style={styles.fill}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});