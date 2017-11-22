import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { Main } from './components';


const RouterComponent = () =>
    <Router>
    <Scene key="root">
    <Scene key="capture" component={Main} hideNavBar initial/>
    </Scene>
    </Router>
;

export default RouterComponent;
