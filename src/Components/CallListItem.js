import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import {COLORS} from '../Utils/theme';

// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// relative time
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const CallListItem = ({
  id,
  isReceived,
  createdAt,
  callType,
  user: {name, imgSrc},
}) => {
  const isUnReaded = false;

  switch (id) {
    case 'createCall':
      return (
        <Pressable style={[styles.container]}>
          <AntDesign style={styles.linkContainer} size={20} name="link" />
          <View style={styles.content}>
            <View
              style={[
                styles.row,
                {
                  alignItems: 'flex-start',
                },
              ]}>
              <Text numberOfLines={1} style={[styles.name]}>
                Create call link
              </Text>
              <Text
                style={[
                  styles.normal,
                  {color: isUnReaded ? COLORS.lightGreen : 'gray'},
                ]}>
                Share a link for your WhatsApp call
              </Text>
            </View>
          </View>
        </Pressable>
      );

    case 'encrypted':
      return (
        <Text style={styles.encryptedText}>
          <FontAwesome5 name="lock" /> Your personal calls are{' '}
          <Text style={styles.greenTxt}>end-to-end encrypted</Text>
        </Text>
      );

    default:
      return (
        <Pressable style={[styles.container]}>
          <Image
            source={{
              uri: imgSrc,
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
                <MaterialIcons
                  color={COLORS.lightGreen}
                  name={isReceived ? 'call-received' : 'call-made'}
                />{' '}
                {dayjs(createdAt).fromNow(true)}
              </Text>
            </View>
            <MaterialIcons
              size={25}
              style={styles.callIcon}
              name={callType === 'voice' ? 'call' : 'videocam'}
            />
          </View>
        </Pressable>
      );
  }
};

export default CallListItem;

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
  linkContainer: {
    borderRadius: 60,
    marginRight: 15,
    padding: 20,
    backgroundColor: COLORS.primaryGreen,
    color: COLORS.secondary,
  },
  content: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'lightgray',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
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
  callIcon: {
    padding: 5,
    color: COLORS.primaryGreen,
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
