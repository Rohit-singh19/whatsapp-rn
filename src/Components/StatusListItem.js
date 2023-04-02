import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../Utils/theme';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const StatusListItem = ({id, contents, user: {name}}) => {
  switch (id) {
    case 'addStatus':
      return (
        <Pressable style={styles.wrapper}>
          <View style={styles.selfImageWrapper}>
            <Image
              source={{
                uri: 'https://media.istockphoto.com/id/1365997114/photo/outdoor-portrait-of-young-african-american-backpacker.jpg?b=1&s=170667a&w=0&k=20&c=NuKhF81RGpfD-Nlr_m-QDpleNe7BhKu-mY7tniNAT3w=',
              }}
              style={styles.imgContainer}
              resizeMode="center"
            />
            <AntDesign name="pluscircle" size={20} style={styles.plusIcon} />
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.time}>Tap to add status update</Text>
          </View>
        </Pressable>
      );

    case 'encrypted':
      return (
        <Text style={styles.encryptedText}>
          <FontAwesome5 name="lock" /> Your status updates are{' '}
          <Text style={styles.greenTxt}>end-to-end encrypted</Text>
        </Text>
      );

    default:
      return (
        <Pressable style={styles.wrapper}>
          <View style={styles.imageWrapper}>
            <Image
              source={{
                uri: contents[contents?.length - 1]?.imgSrc,
              }}
              style={styles.imgContainer}
              resizeMode="center"
            />
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.time}>{name}</Text>
          </View>
        </Pressable>
      );
  }
};

export default StatusListItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  selfImageWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    padding: 2,
    position: 'relative',
  },
  plusIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    color: COLORS.tealGreen,
  },
  imageWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    borderColor: COLORS.lightGreen,
    borderWidth: 2,
    padding: 2,
  },
  imgContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    padding: 10,
  },
  name: {
    fontWeight: 'bold',
    color: COLORS.primary,
    fontSize: 18,
  },
  encryptedText: {
    marginTop: 10,
    borderTopColor: COLORS.primary,
    borderTopWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
    textAlign: 'center',
    color: 'gray',
    paddingTop: 8,
  },
  greenTxt: {
    color: COLORS.lightGreen,
  },
});
