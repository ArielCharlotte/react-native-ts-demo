/**
 * @flow
 */

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { StatusBar, Image, ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { List, Modal, Button } from 'antd-mobile-rn';
import { inject, observer } from "mobx-react";
// import request from '../utils/request';

const Item = List.Item;
const Brief = Item.Brief;

@inject("base")
@observer
export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    const { base, navigation } = this.props;

    console.log(base);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{`${navigation.state.params.id} Details!`}</Text>
      </View>
    );
  }
}