import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RNAnimatedTabs from 'rn-animated-tabs';
import Capture from './Capture';

export default class TabTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0
    }
  }

  handleTabChange = (value) => this.setState({ currentTab: value });

  render() {
    return (
      <View style={styles.container}>
        <RNAnimatedTabs
          tabTitles={['Store Keeper', 'User', 'Checkout']}
          onChangeTab={this.handleTabChange} />
         <View style={[styles.container, styles.center]}>
          
         </View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
