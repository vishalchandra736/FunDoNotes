import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

const InnerModal = props => {

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={props.onRequestClose}
        style={styles.body}>
        <View style={styles.viewBody}>
          <Pressable onPress={props.hideModal}>
            <View style={styles.rowAlign}>
              <View>
                <TouchableOpacity onPress={props.takePhotoFromCamera}>
                  <Text style={styles.text}>Camera</Text>
                  <MaterialCommunity name="camera" size={60} />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={props.choosePhotoFromLibrary}>
                  <Text style={styles.text}>Galary</Text>
                  <MaterialCommunity name="image" size={60} />
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  viewBody: {
    backgroundColor: '#fcfcf7',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  rowAlign: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '10%',
    borderTopWidth: 0.5,
    borderRadius: 20,
  },
  text: {
    fontSize: 15,
    fontWeight: 500,
    textAlign: 'center',
  },
});

export default InnerModal;
