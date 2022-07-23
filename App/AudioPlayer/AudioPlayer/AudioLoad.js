import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
  Dimensions,
  StyleSheet,
  StatusBar,
  FlatList,
} from 'react-native';
import {music} from '../../assets';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import {useIsFocused} from '@react-navigation/native';

const {height, width} = Dimensions.get('screen');

const audioRecorderPlayer = new AudioRecorderPlayer();

// RNFS.ExternalDirectoryPath + '/test.mp4';

export default function AudioLoad({navigation}) {
  const [Data, setData] = useState([]);
  const isFocused = useIsFocused();

  const path = `/storage/emulated/0/Music`;

  useEffect(() => {
    Permission();
    RNFS.readDir(path)
      .then(result => {
        console.log('GOT RESULT', result);
        setData(result);
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
      .catch(err => {
        console.log(err.message, err.code);
      });
  }, [isFocused]);
  // useEffect(() => {
  //   var path = RNFS.ExternalStorageDirectoryPath + '/' + 'AudioProject';
  //   RNFS.mkdir(path).then(() => {
  //     console.log('created');
  //   });
  // }, []);

  const Permission = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  };

  const RenderItem = ({item, index}) => {
    return (
      <View
        key={index}
        style={{
          height: 70,
          width: Dimensions.get('screen').width - 20,
          backgroundColor: '#fff',
          marginBottom: 10,
          marginHorizontal: 10,
          borderRadius: 10,
          justifyContent: 'center',
          elevation: 5,
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          onPress={() => onPressRecord(item, index)}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Image
              source={music}
              style={{
                height: 55,
                width: 55,
                marginLeft: 10,
                alignSelf: 'center',
              }}
            />
            <Text style={{marginLeft: 30, width: 200}}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const onPressRecord = (item, index) => {
    navigation.replace('AudioPlay', {
      item: item,
      data: Data.reverse(),
      index: index,
    });
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'#00537E'} />
      <View style={styles.header}>
        <Text style={styles.headertext}>Audio</Text>
      </View>
      <FlatList data={Data.reverse()} renderItem={RenderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00537E',
    height: 50,
    width: width,
    justifyContent: 'center',
    marginBottom: 10,
  },
  headertext: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '600',
    color: 'white',
  },
  headerleft: {
    height: 25,
    width: 25,
    position: 'absolute',
    left: 15,
    tintColor: 'white',
  },
  audiocard: {
    height: 290,
    width: 290,
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 60,
    justifyContent: 'center',
    elevation: 5,
  },
  audiotext: {
    marginTop: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    color: '#095982',
  },
  controls: {
    marginTop: 5,
    height: 20,
    width: 20,
  },
  controlbar: {
    marginTop: 30,
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // backgroundColor: 'red',
    padding: 10,
  },
  plus: {
    height: 55,
    width: 55,
    tintColor: '#007ACC',
  },
  btnplus: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
