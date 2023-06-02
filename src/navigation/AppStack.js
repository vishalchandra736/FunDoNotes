import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyDrawer from './Drawer';
import CreateNotes from '../screen/CreateNotes';
import SearchNote from '../screen/SearchNote';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen name="MyDrawer" component={MyDrawer} />
      <Stack.Screen name="CreateNotes" component={CreateNotes} />
      <Stack.Screen name="SearchNote" component={SearchNote} />
    </Stack.Navigator>
  );
};

export default AppStack;
