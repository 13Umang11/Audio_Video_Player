import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import Header from '../customcomponets/Header';
import MerryPhotoView from '@merryjs/photo-viewer';

export default function Images({route}) {
  const {height, width} = Dimensions.get('screen');

  const Route = route.params.item;
  const [uris, seturis] = useState([]);
  const [loading, setloading] = useState(false);
  const [indexSelected, setIndexSelected] = useState(route.params.index);
  const [visible, setvisible] = useState(false);
  var temp = [];

  useEffect(() => {
    ReadPhotos();
  }, []);

  const ReadPhotos = () => {
    if (Route.group_name === 'CameraVideo') {
      ReadFiles();
    } else {
      Imeges();
    }
  };

  const Imeges = () => {
    // console.log('route', route);
    CameraRoll.getPhotos({
      first: 3000,
      assetType: 'Photos',
      groupTypes: 'Album',
      groupName: Route.group_name,
    }).then(image => {
      var img = image.edges;
      img.map(item => {
        var files = {
          source: item.node.image,
        };
        temp.push(files);
        // console.log('files', files);
        seturis(temp);
        setloading(false);
      });
      // console.log('uris', uris);
    });
    console.log('outer uris', uris);
    // console.log('images', images);
  };

  const Swipeimage = index => {
    setvisible(true);
    setIndexSelected(index);
    //   images.map((item, index) => {
    //     console.log('item', item.node.image);
    //     var files = {
    //       source: item.node.image,
    //     };
    //     temp.push(files);
    //     console.log(files);
    //     seturis(temp);
    //   });
    //   setTimeout(() => {
    //     navigation.navigate('SwipeImages', {item: uris, index: index});
    //   }, 2000);
  };

  const ReadFiles = () => {
    var RNFS = require('react-native-fs');
    var path = RNFS.ExternalStorageDirectoryPath + `/CameraVideo`;
    // get a list of files and directories in the main bundle
    RNFS.readDir(path)
      .then(result => {
        // console.log('GOT RESULT', result);
        seturis(result);
        // stat the first file
        result.map((item, index) => {
          // console.log('item', item.path);
          var type = item.path.split('/').pop();
          // console.log('type', type);
          var end = type.endsWith('.mp4');
          // console/.log(end);
          if (end === false) {
            var files = {
              source: {
                uri: 'file://' + item.path,
              },
            };
            temp.push(files);
            // console.log('files', temp);
            seturis(temp);
          }
          setloading(false);
        });
      })

      .catch(err => {
        console.log(err.message, err.code);
        alert(err);
      });
  };

  const RenderItems = ({item, index}) => {
    // console.log(item);
    return (
      <View key={index}>
        <TouchableOpacity onPress={() => Swipeimage(index)}>
          <Image
            source={{uri: item.source?.uri}}
            style={{
              height: height / 7.5,
              width: width / 3.4,
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
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Header title={Route.group_name} />
        <MerryPhotoView
          visible={visible}
          data={uris}
          hideCloseButton={true}
          hideShareButton={true}
          initial={indexSelected}
          onDismiss={e => {
            setvisible(false);
          }}
          onChange={data => {
            setIndexSelected(data.index);
          }}
        />
        <FlatList
          data={uris}
          renderItem={RenderItems}
          numColumns={3}
          scrollEnabled={true}
          refreshing={loading}
          onRefresh={() => {
            setloading(true);
            ReadPhotos();
          }}
        />
      </View>
    </SafeAreaView>
  );
}
