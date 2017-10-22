import React, { Component } from 'react';
import RouterComponent from './Router';
import BluetoothSerial, { onData } from 'react-native-bluetooth-serial';
import EasyBluetooth from 'easy-bluetooth-classic';

class Main extends Component {
  render() {
      return (
         <RouterComponent />
    );
  }
}

export default Main;
