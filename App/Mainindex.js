import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AudioPlayerindex from './AudioPlayer/AudioPlayer/AudioPlayerindex';
import AudioRecoderindex from './AudioPlayer/AudioRecorder/AudioRecoderindex';
import MainButton from './MainButton';
import Cameraindex from './CameraControls/Cameraindex';
import Videoindex from './VideoControls/Videoindex';

export default function Mainindex() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainButton"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainButton" component={MainButton} />
        <Stack.Screen name="AudioPlayerindex" component={AudioPlayerindex} />
        <Stack.Screen name="AudioRecoderindex" component={AudioRecoderindex} />
        <Stack.Screen name="Cameraindex" component={Cameraindex} />
        <Stack.Screen name="Videoindex" component={Videoindex} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
