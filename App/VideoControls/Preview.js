import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  BackHandler,
  ToastAndroid,
  SafeAreaView,
  Platform,
} from 'react-native';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';
import {pause, play} from '../assets';

export default function Preview({navigation, route}) {
  const [videoplay, setvideoplay] = useState(false);
  const [video, setvideo] = useState(route.params.video);
  // console.log(video);
  // console.log(route);
  console.log('route.params.video', route.params.video);

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

  const onCancal = () => {
    navigation.goBack();
  };

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
    // console.log('Cache directory path is ', video.path);
    // var file = video.path;
    // const fileName = file.split('/').pop();
    // var path = `/storage/emulated/0/CameraVideo/${fileName}`;
    // console.log('Filename is ', fileName);
    // // //COPY the file
    // RNFS.copyFile(file, path)
    //   .then(success => {
    //     console.log('Video COPIED!');
    //     navigation.goBack();
    //     ToastAndroid.show('Video Saved', ToastAndroid.SHORT);
    //   })
    //   .catch(err => {
    //     console.log(err.message);
    //   });
  };

  console.log(video.path);
  return (
    <>
      <Video
        style={styles.backgroundVideo}
        source={{
          // uri: 'file:///private/var/mobile/Containers/Data/Application/2360D3E0-0065-4403-A3AA-CC67CC61CAE5/tmp/ReactNative/EED99C02-957B-4310-8C75-2606A389384B.mov',
          uri: video?.path,
          // uri: 'file:///storage/9016-4EF8/The Conjuring The Devil Made Me Do It (2021) [1080p] [WEBRip] [5.1] [YTS.MX]/The.Conjuring.The.Devil.Made.Me.Do.It.2021.1080p.WEBRip.x264.AAC5.1-[YTS.MX].mp4',
        }}
        onError={e => console.log('error', e)}
        // fullscreen={false} //ios only
        fullscreenAutorotate={true}
        fullscreenOrientation="all"
        resizeMode={'contain'}
        muted={true}
        volume={1}
        paused={videoplay}
        onEnd={() => {
          setvideoplay(true);
          console.log('back');
        }}
      />
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                height: 75,
                width: 75,
                backgroundColor: 'rgba(7, 7, 7,0.8)',
                borderRadius: 100,
              }}
              onPress={() => setvideoplay(!videoplay)}>
              <Image
                style={{
                  height: 35,
                  width: 35,
                  tintColor: '#fff',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginLeft: videoplay ? 8 : 0,
                }}
                source={videoplay ? play : pause}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                backgroundColor: '#0B385F',
                height: 50,
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
              <TouchableOpacity
                style={{justifyContent: 'center'}}
                onPress={onSave}>
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
        </View>
      </SafeAreaView>
    </>
  );
}
var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(7, 7, 7,0.8)',
  },
  controls: {
    height: 30,
    width: 30,
    tintColor: '#fff',
  },
});
