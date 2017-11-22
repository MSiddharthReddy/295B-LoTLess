import React, { Component } from 'react';
import axios from 'axios';
import { View, Text, Dimensions, Image, TextInput } from 'react-native';
import { Button, Content } from './CommonComponents';
import EasyBluetooth from 'easy-bluetooth-classic';
import Modal from 'react-native-modal'


export default class StoreKeeper extends Component {

  constructor() {
    super();
  this.onDataReadEvent = EasyBluetooth.addOnDataReadListener(this.onDataRead);
   this.state = {
     weight: 0,
     isModalVisible: false,
     itemName: '',
     itemQuantity: ''
   };
}

_showModal = () => this.setState({ isModalVisible: true })

  _hideModal = () => this.setState({ isModalVisible: false })

  onDataRead = (data) => {
     console.log("onDataRead");
     this.setState({
       weight: data
     });
     console.log(data);

   }

   sendDetails = () => {
     this._hideModal();
   }
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
  <Text style={text1}>Total Weight</Text>
  <Text style={text}>{this.state.weight}</Text>
  <Button onPress={this._showModal}> Update Shelf</Button>
  <Modal isVisible={this.state.isModalVisible} animationIn={'slideInUp'} animationInTiming={300} onBackdropPress={this._hideModal}>
         <View style={modal}>
           <Image source={{uri: 'http://yiworks.com/wp-content/uploads/2016/11/Cool-Light-Grey-background-fantastic-imago-creative-studio-video-production.jpg'}} style={preview}>

           <Content style={{paddingBottom: 50}}>
             Enter Item Details Below
           </Content>
          <TextInput
          style={textBox}
          onChangeText={(itemName) => this.setState({itemName})}
          value={this.state.itemName}
          placeholder={'Item Name'}
          />
        <TextInput
        style={textBox}
        onChangeText={(itemQuantity) => this.setState({itemQuantity})}
        value={this.state.itemQuantity}
        placeholder={'Item Quantity'}

        />
         <Button onPress={this.sendDetails}> Send Details</Button>
       </Image>

         </View>
       </Modal>

  </Image>
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
  textBox: {
    height: 60,
    width:  Dimensions.get('window').width - 60,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    margin: 20,
    right: 5,
    paddingRight: 20
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 4,
    width:  Dimensions.get('window').width - 30,
    height: Dimensions.get('window').height - 200,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  text1: {
    color: 'white',
    fontSize: 60
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
    justifyContent: 'center',
    flexDirection: 'column',
  },
}
