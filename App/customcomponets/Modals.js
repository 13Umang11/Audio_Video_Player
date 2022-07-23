import React from 'react';
import {View, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import Pinchable from 'react-native-pinchable';
import Modal from 'react-native-modal';
import {close} from '../assets/index';
import FastImage from 'react-native-fast-image';

export default function Modals({
  isVisible,
  onBackButtonPress,
  onBackdropPress,
  uri,
  closebtn,
}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Modal
          isVisible={isVisible}
          animationIn="fadeIn"
          animationOut="fadeOut"
          onBackButtonPress={onBackButtonPress}
          onBackdropPress={onBackdropPress}
          useNativeDriver={true}
          backdropOpacity={0.9}>
          <View
            style={{
              // flex: 1,
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={closebtn}>
              <Image
                source={close}
                style={{
                  height: 25,
                  width: 25,

                  tintColor: 'white',
                }}
              />
            </TouchableOpacity>

            <View>
              <Pinchable>
                <FastImage //for stoping image fliking in resized mode contain
                  source={{uri: uri, priority: 'high'}}
                  style={{
                    width: '100%',
                    height: '99%',
                  }}
                  resizeMode="contain"
                />
              </Pinchable>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
