import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../Utils/theme';
import {bg1} from '../assets/images';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.secondary,
        justifyContent: 'space-between',
        paddingBottom: 30,
      }}>
      <Text style={styles.heading}>Welcome to WhatsApp</Text>
      <Image
        style={styles.img}
        resizeMode="contain"
        source={bg1}
        alt="banner"
      />
      <Text style={styles.tnc}>
        Read our <Text style={styles.highlight}>Privacy Policy</Text>. Tap
        "Agree and continue" to accept the
        <Text style={styles.highlight}>Terms of Services.</Text>
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('login')}
        style={styles.btnContainer}>
        <Text style={styles.btnTxt}>AGREE AND CONTINUE</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
    fontSize: 30,
    color: COLORS.primaryGreen,
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  img: {
    flex: 0.7,
  },
  tnc: {
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: 'gray',
  },
  highlight: {
    color: COLORS.blue,
    fontSize: 16,
  },
  btnContainer: {
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  btnTxt: {
    color: COLORS.secondary,
    textAlign: 'center',
  },
});
