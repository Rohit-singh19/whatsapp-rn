import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../Utils/theme';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');

  const emojiInputRef = useRef(null);

  const focusEmojiInput = () => {
    if (emojiInputRef.current) {
      emojiInputRef.current.focus();
    }
  };

  const handleEmojiButtonPress = () => {
    Keyboard.dismiss(); // Dismiss the keyboard if it's open
    focusEmojiInput(); // Focus the emoji input to show the emoji keyboard
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleNext = () => {
    if (!name) return Alert.alert('', 'Please provide the name!');
    navigation.navigate('initialize');
  };
  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.primaryGreen} />
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Profile info</Text>
        <Text style={styles.label}>
          Please provide your name and an optional profile photo
        </Text>

        <View style={styles.cameraContainer}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialCommunityIcons
              name="camera-plus"
              size={80}
              color={'#98a7af'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            ref={emojiInputRef}
            style={styles.input}
            keyboardType="emoji"
            placeholder="Type your name here"
            placeholderTextColor={COLORS.gray}
            fontSize={18}
            onSubmitEditing={handleNext}
            value={name}
            onChangeText={text => setName(text)}
          />
          <TouchableOpacity onPress={handleEmojiButtonPress}>
            <Ionicons name="ios-happy-outline" size={25} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => handleNext()}
        style={styles.btnContainer}>
        <Text style={styles.btnTxt}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingVertical: 10,
    position: 'relative',
    justifyContent: 'space-between',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    color: COLORS.primaryGreen,
    fontWeight: '700',
    fontSize: 18,
  },
  label: {
    textAlign: 'center',
    color: COLORS.gray,
    marginVertical: 20,
    fontSize: 16,
  },
  cameraContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  iconBtn: {
    padding: 50,
    backgroundColor: '#edeff1',
    borderRadius: 120,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  input: {
    flex: 0.95,
    borderBottomColor: COLORS.primaryGreen,
    borderBottomWidth: 2,
  },
  btnContainer: {
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  btnTxt: {
    padding: 10,
    backgroundColor: COLORS.primaryGreen,
    paddingHorizontal: 20,
    color: COLORS.secondary,
    fontSize: 18,
  },
});
