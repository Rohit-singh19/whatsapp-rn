import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Badge from '../Components/Badge';
import CallListScreen from '../Screens/CallListScreen';
import ChatListScreen from '../Screens/ChatListScreen';
import StatusListScreen from '../Screens/StatusListScreen';
import {COLORS} from '../Utils/theme';

const Tab = createMaterialTopTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.secondary,
        tabBarLabelStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {backgroundColor: COLORS.primaryGreen},
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.secondary,
        },
        // tabBarBadge: Badge,
        tabBarShowIcon: true,
        tabBarIconStyle: {
          backgroundColor: COLORS.secondary,
          alignItems: 'center',
          borderRadius: 20,
          justifyContent: 'center',
        },
        tabBarItemStyle: {flexDirection: 'row-reverse'},
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: () => <Badge counter={1} />,
        }}
        name="Chats"
        component={ChatListScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => <Badge counter={1} />,
        }}
        name="Status"
        component={StatusListScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => <Badge counter={4} />,
        }}
        name="Calls"
        component={CallListScreen}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
