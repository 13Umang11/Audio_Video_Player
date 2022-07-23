import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import MerryPhotoView from '@merryjs/photo-viewer';

export default function SwipeImages({navigation, route}) {
  const images = route.params.item;
  const [indexSelected, setIndexSelected] = useState(route.params.index);
  const [visible, setvisible] = useState(true);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <MerryPhotoView
          visible={visible}
          data={images}
          hideStatusBar={true}
          hideCloseButton={true}
          hideShareButton={true}
          initial={0}
          onDismiss={e => {
            setvisible(false);
            console.log(e);
          }}
          onChange={data => {
            setIndexSelected(data.index);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  photoContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  h1: {
    padding: 40,
    textAlign: 'center',
    fontSize: 24,
  },
});
