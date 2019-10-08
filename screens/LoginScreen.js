import React from 'react';
import { View, Text, Button } from 'react-native';

import { auth, provider } from '../firebase';
import { FontAwesome5 } from '@expo/vector-icons';

function LoginScreen({ navigation }) {
  if (auth.currentUser) {
    navigation.navigate('ChatList');
  }

  function login() {
    auth.signInWithPopup(provider);
    navigation.navigate('ChatList');
  }

  return (
    <View>
      <Text>welcome to</Text>
      <Text>Chatty</Text>
      <FontAwesome5.Button
        name="google"
        backgroundColor="white"
        color="black"
        onPress={login}
      >
        LOGIN WITH GOOGLE
      </FontAwesome5.Button>
    </View>
  );
}

LoginScreen.navigationOptions = {
  headerStyle: { display: 'none' }
};

export default LoginScreen;
