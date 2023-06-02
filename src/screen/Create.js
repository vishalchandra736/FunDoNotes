import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../navigation/AuthProvider';
import {addLabelData, fetchLabelData} from '../services/LabelServices';
import LabelCard from '../components/LabelCard';

const Create = ({navigation}) => {
  const [label, setLabel] = useState();
  const [icon, setIcon] = useState(false);
  const {user} = useContext(AuthContext);
  const [labelData, setLabelData] = useState();

  const fetchLabel = async () => {
    const labelData = await fetchLabelData(user.uid);
    setLabelData(labelData);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchLabel();
    });
    return unsubscribe;
  }, [fetchLabel, navigation]);

  const handelAddLabel = async () => {
    setIcon(!icon);
    if (label !== '') {
      await addLabelData(user.uid, label);
      setLabel('');
      fetchLabel();
    }
  };

  const handelOnTextChange = text => {
    setLabel(text);
    if (text !== '') {
      setIcon(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Labels</Text>
      </View>
      <View style={styles.InputContainer}>
        <TouchableOpacity onPress={() => setIcon(!icon)}>
          <MaterialCommunityIcons
            name={icon ? 'close' : 'plus'}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Create new label"
          style={styles.Input}
          value={label}
          onChangeText={text => handelOnTextChange(text)}
        />
        <TouchableOpacity onPress={handelAddLabel}>
          <MaterialCommunityIcons
            name={icon ? 'check' : null}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={{marginBottom: '35%'}}>
        <FlatList
          data={labelData}
          key={item => item.id}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <LabelCard item={item} fetchLabel={fetchLabel}/>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '2%',
    backgroundColor: '#fcfcf7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8e8e6',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 600,
    margin: '2%',
    padding: '2%',
  },
  backIcon: {
    fontSize: 30,
  },
  InputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '2%',
  },
  Input: {
    fontSize: 18,
    margin: '2%',
    padding: '2%',
    width: 320,
  },
  icon: {
    fontSize: 25,
  },
});

export default Create;
