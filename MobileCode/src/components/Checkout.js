import React, { Component } from 'react';
import { View, Text, Dimensions, Image, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { Button, Content } from './CommonComponents';
import Modal from 'react-native-modal';
import EasyBluetooth from 'easy-bluetooth-classic';
import Camera from 'react-native-camera';

const POST_URL = 'http://ec2-34-209-113-9.us-west-2.compute.amazonaws.com:6565/checkout';


export default class Checkout extends Component {

  constructor() {
    super();
   this.state = {
     islistVisible: false,
     list: [],
     loading: 0,
     total: 0,
     isModalVisible: false
   };
}
takePicture = () => {
 const options = {};
 let that = this;
 this.setState({
   loading: 1
 })
 console.log('Taking Picture');
 // if(!this.pictureTaken) {
 this.camera.capture({metadata: options})
   .then((data) => {
     console.log(data);
     that.setState({
       image: data.path,
     });
     const config = {
     headers: {
         'content-type': 'multipart/form-data'
     }
 }
     // setTimeout(() => {
       const postdata = new FormData();
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
       let data = await res.text();
       return data;
     }).then(function(data) {
       let parsedData = JSON.parse(data);
       that.setState({
         islistVisible: true,
         list: parsedData['cart'],
         total:  parsedData['total'],
         loading: 0
       })
       console.log(data);
     }).catch(err => console.log(err));
   })
   .catch(err => console.error(err));
 // }, 10);
 // }
}

returnView() {
  const {
    container,
    text,
    text1,
    preview,
    modal,
    textBox
  } = styles;
  if(this.state.islistVisible) {
      return (
        <View>
        <FlatList
        data={this.state.list}
        renderItem={({item}) =>
        <View style={{flexDirection: 'row', backgroundColor: 'white', borderRadius: 6, borderWidth: 2, borderColor: 'grey', justifyContent: 'space-between', height: 100, width:  Dimensions.get('window').width - 10, marginVertical: 10, }}>
          <View style={{flexDirection: 'column'}}>
          <Text style={{fontSize: 20, paddingVertical: 5, paddingHorizontal: 10, color: 'black'}}>Item</Text>
          <Text style={{fontSize: 23, paddingVertical: 5, paddingHorizontal: 10, color: 'grey'}}>{item.itemname}</Text>
        </View>
        <View style={{flexDirection: 'column'}}>
        <Text style={{fontSize: 20, paddingVertical: 5, paddingHorizontal: 10, color: 'black'}}>Qty</Text>
        <Text style={{fontSize: 23, paddingVertical: 5, paddingHorizontal: 10, color: 'grey'}}>{item.count}</Text>
      </View>
        </View>
      }
      />
        <Button onPress={() =>  this.setState({
          isModalVisible: true
      })
    }> Pay ${this.state.total}</Button>
    </View>
      )
  }
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center'}}>
      <Camera
           ref={(cam) => {
             this.camera = cam;
           }}
           type="front"
           style={styles.preview}
           aspect={Camera.constants.Aspect.fill}>
         </Camera>
      <Button onPress={this.takePicture}> Click here to Checkout</Button>
    </View>
  )
}
  _hideModal = () => this.setState({ isModalVisible: false,   islistVisible: false, })
   render() {
     const {
       container,
       text,
       text1,
       preview,
       modal,
       textBox
     } = styles;
  return (
  <View style={container}>
  <Image source={{uri: 'http://yiworks.com/wp-content/uploads/2016/11/Cool-Light-Grey-background-fantastic-imago-creative-studio-video-production.jpg'}} style={preview}>

  {this.returnView()}
  <ActivityIndicator size="large" color="#ffffff" style={{position: 'absolute', bottom: Dimensions.get('window').height/2, opacity: this.state.loading}} animating={true} hidesWhenStopped={true}/>
  </Image>
  <Modal isVisible={this.state.isModalVisible} animationIn={'slideInUp'} animationInTiming={300} onBackdropPress={this._hideModal}>
         <View style={modal}>
           <Image source={{uri: 'http://yiworks.com/wp-content/uploads/2016/11/Cool-Light-Grey-background-fantastic-imago-creative-studio-video-production.jpg'}} style={preview}>

           <Content >
            You have successfully checkedout
           </Content>
         <Button onPress={this._hideModal}> Continue</Button>
       </Image>

         </View>
       </Modal>
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
  preview: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/3,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  textBox: {
    height: 60,
    width:  Dimensions.get('window').width - 60,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    right: 5,
    paddingRight: 20
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 4,
    width:  Dimensions.get('window').width - 30,
    height: Dimensions.get('window').height - 500,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  text: {
    color: 'white',
    justifyContent: 'center',
      alignContent: 'center',
    alignItems: 'center',
    fontSize: 40
  },
}
