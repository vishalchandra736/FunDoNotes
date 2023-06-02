import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList, TouchableOpacity, Text} from 'react-native';
import {fetchNotesData} from '../services/NotesServices';
import NoteCard from '../components/NoteCard';
import {AuthContext} from '../navigation/AuthProvider';
import styles from '../styles/GlobalStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Archive = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [archivedNotes, setArchivedNotes] = useState();
  const [layout, setLayout] = useState(false);

  const fetchArchiveNoteData = async () => {
    try {
      const noteData = await fetchNotesData(user);
      const archive = [];
      noteData.forEach(note => {
        if (note.archive) {
          archive.push(note);
        }
      });
      setArchivedNotes(archive);
      console.log(archive);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchArchiveNoteData();
    });
    return unsubscribe;
  }, [fetchArchiveNoteData, navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#e8e8e6',
      }}>
      <View style={{flexDirection: 'row', margin: '2%', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons
            name="menu"
            size={30}
            style={{margin: '2%'}}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 20, margin: '2%', padding: '2%', width: 300}}>Archive</Text>
        <TouchableOpacity onPress={() => setLayout(!layout)}>
          <MaterialCommunityIcons
            name={layout ? 'view-list-outline' : 'view-grid-outline'}
            size={30}
            style={{margin: '2%'}}
          />
        </TouchableOpacity>
      </View>

      <FlatList
      numColumns={layout ? 1 : 2}
        data={archivedNotes}
        renderItem={({item}) => (
          <TouchableOpacity
            style={layout ? styles.listLayout : styles.gridLayout}
            onPress={() =>
              navigation.navigate('CreateNotes', {
                title: item.title,
                notes: item.notes,
                pinned: item.pinned,
                archive: item.archive,
                noteId: item.id,
              })
            }>
            <View>
              <NoteCard item={item} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Archive;
