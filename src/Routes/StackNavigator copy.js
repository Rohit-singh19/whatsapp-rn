import React from 'react';
import {View} from 'react-native';
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
import LoginScreen from '../Screens/LoginScreen';
import WelcomeScreen from '../Screens/WelcomeScreen';
import OtpScreen from '../Screens/OtpScreen';
import RequestScreen from '../Screens/RequestScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import InitializingScreen from '../Screens/InitializingScreen';
import HeaderSearch from '../Components/HeaderSearch';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  let isLoggedIn = true;

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        // not loggedIn
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}>
          <Stack.Screen name="welcome" component={WelcomeScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="otp" component={OtpScreen} />
          <Stack.Screen name="requestScreen" component={RequestScreen} />
          <Stack.Screen name="profile" component={ProfileScreen} />
          <Stack.Screen name="initialize" component={InitializingScreen} />
        </Stack.Navigator>
      ) : (
        // on LogIn
        <Stack.Navigator
          screenOptions={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: COLORS.primaryGreen,
            },
            headerTintColor: COLORS.secondary,
            title: 'WhatsApp',
            headerTransparent: false,

            // // for search Icon
            headerSearchBarOptions: {
              onChangeText: event => console.log(event.nativeEvent.text),
              placeholder: 'search...',
              textColor: COLORS.secondary,
              headerIconColor: COLORS.secondary,
              hintTextColor: COLORS.secondary,
              shouldShowHintSearchIcon: false,
            },
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
                  <HeaderSearch />
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
      )}
    </NavigationContainer>
  );
}
export default StackNavigator;