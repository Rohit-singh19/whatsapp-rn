import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatScreen from '../Screens/ChatScreen';
import {COLORS} from '../Utils/theme';
import MainTabNavigator from './MainTabNavigator';
import HeaderLeft from '../Components/HeaderLeft';
import ContactListScreen from '../Screens/ContactListScreen';
import LoginScreen from '../Screens/LoginScreen';
import WelcomeScreen from '../Screens/WelcomeScreen';
import OtpScreen from '../Screens/OtpScreen';
import RequestScreen from '../Screens/RequestScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import InitializingScreen from '../Screens/InitializingScreen';
import AuthenticationProvider from '../Context/Authentication/AuthenticationProvider';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  const {isLoggedIn} = useSelector(state => state.userReducer);

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        // not loggedIn
        <AuthenticationProvider>
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
        </AuthenticationProvider>
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
              placeholder: 'Search...',
              textColor: COLORS.secondary,
              headerIconColor: COLORS.secondary,
              hintTextColor: COLORS.secondary,
              shouldShowHintSearchIcon: false,
              headerBackVisible: true,
              headerTransparent: false,
              tintColor: COLORS.secondary,
              disableBackButtonOverride: true,
              borderRadius: 10,
              // headerRight: () => (
              //   <Ionicons
              //     size={27}
              //     color={COLORS.secondary}
              //     style={{
              //       marginRight: 10,
              //     }}
              //     name="camera-outline"
              //   />
              // ),
            },
            // for screen animation
            animation: 'fade_from_bottom',
          }}>
          <Stack.Screen name="Home" component={MainTabNavigator} />
          <Stack.Screen
            options={({navigation, route: {params}}) => {
              const {user, lastMessage} = params;
              return {
                headerBackTitleVisible: true,
                headerTitle: () => <HeaderLeft {...user} {...lastMessage} />,
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
