/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App';
import {name as appName} from './app.json';
// import AuthenticationProvider from './src/Context/Authentication/AuthenticationProvider';
import {persistor, store} from './src/redux/store';

AppRegistry.registerComponent(appName, () => Main);

const Main = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <AuthenticationProvider> */}
      <App />
      {/* </AuthenticationProvider> */}
    </PersistGate>
  </Provider>
);
