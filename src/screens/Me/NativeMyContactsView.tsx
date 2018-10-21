import React, { Component, PropTypes} from 'react';
import { requireNativeComponent, StyleSheet, View } from 'react-native';



// 'use strict';
// var {
//     PropTypes
// } = require('react');
// var {
//     requireNativeComponent, View
// } = require('react-native');

// var iface = {
//     name: 'NativeMyContactsView',
//     propTypes: {
//         datas: PropTypes.arrayOf(PropTypes.string),
//         ...View.propTypes,// 包含默认的View的属性
//     },
// };

// module.exports = requireNativeComponent('NativeContactsView', iface);



export default class NativeMyContactsView extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    const { base } = this.props;

    return (
      <NativeContactsView {...this.props} style={styles.contactsView}/>
    );
  }

}

//对应原生端暴露的属性
// NativeContactsView.propTypes = {
//   datas: PropTypes.array,
// };


/**
 * 字符串和原生端RCTViewManager子类中RCT_EXPORT_MODULE()括号中的参数一致
 * 如果括号中没有参数，应为RCTViewManager子类的类名去掉Manager
 */
const NativeContactsView = requireNativeComponent('NativeContactsView', NativeMyContactsView);

const styles = StyleSheet.create({
  contactsView: {
    flex: 1,
    // backgroundColor: '#FFFFFF',
  },
});
