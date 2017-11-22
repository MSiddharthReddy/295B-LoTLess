import React from 'react';
import { Text } from 'react-native';

const Content = ({ size, color, weight, children, lines, style }) => {
  const textStyle = [{
    fontSize: size || 27,
    fontWeight: weight,
    fontFamily: 'ChalkboardSE-Bold',
    textShadowColor: '#79CDCD',
    textShadowOffset: { width: 1, height: 1 },
    textAlign: 'center',
    textShadowRadius: 5,
    color,
  },
  style
];
  return (
    <Text style={textStyle} numberOfLines={lines}>{ children }</Text>
  );
};

export default Content;
