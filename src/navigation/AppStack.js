import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyDrawer from './Drawer';
import CreateNotes from '../screen/CreateNotes';
import SearchNote from '../screen/SearchNote';
import Labels from '../screen/Labels';


const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen name="MyDrawer" component={MyDrawer} />
      <Stack.Screen name="CreateNotes" component={CreateNotes} />
      <Stack.Screen name="SearchNote" component={SearchNote} />
      <Stack.Screen name="Labels" component={Labels} />
      
    </Stack.Navigator>
  );
};

export default AppStack;
