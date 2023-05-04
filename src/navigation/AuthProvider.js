import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }
            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }
            if (error.code === 'auth/user-not-found') {
              console.log('That email address not found!');
            }
            console.error(error);
          }
        },
        registration: async (email, password) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password);
              // .signInWithEmailAndPassword(email, password);
            console.log('User account created & signed in!');
          } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }
            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }
            console.error(error);
          }
        },
        logout: async (email, password) => {
          try {
            await auth().signOut();
            console.log('User signed out!');
          } catch (error) {
            console.log(error);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
