import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const CustomDrawer = ({props, navigation}) => {
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
          <View>
            <TouchableOpacity
              style={styles.home}
              onPress={() => navigation.navigate('Create new label')}>
              <MaterialCommunityIcons name="plus" size={35} />
              <Text style={styles.text}>Create new label</Text>
            </TouchableOpacity>
          </View>
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
