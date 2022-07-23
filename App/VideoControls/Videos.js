import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  LogBox,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll'; //for useing this intall this npm install fbjs
import {play} from '../assets';
import Photos from '../CameraControls/GalleryView';

export default function Videos({navigation}) {
  const {height, width} = Dimensions.get('screen');
  const [albums, setalbums] = useState([]);
  const [Videos, setVideos] = useState('');
  const [show, setshow] = useState(false);
  var temp = [];

  useEffect(() => {
    if (Platform.OS === 'android') {
      getAndroid();
    } else {
      getIOS();
    }
  }, []);

  const getAndroid = () => {
    CameraRoll.getAlbums({
      first: 100,
      assetType: 'Videos',
    })
      .then(r => {
        console.log(r);
        r.map(item => {
          CameraRoll.getPhotos({
            first: 100,
            assetType: 'Videos',
            groupTypes: 'Album',
            groupName: item.title,
          }).then(image => {
            // console.log('first', image.edges[0].node);
            temp.push(image.edges[0].node);
            // console.log('Videos', temp);
            setVideos(temp);
            // console.log('Videos', Videos.length);
          });
        });
        // setalbums(r);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getIOS = () => {
console.log('getIOS');

    CameraRoll.getPhotos({
      first: 100,
      assetType: 'Photos',
    })
      .then(r => {
        console.log('videos', r);
        var video = r.edges;
        video.map(item => {
          console.log(item);
          CameraRoll.getPhotos({
            first: 100,
            assetType: 'Videos',
            groupTypes: 'Album',
            groupName: item.title,
          }).then(image => {
            // console.log('first', image.edges[0].node);
          var videourl = item.node.image;
          console.log('first', videourl);
          temp.push(videourl);
            // console.log('Videos', temp);
          setVideos(temp);
            // console.log('Videos', Videos.length);
          });
        });
        setalbums(r);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onNavigation = (item, index) => {
    navigation.navigate('VideoList', {item: item, index: index});
  };
  const VideoPlayer = (item, index) => {
    navigation.navigate('VideoPlayer', {
      item: item,
      index: index,
      group_name: item.filename,
      data: Videos.reverse(),
    });
  };

  const RenderItems = ({item, index}) => {
    console.log('Videossdv');
    console.log('item' + index, item);
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (Platform.OS === 'android') {
              console.log('elwkbaekwj kjhfbaewjkfjklaekjfbaskldjbakljdb');
              onNavigation(item, index);
            } else {
              console.log('videoplayer');
              null;
              // VideoPlayer(item, index);
            }
          }}>
          <Image
            source={{uri: Platform.OS === 'ios' ? item.uri : item?.image.uri}}
            style={{
              height: height / 7.5,
              width: width / 3.4,
              marginLeft: 10,
              marginTop: 10,
              borderRadius: 4,
              // height: height / 4.6,
              // width: width / 2.19,
              // marginLeft: 10,
              // marginTop: 10,
              // borderRadius: 10,
            }}
          />
          <View
            style={{
              position: 'absolute',
              color: 'white',
              flexDirection: 'row',
              bottom: 0,
              left: 5,
              margin: 5,
              marginLeft: 10,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 12,
              }}>
              {item.group_name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        style={{flex: 1}}
        data={Videos}
        renderItem={RenderItems}
        numColumns={3}
        // horizontal
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    fontSize: 18,
  },
});
