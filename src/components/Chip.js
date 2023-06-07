import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Chip = ({children}) => {
  return (
    <View>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    margin: 10,
    backgroundColor: '#e8e8e6',
    padding: 10,
    borderRadius: 10,
  },
});

export default Chip;
