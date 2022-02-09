import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const AboutScreen = ({route}) => {
  const email = route.params.email;
  return (
    <View style={styles.container}>
      <Text>เกี่ยวกับเรา</Text>
      <Text>Email: {email}</Text>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});