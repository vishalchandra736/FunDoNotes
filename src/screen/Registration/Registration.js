import React, {useContext, useState} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './Registration.style';
import {AuthContext} from '../../navigation/AuthProvider';
import GlobalStyles from '../../../src/styles/GlobalStyles';

const Registration = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});

  const {registration} = useContext(AuthContext);

  const handleSingUp = () => {
    registration(email, password, getFirebaseError, name);
  };

  const getFirebaseError = code => {
    const temp = {};
    if (code === 'auth/email-already-in-use') {
      temp['email'] = 'That email address is already in use!';
      isValid = false;
    }
    if (code === 'auth/invalid-email') {
      temp['email'] = 'That email address is invalid!';
    }
    setError(temp);
  };

  const validations = () => {
    let isValid = true;
    let tempErrors = {};

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex =
      /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=.*[@#$%&*+_-]).{6,})\S$/;

    if (!name) {
      isValid = false;
      tempErrors['name'] = 'Please, enter a valid name';
    }

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
      handleSingUp();
    }
  };

  return (
    <View style={styles.body}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Sing up</Text>
      </View>
      <View style={styles.textView}>
        <View style={styles.textInnerView}>
          <MaterialIcons
            name="person-outline"
            size={30}
            style={styles.textIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Full Name"
            onChangeText={text => setName(text)}
            value={name}
          />
        </View>
        {error.name && <Text style={GlobalStyles.error}>{error.name}</Text>}
        <View style={styles.textInnerView}>
          <MaterialIcons
            name="alternate-email"
            size={30}
            style={styles.textIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={text => setEmail(text)}
            value={email}
          />
        </View>
        {error.email && <Text style={GlobalStyles.error}>{error.email}</Text>}
        <View style={styles.textInnerView}>
          <MaterialIcons
            name="lock-outline"
            size={30}
            style={styles.textIcon}
          />
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
      <View style={styles.buttonView}>
        <TouchableOpacity style={GlobalStyles.buttons} onPress={onSubmit}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Registration;
