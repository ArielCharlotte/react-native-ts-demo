/**
 * @flow
 */

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { StatusBar, StyleSheet, Image, ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { List, InputItem, WingBlank, Icon, Toast, Button } from 'antd-mobile-rn';
import { inject, observer } from "mobx-react";
import { createForm } from 'rc-form';
// import request from '../utils/request';


const Item = List.Item;
const Brief = Item.Brief;

@inject('base')
@observer
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onLoginClick = () => {
    const { navigation, form, base } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        if (err.username) {
          Toast.info('请输入用户名');
        }
        else if (err.password) {
          Toast.info('请输入密码');
        }
        return;
      }

      // 执行登录动作
      Toast.loading('加载中', 0);
      base.login(values.username, values.password)
        .then((result) => {
          if (result) {
            // 登录成功
            navigation.goBack();
          }
        });
      Toast.hide();
    });
  }

  render() {

    const { form, base } = this.props;
    const { getFieldProps } = form;

    console.log(base);

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.bgImageWrapper}>
          <Image source={require('../resource/login/bg.png')} style={styles.bgImage} />
        </View>
        <View>
          <View style={styles.top}>
            <Image
              source={require('../resource/login/logo.png')}
              style={{
                width: 160, height: 80,
                resizeMode: "contain"
              }}
            />
          </View>

          <View style={styles.form}>
            <List>
              <InputItem placeholder="用户名"
                {
                ...getFieldProps(
                  'username',
                  {
                    rules: [
                      {
                        required: true
                      }
                    ],
                    initialValue: ''
                  }
                )
                }
              >
                <Icon type={'\ue7ae'} />
              </InputItem>
              <InputItem placeholder="密码" type="password"
                {
                ...getFieldProps(
                  'password',
                  {
                    rules: [
                      {
                        required: true
                      }
                    ],
                    //initialValue: "1111111"
                  }
                )
                }
              >
                <Icon type={'\ue7c9'} />
              </InputItem>
            </List>
          </View>

          <WingBlank>
            <Button style={styles.button} type="primary" onClick={() => this.onLoginClick()}>
              登录
            </Button>
          </WingBlank>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  bgImageWrapper: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0
  },
  bgImage: {
    flex: 1,
    resizeMode: "stretch"
  },
  top: {
    paddingTop: 80,
    paddingBottom: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    backgroundColor: '#fff'
  },
  button: {
    // backgroundColor: '#17a164',
    borderRadius: 3,
    marginTop: 45,
    marginBottom: 20,
    borderColor: 'transparent'
  },
  viewPwdWithLan: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    height: 50,
  },
  text: {
    color: '#fff',
    fontSize: 14,
  },
  btn: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: 0,
  },
  captcha: {
    backgroundColor: '#6b518d',
    width: 100,
    height: 38,
  },
  captchaBtn: {
    backgroundColor: '#6b518d',
    borderColor: 'transparent',
    borderRadius: 3,
    width: 100,
    height: 38,
  },
});

export default createForm()(Login);