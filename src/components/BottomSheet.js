import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomSheet = props => {
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
              <TouchableOpacity onPress={props.onPressDelete}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialCommunityIcons name="trash-can-outline" size={30} />
                  <Text style={styles.text}>Delete</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.rowAlign}>
              <TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialCommunityIcons name="content-copy" size={30} />
                  <Text style={styles.text}>Make a copy</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.rowAlign}>
              <TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialCommunityIcons
                    name="share-variant-outline"
                    size={30}
                  />
                  <Text style={styles.text}>Send</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.rowAlign}>
              <TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialCommunityIcons
                    name="account-plus-outline"
                    size={30}
                  />
                  <Text style={styles.text}>Collaborator</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.rowAlign}>
              <TouchableOpacity onPress={props.onPressLabel}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialCommunityIcons name="label-outline" size={30} />
                  <Text style={styles.text}>Labels</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.rowAlign}>
              <TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialCommunityIcons
                    name="help-circle-outline"
                    size={30}
                  />
                  <Text style={styles.text}>Help & feedback</Text>
                </View>
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
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  viewBody: {
    backgroundColor: '#e8e8e6',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  rowAlign: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: '3%',
  },
  text: {
    fontSize: 15,
    fontWeight: 500,
    textAlign: 'center',
    marginHorizontal: '10%',
  },
});

export default BottomSheet;
