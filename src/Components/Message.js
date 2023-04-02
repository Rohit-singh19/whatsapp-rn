import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../Utils/theme';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const Message = ({text, createdAt, user: {id}}) => {
  // "#DCF8C5"
  return (
    <View
      style={[
        styles.msgContainer,
        {
          backgroundColor: id === 'u2' ? COLORS.msgColor : COLORS.secondary,
          alignSelf: id === 'u2' ? 'flex-end' : 'flex-start',
        },
      ]}>
      <Text style={styles.mainTxt}>{text}</Text>
      <Text style={styles.time}>{dayjs(createdAt).fromNow(true)}</Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  msgContainer: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',

    // Shadows
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  mainTxt: {
    color: COLORS.primary,
  },
  time: {
    color: 'gray',
    alignSelf: 'flex-end',
  },
});
