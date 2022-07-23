import React, {useEffect, useState, useRef} from 'react';
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
  BackHandler,
} from 'react-native';
import {
  backarrow,
  music,
  suffle,
  back,
  next,
  repeat,
  pause,
  play,
  music1,
  sound,
  mute,
} from '../../assets';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Slider from '@react-native-community/slider';
import {ScrollView} from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('screen');

const audioRecorderPlayer = new AudioRecorderPlayer();
// const path = `/storage/emulated/0/AudioProject/Recodings-${new Date().getTime()}.mp3`; // RNFS.ExternalDirectoryPath + '/test.mp4';

export default function AudioPlay({navigation, route}) {
  const [stopaudio, setstopaudio] = useState(true);
  const [skip, setskip] = useState(false);

  const [currentPosition, setcurrentPosition] = useState(0);
  const [StartPlay, setStartPlay] = useState({
    currentPositionSec: '0',
    currentDurationSec: '0',
    playTime: '0',
    duration: '0',
  });

  const [data, setdata] = useState(route.params.data);
  const [index, setindex] = useState(route.params.index);
  const [audioFileName, setaudioFileName] = useState('Voice Recorder');
  const [path, setpath] = useState('');

  useEffect(() => {
    if (route.params) {
      var Route = route.params.item;
      setpath(Route.path);
      setaudioFileName(Route.name);
      console.log(path);
    }
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (StartPlay.currentDurationSec === StartPlay.currentPositionSec) {
      setstopaudio(true);
    }
  }, [StartPlay]);

  const onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer(path, {}, true);
    console.log(msg);
    audioRecorderPlayer.addPlayBackListener(e => {
      setStartPlay({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
      return;
    });
  };

  const onStopPlay = async () => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    setstopaudio(true);
  };

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  const PlayPause = () => {
    setstopaudio(!stopaudio);
    // console.log('stopaudio', stopaudio);
    if (stopaudio) {
      // console.log(stopaudio);
      // setStartPlay({
      //   currentPositionSec: '0',
      //   currentDurationSec: '0',
      //   playTime: '00',
      //   duration: '00',
      // });
      onStartPlay();
      setstopaudio(!stopaudio);
    } else {
      onPausePlay();
    }
  };

  const CoverTime = min => {
    var min = StartPlay.currentPositionSec;
    // if (min) {
    //   const hrs = min / 60;
    //   const minute = hrs.toString().split('.')[0];
    //   const percent = parseInt(hrs.toString().split('.')[1].slice(0, 2));
    //   const sec = Math.ceil((60 * percent) / 100);
    //   if (parseInt(min) < 10 && sec < 10) {
    //     return `0${minute}:0${sec}`;
    //   }
    //   if (parseInt(min) < 10) {
    //     return `0${minute}:${sec}`;
    //   }
    //   if (sec < 10) {
    //     return `${minute}:0${sec}`;
    //   }
    //   return `${minute}:${sec}`;
    // } you tube video
    // if (StartPlay.currentDurationSec == StartPlay.currentDurationSec) {
    //   setstopaudio(false);
    //   setStartPlay({
    //     currentPositionSec: '0',
    //     currentDurationSec: '0',
    //     playTime: '00',
    //     duration: '00',
    //   });
    // }

    var min = StartPlay.currentPositionSec;

    if (min) {
      const minute = parseInt((min / (1000 * 60)) % 60);
      // console.log('====================================');
      // console.log('minute', minute);
      // console.log('====================================');

      const sec = parseInt((min / 1000) % 60);
      // console.log('====================================');
      // console.log('sec', sec);
      // console.log('====================================');
      if (minute <= 0 && sec < 10) {
        return `0${minute}:0${sec}`;
      } else if (minute >= 0 && sec < 10) {
        return `0${minute}:0${sec}`;
      } else if (minute < 10) {
        return `0${minute}:${sec}`;
      }
      return `${minute}:${sec}`;
    }

    // console.log(StartPlay.currentDurationSec);
    // console.log(StartPlay.currentDurationSec);
  };

  const onNextPress = () => {
    onStopPlay();
    setStartPlay({
      currentPositionSec: '0',
      currentDurationSec: '0',
      playTime: '00',
      duration: '00',
    });
    var length = data.length - 1;
    console.log(length);
    console.log('index', index);
    if (index < length) {
      setindex(index => index + 1);
      var value = data[index + 1];
      var Name = value.name;
      console.log('value', value);
      console.log('Name', Name);
      setaudioFileName(Name);
      setpath(value.path);
      setstopaudio(true);
    }
  };

  const onBackPress = () => {
    onStopPlay();
    setStartPlay({
      currentPositionSec: '0',
      currentDurationSec: '0',
      playTime: '00',
      duration: '00',
    });
    var length = data.length;
    console.log(length);
    console.log('index', index);

    if (index <= length && index > 0) {
      setindex(index => index - 1);
      var value = data[index - 1];
      var Name = value.name;
      console.log('value', value);
      console.log('Name', Name);
      setaudioFileName(Name);
      setpath(value.path);
      setstopaudio(true);
    }
  };

  const onSound = () => {
    audioRecorderPlayer.setVolume(1).then(data => console.log('data', data));
  };

  const onMute = () => {
    audioRecorderPlayer.setVolume(0).then(data => console.log('data', data));
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'#00537E'} barStyle={'light-content'} />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.replace('AudioLoad');
            onStopPlay();
          }}>
          <Image source={backarrow} style={styles.headerleft} />
        </TouchableOpacity>

        <Text style={styles.headertext}>Audio Player</Text>
      </View>
      <ScrollView style={{flexGrow: 1}}>
        <View style={styles.audiocard}>
          <Image
            source={music}
            style={{height: 250, width: 250, alignSelf: 'center'}}
          />
        </View>
        <View style={styles.audiotext}>
          <Text style={{...styles.text, fontSize: 18, marginVertical: 10}}>
            {audioFileName}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 15,
          }}>
          {/* {currentPosition ? ( */}
          {/* <Text> */}
          {/* {CoverTime(StartPlay.currentPositionSec)} */}
          {/* {Math.floor((currentPosition / (1000 * 60)) % 60) <= 0
              ? '0' + Math.floor((currentPosition / (1000 * 60)) % 60)
              : Math.floor((currentPosition / (1000 * 60)) % 60)}
            :
            {Math.floor((currentPosition / 1000) % 60) <= 0
              ? '0' + Math.floor((currentPosition / 1000) % 60)
              : Math.floor((currentPosition / 1000) % 60)} */}
          {/* </Text> */}
          {/* ) : ( */}
          <Text>
            {CoverTime(StartPlay.currentPositionSec)}
            {/* {Math.floor((StartPlay.currentPositionSec / (1000 * 60)) % 60) <= 0
              ? '0' +
                Math.floor((StartPlay.currentPositionSec / (1000 * 60)) % 60)
              : Math.floor((StartPlay.currentPositionSec / (1000 * 60)) % 60)}
            :
            {Math.floor((StartPlay.currentPositionSec / 1000) % 60) <= 0
              ? '0' + Math.floor((StartPlay.currentPositionSec / 1000) % 60)
              : Math.floor((StartPlay.currentPositionSec / 1000) % 60)} */}
          </Text>
          {/* )} */}
          <Text>
            {/* {CoverTime(StartPlay.currentDurationSec)} */}
            {Math.floor((StartPlay.currentDurationSec / (1000 * 60)) % 60) <= 0
              ? '0' +
                Math.floor((StartPlay.currentDurationSec / (1000 * 60)) % 60)
              : Math.floor((StartPlay.currentDurationSec / (1000 * 60)) % 60) <=
                9
              ? '0' +
                Math.floor((StartPlay.currentDurationSec / (1000 * 60)) % 60)
              : Math.floor((StartPlay.currentDurationSec / (1000 * 60)) % 60)}
            :
            {Math.floor((StartPlay.currentDurationSec / 1000) % 60) <= 0
              ? '0' + Math.floor((StartPlay.currentDurationSec / 1000) % 60)
              : Math.floor((StartPlay.currentDurationSec / 1000) % 60) <= 9
              ? '0' + Math.floor((StartPlay.currentDurationSec / 1000) % 60)
              : Math.floor((StartPlay.currentDurationSec / 1000) % 60)}
          </Text>
        </View>

        <Slider
          style={{width: 360, height: 20}}
          minimumValue={0}
          maximumValue={Number(StartPlay?.currentDurationSec) || 0}
          value={Number(StartPlay?.currentPositionSec) || 0}
          onValueChange={async duration => {
            setcurrentPosition(duration);
            const msg = await audioRecorderPlayer.seekToPlayer(
              Number(duration),
            );
          }}
          minimumTrackTintColor="#2FC8EF"
          maximumTrackTintColor="#8D52F0"
          tapToSeek={true} //ios only
          thumbImage={music1}
          step={1}
          onSlidingStart={async () => {
            await audioRecorderPlayer.pausePlayer();
          }}
          onSlidingComplete={async data => {
            // setStartPlay({currentPositionSec: currentPosition});
            console.log('onStartPlay');
            setTimeout(async () => {
              await audioRecorderPlayer.resumePlayer();
            }, 500);
            const msg = await audioRecorderPlayer.seekToPlayer(Number(data));
            // audioRecorderPlayer.addPlayBackListener(e => {
          }}
        />

        <View style={styles.controlbar}>
          <TouchableOpacity onPress={onSound}>
            <Image
              style={{
                ...styles.controls,
                height: 25,
                width: 25,
                marginTop: 0,
                tintColor: '#00537E',
              }}
              source={sound}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onBackPress}>
            <Image
              style={{
                ...styles.controls,
                tintColor: '#00537E',
                height: 25,
                width: 25,
                marginTop: 0,
              }}
              source={back}
            />
          </TouchableOpacity>
          <View
            style={{
              borderRadius: 100,
              borderWidth: 1,
              borderColor: '#00537E',
              height: 65,
              width: 65,
              marginTop: -22,
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={PlayPause}>
              <Image
                style={{
                  ...styles.controls,
                  marginTop: 0,
                  height: 35,
                  width: 35,
                  tintColor: '#00537E',
                  alignSelf: 'center',
                  marginLeft: stopaudio ? 8 : 0,
                }}
                source={stopaudio ? play : pause}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onNextPress}>
            <Image
              style={{
                ...styles.controls,
                tintColor: '#00537E',
                height: 25,
                width: 25,
                marginTop: 0,
              }}
              source={next}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={onMute}>
            <Image
              style={{
                ...styles.controls,
                height: 25,
                width: 25,
                marginTop: 0,
                tintColor: '#00537E',
              }}
              source={mute}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={onStopPlay}
          style={{
            backgroundColor: '#00537E',
            width: 190,
            marginTop: 40,
            alignSelf: 'center',
            borderRadius: 50,
            marginBottom: 15,
          }}>
          <Text
            style={{
              padding: 15,
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '800',
              color: '#fff',
            }}>
            Stop Playing
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00537E',
    height: 50,
    width: width,
    justifyContent: 'center',
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
});
