import moment from 'moment';
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
  AppStateStatus,
  Platform,
  Linking,
  SafeAreaView,
} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {
  Camera,
  useCameraDevices,
  TemporaryFile,
} from 'react-native-vision-camera';
import {
  autoflash,
  box,
  camera,
  close,
  flash,
  flip,
  mobile,
  offflash,
  place,
  tourch,
} from '../assets';

export default function CameraControls({navigation}) {
  const [loading, setloading] = useState(true);
  const [rotate, setrotate] = useState(false);
  const [path, setpath] = useState('');
  const [name, setname] = useState(offflash);
  const [onflash, setonflash] = useState('off');
  const [torch, settourch] = useState('off');
  const [show, setshow] = useState(false);

  const camera = useRef(0);
  const devices = useCameraDevices();
  const front = devices.front;
  const back = devices.back;

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
  }, []);

  const Show = () => {
    setshow(!show);
  };

  const onPhoto = async () => {
    const photo = await camera.current.takePhoto({
      flash: onflash,
      qualityPrioritization: 'quality',
      // enableAutoRedEyeReduction: true,
      // enableAutoDistortionCorrection: true,
    });
    setpath(photo.path);
    console.log('photo', photo.path);
    navigation.navigate('Saveimage', {photo: photo.path});
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
          setname(autoflash);
          setonflash('auto');
          break;
        case offflash:
          setname(flash);
          setonflash('on');
          break;
        case autoflash:
          setname(tourch);
          settourch('on');
          break;
        case tourch:
          settourch('off');
          setonflash('off');
          setname(offflash);
      }
    } else {
      null;
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
        photo={true}
        style={StyleSheet.absoluteFill}
        device={rotate ? front : back}
        isActive={useIsForeground}
        video={true}
        preset="medium"
        fps={200}
        hdr={true}
        lowLightBoost={true}
        audio={true}
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
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
                  onPress={onPhoto}
                  style={{
                    backgroundColor: '#fff',
                    height: 70,
                    width: 70,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}
                />
              </View>

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
