import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screen/Login/Login';
import Registration from '../screen/Registration/Registration';
import Password from '../screen/Password/Password';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Stack = createStackNavigator();

const AuthStack = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '42936328642-n0vdggqg133e2mdslrtehlv0mac8uj27.apps.googleusercontent.com',
    });
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="Password" component={Password} />
    </Stack.Navigator>
  );
};

export default AuthStack;
