import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../navigation/AuthProvider';
import styles from './Notes.style';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar} from '@rneui/themed';
import Footer from '../../components/Footer';
import UserModal from '../../components/UserModal';
import {fetchUserData, updateProfile} from '../../services/UserServices';
import {fetchNotesData} from '../../services/NotesServices';
import InnerModal from '../../components/InnerModal';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import NoteCard from '../../components/NoteCard';
import {changeLayout} from '../../redux/Action';
import {useDispatch, useSelector} from 'react-redux';

const Notes = ({navigation, layout}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [innerModal, setInnerModal] = useState(false);
  const [image, setImage] = useState('');
  const {user, logout} = useContext(AuthContext);
  const [fullName, setFullName] = useState('');
  const [otherNotes, setOtherNotes] = useState();
  const [pinnedNotes, setPinnedNotes] = useState();
  const dispatch = useDispatch();
  layout = useSelector(state => state.layout);

  const uploadedCloud = async img => {
    try {
      const uploadUri = img;
      let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
      await storage().ref(filename).putFile(uploadUri);
      const url = await storage().ref(filename).getDownloadURL();
      updateProfile(user, url);
    } catch (err) {
      console.log(err);
    }
  };

  const takePhotoFromCamera = async () => {
    try {
      const result = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });
      console.log(result);
      setInnerModal(!innerModal);
      uploadedCloud(result.path);
    } catch (err) {
      console.log(err);
    }
  };

  const choosePhotoFromLibrary = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      console.log(result);
      setInnerModal(!innerModal);
      uploadedCloud(result.path);
    } catch (err) {
      console.log(err);
    }
  };

  const onPressLogout = () => {
    logout();
  };

  const fetchData = async () => {
    try {
      const data = await fetchUserData(user);
      setFullName(data[0]);
      setImage(data[1]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNoteData = async () => {
    try {
      const noteData = await fetchNotesData(user);
      const pin = [];
      const other = [];
      noteData.forEach(note => {
        if (note.pinned && !note.archive && !note.deleted) {
          pin.push(note);
        } else if (!note.pinned && !note.archive  && !note.deleted) {
          other.push(note);
        }
      });
      setPinnedNotes(pin);
      setOtherNotes(other);
      console.log(other);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeLayout = () => {
    dispatch(changeLayout());
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
      fetchNoteData();
    });
    return unsubscribe;
  }, [fetchData, fetchNoteData, navigation, uploadedCloud]);

  const PinnedFlatList = () => {
    return (
      <View>
        {pinnedNotes?.length ? (
          <Text style={styles.headings}>Pinned</Text>
        ) : null}
        <FlatList
          numColumns={layout ? 1 : 2}
          data={pinnedNotes}
          ListFooterComponent={OtherFlatList}
          renderItem={({item}) => (
            <TouchableOpacity
              style={layout ? styles.listLayout : styles.gridLayout}
              onPress={() =>
                navigation.navigate('CreateNotes', {
                  title: item.title,
                  notes: item.notes,
                  pinned: item.pinned,
                  archive: item.archive,
                  deleted: item.deleted,
                  noteId: item.id,
                  labelData: item.labelData,
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

  const OtherFlatList = () => {
    return (
      <View>
        {pinnedNotes?.length ? <Text style={styles.headings}>Others</Text> : ''}
        <FlatList
          numColumns={layout ? 1 : 2}
          data={otherNotes}
          renderItem={({item}) => (
            <TouchableOpacity
              style={layout ? styles.listLayout : styles.gridLayout}
              onPress={() =>
                navigation.navigate('CreateNotes', {
                  title: item.title,
                  notes: item.notes,
                  pinned: item.pinned,
                  archive: item.archive,
                  deleted : item.deleted,
                  noteId: item.id,
                  labelData: item.labelData,
                })
              }>
                {console.log("Item" ,item)}
              <View>
                <NoteCard item={item} />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  return (
    <View style={styles.background}>
      <View style={{justifyContent: 'flex-start'}}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => {
              navigation.openDrawer();
            }}>
            <MaterialCommunity name="menu" size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('SearchNote')}>
            <Text style={styles.searchText}>Search your notes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleChangeLayout}>
            <MaterialCommunity
              name={layout ? 'view-grid-outline' : 'view-list-outline'}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setModalVisible(!modalVisible)}>
            <Avatar
              size={30}
              rounded
              containerStyle={{backgroundColor: 'purple'}}
              source={
                image
                  ? {uri: image}
                  : {
                      uri: 'https://t4.ftcdn.net/jpg/03/75/38/73/240_F_375387396_wSJM4Zm0kIRoG7Ej8rmkXot9gN69H4u4.jpg',
                    }
              }
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex: 1, marginBottom: '15%'}}>
        <FlatList ListHeaderComponent={PinnedFlatList} />
        <UserModal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
          hideModal={() => setModalVisible(false)}
          onPressLogout={onPressLogout}
          fullName={fullName}
          showInnerModal={() => {
            setInnerModal(!innerModal);
          }}
          image={image}
        />
        <InnerModal
          visible={innerModal}
          onRequestClose={() => setInnerModal(false)}
          hideModal={() => setInnerModal(false)}
          takePhotoFromCamera={() => takePhotoFromCamera()}
          choosePhotoFromLibrary={() => choosePhotoFromLibrary()}
        />
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
};

export default Notes;
