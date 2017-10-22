import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { Capture } from './components';


const RouterComponent = () =>
    <Router>
    <Scene key="root">
    <Scene key="capture" component={Capture} hideNavBar initial/>
    </Scene>
    </Router>
;

export default RouterComponent;
