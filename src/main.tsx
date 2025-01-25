import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// @ts-ignore
import { AppRegistry } from 'react-native-web';

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {
  rootTag: document.getElementById('root')
});