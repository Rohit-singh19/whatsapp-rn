import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useCallback} from 'react';
import {COLORS} from '../Utils/theme';
import {useNavigation} from '@react-navigation/native';

// icon
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// relative time
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const ChatListItem = ({id, user, lastMessage}) => {
  const {name, image, status} = user;
  const {text, createdAt} = lastMessage;

  const navigation = useNavigation();

  const handleNavigate = useCallback(() => {
    navigation.navigate('Chat', {user, lastMessage});
  }, [name]);

  switch (id) {
    case 'encrypted':
      return (
        <Text style={styles.encryptedText}>
          <FontAwesome5 name="lock" /> Your personal messages are{' '}
          <Text style={styles.greenTxt}>end-to-end encrypted</Text>
        </Text>
      );

    default:
      const isUnReaded = null;
      const isReaded = false;

      return (
        <Pressable onPress={handleNavigate} style={[styles.container]}>
          <Image
            source={{
              uri: image,
            }}
            style={styles.imgContainer}
          />
          <View style={styles.content}>
            <View style={styles.row}>
              <Text numberOfLines={1} style={[styles.name]}>
                {name}
              </Text>
              <Text
                style={[
                  styles.normal,
                  {color: isUnReaded ? COLORS.lightGreen : 'gray'},
                ]}>
                {dayjs(createdAt).fromNow(true)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text
                numberOfLines={1}
                style={[styles.normal, {verticalAlign: 'middle'}]}>
                <Ionicons
                  name={
                    isReaded ? 'ios-checkmark-done-outline' : 'ios-checkmark'
                  }
                  color={isReaded ? COLORS.blue : 'lightgray'}
                  size={20}
                />
                {text}
              </Text>
              {isUnReaded && (
                <Text style={styles.counter}>
                  {isUnReaded > 999 ? '999+' : isUnReaded}
                </Text>
              )}
            </View>
          </View>
        </Pressable>
      );
  }
};

export default ChatListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  imgContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  content: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'lightgray',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  name: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 18,
  },
  normal: {
    color: 'gray',
    fontWeight: 'normal',
  },
  counter: {
    color: COLORS.secondary,
    backgroundColor: COLORS.lightGreen,
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 30,
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
