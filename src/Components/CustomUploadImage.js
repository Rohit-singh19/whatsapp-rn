import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import {COLORS} from '../Utils/theme';

const CustomUploadImage = ({
  onSelect,
  //   error = '',
  buttonProps = {},
  iconProps = {},
}) => {
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCamera = useCallback(async () => {
    setIsLoading(true);
    try {
      let imageLibraryOptions = {
        mediaType: 'photo',
      };

      let result = await launchImageLibrary(imageLibraryOptions);

      if (result.didCancel) {
        setIsLoading(false);
        return;
      }

      let imageUri = result.assets[0].uri;

      setImage(imageUri);
      setIsLoading(false);
      onSelect && onSelect(result, imageUri);
    } catch (err) {
      console.log('error on Opening the camera::', err);
      setIsLoading(false);
      Alert.alert('Error', "Couldn't Open the camera. Please try Again!");
    }
  }, [onSelect]);

  return (
    <TouchableOpacity
      onPress={handleCamera}
      style={[styles.iconBtn]}
      {...buttonProps}>
      {image ? (
        <Image
          style={styles.imgContainer}
          source={{uri: image}}
          alt="profile-image"
        />
      ) : (
        <MaterialCommunityIcons
          name="camera-plus"
          size={80}
          color={'#98a7af'}
          {...iconProps}
        />
      )}

      {isLoading && (
        <ActivityIndicator
          style={styles.loading}
          size={30}
          color={COLORS.primaryGreen}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomUploadImage;

const styles = StyleSheet.create({
  iconBtn: {
    backgroundColor: '#edeff1',
    borderRadius: 120,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 180,
    height: 180,
  },
  imgContainer: {
    width: 180,
    height: 180,
  },
  loading: {
    position: 'absolute',
  },
});
