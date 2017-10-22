import React from 'react';
import { View, Dimensions, Image } from 'react-native';
import { Content } from '../CommonComponents';


const Card = ({ children }) => {
  const {
    headerStyle,
    containerStyle,
    nameStyle,
    userDetails,
    image
   } = styles;
  return (
    <View style={containerStyle}>
    <View>
    {children}
   </View>
   <View style={headerStyle}>
   <View style={userDetails}>
   <View style={nameStyle}>
   <Content color='white' size={15}> Siddharth </Content>
   <Content color='white' size={12}> Not you? </Content>
   </View>
   <Image style={image} source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }} />
   </View>
   <Image style={image} source={{ uri: 'https://www.paypalobjects.com/webstatic/paypalme/images/social/pplogo384.png' }} />
    </View>
   </View>
  );
};


const styles = {
  headerStyle: {
    backgroundColor: '#1072B7',
    height: 60,
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
  },
  containerStyle: {
    backgroundColor: 'rgba(1,1,1,.5)',
    position: 'relative',
    flex: 1,
    flexDirection: 'column-reverse'

  },
  image: {
    height:50,
    width: 50,
    borderRadius: 25

  },
  nameStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  },
  userDetails: {
    flexDirection: 'row'
  }

};

export default Card;
