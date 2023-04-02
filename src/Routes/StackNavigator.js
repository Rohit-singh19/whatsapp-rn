import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatScreen from '../Screens/ChatScreen';
import {COLORS} from '../Utils/theme';
import MainTabNavigator from './MainTabNavigator';
import HeaderLeft from '../Components/HeaderLeft';
// icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ContactListScreen from '../Screens/ContactListScreen';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.primaryGreen,
          },
          headerTintColor: COLORS.secondary,
          title: 'WhatsApp',
          headerTransparent: false,

          // for search Icon
          // headerSearchBarOptions: {
          //   onChangeText: event => console.log(event.nativeEvent.text),
          //   placeholder: 'search...',
          //   textColor: COLORS.secondary,
          //   headerIconColor: COLORS.secondary,
          //   hintTextColor: COLORS.secondary,
          //   shouldShowHintSearchIcon: false,
          // },
          // for screen animation
          animation: 'fade_from_bottom',
          headerRight: () => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Ionicons
                  size={27}
                  color={COLORS.secondary}
                  style={{
                    marginRight: 10,
                  }}
                  name="camera-outline"
                />
                <MaterialIcons
                  size={25}
                  color={COLORS.secondary}
                  style={{
                    marginRight: 10,
                  }}
                  name="search"
                />
                <MaterialIcons
                  size={25}
                  color={COLORS.secondary}
                  style={{
                    marginRight: 10,
                  }}
                  name="more-vert"
                />
              </View>
            );
          },
        }}>
        <Stack.Screen name="Home" component={MainTabNavigator} />
        <Stack.Screen
          options={({navigation, route: {params}}) => {
            const {user, lastMessage} = params;
            return {
              headerBackTitleVisible: true,
              headerTitle: () => <HeaderLeft {...user} {...lastMessage} />,
              headerRight: () => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <MaterialIcons
                      size={25}
                      color={COLORS.secondary}
                      style={{
                        marginRight: 15,
                      }}
                      name="videocam"
                    />
                    <MaterialIcons
                      size={25}
                      color={COLORS.secondary}
                      style={{
                        marginRight: 15,
                      }}
                      name="call"
                    />
                    <MaterialIcons
                      size={25}
                      color={COLORS.secondary}
                      name="more-vert"
                    />
                  </View>
                );
              },
            };
          }}
          name="Chat"
          component={ChatScreen}
        />

        <Stack.Screen
          options={({navigation, route: {params}}) => {
            return {
              headerBackTitleVisible: true,
              headerTitle: () => (
                <HeaderLeft name={'Select contact'} createdAt={new Date()} />
              ),
              headerRight: () => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <MaterialIcons
                      size={25}
                      color={COLORS.secondary}
                      style={{
                        marginRight: 15,
                      }}
                      name="videocam"
                    />
                    <MaterialIcons
                      size={25}
                      color={COLORS.secondary}
                      style={{
                        marginRight: 15,
                      }}
                      name="call"
                    />
                    <MaterialIcons
                      size={25}
                      color={COLORS.secondary}
                      name="more-vert"
                    />
                  </View>
                );
              },
            };
          }}
          name="Allcontact"
          component={ContactListScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default StackNavigator;
