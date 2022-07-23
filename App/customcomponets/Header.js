import React from 'react';
import {View, Text} from 'react-native';

export default function Header({title}) {
  return (
    <View
      style={{
        borderBottomColor: '#fff',
        borderBottomWidth: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF7F7F',
        elevation: 5,
        marginBottom: 10,
      }}>
      <Text
        style={{
          alignSelf: 'center',
          color: '#fff',
          textAlign: 'center',
          fontSize: 24,
          padding: 10,
        }}>
        {title}
      </Text>
    </View>
  );
}
