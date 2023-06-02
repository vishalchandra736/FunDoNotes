import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';


const Footer = ({navigation}) => {
  return (
    <View>
      <View style={styles.footer}>
        <TouchableOpacity>
          <MaterialCommunity
            name="checkbox-outline"
            size={25}
            style={styles.innerFooter}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunity
            name="brush"
            size={25}
            style={styles.innerFooter}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunity
            name="microphone-outline"
            size={25}
            style={styles.innerFooter}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunity
            name="image-outline"
            size={25}
            style={styles.innerFooter}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.innerPlusButton}>
        <TouchableOpacity onPress={() => navigation.navigate('CreateNotes')}>
          <MaterialCommunity name="plus" size={45} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#e8e8e6',
    flexDirection: 'row',
    bottom: '0%',
    left: '0%',
    right: '0%',
    position: 'absolute',
    padding: 12,
    justifyContent: 'flex-start',
  },
  innerFooter: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  innerPlusButton: {
    backgroundColor: '#e8e8e6',
    borderRadius: 20,
    borderColor: '#fcfcf7',
    width: 80,
    height: 80,
    borderWidth: 5,
    borderBottomColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    position: 'absolute',
    bottom: '5%',
    right: '10%',
  },
});
export default Footer;
