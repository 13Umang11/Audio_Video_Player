import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Button,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll'; //for useing this intall this npm install fbjs

import Pinchable from 'react-native-pinchable';
import FastImage from 'react-native-fast-image';
import Modals from '../customcomponets/Modals';
import {log} from 'react-native-reanimated';

export default function Photos({navigation}) {
  const {height, width} = Dimensions.get('screen');
  const [albums, setalbums] = useState([]);
  const [images, setimages] = useState([]);
  const [image, setimage] = useState('');
  const [show, setshow] = useState(false);
  var temp = [];

  useEffect(() => {
    console.log('wjebjkbkajevnb');
    if (Platform.OS === 'android') {
      getAndroid();
    } else {
      getIOS();
    }
  }, []);

  const getAndroid = () => {
    console.log('getAndroid');
    CameraRoll.getAlbums({
      first: 100,
      assetType: 'Photos',
    })
      .then(r => {
        console.log('r', r);
        r.map(item => {
          CameraRoll.getPhotos({
            first: 1,
            assetType: 'Photos',
            groupTypes: 'Album',
            groupName: item.title,
          }).then(image => {
            // console.log('first', image.edges[0].node);
            temp.push(image.edges[0].node);
            console.log('temp', temp);
            setimages(temp);
            // console.log('images', images);
          });
        });
        setalbums(r);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getIOS = () => {
    CameraRoll.getPhotos({
      first: 100,
      assetType: 'Photos',

    })
      .then(r => {
        var img = r.edges;
        console.log('r', r);
        img.map(item => {
          console.log('item', item.node.image);
          const imgs = item.node.image;
          temp.push(imgs);
        //   //   console.log(item);
        //   //   CameraRoll.getPhotos({
        //   //     first: 1,
        //   //     assetType: 'Photos',
        //   //     groupTypes: 'Album',
        //   //     groupName: item.title,
        //   //   }).then(image => {
        //   //     // console.log('first', image.edges[0].node);

        //   //     // console.log('temp', temp);
          setimages(temp);
        //   //     // console.log('images', images);
        });
        // });
        // setalbums(r);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onNavigation = (item, index) => {
    navigation.navigate('Images', {item: item, index: index});
  };

  const RenderItems = ({item, index}) => {
    return (
      <View key={index}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => onNavigation(item, index)}
        >
          <View style={{flex: 1}}>
            <Image
              source={{
                uri: Platform.OS === 'android' ? item.image.uri : item.uri,
              }}
              // source={{uri: 'ph://10857B9D-11EC-4E3F-9A84-A83343905B9C/L0/001'}}
              style={{
                height: height / 7.5,
                width: width / 3.4,
                marginLeft: 10,
                marginTop: 10,
                borderRadius: 4,
              }}
            />
            <Text
              style={{
                position: 'absolute',
                color: 'white',
                fontSize: 12,
                // top: 90,
                top: height / 8.8,
                left: 5,
                margin: 5,
                marginLeft: 10,
              }}>
              {item.group_name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <FlatList
          data={images}
          renderItem={RenderItems}
          numColumns={3}
          scrollEnabled={true}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    fontSize: 18,
  },
});
