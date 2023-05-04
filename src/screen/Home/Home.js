import { View, Text, Button } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../navigation/AuthProvider';

const Home = ({navigation}) => {

  const {logout} = useContext(AuthContext);

  onPressLogout = () => {
    logout();
    // navigation.navigate('Login');
  };

  return (
    <View>
      <Text>Home</Text>
      <Button title="Logout" onPress={onPressLogout}/>
    </View>
  )
}

export default Home;