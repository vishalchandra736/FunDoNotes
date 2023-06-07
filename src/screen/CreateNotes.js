import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState, useContext} from 'react';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {addNotesData, updateNotesData} from '../services/NotesServices';
import {AuthContext} from '../navigation/AuthProvider';
import BottomSheet from '../components/BottomSheet';
import uuid from 'react-native-uuid';
import Chip from '../components/Chip';

const CreateNotes = ({navigation, route}) => {
  const noteData = route.params;
  const [title, setTitle] = useState(noteData ? noteData?.title : '');
  const [notes, setNotes] = useState(noteData ? noteData?.notes : '');
  const {user} = useContext(AuthContext);
  const [pinned, setPinned] = useState(noteData ? noteData?.pinned : false);
  const [archive, setArchive] = useState(noteData ? noteData?.archive : false);
  const [deleted, setDeleted] = useState(noteData ? noteData?.deleted : false);
  const [bottomSheet, setBottomSheet] = useState(false);
  const selfNoteID = uuid.v4();
  const labelData = route.params.checkedLabelsData || noteData?.labelData || [];
  const handleAddData = async () => {
    try {
      await addNotesData(
        user.uid,
        selfNoteID,
        title,
        notes,
        pinned,
        archive,
        deleted,
        labelData,
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateData = async () => {
    try {
      await updateNotesData(
        user.uid,
        noteData.noteId,
        title,
        notes,
        pinned,
        archive,
        deleted,
        labelData,
      );
      console.log(deleted);
    } catch (err) {
      console.log(err);
    }
  };

  const handelBackPress = () => {
    if ((title || notes) === '') {
      navigation.goBack();
    } else {
      if (noteData?.noteId) {
        handleUpdateData(), navigation.goBack();
      } else {
        handleAddData(), navigation.goBack();
      }
    }
  };

  return (
    <View style={styles.body}>
      <View style={styles.headerIcon}>
        <View style={styles.headerIcon}>
          <TouchableOpacity onPress={handelBackPress}>
            <MaterialCommunity name="arrow-left" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerIcon}>
          <TouchableOpacity onPress={() => setPinned(!pinned)}>
            <MaterialCommunity
              name={pinned ? 'pin' : 'pin-outline'}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunity name="bell-plus-outline" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setArchive(!archive)}>
            <MaterialCommunity
              name={
                archive ? 'archive-arrow-down' : 'archive-arrow-down-outline'
              }
              size={30}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TextInput
          placeholder="Title"
          style={styles.inputTitle}
          multiline={true}
          value={title}
          onChangeText={value => setTitle(value)}
        />
        <TextInput
          placeholder="Note"
          style={styles.inputNote}
          multiline={true}
          value={notes}
          onChangeText={value => setNotes(value)}
        />
        <ScrollView >
          <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
            {labelData.map(item => (
              <View>
                <Chip key={item.id}>{item.label}</Chip>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <View style={styles.headerIcon}>
          <View style={styles.headerIcon}>
            <TouchableOpacity>
              <MaterialCommunity name="plus-box-outline" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="color-palette-outline" style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerIcon}>
            <Text style={styles.edited}>Edited</Text>
          </View>
          <View style={styles.headerIcon}>
            <TouchableOpacity onPress={() => setBottomSheet(!bottomSheet)}>
              <MaterialCommunity name="dots-vertical" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <BottomSheet
          visible={bottomSheet}
          onRequestClose={() => setBottomSheet(false)}
          hideModal={() => setBottomSheet(false)}
          onPressDelete={() => setDeleted(!deleted)}
          onPressLabel={() =>
            navigation.navigate('Labels', {
              noteId: noteData.noteId,
              labelData: labelData,
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fcfcf7',
    flex: 1,
  },
  headerIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    padding: 15,
    fontSize: 25,
  },
  footer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    position: 'absolute',
    bottom: '0%',
  },
  edited: {
    padding: 15,
    marginHorizontal: '21.5%',
  },
  inputTitle: {
    marginHorizontal: 12,
    fontSize: 30,
    padding: 10,
  },
  inputNote: {
    marginHorizontal: 12,
    fontSize: 20,
    padding: 10,
  },
});

export default CreateNotes;
