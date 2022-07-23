import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import CameraControls from './CameraControls';
import Saveimage from './Saveimage';
import Topindex from './Toptab';
import Images from './Images';
import SwipeImages from './SwipeImages';
import SaveVideos from './SaveVideos';
import Videos from '../VideoControls/Videos';
import VideoList from '../VideoControls/VideoList';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

const Stack = createStackNavigator();

export default function AudioRecoderindex() {
  return (
    // <NavigationContainer>
    <Stack.Navigator initialRouteName="CameraControls">
      <Stack.Screen
        name="CameraControls"
        component={CameraControls}
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
        name="SwipeImages"
        component={SwipeImages}
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
        name="SaveVideos"
        component={SaveVideos}
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
