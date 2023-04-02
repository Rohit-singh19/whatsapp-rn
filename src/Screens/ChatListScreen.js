import {StyleSheet, FlatList, View, Text} from 'react-native';
import React from 'react';
import chatList from '../modals/chatList';
import ChatListItem from '../Components/ChatListItem';
import {COLORS} from '../Utils/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const ChatListScreen = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        backgroundColor: COLORS.secondary,
      }}>
      <FlatList
        data={[
          ...chatList,
          {
            id: 'encrypted',
            user: {
              id: 'u2',
              name: 'Lukas',
              image:
                'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/lukas.jpeg',
              status: 'Hey there!',
            },
            lastMessage: {
              id: 'm1',
              text: 'Well done this sprint, guys!',
              createdAt: '2022-10-14T13:30:00.000Z',
            },
          },
        ]}
        renderItem={({item}) => <ChatListItem {...item} />}
        contentInsetAdjustmentBehavior="automatic"
      />
      <View style={styles.myFabWrapper}>
        <MaterialIcons
          onPress={() => navigation.navigate('Allcontact')}
          size={30}
          style={styles.chat}
          name="chat"
        />
      </View>
    </View>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  myFabWrapper: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    alignItems: 'flex-end',
  },
  chat: {
    marginTop: 5,
    padding: 15,
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 40,
    color: COLORS.secondary,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
