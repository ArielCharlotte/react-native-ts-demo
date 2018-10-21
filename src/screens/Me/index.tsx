/**
 * @flow
 */

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { StyleSheet, StatusBar, Image, ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { List, Modal, WingBlank, Button, Icon } from 'antd-mobile-rn';
import { inject, observer } from "mobx-react";
// import request from '../utils/request';

const Item = List.Item;
const Brief = Item.Brief;

@inject("base")
@observer
export default class Me extends Component {
  constructor(props) {
    super(props);
    this.state = {
      demoModalVisible: false,
    };
  }

  fetchUserInfo = (e) => {
    // const { user } = this.props;
    // e.preventDefault();
    // // this.setState({
    // //   hidden: !this.state.hidden,
    // // });
    // request('/api/user.json').then((result) => {
    //   console.log(result);
    //   if (result) {
    //     user.changeName(result.name);
    //   }
    // });
  }

  onLoginClick = () => {
    this.props.navigation.navigate('Login');
  }

  onViewUserInfo = () => {

  }

  onSettinsClick = () => {
    this.props.navigation.navigate('Settings');
  }

  onLogoutClick = () => {
    const { base } = this.props;
    base.logout();
  }

  onDemoModalClose = () => {
    this.setState({
      demoModalVisible: false,
    })
  }

  render() {

    const { base } = this.props;
    const { username } = base;

    console.log(base);

    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: '#f5f5f9' }}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <List>
            <Item
              thumb={
                <Image
                  source={{
                    uri: 'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png',
                  }}
                  style={{ width: 58, height: 58, marginTop: 8, marginBottom: 8, marginRight: 8 }}
                />
              }
              onClick={username ? this.onViewUserInfo : this.onLoginClick}
            >
              {`${username ? username : '点击登录' }`}
            </Item>
          </List>
          <List style={{ marginTop: 12 }}>
            <Item
              thumb={
                <Text style={styles.iconText}>
                  <Icon style={styles.iconText} type={'\ue78e'} color='#f00'/>
                </Text>
              }
              arrow="horizontal"
              onClick={this.onSettinsClick}
            >
              Settings
            </Item>
          </List>
          <List renderHeader={() => '带缩略图'}>
            <Item
              thumb={
                <Image
                  style={{ width: 24, height: 24, marginRight: 8, }}
                  source={require('../../resource/icon/alerts_ts.png')}
                />
              }
              onClick={() => this.setState({ demoModalVisible: true })}
            >
              Modal Demo
            </Item>
            <Item
              thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png"
              arrow="horizontal"
            >
              thumb
            </Item>
            <Item
              extra={
                <Image
                  source={{
                    uri:
                      'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png',
                  }}
                  style={{ width: 29, height: 29 }}
                />
              }
              arrow="horizontal"
            >
              extra为Image
            </Item>
          </List>
          <WingBlank>
            <Button style={{marginTop: 42}} type="warning" onClick={() => this.onLogoutClick()}>
              注销
            </Button>
          </WingBlank>
          <Modal
            popup
            visible={this.state.demoModalVisible}
            animationType="slide-up"
            onClose={this.onDemoModalClose}
          >
            <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
              <Text style={{ textAlign: 'center' }}>Content...</Text>
              <Text style={{ textAlign: 'center' }}>Content...</Text>
            </View>
            <Button type="primary" inline onClick={this.onDemoModalClose}>
              close modal
            </Button>
          </Modal>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  iconText: {
    marginRight: 8,
  },
});