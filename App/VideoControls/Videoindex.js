import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Saveimage from '../CameraControls/Saveimage';
import Topindex from '../CameraControls/Toptab';
import Images from '../CameraControls/Images';
import SaveVideos from '../CameraControls/SaveVideos';
import Videos from './Videos';
import VideoList from './VideoList';
import VideoControls from './VideoControls';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import Preview from './Preview';

const Stack = createStackNavigator();

export default function Videoindex() {
  return (
    // <NavigationContainer>
    <Stack.Navigator initialRouteName="VideoControls">
      <Stack.Screen
        name="VideoControls"
        component={VideoControls}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Saveimage"
        component={Saveimage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Topindex"
        component={Topindex}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Images"
        component={Images}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Videos"
        component={Videos}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Preview"
        component={Preview}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VideoList"
        component={VideoList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VideoPlayer"
        component={VideoPlayer}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}
