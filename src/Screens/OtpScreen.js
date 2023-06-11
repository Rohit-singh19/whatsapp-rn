import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../Utils/theme';
import {
  getHash,
  removeListener,
  startOtpListener,
} from 'react-native-otp-verify';

const OtpScreen = ({
  route: {
    params: {phoneNumber},
  },
  navigation,
}) => {
  const [otp, setOtp] = useState('');
  const [remainingTime, setRemainingTime] = useState(120);
  // for verifying loading

  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getHash()
      .then(hash => {
        // use this hash in the message.
      })
      .catch(console.log);

    startOtpListener(message => {
      // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
      if (!message) return;
      const otpArr = /(\d{4})/g.exec(message);

      if (!otpArr) return;
      const otp = otpArr[1];
      setOtp(otp);
    });
    return () => removeListener();
  }, []);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  };

  const handleChangeText = text => {
    // Custom masking logic
    setOtp(text);
  };

  const handleResend = () => {};

  // on submiting the otp from keyboard or autofill
  async function handleVerifyOtp() {
    if (otp.length !== 6) {
      return Alert.alert('Invalid OTP', 'Please enter a 6-digit OTP.');
    }

    setIsVerifying(true);

    setTimeout(() => {
      // navigate to the access screen
      navigation.navigate('requestScreen');
      setIsVerifying(false);
    }, 1000);
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* TOP */}
      <View style={styles.top}>
        <View style={styles.topLeft}>
          <Text style={styles.title}>Verify +91 {phoneNumber}</Text>
        </View>
        <TouchableOpacity onPress={() => console.log('clicked')}>
          <Icon name="more-vertical" size={25} color="gray" />
        </TouchableOpacity>
      </View>

      <Text style={styles.parentTextStyle}>
        Waiting to automatically detect an SMS sent to {'\n'}
        <Text style={styles.bold}>+91 {phoneNumber}</Text>.{' '}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              color: COLORS.blue,
            }}>
            Wrong number?
          </Text>
        </TouchableOpacity>
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          autoFocus={true}
          style={styles.input}
          placeholder="--- ---"
          value={otp}
          onChangeText={handleChangeText}
          keyboardType="numeric"
          maxLength={6}
          onSubmitEditing={handleVerifyOtp}
        />
        <Text style={styles.digitalCode}>Enter 6-digit code</Text>
      </View>

      <TouchableOpacity
        onPress={() => handleResend()}
        style={styles.lowerContainer}>
        <View style={[styles.lowerLeft]}>
          <MaterialIcons
            name="message-processing"
            size={25}
            color={COLORS.gray}
          />
          <Text style={styles.resendTxt}>Resend SMS</Text>
        </View>
        <View style={[styles.lowerRight]}>
          <Text>{formatTime(remainingTime)}</Text>
        </View>
      </TouchableOpacity>

      {isVerifying && (
        <Modal visible={isVerifying} animationType="slide" transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View style={styles.mainModal}>
              <ActivityIndicator size={'large'} color={COLORS.primaryGreen} />
              <Text style={styles.verifyingTxt}>Verifying...</Text>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  top: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topLeft: {
    flex: 0.97,
  },
  title: {
    fontSize: 18,
    color: COLORS.primaryGreen,
    fontWeight: '700',
    textAlign: 'center',
  },
  parentTextStyle: {
    fontSize: 16,
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    color: 'black',
  },
  bold: {
    fontWeight: '700',
  },
  inputContainer: {
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryGreen,
    width: '50%',
    maxWidth: 150,
    textAlign: 'center',
  },
  digitalCode: {
    color: COLORS.jetBlack,
    marginTop: 10,
    fontSize: 16,
  },
  lowerContainer: {
    padding: 15,
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  lowerLeft: {
    flexDirection: 'row',
  },
  resendTxt: {
    marginLeft: 20,
    color: COLORS.gray,
  },
  mainModal: {
    backgroundColor: 'white',
    // paddingHorizontal: 50,
    // paddingVertical: 20,
    padding: 20,
    width: '80%',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    borderRadius: 2,
  },
  verifyingTxt: {
    fontSize: 18,
    color: COLORS.jetBlack,
  },
});
