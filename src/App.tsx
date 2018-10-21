import * as React from 'react';
import { StyleSheet, StatusBar, Text, View } from 'react-native';
// import { Provider } from 'mobx-react/native';
import Provider from './utils/MobxRnnProvider';
import Stores from './stores';
import MainScreen from './screens';

export default class App extends React.Component<{}> {
  render() {
    return (
      <Provider store={ Stores }>
        <MainScreen />
      </Provider>
    );
  }
}
