import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {fetchNotesData} from '../services/NotesServices';
import NoteCard from '../components/NoteCard';
import {AuthContext} from '../navigation/AuthProvider';

const SearchNote = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [notesData, setNotesData] = useState('');
  const [searchData, setSearchData] = useState('');

  const fetchNoteData = async () => {
    try {
      const noteData = await fetchNotesData(user);
      const notes = [];
      noteData.forEach(note => {
        notes.push(note);
      });
      setNotesData(notes);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchTerm = text => {
    const searchData = notesData.filter(
      item =>
        item.title?.toLowerCase().includes(text.toLowerCase()) ||
        item.notes?.toLowerCase().includes(text.toLowerCase()),
    );
    setSearchData(searchData);
  };

  useEffect(() => {
    fetchNoteData();
  }, []);

  return (
    <View>
      <View style={styles.body}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <MaterialCommunityIcons name="arrow-left" style={styles.backArrow} />
        </TouchableOpacity>
        <TextInput
          placeholder="Search Note"
          style={styles.placeholderStyle}
          onChangeText={text => getSearchTerm(text)}
        />
      </View>
      <View>
        <FlatList
          data={searchData}
          renderItem={({item}) => (
            <TouchableOpacity
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
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#e8e8e6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 40,
    padding: 10,
  },
  placeholderStyle: {
    fontSize: 18,
    margin: '2%',
  },
});

export default SearchNote;
