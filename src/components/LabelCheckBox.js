import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const LabelCheckBox = ({item, checked, unchecked}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '2%',
      }}>
      <MaterialCommunityIcons name="label-outline" style={styles.icon} />
      <Text style={styles.labelStyle} numberOfLines={1} ellipsizeMode="tail">
        {item.label}
      </Text>
      <TouchableOpacity onPress={unchecked}>
        <MaterialCommunityIcons
          name={checked ? 'checkbox-outline' : 'checkbox-blank-outline'}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 25,
  },
  labelStyle: {
    fontSize: 18,
    margin: '1.5%',
    padding: '1.5%',
    width: 300,
  },
});

export default LabelCheckBox;
