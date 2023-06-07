import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../navigation/AuthProvider';
import {fetchLabelData} from '../services/LabelServices';
import LabelCheckBox from '../components/LabelCheckBox';
import {useDispatch, useSelector} from 'react-redux';
import {labelsData} from '../redux/Action';

const Labels = ({navigation, route}) => {
  const {user} = useContext(AuthContext);
  const dispatch = useDispatch();
  const labelData = useSelector(state => state.labels);
  const label = route.params?.labelData;
  const noteId = route.params?.nodeId;
  const [checkedLabels, setCheckedLabels] = useState(label || []);

  const fetchLabel = async () => {
    const data = await fetchLabelData(user.uid);
    dispatch(labelsData(data));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchLabel();
    });
    return unsubscribe;
  }, [fetchLabel, navigation]);

  const handleCheck = data => () => {
    if (!checkedLabels.find(element => element.id === data.id)) {
      setCheckedLabels([...checkedLabels, data]);
    } else {
      let temp = checkedLabels.filter(element => element.id !== data.id);
      setCheckedLabels(temp);
    }
  };

  const isChecked = data => {
    return checkedLabels.find(element => element.id === data.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('CreateNotes', {
            checkedLabelsData: checkedLabels,
            noteId: noteId, 
          })
        }}>
          <MaterialCommunityIcons name="arrow-left" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Labels</Text>
      </View>
      <View style={{marginBottom: '35%'}}>
        <ScrollView>
          <View style={{marginTop: 5}}>
            {
              labelData.map((item) => (
                <LabelCheckBox 
                key={item.id}
                item={item}
                checked = {isChecked(item)}
                unchecked = {handleCheck(item)}
                />
              ))
            }
          </View>
        </ScrollView>
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

export default Labels;
