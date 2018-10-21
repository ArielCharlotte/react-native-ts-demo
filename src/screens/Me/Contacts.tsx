import React, { Component } from 'react';
import { Platform, requireNativeComponent, findNodeHandle, UIManager, View, StyleSheet, NativeModules, Alert, processColor ,NativeEventEmitter} from 'react-native';
import { Button } from 'react-native';

import NativeMyContactsView from "./NativeMyContactsView";
import MyToast from '../../utils/MyToast';



export default class Contacts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts1:[
        '薛之谦', '杨幂', '杨紫', '张一山'
      ],
      contacts2: [
          '热巴', '张嘉译', '李易峰'
        ],
    };
    const NativeEvents = new NativeEventEmitter(NativeModules.Native2JSEventEmitter);
    this.deleteSubscription = NativeEvents.addListener('TableDeleteRowEvent', (userInfo) => {
      var identity = userInfo['identity'];
      let index = userInfo['index'];
      //native端删除事件触发JS
      Alert.alert('提示','确认删除吗?',
        [
          {text:"取消", onPress : () => {}},
          {text:"确认", onPress : () => {
            if (identity == 'contacts1')
            {
              let datas = [...this.state.contacts1];//需要展开否则报错
              datas.splice(index, 1);
              this.setState({
                contacts1: datas,
              });
            }
            else{
              let datas = [...this.state.contacts2];
              datas.splice(index, 1);
              this.setState({
                contacts2: datas,
              });
            }
            
          }},
        ]
      );

    });
    this.clickedSubscription = NativeEvents.addListener('TableRowClickedEvent', (userInfo) => {
      //native端删除事件触发JS
      var identity = userInfo['identity'];
      let index = userInfo['index'];
      let datas = ((identity == 'contacts1')
                ? [...this.state.contacts1] : [...this.state.contacts2]);//需要展开否则报错

      alert('JS收到点击：' + datas[index]); 
    });

  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.controlContainer}>
          <Button
            title="改变通讯录1背景色(JS call Native)"
            onPress={this.changeBackgroundColor1}
          />
          <Button
            title="改变通讯录2背景色(JS call Native)"
            onPress={this.changeBackgroundColor2}
          />
        </View>
        <View style={styles.contacts}>
          <NativeMyContactsView
            sectionName="通讯录1(iOS原生组件)"
            datas={this.state.contacts1}
            ref="contacts1"
            identity="contacts1"
          />
        </View>
        <View style={styles.contacts}>
          <NativeMyContactsView
            sectionName="通讯录2(iOS原生组件)"
            datas={this.state.contacts2}
            ref="contacts2"
            identity="contacts2"
          />
        </View>
      </View>
    );
  }

  randomColor = () => {
    return ('#' + Math.floor(Math.random() * 0xffffff).toString(16));
  }

  changeBackgroundColor1 = () => {
    let tag = findNodeHandle(this.refs.contacts1);
    var color = processColor(this.randomColor());

    if (Platform.OS === 'android') {
      //向native层发送命令
      UIManager.dispatchViewManagerCommand(
          tag,
          UIManager.NativeContactsView.Commands.handleTask, // Commands后面的值与原生层定义的HANDLE_METHOD_NAME一致
          [color] // 向原生层传递的参数数据,数据形如：["第一个参数","第二个参数",3]
      );
    } else if (Platform.OS === 'ios') {
      NativeModules.NativeContactsViewManager.changeBackgroundColor(processColor(color), tag).then(success => {
        success ? console.log('改变原生View背景颜色成功') : console.log('颜色改变失败');
      });
    }
  }

  changeBackgroundColor2 = () => {
    let tag = findNodeHandle(this.refs.contacts2);
    var color = processColor(this.randomColor());
    if (Platform.OS === 'android') {
      //向native层发送命令
      UIManager.dispatchViewManagerCommand(
          tag,
          UIManager.NativeContactsView.Commands.handleTask, // Commands后面的值与原生层定义的HANDLE_METHOD_NAME一致
          [color] // 向原生层传递的参数数据,数据形如：["第一个参数","第二个参数",3]
      );
    } else if (Platform.OS === 'ios') {
      NativeModules.NativeContactsViewManager.changeBackgroundColor(processColor(color), tag).then(success => {
        success ? console.log('改变原生View背景颜色成功') : console.log('颜色改变失败');
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#EEEEEE',
  },
  contacts: {
    flex: 1,
    margin: 10,
    // backgroundColor: '#FFFFFF',
  },
  controlContainer: {
    backgroundColor: '#eeeeee',
    justifyContent: 'space-around', 
    alignItems: 'center',
    height: 100,
  }
  
});
