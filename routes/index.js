import React from 'react';
import { Scene } from 'expo-router';
import Home from '../views/Home';
import CreateBouquet from '../views/CreateBouquet';

const Routes = () => (
  <Scene key="root">
    <Scene key="home" component={Home} title="Home" />
    <Scene key="createBouquet" component={CreateBouquet} title="Profile" />
  </Scene>
);

export default Routes;
