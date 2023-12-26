import {
  ActivityIndicator,
  Alert,
  FlatList,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import React, {useEffect, useCallback, useState} from 'react';
import Contacts from 'react-native-contacts';
import firestore from '@react-native-firebase/firestore';
import {COLORS} from '../Utils/theme';

const ContactListScreen = () => {
  // fetch the contact list from device .
  const [inviteContacts, setInviteContacts] = useState([]);
  const [registeredContacts, setRegisteredContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isPhoneNumberRegistered = useCallback(async phoneNumber => {
    try {
      const querySnapshot = await firestore()
        .collection('users')
        .where('phoneNumber', '==', phoneNumber)
        .get();

      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking phone number registration:', error);
      return false;
    }
  }, []);

  // get all contacts
  const getContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const allContacts = await Contacts.getAllWithoutPhotos();
      console.log('allContacts:::', allContacts);

      const formattedContacts = await Promise.all(
        allContacts.map(async contact => {
          const isOnWhatsApp = await isPhoneNumberRegistered(
            contact.phoneNumbers[0]?.number?.trim(),
          );
          return {...contact, isOnWhatsApp};
        }),
      );

      const registeredContactsArr = formattedContacts.filter(
        contact => contact.isOnWhatsApp,
      );
      const inviteContactsArr = formattedContacts.filter(
        contact => !contact.isOnWhatsApp,
      );

      setRegisteredContacts(registeredContactsArr);
      setInviteContacts(inviteContactsArr);
      setIsLoading(false);
    } catch (err) {
      console.log('error on getting the contacts:::', err);
      Alert.alert('Error', "Couldn't get contacts from your device.");
      setIsLoading(false);
    }
  }, [isPhoneNumberRegistered]);

  //check for contact permission and get Contacts
  const checkPermission = useCallback(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    })
      .then(res => {
        console.log('Permission: ', res);
        getContacts();
      })
      .catch(error => {
        console.error('Permission error: ', error);
      });
  }, [getContacts]);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  const renderRegisteredItem = useCallback(({item}) => {
    return (
      <Text key={item.recordID}>
        {item.givenName} {item.familyName}
      </Text>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {registeredContacts.length > 0 && (
        <>
          <Text style={styles.title}>Contacts on WhatsApp</Text>
          <FlatList
            data={registeredContacts}
            renderItem={renderRegisteredItem}
            keyExtractor={item => item.recordID}
          />
        </>
      )}

      {inviteContacts.length > 0 && (
        <>
          <Text style={styles.title}>Invite to WhatsApp</Text>
          <FlatList
            data={inviteContacts}
            renderItem={renderRegisteredItem}
            keyExtractor={item => item.recordID}
          />
        </>
      )}

      {isLoading && (
        <ActivityIndicator
          style={styles.loading}
          size={35}
          color={COLORS.primaryGreen}
        />
      )}
    </SafeAreaView>
  );
};

export default ContactListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  loading: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    color: COLORS.gray,
    marginBottom: 10,
  },
});
