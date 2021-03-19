import { View } from 'native-base';
import React from 'react';
import { Text, StyleSheet, Button,TouchableOpacity } from 'react-native';

const HomeScreen = ({navigation}) => {
  // console.log(props);
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('QRcode')}>
        <Text>goto scan qrcode</Text>
        <Button title="goto scan qrcode" onPress={() => navigation.navigate('QRcode')} > </Button>
      </TouchableOpacity>
    </View>);
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default HomeScreen;
