import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState, useContext} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {updateLabelData, deleteLabelData} from '../services/LabelServices';
import {AuthContext} from '../navigation/AuthProvider';

const LabelCard = props => {
  const {user} = useContext(AuthContext);
  const [icon, setIcon] = useState(false);
  const [labelText, setLabelText] = useState(
    props.item.label ? props.item.label : '',
  );

  const handelOnEditLabel = async () => {
    setIcon(!icon);
    await updateLabelData(user.uid, props.item.id, labelText);
    await props.fetchLabel();
  };

  const alertBox = async () => {
    await deleteLabelData(user.uid, props.item.id), await props.fetchLabel();
  };

  const handelOnDeleteLabel = () => {
    setIcon(!icon);
    Alert.alert(
      'Delete label?',
      'We will delete this label and remove it from all of your notes. Your notes would not be deleted.',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Delete',
          onPress: () => alertBox(),
        },
      ],
    );
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        margin: '2%',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#918f3f',
      }}>
      <TouchableOpacity onPress={handelOnDeleteLabel}>
        <MaterialCommunityIcons
          name={icon ? 'delete-outline' : 'label-outline'}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TextInput
        placeholder={''}
        style={styles.labelStyle}
        value={labelText}
        onChangeText={text => setLabelText(text)}
      />
      <TouchableOpacity onPress={handelOnEditLabel}>
        <MaterialCommunityIcons
          name={icon ? 'check' : 'pencil'}
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
    margin: '2%',
    padding: '2%',
    width: 320,
  },
});

export default LabelCard;
