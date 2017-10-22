import React from 'react';
import Content from './Content';

const Link = ({ children, onPress }) =>
<Content color='#1072B7' weight='700' onPress={onPress}> { children } </Content>;

export default Link;
