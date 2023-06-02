import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Footer from '../components/Footer'

const Reminder = () => {
  return (
    <View style={styles.body}>
      <Text>Reminder</Text>
      <Footer />  
    </View>
    
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  }
});

export default Reminder