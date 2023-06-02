import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import {Avatar} from '@rneui/themed';

const UserModal = props => {

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        style={styles.modal}
        visible={props.visible}
        onRequestClose={props.onRequestClose}>
        <View style={styles.modalBody}>
          <Pressable onPress={props.hideModal}>
            <View style={styles.modal}>
              <TouchableOpacity
                onPress={props.showInnerModal}>
                <Avatar
                  size={80}
                  rounded
                  containerStyle={styles.avatar}
                  source={{
                    uri: props.image
                  }}
                />
              </TouchableOpacity>
              <Text style={styles.name}>{props.fullName}</Text>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={props.onPressLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    marginTop: 20,
  },
  modalBody: {
    flex: 1,
    backgroundColor: '#000000bb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fcfcf7',
    paddingHorizontal: 120,
    paddingVertical: 40,
    marginHorizontal: 30,
    marginBottom: 300,
    borderRadius: 10,
    borderWidth: 1,
  },
  closeButton: {
    position: 'absolute',
    right: -180,
    bottom: 10,
    color: '#000000',
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: '20%',
  },
  logoutButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
    paddingVertical: '10%',
    backgroundColor: '#e8e8e6',
    borderRadius: 10,
    borderWidth: 1,
  },
  logoutButtonText: {
    fontWeight: 500,
    fontSize: 18,
  },
  avatar: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: '7%',
  },
});

export default UserModal;
