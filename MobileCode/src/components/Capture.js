import React, { Component } from 'react';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { View, Text, Dimensions, Image } from 'react-native';
import { CardSection } from './ModalComponents';
import { Button, Content } from './CommonComponents';
import EasyBluetooth from 'easy-bluetooth-classic';
import Camera from 'react-native-camera';


const GET_URL = 'http://ec2-34-209-113-9.us-west-2.compute.amazonaws.com:6565/shelves/1';

const POST_URL = 'http://ec2-34-209-113-9.us-west-2.compute.amazonaws.com:6565/activities';



export default class Capture extends Component {

  constructor() {
    super();
  this.onDataReadEvent = EasyBluetooth.addOnDataReadListener(this.onDataRead2);
  this.pictureTaken = false;
   this.state = {
     weight:0,
     count: 0
   };
  }

  componentWillUnmount() {
      this.onDataReadEvent.remove();
  }

  componentDidMount() {
let that = this;
    axios.get(GET_URL)
  .then(function (response) {
    that.setState({count: response.data.shelfdetails.numberofitems})
  })
  .catch(function (error) {
    console.log(error);
  });


  }

  onDataRead2 = (data) => {

     console.log("onDataRead");
     this.takePicture();
     this.setState({weight: data})
     console.log(data);

   }

   takePicture = () => {
    const options = {};
    let that = this;
    console.log('Taking Picture');
    // if(!this.pictureTaken) {
      this.pictureTaken = true;
    this.camera.capture({metadata: options})
      .then((data) => {
        console.log(data);
        that.setState({
          image: data.path
        });
        const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
        // setTimeout(() => {
          const postdata = new FormData();
          postdata.append('totalweight', that.state.weight); // you can append anyone.
          postdata.append('shelfid', 1);
          postdata.append('img', {
            uri: data.path,
            type: 'image/jpeg', // or photo.type
            name: 'userPhoto'
          });
          // this is the call to send the picture and data to the server.
          fetch(POST_URL, {
          method: 'post',
          body: postdata
        }).then(async res => {
          that.pictureTaken = true;
          console.log(res);
          let data = await res.json();
          return data
        }).then(function(data) {
          console.log(data);
          // let parsedData = JSON.parse(data);
          that.setState({
            count: data.numberofitemsleft,
          })
        }).catch(err => console.log(err));
      })
      .catch(err => console.error(err));
    // }, 10);
    // }
  }



   render() {
     const {
       container,
       text,
       background
     } = styles;
  return (
  <View style={container}>
    <Camera
         ref={(cam) => {
           this.camera = cam;
         }}
         type="front"
         style={styles.preview}
         aspect={Camera.constants.Aspect.fill}>
         <Image source={{uri: this.state.image}} style={{width: 100, height: 100}} />
         <Text style={text}>{this.state.count}</Text>
       </Camera>
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
