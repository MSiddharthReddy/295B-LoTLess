// For spacing between components inside a Modal.

import React from 'react';
import { View } from 'react-native';

const CardSection = (props) =>
      <View style={styles.containerStyle}>
        { props.children }
      </View>
      ;


const styles = {
  containerStyle: {
    backgroundColor: 'rgba(1,1,1,0)',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    paddingBottom: 15
  }
};

export default CardSection;
