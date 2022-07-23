import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  StatusBar,
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
  microphone,
  stop,
} from '../../assets';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import moment from 'moment';
import RNFS from 'react-native-fs';
import {SafeAreaView} from 'react-native-safe-area-context';

const {height, width} = Dimensions.get('screen');

const audioRecorderPlayer = new AudioRecorderPlayer();

export default function AudioRecord({navigation, route}) {
  const [stopaudio, setstopaudio] = useState(true);
  const [recodetext, setrecodrtext] = useState('Start');
  //   const [state, setState] = useState();

  const [StartRecord, setStartRecord] = useState({
    recordSecs: '00',
    // recordTime: audioRecorderPlayer.mmss(
    //   Math.floor(e.currentPosition),
    //   console.log(e.currentPosition),
    // ),
  });

  const [StopRecord, setStopRecord] = useState();

  const [StartPlay, setStartPlay] = useState({
    currentPositionSec: '00',
    currentDurationSec: '00',
    playTime: '00',
    duration: '00',
  });
  const [btn, setbtn] = useState(true);
  const [audioFileName, setaudioFileName] = useState('Voice Recorder');
  const [path, setpath] = useState(
    `/storage/emulated/0/AudioProject/Recodings-${+new Date()}.mp3`,
  );
  // const path = path1.replace(':', '.');

  useEffect(() => {
    if (route.params) {
      var Route = route.params.item;
      setpath(Route.path);
      setaudioFileName(Route.name);
      setbtn(false);
      console.log(path);
    }
  }, []);

  const Play = async () => {
    console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer(path, {}, true);
    console.log('msg', msg);
    audioRecorderPlayer.addPlayBackListener(e => {
      setStartPlay({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
      console.log('e.currentPosition', e.currentPosition);
      console.log(' e.duration', e.duration);
      return;
    });
  };

  const Stop = async () => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer(path, {}, true);
    audioRecorderPlayer.removePlayBackListener();
  };

  const Pause = async () => {
    await audioRecorderPlayer.pausePlayer(path, {}, true);
  };

  const Recode = async () => {
    if (recodetext === 'Start') {
      setrecodrtext('Stop');
      const result = await audioRecorderPlayer.startRecorder(path, {}, true);
      audioRecorderPlayer.addRecordBackListener(e => {
        setStartRecord({
          recordSecs: e.currentPosition,
          recordTime: audioRecorderPlayer.mmss(
            Math.floor(e.currentPosition),
            console.log(e.currentPosition),
          ),
        });
        return;
      });
      console.log('onStartRecord', result);
      //   setrecoding(result);
      console.log('StartRecord', StartRecord);
    } else {
      setrecodrtext('Start');
      //for stop recording
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setStopRecord({
        recordSecs: 0,
      });
      console.log('onStopRecord', result);
      console.log('StopRecord', StopRecord);
      navigation.navigate('AudioLoad');
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{backgroundColor: '#D63C54', flex: 1}}>
        <StatusBar backgroundColor={'#D63C54'} />
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.replace('AudioLoad');
              Stop();
            }}>
            <Image source={backarrow} style={styles.headerleft} />
          </TouchableOpacity>

          <Text style={styles.headertext}>Audio</Text>
        </View>
        <View style={{alignSelf: 'center'}}>
          <Text style={styles.title}>{audioFileName}</Text>
          <View
            style={{
              borderRadius: 100,
              backgroundColor: 'rgba(109, 42, 75,0.7)',
              height: 210,
              width: 210,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <View
              style={{
                borderRadius: 100,
                backgroundColor: '#A03152',
                height: 190,
                width: 190,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  borderRadius: 100,
                  backgroundColor: '#FB456D',
                  height: 150,
                  width: 150,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <Image source={microphone} style={styles.mice} />
              </View>
            </View>
          </View>
        </View>
        <View>
          {btn ? (
            <Text
              style={{
                color: 'white',
                fontSize: 22,
                textAlign: 'center',
                marginTop: 20,
              }}>
              {Math.floor((StartRecord.recordSecs / (1000 * 60 * 60)) % 24) <= 9
                ? '0' +
                  Math.floor((StartRecord.recordSecs / (1000 * 60 * 60)) % 24)
                : Math.floor((StartRecord.recordSecs / (1000 * 60 * 60)) % 24)}
              :{/* Hours */}
              {Math.floor((StartRecord.recordSecs / (1000 * 60)) % 60) <= 9
                ? '0' + Math.floor((StartRecord.recordSecs / (1000 * 60)) % 60)
                : Math.floor((StartRecord.recordSecs / (1000 * 60)) % 60)}
              :{/* Min */}
              {Math.floor((StartRecord.recordSecs / 1000) % 60) <= 9
                ? '0' + Math.floor((StartRecord.recordSecs / 1000) % 60)
                : Math.floor((StartRecord.recordSecs / 1000) % 60)}
              {/* Sec */}
            </Text>
          ) : (
            <Text
              style={{
                color: 'white',
                fontSize: 22,
                textAlign: 'center',
                marginTop: 20,
              }}>
              {Math.floor(
                (StartPlay.currentPositionSec / (1000 * 60 * 60)) % 24,
              ) <= 9
                ? '0' +
                  Math.floor(
                    (StartPlay.currentPositionSec / (1000 * 60 * 60)) % 24,
                  )
                : Math.floor(
                    (StartPlay.currentPositionSec / (1000 * 60 * 60)) % 24,
                  )}
              :{/* Hours */}
              {Math.floor((StartPlay.currentPositionSec / (1000 * 60)) % 60) <=
              9
                ? '0' +
                  Math.floor((StartPlay.currentPositionSec / (1000 * 60)) % 60)
                : Math.floor((StartPlay.currentPositionSec / (1000 * 60)) % 60)}
              :{/* Min */}
              {Math.floor((StartPlay.currentPositionSec / 1000) % 60) <= 9
                ? '0' + Math.floor((StartPlay.currentPositionSec / 1000) % 60)
                : Math.floor((StartPlay.currentPositionSec / 1000) % 60)}
              {/* Sec */}
            </Text>
          )}
        </View>
        {!btn && (
          <View>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                backgroundColor: 'white',
                borderRadius: 100,
                height: 70,
                width: 70,
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 70,
              }}
              onPress={Play}>
              <Image
                style={{
                  height: 30,
                  width: 30,
                  alignSelf: 'center',
                  marginLeft: 8,
                  tintColor: '#D63C54',
                }}
                source={play}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 15,
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity
                onPress={Pause}
                activeOpacity={0.5}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 100,
                  height: 70,
                  width: 70,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    alignSelf: 'center',
                    marginLeft: 0,
                    tintColor: '#D63C54',
                  }}
                  source={pause}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={Stop}
                activeOpacity={0.5}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 100,
                  height: 70,
                  width: 70,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    alignSelf: 'center',
                    marginLeft: 0,
                    tintColor: '#D63C54',
                  }}
                  source={stop}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {btn && (
          <TouchableOpacity
            onPress={Recode}
            style={{
              backgroundColor: '#fff',
              width: 190,
              marginTop: 50,
              alignSelf: 'center',
              borderRadius: 50,
            }}>
            <Text
              style={{
                padding: 15,
                textAlign: 'center',
                fontSize: 18,
                fontWeight: '800',
                color: '#D63C54',
              }}>
              {recodetext} Recording
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  mice: {
    height: 60,
    width: 60,
    alignSelf: 'center',
    tintColor: '#fff',
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    marginVertical: 30,
    color: '#fff',
  },
  header: {
    backgroundColor: '#D63C54',
    height: 50,
    width: width,
    justifyContent: 'center',
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
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
});
