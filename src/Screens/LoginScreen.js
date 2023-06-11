import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../Utils/theme';

const LoginScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  function handleNext() {
    if (!phoneNumber)
      return Alert.alert('Phone Number', 'Please provide the Phone Number!');

    if (phoneNumber.length !== 10) {
      return Alert.alert('Incorrect', 'Incorrect Phone Number!');
    }

    Alert.alert(
      '',
      `We will be verifying the phone number: \n\n +91 ${phoneNumber}\n\nis this Ok, or would you like to edit the number?`,
      [
        {
          text: 'Edit',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: '',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => navigation.navigate('otp', {phoneNumber})},
      ],
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Enter your phone number</Text>
        <Text style={styles.subTitle}>
          WhatsApp will send an SMS message to verify your phone number.{' '}
          <Text style={styles.link}> What's my number?</Text>
        </Text>

        <View style={styles.inputContainer}>
          <TextInput value="India" style={styles.input} placeholder={'India'} />

          <View style={styles.algnRow}>
            <TextInput
              value="+91"
              style={[styles.input, {flex: 0.2}]}
              placeholder={'India'}
            />
            <TextInput
              value={phoneNumber}
              onChangeText={text => {
                setPhoneNumber(text);
              }}
              style={[styles.input, {flex: 0.8, textAlign: 'left'}]}
              placeholder={'phone number'}
              autoFocus={true}
              keyboardType={'phone-pad'}
              maxLength={10}
            />
          </View>

          <Text style={styles.info}>Carrier SMS charges may apply</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleNext} style={styles.btnContainer}>
        <Text style={styles.btnTxt}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.primaryGreen,
    marginBottom: 20,
  },
  subTitle: {
    textAlign: 'center',
    fontWeight: '600',
    color: COLORS.primary,
    fontSize: 16,
  },
  link: {
    color: COLORS.blue,
  },
  inputContainer: {
    paddingHorizontal: 40,
  },
  algnRow: {
    flexDirection: 'row',
    gap: 20,
  },
  input: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primaryGreen,
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 5,
  },
  info: {
    paddingVertical: 10,
    textAlign: 'center',
    color: COLORS.primary,
    fontSize: 15,
  },
  btnContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  btnTxt: {
    padding: 10,
    backgroundColor: COLORS.primaryGreen,
    paddingHorizontal: 20,
    color: COLORS.secondary,
    fontSize: 18,
  },
});
