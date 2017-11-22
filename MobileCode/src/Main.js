import React, { Component } from 'react';
import RouterComponent from './Router';
import EasyBluetooth from 'easy-bluetooth-classic';


class Main extends Component {
  constructor() {
    super();
    var config = {
      "uuid": "00001101-0000-1000-8000-00805f9b34fb",
      "deviceName": "Bluetooth Example Project",
      "bufferSize": 2048,
      "characterDelimiter": "\n"
    }

    EasyBluetooth.init(config)
      .then(function (config) {
        console.log("config done!");
        EasyBluetooth.startScan()
            .then(function (devices) {
              console.log("all devices found:");
              console.log(devices);
              let device = devices.filter((device) => {
                return device.name === 'H-C-2010-06-01';
              })[0];
              console.log(device);
              EasyBluetooth.connect(device)
              .then(() => {
                console.log("Connected!");
                console.log(device)
              })
              .catch((ex) => {
                console.warn(ex);
              })
            })
            .catch(function (ex) {
              console.warn(ex);
            });
      })
      .catch(function (ex) {
        console.warn(ex);
      });
  }
  render() {
      return (
         <RouterComponent />
    );
  }
}

export default Main;
