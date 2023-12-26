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
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../Utils/theme';

import Ionicons from 'react-native-vector-icons/Ionicons';
import EmojiPicker from 'rn-emoji-keyboard';
import CustomUploadImage from '../Components/CustomUploadImage';
import {AuthenticationContext} from '../Context/Authentication/AuthenticationProvider';

const ProfileScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [isEmojiOpen, setEmojiOpen] = useState(false);
  const [imageURI, setImageURI] = useState('');

  const [uploadingProgress, setUploadingProgress] = useState(0);

  const {setUserDetails} = useContext(AuthenticationContext);

  const emojiInputRef = useRef(null);

  const focusEmojiInput = () => {
    if (emojiInputRef.current) {
      emojiInputRef.current.focus();
    }
  };

  const handleEmojiButtonPress = useCallback(() => {
    Keyboard.dismiss(); // Dismiss the keyboard if it's open
    setEmojiOpen(true);
    focusEmojiInput(); // Focus the emoji input to show the emoji keyboard
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // on Submitting the form
  const handleNext = useCallback(async () => {
    try {
      if (!name) {
        return Alert.alert('', 'Please provide the name!');
      }

      let currentUser = auth().currentUser;

      setIsLoading(true);
      const storageRef = storage().ref(`profile_images/${currentUser.uid}.jpg`);

      // Convert local file to Blob using fetch
      const response = await fetch(imageURI);
      const blob = await response.blob();

      // Set up an event listener to track the upload progress
      const uploadTask = storageRef.put(blob);
      uploadTask.on(
        'state_changed',
        snapshot => {
          // Handle progress here
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log(`Upload is ${progress}% done`);
          setUploadingProgress(Math.floor(progress));
        },
        error => {
          console.error('Error during upload:', error);
          Alert.alert('Error', 'Failed to upload image. Please try again.');
        },
        async () => {
          // Upload completed successfully, get the download URL
          const downloadURL = await storageRef.getDownloadURL();

          const {uid} = currentUser;

          // Update local user details
          setUserDetails(prev => ({
            ...prev,
            displayName: name,
            photoURL: downloadURL,
            uid,
          }));

          navigation.navigate('initialize');
        },
      );
    } catch (err) {
      console.log('error on the submitting the detail form:::', err);
      setIsLoading(false);
    }
  }, [name, imageURI, navigation, setUserDetails]);

  const onSelect = useCallback((select, url) => {
    setImageURI(url);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Profile info</Text>
        <Text style={styles.label}>
          Please provide your name and an optional profile photo
        </Text>

        <View style={styles.cameraContainer}>
          <CustomUploadImage onSelect={onSelect} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            ref={emojiInputRef}
            style={styles.input}
            // keyboardType="emoji"
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

      <EmojiPicker
        open={isEmojiOpen}
        onClose={() => setEmojiOpen(false)}
        onEmojiSelected={({emoji}) => {
          setName(prev => prev + emoji);
        }}
        enableSearchBar
      />

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={40} color={COLORS.primaryGreen} />

          <Text style={styles.loadingTxt}>{uploadingProgress}%</Text>
        </View>
      )}
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
    backgroundColor: 'rgba(0,0,0,0.1)',
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
  loadingTxt: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryGreen,
  },
});
