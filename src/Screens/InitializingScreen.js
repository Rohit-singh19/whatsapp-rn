import {StyleSheet, Text, Image, SafeAreaView} from 'react-native';
import React from 'react';
import {COLORS} from '../Utils/theme';
import {bg1} from '../assets/images';

const InitializingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Initializing...</Text>

      <Image
        style={styles.img}
        resizeMode="contain"
        source={bg1}
        alt="banner"
      />
    </SafeAreaView>
  );
};

export default InitializingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    color: COLORS.tealGreen,
    fontSize: 18,
    textAlign: 'center',
  },
  img: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
