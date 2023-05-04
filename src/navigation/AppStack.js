import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Home from '../screen/Home/Home';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
  )
}

export default AppStack;