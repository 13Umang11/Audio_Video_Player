import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
  AppState,
  Platform,
  ToastAndroid,
  Linking,
} from 'react-native';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {
  autoflash,
  box,
  flash,
  flip,
  mobile,
  offflash,
  pause,
  play,
  stop,
  tourch,
} from '../assets';

export default function VideoControls({navigation}) {
  const [loading, setloading] = useState(true);
  const [rotate, setrotate] = useState(false);
  const [path, setpath] = useState({});
  const [name, setname] = useState(offflash);
  const [onflash, setonflash] = useState('off');
  const [torch, settourch] = useState('off');
  const [show, setshow] = useState(false);
  const [record, setrecord] = useState(false);
  const [playvideo, setplayvideo] = useState(false);
  const [color, setcolor] = useState('#fff');
  const [time, settime] = useState('00:00');
  const [count, setCount] = useState(0);

  const camera = useRef(null);
  const intervalRef = useRef();

  const devices = useCameraDevices();
  const front = devices.front;
  const back = devices.back;
  var seconds = 1;
  let Time = 0;
  let timer = 0;
  let Count = count + 1;

  const useIsForeground = () => {
    // const [isForeground, setIsForeground] = useState(true);
    if (AppState.currentState === 'active') {
      // setIsForeground(true);
      return true;
    } else {
      // setIsForeground(false);
      return false;
    }
    // return isForeground;
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      const granted = PermissionsAndroid.requestMultiple([
        'android.permission.CAMERA',
        'android.permission.READ_EXTERNAL_STORAGE',
        'android.permission.WRITE_EXTERNAL_STORAGE',
        'android.permission.RECORD_AUDIO',
      ]);
      const cameraPermission = Camera.getCameraPermissionStatus()
        .then
        // data =>  console.log('cameraPermission', data),
        ();
      const microphonePermission = Camera.getMicrophonePermissionStatus()
        .then
        // data => console.log(data),
        ();
    }
  }, []);

  const Show = () => {
    setshow(!show);
  };

  const onStratRecording = async () => {
    console.log('onStratRecording');
    Platform.OS === 'android' &&
      ToastAndroid.show('StratRecording', ToastAndroid.SHORT);
    setrecord(true);
    setcolor('rgba(176, 171, 171,0.3)');
    await camera.current.startRecording({
      flash: onflash,

      onRecordingFinished: video => {
        console.log(video);
        setpath(video);
        setTimeout(() => {
          navigation.navigate('Preview', {video: video});
        }, 1000);
      },
      onRecordingError: error => console.log(error),
    });

    intervalRef.current = setInterval(() => {
      timer = seconds++;
      console.log('====================================');
      var min =
        Math.floor(timer / 60) < 10
          ? '0' + Math.floor(timer / 60)
          : Math.floor(timer / 60);
      var sec = ('0' + Math.floor(timer % 60)).slice(-2);
      Time = min + ':' + sec;
      // console.log(timer);
      console.log('====================================');

      console.log(timer);
      // setCount(count => count + 1);
      settime(Time);
      setCount(timer);
    }, 1000);

    console.log('Time', Time);
  };

  const onPause = async () => {
    clearInterval(intervalRef.current);
    console.log('onPause');
    Platform.OS === 'android' && ToastAndroid.show('Pause', ToastAndroid.SHORT);
    await camera.current.pauseRecording();
    setplayvideo(true);
  };

  const onResume = async () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      timer = Count++;
      console.log('count', timer);
      console.log('====================================');
      var min =
        Math.floor(timer / 60) < 10
          ? '0' + Math.floor(timer / 60)
          : Math.floor(timer / 60);
      var sec = ('0' + Math.floor(timer % 60)).slice(-2);
      Time = min + ':' + sec;
      // console.log(timer);
      console.log('====================================');

      console.log(Time);

      settime(Time);
    }, 1000);
    console.log('onResume');
    Platform.OS === 'android' &&
      ToastAndroid.show('Resume', ToastAndroid.SHORT);
    await camera.current.resumeRecording();
    setplayvideo(false);
  };

  const onStopRecording = async () => {
    console.log('stop');
    clearInterval(intervalRef.current);
    settime('00:00');
    setCount(0);
    setcolor('#fff');
    setrecord(false);
    console.log('onStopRecording');
    Platform.OS === 'android' &&
      ToastAndroid.show('StopRecording', ToastAndroid.SHORT);
    await camera.current.stopRecording().then(() => {});
  };

  const openPhotos = () => {
    switch (Platform.OS) {
      case 'ios':
        Linking.openURL('photos-redirect://');
        setshow(!show);
        break;
      case 'android':
        Linking.openURL('content://media/internal/images/media');
        setshow(!show);
        break;
      default:
        console.log('Could not open gallery app');
        setshow(!show);
    }
  };

  const ChangeFlash = () => {
    if (!rotate) {
      switch (name) {
        case flash:
          console.log('autoflash');
          setname(autoflash);
          setonflash('auto');
          console.log(onflash);
          break;
        case offflash:
          console.log('flash');
          setname(flash);
          setonflash('on');
          break;
        case autoflash:
          console.log('tourch');
          setname(tourch);
          settourch('on');
          break;
        case tourch:
          console.log('offflash');
          settourch('off');
          setonflash('off');
          setname(offflash);
      }
    } else {
      return;
    }
  };

  if (front == null)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator animating={loading} size={'large'} />
      </View>
    );

  return (
    <>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={rotate ? front : back}
        isActive={useIsForeground}
        preset="high"
        fps={200}
        hdr={true}
        lowLightBoost={true}
        audio={true}
        video={true}
        enableHighQualityPhotos={true}
        enableZoomGesture={true}
        torch={torch}
      />
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <TouchableOpacity onPress={ChangeFlash}>
              <Image
                source={rotate ? offflash : name}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: '#fff',
                  marginTop: 20,
                }}
              />
            </TouchableOpacity>
          </View>
          {record && (
            <View
              style={{
                backgroundColor: 'white',
                position: 'absolute',
                width: 90,
                top: 10,
                right: 10,
                borderRadius: 20,
                opacity: 0.5,
              }}>
              <Text
                style={{
                  padding: 10,
                  alignSelf: 'center',
                  fontWeight: '800',
                  opacity: 1,
                }}>
                {time}
              </Text>
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginBottom: 20,
            }}>
            <TouchableOpacity onPress={() => setrotate(!rotate)}>
              <Image
                source={flip}
                style={{
                  height: 35,
                  width: 35,
                  tintColor: '#fff',
                  marginTop: 20,
                }}
              />
            </TouchableOpacity>
            {!record ? (
              <View
                style={{
                  height: 90,
                  width: 90,
                  borderRadius: 100,
                  borderColor: '#fff',
                  borderWidth: 1,
                  justifyContent: 'center',
                  marginTop: -15,
                }}>
                <TouchableOpacity
                  onPress={onStratRecording}
                  style={{
                    backgroundColor: color,
                    height: 70,
                    width: 70,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}
                />
              </View>
            ) : (
              <View
                style={{
                  height: 90,
                  width: 90,
                  borderRadius: 100,
                  borderColor: '#fff',
                  borderWidth: 1,
                  justifyContent: 'center',
                  marginTop: -15,
                }}>
                <TouchableOpacity
                  onPress={onStopRecording}
                  style={{
                    backgroundColor: 'red',
                    height: 70,
                    width: 70,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}
                />
              </View>
              // <View
              //   style={{
              //     flexDirection: 'row',
              //     backgroundColor: color,
              //     height: 70,
              //     width: 150,
              //     borderRadius: 50,
              //     justifyContent: 'center',
              //     alignSelf: 'center',
              //   }}>
              //   <TouchableOpacity
              //     style={{alignSelf: 'center'}}
              //     onPress={playvideo ? onResume : onPause}>
              //     <Image
              //       source={playvideo ? play : pause}
              //       style={{
              //         height: 30,
              //         width: 30,
              //         // tintColor: '#fff',
              //         marginHorizontal: 20,
              //         tintColor: '#fff',
              //       }}
              //     />
              //   </TouchableOpacity>
              //   <TouchableOpacity
              //     style={{alignSelf: 'center'}}
              //     onPress={onStopRecording}>
              //     <Image
              //       source={stop}
              //       style={{
              //         height: 30,
              //         width: 30,
              //         // tintColor: '#fff',
              //         marginHorizontal: 20,
              //         tintColor: '#fff',
              //       }}
              //     />
              //   </TouchableOpacity>
              // </View>
            )}

            <Modal
              style={{
                justifyContent: 'flex-end',
                margin: 5,
                marginHorizontal: 10,
              }}
              isVisible={show}
              useNativeDriver
              animationIn="slideInUp"
              animationOut="slideOutDown"
              animationInTiming={300}
              animationOutTiming={300}
              backdropColor="black"
              backdropTransitionInTiming={300}
              backdropTransitionOutTiming={300}
              onBackdropPress={Show}
              onBackButtonPress={Show}
              backdropOpacity={0.5}
              swipeDirection={['up', 'down', 'left', 'right']}>
              <View
                style={{
                  padding: 20,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                }}>
                <TouchableOpacity onPress={openPhotos}>
                  <View style={{flexDirection: 'row', paddingBottom: 10}}>
                    <Image
                      source={mobile}
                      style={{
                        height: 40,
                        width: 40,
                        marginRight: 50,
                        marginLeft: 20,
                      }}
                    />
                    <Text style={{marginTop: 5, fontSize: 20, color: '#000'}}>
                      Phone Gallery
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Topindex');
                    setshow(!show);
                  }}>
                  <View style={{flexDirection: 'row', paddingVertical: 10}}>
                    <Image
                      source={box}
                      style={{
                        height: 40,
                        width: 40,
                        marginRight: 50,
                        marginLeft: 20,
                      }}
                    />
                    <Text style={{marginTop: 5, fontSize: 20, color: '#000'}}>
                      App Gallery
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Modal>

            <TouchableOpacity onPress={Show}>
              <Image
                source={box}
                style={{
                  height: 35,
                  width: 35,
                  tintColor: '#fff',
                  marginTop: 20,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
    tintColor: '#000',
    alignSelf: 'center',
  },
});
