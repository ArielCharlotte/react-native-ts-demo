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

@inject("base")
@observer
export default class Session extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    this.setState({refreshing: true});
    // fetchData().then(() => {
      this.setState({refreshing: false});
    // });
  }

  render() {

    const { base } = this.props;

    // console.log(base);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          onClick={() => this.props.navigation.navigate('Details', { id: 'test' })}
        >
          Go to Details
        </Button>
      </View>
    );
  }
}
