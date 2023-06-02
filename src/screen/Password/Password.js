import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import styles from './Password.style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GlobalStyles from '../../../src/styles/GlobalStyles';
import {AuthContext} from '../../navigation/AuthProvider';

const Password = ({navigation}) => {
  const [password, setPassword] = useState('');
  //const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({});

  const {resetPassword} = useContext(AuthContext);

  const getFirebaseError = code => {
    const temp = {};
    if (code === 'auth/user-not-found') {
      temp['email'] = 'No user found!';
      isValid = false;
    }
    if (code === 'auth/wrong-password') {
      temp['password'] = 'The password is invalid!';
    }
    setError(temp);
  };

  const onPressSubmit = () => {
    resetPassword(password, getFirebaseError);
    navigation.navigate('Login');
  };

  const validations = () => {
    let isValid = true;
    let tempErrors = {};

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(password)) {
      isValid = false;
      tempErrors['password'] = 'Please, enter a valid password';
    }

    //   if (confirmPassword !== password) {
    //     isValid = false;
    //     tempErrors['confirmPassword'] = 'Your password is incorrect';
    //   }

    setError(tempErrors);
    return isValid;
  };

  const onSubmit = () => {
    if (validations()) {
      onPressSubmit();
    }
  };

  return (
    <View style={styles.body}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Forget Password?</Text>
      </View>
      <Text style={styles.text}>
        Don't worry! It happens. Reset your password here.
      </Text>
      <View style={styles.textView}>
        <View style={styles.textInnerView}>
          <MaterialIcons
            name="alternate-email"
            size={30}
            style={styles.textIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={text => setPassword(text)}
            value={password}
          />
        </View>
        {error.password && (
          <Text style={GlobalStyles.error}>{error.password}</Text>
        )}
        {/* <View style={styles.textInnerView}>
          <MaterialIcons
            name="lock-outline"
            size={30}
            style={styles.textIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Confirm New Password"
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry={true}
          />
        </View>
        {error.confirmPassword && <Text style={styles.error}>{error.confirmPassword}</Text>} */}
      </View>
      <View>
        <TouchableOpacity style={GlobalStyles.buttons} onPress={onSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Password;
