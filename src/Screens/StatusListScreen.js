import {SectionList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {status} from '../modals/status';
import StatusListItem from '../Components/StatusListItem';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {COLORS} from '../Utils/theme';

const StatusListScreen = () => {
  return (
    <View style={{flex: 1, position: 'relative'}}>
      <SectionList
        sections={[
          ...status,
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
        keyExtractor={item => item?.id}
        renderItem={({item}) => <StatusListItem {...item} />}
        renderSectionHeader={({section}) =>
          section?.title && (
            <Text style={styles.headerTxt}>{section?.title}</Text>
          )
        }
        style={styles.container}
      />

      <View style={styles.myFabWrapper}>
        <FontAwesome5 size={20} style={styles.pen} name="pen" />
        <FontAwesome5 size={30} style={styles.camera} name="camera" />
      </View>
    </View>
  );
};

export default StatusListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  headerTxt: {
    marginVertical: 10,
    fontWeight: 'bold',
    color: 'gray',
    paddingLeft: 10,
  },
  myFabWrapper: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    alignItems: 'flex-end',
  },
  pen: {
    marginBottom: 5,
    padding: 15,
    backgroundColor: 'lightgray',
    borderRadius: 40,
    color: 'gray',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  camera: {
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
