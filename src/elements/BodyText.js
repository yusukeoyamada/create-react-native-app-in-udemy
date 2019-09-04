import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class BodyText extends Component {
  render() {
    return (
      // divみたいなもの
      <View>
        <Text style={styles.text}>Hello World!!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#DDD',
    backgroundColor: '#eee',
  },
});

export default BodyText;
