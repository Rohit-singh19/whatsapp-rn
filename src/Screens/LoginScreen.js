import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useCallback, useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../Utils/theme';
import auth from '@react-native-firebase/auth';
import {AuthenticationContext} from '../Context/Authentication/AuthenticationProvider';

const LoginScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const {setConfirmation} = useContext(AuthenticationContext);

  const onAuthStateChanged = useCallback(user => {
    if (user) {
      // console.log(user);
    }
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);

  const handleNext = useCallback(() => {
    if (!phoneNumber) {
      return Alert.alert('Phone Number', 'Please provide the Phone Number!');
    }

    if (phoneNumber.length !== 10) {
      return Alert.alert('Incorrect', 'Incorrect Phone Number!');
    }

    // signIn with Phone Number
    async function handleVerify() {
      try {
        const confirmation = await auth().signInWithPhoneNumber(
          `+91 ${phoneNumber}`,
        );
        // console.log('confirmation:::', confirmation);
        setConfirmation(confirmation);
        navigation.navigate('otp', {phoneNumber});
      } catch (err) {
        console.log('err on verifying:::', err);
        Alert.alert('Error', "It's not you, It's Us!");
      }
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
        {text: 'OK', onPress: () => handleVerify()},
      ],
    );
  }, [navigation, phoneNumber, setConfirmation]); // setConfirmation

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
              style={[styles.input, styles.countryInput]}
              placeholder={'India'}
            />
            <TextInput
              value={phoneNumber}
              onChangeText={text => {
                setPhoneNumber(text);
              }}
              style={[styles.input, styles.phoneInput]}
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
  countryInput: {
    flex: 0.2,
  },
  phoneInput: {flex: 0.8, textAlign: 'left'},
});
