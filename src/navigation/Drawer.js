import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Reminder from '../screen/Reminder';
import Create from '../screen/Create';
import Archive from '../screen/Archive';
import Notes from '../screen/Notes/Notes';
import CustomDrawer from './CustomDrawer';
import DeletesNotes from '../screen/DeletesNotes';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName="Notes"
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="Notes" component={Notes} />
      <Drawer.Screen name="Reminder" component={Reminder} />
      <Drawer.Screen name="Create new label" component={Create} />
      <Drawer.Screen name="Archive" component={Archive} />
      <Drawer.Screen name="Deleted" component={DeletesNotes} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
