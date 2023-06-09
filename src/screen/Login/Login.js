import React, {useContext, useState} from 'react';
import {Text, TextInput, View, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './Login.style';
import {AuthContext} from '../../navigation/AuthProvider';
import GlobalStyles from '../../../src/styles/GlobalStyles'; 

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});

  const {login, googleSignIn} = useContext(AuthContext);

  const onPressLogin = () => {
    login(email, password, getFirebaseError);
    // navigation.navigate('Notes');
  };

  const onPressRegister = () => {
    navigation.navigate('Registration');
  };

  const onPressForgetPassword = () => {
    navigation.navigate('Password');
  };

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

  const validations = () => {
    let isValid = true;
    let tempErrors = {};

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex =
      /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=.*[@#$%&*+_-]).{6,})\S$/;

    if (!emailRegex.test(email)) {
      isValid = false;
      tempErrors['email'] = 'Please, enter a valid email';
    }

    if (!passwordRegex.test(password)) {
      isValid = false;
      tempErrors['password'] = 'Please, enter a valid password';
    }

    setError(tempErrors);
    return isValid;
  };

  const onSubmit = () => {
    if (validations()) {
      onPressLogin();
    }
  };

  return (
    <View style={styles.body}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Login</Text>
      </View>
      <View style={styles.textView}>
        <View style={styles.textInnerView}>
          <MaterialIcon
            name="alternate-email"
            size={30}
            style={styles.textIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Email ID"
            onChangeText={text => setEmail(text)}
            value={email}
          />
        </View>
        {error.email && <Text style={GlobalStyles.error}>{error.email}</Text>}
        <View style={styles.textInnerView}>
          <MaterialIcon name="lock-outline" size={30} style={styles.textIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
        </View>
        {error.password && <Text style={GlobalStyles.error}>{error.password}</Text>}
      </View>
      <View>
        <TouchableOpacity
          style={styles.forgetPasswordButton}
          onPress={onPressForgetPassword}>
          <Text style={styles.forgetPasswordButtonText}>Forget Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity style={GlobalStyles.buttons} onPress={onSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={()=>{googleSignIn()}}>
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.newAccountButton}
          onPress={onPressRegister}>
          <Text style={styles.newAccountButtonText}>Create New Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
