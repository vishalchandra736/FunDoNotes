import React, {createContext, useState} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {addUserData} from '../services/UserServices';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password, errorCallback) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (error) {
            errorCallback(error.code);
            console.error(error);
            console.log(error.code, 'Code error');
          }
        },
        registration: async (email, password, errorCallback, name) => {
          try {
            const uDetails = await auth().createUserWithEmailAndPassword(
              email,
              password,
            );
            addUserData(email, name, uDetails.user.uid);
            console.log('User account created & signed in!');
          } catch (error) {
            errorCallback(error.code);
            console.error(error);
            console.log(error.code, 'Code error');
          }
        },
        resetPassword: async (email, errorCallback) => {
          try {
            await auth().sendPasswordResetEmail(email);
            Alert.alert('Reset link send to your email!');
            console.log('Reset link send to your email!');
          } catch (error) {
            errorCallback(error.code);
            console.error(error);
            console.log(error.code, 'Code error');
          }
        },
        logout: async () => {
          try {
            !user.idToken
              ? await auth().signOut()
              : await GoogleSignin.signOut();
            setUser(null);
          } catch (error) {
            console.log(error);
          }
        },
        googleSignIn: async () => {
          try {
            console.log('in method');
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo);
            console.log('done');
            setUser(userInfo);
          } catch (error) {
            console.log(error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
            } else {
              // some other error happened
            }
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
