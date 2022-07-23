import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  BackHandler,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from 'react-native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import {
  back,
  backarrow,
  backword,
  forword,
  fullscreen,
  minimize,
  mute,
  next,
  pause,
  play,
  sound,
} from '../assets/index';
import {
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from 'react-native-orientation-locker';

export default function VideoPlayer({navigation, route}) {
  // const Video = new Video
  // console.log(route);

  const {height, width} = Dimensions.get('screen');
  const [path, setpath] = useState('');
  const [loading, setloading] = useState(false);
  const [videoplay, setvideoplay] = useState(false);
  const [soundon, setsoundon] = useState(false);
  const [onfullscreen, setonfullscreen] = useState(false);
  const [onfullsize, setfullsize] = useState('contain');
  const [volume, setvolume] = useState(1);
  const [orientation, setorientation] = useState('PORTRAIT');
  const [Width, setWidth] = useState(width);
  const [volumeup, setvolumeup] = useState(0);
  const [routeindex, setrouteindex] = useState(route.params.index);
  const [isseeking, setIsseeking] = useState(false);

  // const video = new Video();

  const [currentTime, setcurrentTime] = useState({
    currentTime: 0,
    playableDuration: 0,
    seekableDuration: 0,
  });
  // const [test, settest] = useState(currentTime.currentTime);

  const [skiptime, setskiptime] = useState(0);
  const [hide, sethide] = useState(true);
  const Route = route.params.item;

  const [routedata, setroutedata] = useState(route.params.data);

  useEffect(() => {
    console.log('route', route.params.item);
    if (Platform.OS === 'android') {
      setpath(Route.uri);
    } else {
      setpath(route.params.item);
    }
  }, [route.params]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  const video = useRef();

  const FullScreen = () => {
    setonfullscreen(!onfullscreen);
    if (!onfullscreen) {
      setorientation('LANDSCAPE');
    } else {
      setorientation('PORTRAIT');
    }
  };

  const CurrentTime = () => {
    var min = currentTime.currentTime;

    var Hours =
      Math.floor((min / (60 * 60)) % 24) <= 9
        ? '0' + Math.floor((min / (60 * 60)) % 24)
        : Math.floor((min / (60 * 60)) % 24);

    var Min =
      Math.floor((min / 60) % 60) <= 9
        ? '0' + Math.floor((min / 60) % 60)
        : Math.floor((min / 60) % 60);

    var Sec =
      Math.floor(min % 60) <= 9
        ? '0' + Math.floor(min % 60)
        : Math.floor(min % 60);

    var Time = Hours + ':' + Min + ':' + Sec;

    return Time;
  };

  const Duration = () => {
    var min = currentTime.seekableDuration;

    var Hours =
      Math.floor((min / (60 * 60)) % 24) <= 9
        ? '0' + Math.floor((min / (60 * 60)) % 24)
        : Math.floor((min / (60 * 60)) % 24);

    var Min =
      Math.floor((min / 60) % 60) <= 9
        ? '0' + Math.floor((min / 60) % 60)
        : Math.floor((min / 60) % 60);

    var Sec =
      Math.floor(min % 60) <= 9
        ? '0' + Math.floor(min % 60)
        : Math.floor(min % 60);

    var Time = Hours + ':' + Min + ':' + Sec;

    return Time;
  };

  const HideControls = () => {
    if (!hide) {
      clearTimeout();
      setTimeout(() => {
        sethide(true);
      }, 4000);
    } else {
      sethide(!hide);
    }
  };

  const onNextPress = () => {
    var length = routedata.length - 1;

    if (routeindex < length) {
      setrouteindex(routeindex => routeindex + 1);
      var value = routedata[routeindex + 1];
      setpath(value.uri);
    }
  };

  const onBackPress = () => {
    var length = routedata.length - 1;

    if (routeindex <= length && routeindex > 0) {
      setrouteindex(routeindex => routeindex - 1);
      var value = routedata[routeindex - 1];
      var Name = value.name;
      console.log('value', value);
      console.log('Name', Name);
      setpath(value.uri);
    }
  };

  // useEffect(() => {
  //   // if (!hide) {
  //   clearTimeout();
  //   setTimeout(() => {
  //     sethide(true);
  //   }, 4000);
  //   // } else {
  //   //   sethide(false);
  //   // }
  // }, [hide]);

  const BackPress = () => {
    setorientation('PORTRAIT');
    navigation.goBack();
  };

  const handleDoubleTap = (doubleTapCallback, singleTapCallback) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      clearTimeout(Timer);
      doubleTapCallback();
    } else {
      lastTap = now;
      Timer = setTimeout(() => {
        singleTapCallback();
      }, DOUBLE_PRESS_DELAY);
    }
  };

  const ShowHideOverlay = () => {
    sethide(false);
    setTimeout(() => sethide(true), 5000);
  };

  return (
    <>
      <OrientationLocker
        orientation={orientation}
        onChange={orientation => console.log('onChange', orientation)}
        onDeviceChange={orientation =>
          console.log('onDeviceChange', orientation)
        }
      />
      <Video
        ref={video}
        style={styles.backgroundVideo}
        source={{
          // uri: '/FC47FCDA-FFAB-4726-A0BA-653B5A758F07/L0/001',
          uri: String(path),
        }}
        onError={e => console.log('error', e)}
        fullscreen={false} //ios only
        fullscreenAutorotate={true}
        fullscreenOrientation="all"
        resizeMode={onfullscreen ? 'cover' : 'contain'}
        muted={soundon}
        repeat={true}
        volume={volume}
        paused={videoplay || isseeking}
        // poster={path}
        onLoad={data => {
          console.log('data', data);
        }}
        seek={skiptime}
        onLoadStart={() => console.log('dscc')}
        onProgress={data => {
          if (!isseeking) {
            setcurrentTime(data);
          }
        }}
        rate={1.0}
        // onTouchEnd={() => {
        //   setTimeout(() => {
        //     sethide(true);
        //   }, 2000);
        // }}
        onTouchStart={() => {
          sethide(false);
          setTimeout(() => {
            sethide(true);
          }, 2000);
          // setcurrentTime({currentTime: currentTime.currentTime});
          // setTimeout(() => {
          //   // setcurrentTime({currentTime: currentTime.currentTime});
          //   sethide(true);
          // }, 4000);
          // if (hide) {
          //   setTimeout(() => {
          //     // setcurrentTime({currentTime: currentTime.currentTime});
          //     sethide(false);
          //   }, 500);
        }}

        // // sethide(false);
        // console.log(hide);
        // }}

        // onTouchStart={() => {
        //   sethide(false);
        //   setTimeout(() => {
        //     sethide(true);
        //   }, 4000);
        // }}
      />
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <StatusBar backgroundColor={'black'} />
          {/* <ActivityIndicator animating={loading} size="large" /> */}

          <View>
            <View
              style={{
                // height: 55,
                backgroundColor: 'rgba(7, 7, 7,0.5)',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={{justifyContent: 'center', padding: 10}}
                  onPress={BackPress}>
                  <Image
                    style={{
                      height: 30,
                      width: 30,
                      tintColor: '#fff',
                      marginHorizontal: 15,
                      justifyContent: 'center',
                    }}
                    source={backarrow}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 18,
                    color: '#fff',
                    justifyContent: 'center',
                    marginLeft: 5,
                    alignSelf: 'center',
                  }}>
                  {route.params.group_name}
                </Text>
              </View>
            </View>
          </View>
          {!soundon && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignSelf: 'flex-end',
              }}>
              <View
                style={{
                  borderRadius: 15,
                  transform: [{rotateZ: '-90deg'}],
                  height: 30,
                  width: 175,
                  backgroundColor: 'rgba(7, 7, 7,0.5)',
                  alignSelf: 'center',
                  left: 45,
                }}>
                <Slider
                  style={{
                    padding: 6,
                  }}
                  minimumValue={0}
                  maximumValue={1}
                  value={volume}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                  onValueChange={volume => setvolumeup(volume)}
                  onSlidingComplete={() => {
                    setvolume(volumeup);
                  }}
                />
              </View>
            </View>
          )}

          <View
            style={{
              height: 100,
              backgroundColor: 'rgba(7, 7, 7,0.5)',
              justifyContent: 'center',
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                marginHorizontal: 15,
                flexDirection: 'row',
              }}>
              <Text style={{color: '#fff'}}>{CurrentTime()}</Text>
              <Text style={{color: '#fff'}}>{Duration()}</Text>
            </View>
            <Slider
              style={{width: width, height: 30, alignSelf: 'center'}}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              minimumValue={0}
              maximumValue={Number(currentTime?.seekableDuration) || 0}
              value={Number(currentTime?.currentTime) || 0}
              step={1}
              onValueChange={skip => {
                console.log(skip);
                setskiptime(skip);
              }}
              onSlidingStart={() => {
                setIsseeking(true);
              }}
              onSlidingComplete={async data => {
                // setvideoplay(false);
                console.log(data);
                await video.current.seek(data);
                setTimeout(() => {
                  setIsseeking(false);
                }, 400);
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity onPress={() => setsoundon(!soundon)}>
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    tintColor: '#fff',
                    marginHorizontal: 15,
                    justifyContent: 'flex-end',
                  }}
                  source={soundon ? sound : mute}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={onBackPress}>
                <Image style={styles.controls} source={back} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setskiptime(currentTime?.currentTime - 10)}>
                <Image style={styles.controls} source={backword} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setvideoplay(!videoplay)}>
                <Image
                  style={styles.controls}
                  source={videoplay ? play : pause}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setskiptime(currentTime?.currentTime + 10)}>
                <Image style={styles.controls} source={forword} />
              </TouchableOpacity>

              <TouchableOpacity onPress={onNextPress}>
                <Image style={styles.controls} source={next} />
              </TouchableOpacity>

              <TouchableOpacity onPress={FullScreen}>
                <Image
                  style={styles.controls}
                  source={onfullscreen ? minimize : fullscreen}
                />
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
