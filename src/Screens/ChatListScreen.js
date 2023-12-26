import {StyleSheet, FlatList, View, Text, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';
import chatList from '../modals/chatList';
import ChatListItem from '../Components/ChatListItem';
import {COLORS} from '../Utils/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const ChatListScreen = () => {
  const navigation = useNavigation();

  const handleInvite = useCallback(() => {
    console.log('handleInvite clicked');
  }, []);

  // Empty list Component
  const ListEmptyComponent = useCallback(() => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.title}>Invite your friends</Text>
        <Text style={styles.desc}>
          None of your contacts are using WhatsApp. Use the button below to
          invite them.
        </Text>
        <TouchableOpacity onPress={handleInvite} style={styles.inviteBtnCont}>
          <Text style={styles.inviteBtnTxt}>INVITE A FRIEND</Text>
        </TouchableOpacity>
        <Text style={styles.desc1}>
          Chat with your friends who use WhatsApp on iPhone, Android or KaiOS
          Phone.
        </Text>
      </View>
    );
  }, [handleInvite]);

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
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
        ListEmptyComponent={ListEmptyComponent}
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
  emptyContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'normal',
    color: COLORS.primary,
  },
  desc: {
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'normal',
    color: COLORS.jetBlack,
    marginBottom: 20,
    // letterSpacing: 1,
    lineHeight: 24,
  },
  inviteBtnCont: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 2,
  },
  inviteBtnTxt: {
    textAlign: 'center',
    color: COLORS.secondary,
    fontWeight: 600,
  },
  desc1: {
    textAlign: 'center',
    marginTop: 20,
    color: COLORS.gray,
  },
});
