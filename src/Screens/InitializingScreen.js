import React, {useContext, useEffect} from 'react';
import {StyleSheet, Text, Image, SafeAreaView, Alert} from 'react-native';
import {COLORS} from '../Utils/theme';
import {bg1} from '../assets/images';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {AuthenticationContext} from '../Context/Authentication/AuthenticationProvider';
import {useDispatch} from 'react-redux';
import {successUser} from '../redux/features/userSlice';

const InitializingScreen = () => {
  const navigation = useNavigation();

  const {userDetails} = useContext(AuthenticationContext);
  const dispatch = useDispatch();

  // set the userDetails to the firestore
  useEffect(() => {
    try {
      let {displayName, photoURL, uid} = userDetails;
      // Update the user's profile in Firestore with the download URL and name

      async function updateUserDetails() {
        // Check if the user document already exists
        const userDocRef = firestore().collection('users').doc(uid);
        const userDoc = await userDocRef.get();

        if (userDoc.exists) {
          await firestore()
            .collection('users')
            .doc(uid)
            .update({
              displayName,
              photoURL,
              ...userDetails,
            });
        } else {
          // If the document does not exist, create a new document
          await userDocRef.set({
            displayName,
            photoURL,
            ...userDetails,
          });
        }
      }

      updateUserDetails();

      dispatch(
        successUser({
          ...userDetails,
        }),
      );
    } catch (err) {
      console.log('Error on creating the User with the details:::', err);
      Alert.alert(
        'Error',
        "Couldn't create the user for you. Please try Again!!",
      );
      navigation.goBack();
    }
  }, [navigation, userDetails, dispatch]);

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
