import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const Top = ({state, descriptors, navigation}) => {
  return (
    <SafeAreaView>
      <View>
        <View
          style={{
            borderColor: '#3C4DAC',
            borderWidth: 3,
            height: 50,
            width: '100%',
            justifyContent: 'center',
          }}>
          <Text style={styles.text}>Gallery</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderRadius: 20,
          }}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;
            return (
              <View
                key={index}
                style={{
                  // backgroundColor: '#68e3c8',
                  flex: 1,
                  height: 50,
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate(route.name)}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    borderBottomWidth: 3,
                    borderBottomColor: isFocused && 'blue',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: isFocused ? 'blue' : '#3C4DAC',
                      opacity: isFocused ? 1 : 0.5,
                    }}>
                    {label}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Top;

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'blue',
    fontWeight: 'bold',
  },
});
