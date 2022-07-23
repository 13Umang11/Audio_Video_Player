import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import Header from '../customcomponets/Header';
import FastImage from 'react-native-fast-image';
import {play} from '../assets';

export default function VideoList({navigation, route}) {
  const {height, width} = Dimensions.get('screen');
  const Route = route.params.item;
  const [uris, seturis] = useState([]);
  const [loading, setloading] = useState(false);
  const [indexSelected, setIndexSelected] = useState(route.params.index);
  const [visible, setvisible] = useState(false);
  var temp = [];

  useEffect(() => {
    console.log('dsvedvwav');
    ReadVideos();
  }, []);

  const ReadVideos = () => {
    if (Route.group_name === 'CameraVideo') {
      ReadFiles();
    } else {
      Video();
    }
  };

  const Video = () => {
    CameraRoll.getPhotos({
      first: 70,
      assetType: 'Videos',
      groupTypes: 'Album',
      groupName: Route.group_name,
    }).then(image => {
      var img = image.edges;
      img.map(item => {
        var video = item.node.image;
        temp.push(video);
        console.log('video', video);
        seturis(temp);
      });
      console.log('uris', uris);
      //   console.log('img', img);
    });
  };

  const ReadFiles = () => {
    var RNFS = require('react-native-fs');
    var path = RNFS.ExternalStorageDirectoryPath + `/CameraVideo`;
    // get a list of files and directories in the main bundle
    RNFS.readDir(path)
      .then(result => {
        console.log('GOT RESULT', result);
        seturis(result);
        // stat the first file
        result.map((item, index) => {
          // console.log('item', item.path);
          var type = item.path.split('/').pop();
          // console.log('type', type);
          var end = type.endsWith('.jpg');
          // console.log(end);
          if (end === false) {
            var files = {
              uri: 'file://' + item.path,
            };
            temp.push(files);
            console.log('temp', temp);
            seturis(temp);
            console.log(uris);
          }
        });
      })

      .catch(err => {
        console.log(err.message, err.code);
      });
  };
  const VideoPlayer = (item, index) => {
    navigation.navigate('VideoPlayer', {
      item: item,
      index: index,
      group_name: Route.group_name,
      data: uris.reverse(),
    });
  };

  const RenderItems = ({item, index}) => {
    return (
      <View key={index}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => VideoPlayer(item, index)}>
          {console.log(item.uri)}
          <FastImage
            source={{uri: item?.uri, priority: 'high'}}
            style={{
              height: height / 3,
              width: width / 1.06,
              marginLeft: 10,
              marginBottom: 10,
              borderRadius: 10,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header title={Route.group_name} />

      <FlatList
        data={uris}
        initialNumToRender={uris.length}
        renderItem={RenderItems}
        // numColumns={2}
        scrollEnabled={true}
      />
    </View>
  );
}
