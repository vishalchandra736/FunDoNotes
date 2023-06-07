import React, {useState, useContext, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {fetchLabelData} from '../services/LabelServices';
import {AuthContext} from './AuthProvider';
import {useDispatch, useSelector} from 'react-redux';
import {labelsData} from '../redux/Action';

const CustomDrawer = ({props, navigation}) => {
  //const [fetchLabel, setFetchLabel] = useState();
  const {user} = useContext(AuthContext);
  const dispatch = useDispatch();
  const labelData = useSelector(state => state.labels);

  const fetchLabelDataFunction = async () => {
    try {
      const labels = await fetchLabelData(user.uid);
      dispatch(labelsData(labels));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchLabelDataFunction();
    });
    return unsubscribe;
  }, [fetchLabelDataFunction, navigation]);

  return (
    <View style={styles.drawer}>
      <DrawerContentScrollView {...props}>
        <View>
          <Text style={styles.heading}>FunDoNotes</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.home}
            onPress={() => navigation.navigate('Notes')}>
            <MaterialCommunityIcons name="lightbulb-outline" size={35} />
            <Text style={styles.text}>Notes</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.home}
            onPress={() => navigation.navigate('Reminder')}>
            <MaterialCommunityIcons name="bell-outline" size={35} />
            <Text style={styles.text}>Reminder</Text>
          </TouchableOpacity>
        </View>
        <View>
          {labelData?.length > 0 ? (
            <View
              style={{
                borderBottomWidth: 1.5,
                borderTopWidth: 1.5,
                paddingVertical: 5,
                borderColor: '#918f3f',
                marginVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 20,
                  marginVertical: 10,
                }}>
                <Text>Label</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Create new label')}>
                  <Text>Edit</Text>
                </TouchableOpacity>
              </View>

              {labelData?.map(item => (
                <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: 10,
                      marginVertical: 10,
                      alignItems: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name="label-outline"
                      size={20}
                      style={{marginHorizontal: 10}}
                    />
                    <Text style={{fontSize: 16}} numberOfLines={1}>{item.label}</Text>
                  </View>
                </TouchableOpacity>
              ))}
              <View>
                <TouchableOpacity
                  style={styles.home}
                  onPress={() => navigation.navigate('Create new label')}>
                  <MaterialCommunityIcons name="plus" size={35} />
                  <Text style={styles.text}>Create new label</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                style={styles.home}
                onPress={() => navigation.navigate('Create new label')}>
                <MaterialCommunityIcons name="plus" size={35} />
                <Text style={styles.text}>Create new label</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View>
          <TouchableOpacity
            style={styles.home}
            onPress={() => navigation.navigate('Archive')}>
            <MaterialCommunityIcons
              name="archive-arrow-down-outline"
              size={35}
            />
            <Text style={styles.text}>Archive</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.home}
            onPress={() => navigation.navigate('Deleted')}>
            <MaterialCommunityIcons name="trash-can-outline" size={35} />
            <Text style={styles.text}>Deleted</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.home}
            onPress={() => navigation.navigate('Archive')}>
            <MaterialCommunityIcons name="cog-outline" size={35} />
            <Text style={styles.text}>Settings</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.home}
            onPress={() => navigation.navigate('Archive')}>
            <MaterialCommunityIcons name="help-circle-outline" size={35} />
            <Text style={styles.text}>Help & feedback</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: '#fcfcf7',
  },
  heading: {
    fontSize: 24,
    margin: 10,
    padding: 10,
  },
  home: {
    flexDirection: 'row',
    margin: 10,
  },
  text: {
    marginLeft: 12,
    fontSize: 17,
    alignSelf: 'center',
  },
});

export default CustomDrawer;
