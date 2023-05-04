import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './Password.style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Password = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({});

  const onPressSubmit = () => {
    navigation.navigate('Login');
  };

  const validations = () => {
    let isValid = true;
    let tempErrors = {};

    const passwordRegex =
      /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=.*[@#$%&*+_-]).{6,})\S$/;

    if (!passwordRegex.test(password)) {
      isValid = false;
      tempErrors['password'] = 'Please, enter a valid password';
    }

    if (confirmPassword !== password) {
      isValid = false;
      tempErrors['confirmPassword'] = 'Your password is incorrect';
    }

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
            name="lock-outline"
            size={30}
            style={styles.textIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="New Password"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
        </View>
        {error.password && <Text style={styles.error}>{error.password}</Text>}
        <View style={styles.textInnerView}>
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
        {error.confirmPassword && <Text style={styles.error}>{error.confirmPassword}</Text>}
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Password;
