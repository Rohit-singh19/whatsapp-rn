import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {COLORS} from '../Utils/theme';

// relative time
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const HeaderLeft = ({name, image, createdAt}) => {
  return (
    <View style={styles.container}>
      {image && (
        <Image
          source={{
            uri: image,
          }}
          resizeMode="contain"
          style={styles.img}
        />
      )}
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.name}>
          {name}
        </Text>
        <Text numberOfLines={1} style={styles.status}>
          {dayjs(createdAt).fromNow(true)}
        </Text>
      </View>
    </View>
  );
};

export default HeaderLeft;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -20,
    flex: 1,
    // backgroundColor: 'orange',
  },
  img: {
    width: 35,
    height: 35,
    marginRight: 15,
    borderRadius: 20,
  },
  content: {
    justifyContent: 'center',
  },
  name: {
    color: COLORS.secondary,
    fontWeight: '600',
    fontSize: 18,
  },
  status: {
    color: COLORS.secondary,
  },
});
