import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RNAnimatedTabs from 'rn-animated-tabs';
import Capture from './Capture';
import Checkout from './Checkout';
import StoreKeeper from './StoreKeeper';

export default class TabTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0
    }
  }

  handleTabChange = (value) => this.setState({ currentTab: value });

  returnPage = () => {
    switch(this.state.currentTab) {
      case 1: return <Capture />;
      case 2: return <Checkout />;
      default: return <StoreKeeper />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <RNAnimatedTabs
          tabTitles={['Store Keeper', 'User', 'Checkout']}
          onChangeTab={this.handleTabChange} />
         <View style={[styles.container, styles.center]}>
           {this.returnPage()}
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
