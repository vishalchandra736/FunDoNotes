import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Chip from './Chip';

const NoteCard = props => {
  const data = props?.item?.labelData;
  console.log(data);
  return (
    <View>
      <Text style={styles.cardTitle}>{props.item.title}</Text>
      <Text style={styles.cardNotes}>{props.item.notes}</Text>
      <View>
        {
          data && data.map(item => (
            <Chip key={item.id}>{item.label}</Chip>
          )) 
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#303030',
    padding: 5,
  },
  cardNotes: {
    fontSize: 16,
    padding: 5,
  },
});

export default NoteCard;
