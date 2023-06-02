import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const NoteCard = props => { 
  return ( 
    <View>
      <Text style={styles.listCardTitle}>{props.item.title}</Text>
      <Text style={styles.listCardNotes}>{props.item.notes}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  
  listCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#303030',
    padding: 5,
  },
  listCardNotes: {
    fontSize: 16,
    padding: 5,
  },
  gridCard: {
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: '#918f3f',
  },
  gridCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#303030',
    padding: 5,
  },
  gridCardNotes: {
    fontSize: 16,
    padding: 5,
  },
});

export default NoteCard;
