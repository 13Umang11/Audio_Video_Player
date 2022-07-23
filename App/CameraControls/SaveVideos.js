import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ToastAndroid,
  SafeAreaView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import RNFS from 'react-native-fs';
import moment from 'moment';

export default function SaveVideos({navigation, route}) {
  const [video, setvideo] = useState(route.params.video);
  // console.log(video);
  // console.log(route);
  console.log(route.params.video);

  const onCancal = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      var path = RNFS.ExternalStorageDirectoryPath + '/' + 'CameraVideo';
      RNFS.mkdir(path).then(() => {
        console.log('created');
      });
    } else {
      var path = RNFS.DocumentDirectoryPath + '/' + 'CameraVideo';
      console.log('RNFS.LibraryDirectoryPath', RNFS.LibraryDirectoryPath);
      RNFS.mkdir(path).then(() => {
        console.log('created');
      });
    }
  }, []);

  const onSave = () => {
    if (Platform.OS === 'android') {
      console.log('Cache directory path is ', video.path);
      var file = video.path;
      const fileName = file.split('/').pop();
      var path =
        RNFS.ExternalStorageDirectoryPath + '/' + `CameraVideo/${fileName}`;
      console.log('Filename is ', fileName);

      // //COPY the file
      RNFS.copyFile(file, path)
        .then(success => {
          console.log('Video COPIED!');
          navigation.replace('VideoControls');
          ToastAndroid.show('Video Saved', ToastAndroid.SHORT);
        })
        .catch(err => {
          console.log(err.message);
        });
    } else {
      console.log('Cache directory path is ', video.path);
      var file = video.path;
      const fileName = file.split('/').pop();
      var path = RNFS.DocumentDirectoryPath + '/' + `CameraVideo/${fileName}`;
      //`/storage/emulated/0/CameraVideo/${fileName}`;
      console.log('Filename is ', fileName);

      // //COPY the file
      RNFS.copyFile(file, path)
        .then(success => {
          console.log('Video COPIED!');
          navigation.replace('VideoControls');
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <FastImage
          source={{
            uri: video.path,
            priority: 'high',
          }}
          style={{width: '100%', height: '92%'}} //
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            backgroundColor: '#0B385F',
            height: 60,
          }}>
          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={onCancal}>
            <Text
              style={{
                textAlign: 'center',
                padding: 10,
                fontSize: 20,
                color: '#fff',
              }}>
              Cancal
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{justifyContent: 'center'}} onPress={onSave}>
            <Text
              style={{
                textAlign: 'center',
                padding: 10,
                fontSize: 20,
                color: '#fff',
              }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
