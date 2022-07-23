import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AudioLoad from './AudioLoad';
import AudioRecord from './AudioRecord';

const Stack = createStackNavigator();

export default function AudioRecoderindex() {
  return (
    // <NavigationContainer>
    <Stack.Navigator initialRouteName="AudioLoad">
      <Stack.Screen
        name="AudioLoad"
        component={AudioLoad}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AudioRecord"
        component={AudioRecord}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}
