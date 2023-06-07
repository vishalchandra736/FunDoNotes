import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList, TouchableOpacity, Text} from 'react-native';
import {fetchNotesData} from '../services/NotesServices';
import NoteCard from '../components/NoteCard';
import {AuthContext} from '../navigation/AuthProvider';
import styles from '../styles/GlobalStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {changeLayout} from '../redux/Action';

const Deletes = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [deletedNotes, setDeletedNotes] = useState();
  const dispatch = useDispatch();
  const layout = useSelector(state => state.layout);

  const fetchDeleteNoteData = async () => {
    try {
      const noteData = await fetchNotesData(user);
      const deletedData = [];
      noteData.forEach(note => {
        if (note.deleted) {
          deletedData.push(note);
        }
      });
      setDeletedNotes(deletedData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeLayout = () => {
    dispatch(changeLayout());
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchDeleteNoteData();
    });
    return unsubscribe;
  }, [fetchDeleteNoteData, navigation]);

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
        <Text style={{fontSize: 20, margin: '2%', padding: '2%', width: 300}}>
          Deleted
        </Text>
        <TouchableOpacity
          onPress={handleChangeLayout}>
          <MaterialCommunityIcons
            name={layout ? 'view-grid-outline' : 'view-list-outline'}
            size={30}
            style={{margin: '2%'}}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        key={layout ? 1 : 2}
        numColumns={layout ? 1 : 2}
        data={deletedNotes}
        renderItem={({item}) => (
          <TouchableOpacity
            style={layout ? styles.listLayout : styles.gridLayout}
            onPress={() =>
              navigation.navigate('CreateNotes', {
                title: item.title,
                notes: item.notes,
                pinned: item.pinned,
                archive: item.archive,
                delete: item.delete,
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

export default Deletes;
