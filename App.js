import {SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import {COLORS} from './src/Utils/theme';
import CallListScreen from './src/Screens/CallListScreen';
import StackNavigator from './src/Routes/StackNavigator';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StackNavigator />
      <StatusBar animated={true} backgroundColor={COLORS.primaryGreen} />
    </SafeAreaView>
  );
};

export default App;
