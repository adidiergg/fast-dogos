import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Login';


const Tab = createBottomTabNavigator();

export default function TabMenu() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Login} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}