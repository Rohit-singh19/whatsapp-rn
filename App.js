import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from './src/Utils/theme';
import StackNavigator from './src/Routes/StackNavigator';

const App = () => {
  return (
    <SafeAreaView style={style.container}>
      <StackNavigator />
      <StatusBar animated={true} backgroundColor={COLORS.primaryGreen} />
    </SafeAreaView>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
