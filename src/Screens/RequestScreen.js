import {
  View,
  Modal,
  Text,
  PermissionsAndroid,
  Platform,
  Permissions,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Alert,
  Linking,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {COLORS} from '../Utils/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RequestScreen = ({navigation}) => {
  // modal permission
  const [modalVisible, setModalVisible] = useState(true);

  const handleNotNow = () => {
    setModalVisible(false);
    // Perform action when "Not Now" is clicked
    navigation.navigate('profile');
  };

  const handleContinue = async () => {
    if (Platform.OS === 'android') {
      // Handle permission request for Android
      try {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ];

        const granted = await PermissionsAndroid.requestMultiple(permissions);

        if (
          granted[PermissionsAndroid.PERMISSIONS.READ_CONTACTS] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          setModalVisible(false);
          // Perform action when permissions are granted
          navigation.navigate('profile');
        } else {
          // Handle case when permissions are not granted
          console.log('error');
        }
      } catch (err) {
        // Handle permission request error
      }
    } else if (Platform.OS === 'ios') {
      // Handle permission request for iOS
      try {
        const response = await Permissions.requestMultiple([
          'contacts',
          'photo',
        ]);

        if (response.contacts === 'granted' && response.photo === 'granted') {
          setModalVisible(false);
          // Perform action when permissions are granted
        } else {
          // Handle case when permissions are not granted
          Alert.alert(
            'Permissions Not Granted',
            "To find and restore your backup from Google Drive, you need to allow WhatsApp access to your contacts and your device's photos, media, and files.",
            [
              {
                text: 'Open Settings',
                onPress: () => openAppSettings(),
              },
              {
                text: 'Cancel',
                style: 'cancel',
              },
            ],
          );
        }
      } catch (err) {
        // Handle permission request error
        Alert.alert(
          'Permission Request Error',
          'An error occurred while requesting permissions. Please try again.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('profile'),
            },
          ],
        );
      }
    }
  };

  function openAppSettings() {
    Linking.openSettings();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.backDrop}>
          <View style={styles.modalView}>
            <View style={styles.topContainer}>
              <MaterialCommunityIcons
                name="contacts"
                size={100}
                color={'white'}
              />
              <MaterialCommunityIcons name="plus" size={20} color={'white'} />
              <MaterialCommunityIcons name="folder" size={80} color={'white'} />
            </View>

            <View style={styles.middleContainer}>
              <Text style={styles.txtStyle}>
                To find and restore your backup from Google Drive, allow
                WhatsApp access to your contacts and your device's photos,
                media, and files.
              </Text>
              <View style={styles.actionCont}>
                <Pressable onPress={handleNotNow}>
                  <Text style={styles.btnTxt}>Not Now</Text>
                </Pressable>
                <Pressable onPress={handleContinue}>
                  <Text style={styles.btnTxt}>Continue</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default RequestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
    maxWidth: '80%',
  },
  topContainer: {
    backgroundColor: COLORS.tealGreen,
    padding: 20,
    paddingVertical: 50,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  middleContainer: {
    padding: 20,
  },
  txtStyle: {
    color: COLORS.jetBlack,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 25,
  },
  btnTxt: {
    color: COLORS.primaryGreen,
    fontSize: 16,
  },
  backDrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  actionCont: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    gap: 20,
  },
});
