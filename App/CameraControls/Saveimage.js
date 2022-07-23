import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ToastAndroid,
  Platform,
  SafeAreaView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import RNFS from 'react-native-fs';
import moment from 'moment';

export default function Saveimage({navigation, route}) {
  const [image, setimage] = useState(route.params.photo);
  // console.log(image);
  // console.log(route);

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
      console.log('Cache directory path is ', image);
      const fileName = image.split('/').pop();

      var path = RNFS.ExternalStorageDirectoryPath + `/CameraVideo/${fileName}`;

      RNFS.copyFile(image, path)
        .then(success => {
          console.log('IMG COPIED!');
          console.log(path);
          navigation.replace('CameraControls');
          ToastAndroid.show('Image Saved', ToastAndroid.SHORT);
        })
        .catch(err => {
          console.log(err.message);
        });
    } else {
      const fileName = image.split('/').pop();
      console.log('Cache directory path is ', image);
      var path = RNFS.DocumentDirectoryPath + `/CameraVideo/${fileName}`;
      RNFS.copyFile(image, path)
        .then(success => {
          console.log('IMG COPIED!');
          console.log(path);
          navigation.replace('CameraControls');
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
            uri: `file://${image}`,
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
