import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AudioLoad from './AudioLoad';
import AudioPlay from './AudioPlay';

const Stack = createStackNavigator();

export default function AudioPlayerindex() {
  return (
    // <NavigationContainer>
    <Stack.Navigator initialRouteName="AudioLoad">
      <Stack.Screen
        name="AudioLoad"
        component={AudioLoad}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="AudioPlay"
        component={AudioPlay}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}
