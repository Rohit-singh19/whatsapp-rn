import {SectionList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CallListItem from '../Components/CallListItem';
import {calls} from '../modals/call';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../Utils/theme';

const CallListScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: COLORS.secondary,
      }}>
      <SectionList
        sections={[
          {
            title: '',
            data: [
              {
                id: 'createCall',
                isReceived: true,
                createdAt: '2022-10-10T12:48:00.000Z',
                callType: 'video',
                user: {
                  id: 'u1',
                  imgSrc:
                    'https://images.unsplash.com/photo-1514489024785-d5ba8dfb2198?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80',
                  name: 'Manjeet',
                },
              },
            ],
          },
          ...calls,
          {
            title: '',
            data: [
              {
                id: 'encrypted',
                contents: [],
                createdAt: '2022-10-10T12:48:00.000Z',
                user: {
                  id: 'me',
                  name: 'My Status',
                },
              },
            ],
          },
        ]}
        renderItem={({item}) => <CallListItem {...item} />}
        renderSectionHeader={({section}) =>
          section?.title && <Text style={styles.header}>{section?.title}</Text>
        }
        keyExtractor={item => item?.id}
      />

      <View style={styles.myFabWrapper}>
        <MaterialIcons size={30} style={styles.callIcon} name="add-call" />
      </View>
    </View>
  );
};

export default CallListScreen;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: 'gray',
  },
  myFabWrapper: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    alignItems: 'flex-end',
  },
  callIcon: {
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
