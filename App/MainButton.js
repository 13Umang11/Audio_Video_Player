import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  SafeAreaView,
} from 'react-native';
import {Camera} from 'react-native-vision-camera';

export default function MainButtonindex({navigation}) {
  useEffect(() => {
    const granted = PermissionsAndroid.requestMultiple([
      'android.permission.BODY_SENSORS',
      'android.permission.CAMERA',
      'android.permission.READ_EXTERNAL_STORAGE',
      'android.permission.WRITE_EXTERNAL_STORAGE',
      'android.permission.RECORD_AUDIO',
      'android.permission.FLASHLIGHT',
      'android.permission.WRITE_EXTERNAL_STORAGE',
    ]);
    const cameraPermission = Camera.getCameraPermissionStatus()
      .then
      // data =>  console.log('cameraPermission', data),
      ();
    const microphonePermission = Camera.getMicrophonePermissionStatus()
      .then
      // data => console.log(data),
      ();
  }, []);
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('AudioPlayerindex')}>
          <Text style={styles.btntext}>Audio Player</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('AudioRecoderindex')}>
          <Text style={styles.btntext}>Audio Recoder</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Cameraindex')}>
          <Text style={styles.btntext}>Camera Controls</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Videoindex')}>
          <Text style={styles.btntext}>Video Controls</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#007ACC',
    width: '95%',
    margin: 10,
    borderRadius: 10,
  },
  btntext: {
    textAlign: 'center',
    padding: 15,
    color: 'white',
  },
});
