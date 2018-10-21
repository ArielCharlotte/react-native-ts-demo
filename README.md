React Native移动端App开发框架指南
===

## 1. 框架使用场景

## 2. 基础技术栈说明

### 2.1 typescript

http://www.typescriptlang.org/

### 2.2 React Native

https://facebook.github.io/react-native/

### 2.3 导航器 React-Navigation

https://reactnavigation.org/

### 2.4 状态管理 Mobx

https://cn.mobx.js.org/

### 2.5 组件库 AntD Mobile RN

https://rn.mobile.ant.design/docs/react/introduce-cn

## 3. 目录结构说明

```bash
.
├── android                  # android原生工程目录
├── ios                      # ios原生工程目录
├── node_modules             # 依赖模块目录
├── public                   # 静态资源文件目录
├── src                      # 源代码目录
    ├── common               # 公共代码
    ├── components           # 公共组件目录
    ├── resource             # 资源文件
    ├── screens              # 屏幕组件目录
        └── index.tsx        # 屏幕导航配置文件
    ├── stores               # mobx状态管理对象目录
        └── index.tsx        # mobx状态对象整合文件
    ├── utils                # 工具类代码
    └── App.tsx              # 主页面入口CSS样式文件
├── .babelrc                 # babel配置文件
├── .gitignore               # git版本管理忽略配置
├── app.json                 # expo应用配置文件
├── index.js                 # React Native应用入口文件
├── package.json             # npm包管理文件
├── rn-cli.config.js         # Metro Bundler配置文件
└── tsconfig.json            # typescript配置文件
```

## 3. 开发指南

### 3.1 环境搭建

#### 3.1.1 安装homebrew

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

一般几分钟就可以安装好。

#### 3.1.2 安装node、watchman与flow

```bash
brew install node
brew install watchman
brew install flow
```

React Native 包管理器同时使用了node和watchman ，如果在今后的开发过程中遇到问题，建议你更新这些依赖。flow是Facebook公司出品的一个类型检查库，它同样被React Native所采用。 本次实践中未安装flow，这部分时间较长。

#### 3.1.3 安装react native

```bash
npm install -g react-native-cli
```

这个步骤将会在你的系统全局安装React Native命令行工具。

#### 3.1.4 安装xcode

本次实践的版本是xcode9.4，可以从苹果的官网下载历史版本。

#### 3.1.5 安装Android环境

1. 安装最新版本的JDK

   > [下载地址](https://link.jianshu.com/?t=http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) 

2. 安装Android SDK，命令`brew install android-sdk`，在安装成功后最后的日志中保留sdk的目录，用于下文的配置。

3. 配置ANDROID_HOME环境变量

   在shell配置文件中正确导出 ANDROID_HOME 环境变量 (~/.bashrc  、 ~/.zshrc 或其他shell)，例如我的电脑上的配置为：

   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

    许多Android 相关的开发任务都使用`ANDROID_HOME`这个环境变量。需要确保添加环境变量之后执行source 命令使得配置可以立即生效。

4. 安装Android Studio，官网下载安装

5. 下载相关的包，在Android Studio菜单`Tools -> SDK Manager`打开Android SDK 管理器。在包管理器中点击`Android SDK`菜单，勾选`SDK Platforms`页面中的`Android API 28`与`Android 6.0(Marshmallow)`，勾选`SDK Tools`页面中的`Android SDK Build-Tools`、`Android Emulator`、`Android SDK Platform-Tools`与`Android SDK Tools`。然后点击OK开始下载，时间根据网速决定。

6. 创建一个模拟器。

### 3.2 React Native开发指南

#### 3.2.1 创建屏幕组件

页面组件文件约定创建在 `src/screens` 目录中。可以根据不同的业务功能创建不同的目录。

#### 3.2.2 配置屏幕导航

页面路由配置文件为 `src/screen/index.js`

配置屏幕至Tabs
```js
// 引入组件
import MeScreen from './Me';

const TabNav = createBottomTabNavigator(
  // ...
  {
    // 新增Tab“MeTab”为导航索引
+   MeTab: {
+     // 关联屏幕组件
+     screen: MeScreen,
+     path: '/me',
+     // 导航参数配置
+     navigationOptions: {
+       title: 'Me',
+       tabBarIcon: ({ tintColor, focused }) => (
+         <Image
+           source={focused?require('../resource/tabs/personal_02.png'):require('../resource/tabs/personal_01.png')}
+           style={[{ tintColor: tintColor }]}
+         />
+       ),
+     },
+   },
  },
  {
    // ...
  }
);
```

配置屏幕组件至全局导航栈
```js
// 引入组件
import LoginScreen from './Login';

const StacksOverTabs = createStackNavigator(
  {
+   Login: {
+     screen: LoginScreen,
+     path: '/login',
+     navigationOptions: {
+       title: 'Login',
+     },
+   },
  },
  {
    // ... 导航配置
  },
);
```

#### 3.2.3 编写屏幕组件

```js
import React, { Component } from 'react';
import { StatusBar, StyleSheet, Image, ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { List, InputItem, WingBlank, Icon, Toast, Button } from 'antd-mobile-rn';
import { inject, observer } from "mobx-react";
import { createForm } from 'rc-form';

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
  button: {
    borderRadius: 3,
    marginTop: 45,
    marginBottom: 20,
    borderColor: 'transparent'
  },
});

export default createForm()(Login);
```

#### 3.2.4 编写状态管理类

编写mobx状态管理文件
```javascript
// @flow
import { action, observable, runInAction } from 'mobx';
import { persist } from 'mobx-persist';
import request from '../utils/request'

//页面跳转
class Base {
  // 持久化登录用户名
  @persist('object') @observable username = '';
  @persist('object') @observable sessionid = '';

  @action
  login = async (username: string, password: string) => {
    const respData = await request('/login', {
      method: 'POST',
      body: {
        username,
        password,
      },
    })
    runInAction(() => {
      if (respData.result == "ok") {
        this.username = 'Xiang.T';
      }
    })
    return true;
  }

  @action
  logout = async () => {
    runInAction(() => {
      this.username = '';
    });
  }

}

export default new Base();
```

### 3.2.5 资源的使用

iconfont
```js
import { Icon } from 'antd-mobile-rn';

<Icon style={styles.iconText} type={'\ue78e'} color='#f00'/>
```

静态资源文件
```js
import { Image } from 'react-native';

<Image
  source={focused?require('../resource/tabs/personal_02.png'):require('../resource/tabs/personal_01.png')}
  style={[{ tintColor: tintColor }]}
/>
```

### 3.3 典型开发示例

#### 3.3.1 Tabs组件编写

#### 3.3.2 表单示例

#### 3.3.3 文件上传

#### 3.3.4 调用微信api

## 4. 调试指南

## TODO

> Web页面浏览器

https://reactnative.cn/docs/webview/

https://github.com/alinz/react-native-webview-bridge

> 时间选择器

https://github.com/react-component/m-date-picker

https://github.com/cnjon/react-native-datetime

> 拍照及相册图片选择/用户头像图片裁剪

https://github.com/syanbo/react-native-syan-image-picker

https://github.com/banchichen/TZImagePickerController

https://github.com/LuckSiege/PictureSelector

https://github.com/ivpusic/react-native-image-crop-picker

https://github.com/react-community/react-native-image-picker

> tag输入

https://github.com/peterp/react-native-tags

https://github.com/jwohlfert23/react-native-tag-input
