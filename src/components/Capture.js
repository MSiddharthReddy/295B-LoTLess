import React, { Component } from 'react';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { View, Text, Dimensions, Image } from 'react-native';
import { CardSection } from './ModalComponents';
import { Button, Content } from './CommonComponents';
import EasyBluetooth from 'easy-bluetooth-classic';
import Camera from 'react-native-camera';


const login = ``;

export default class Capture extends Component {

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
      })
      .catch(function (ex) {
        console.warn(ex);
      });
      this.onDataReadEvent = EasyBluetooth.addOnDataReadListener(this.onDataRead);
   this.state = {
     weight: 0,
     image: ''
   };
  }

  componentWillMount() {
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
  }

  onDataRead = (data) => {
     console.log("onDataRead");
     this.setState({
       weight: data
     });
     this.takePicture();
     console.log(data);

   }

   takePicture = () => {
    const options = {};
    this.camera.capture({metadata: options})
      .then((data) => {
        console.log(data);
        this.setState({
          image: data.path
        });
        //@TODO this is the call to send the picture and data to the server.
        // const data = new FormData();
        // data.append('weight', this.state.weight); // you can append anyone.
        // data.append('photo', {
        //   uri: data.path,
        //   type: 'image/jpeg', // or photo.type
        //   name: 'userPhoto'
        // });
        // fetch(url, {
        //   method: 'post',
        //   body: data
        // }).then(res => {
        //   console.log(res)
        // });
      })
      .catch(err => console.error(err));
  }


   render() {
     const {
       container,
       text,
       background
     } = styles;
  return (
  <View style={container}>
      {/* <Image source={{uri: 'http://yiworks.com/wp-content/uploads/2016/11/Cool-Light-Grey-background-fantastic-imago-creative-studio-video-production.jpg'}} style={background}> */}
      <Camera
         ref={(cam) => {
           this.camera = cam;
         }}
         type="front"
         style={styles.preview}
         aspect={Camera.constants.Aspect.fill}>
         <Image source={{uri: this.state.image}} style={{width: 100, height: 100}} />
         <Text style={text}>{this.state.weight}</Text>
       </Camera>
  {/* </Image> */}
  </View>
  );
  }
}

const styles = {
  container: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 2
  },
  text: {
    color: 'white',
    fontSize: 80
  },
  preview: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
}
