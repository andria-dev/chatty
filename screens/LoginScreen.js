import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';

import { auth, provider, firestore } from '../firebase';
import { FontAwesome5 } from '@expo/vector-icons';

import { useAuthState } from 'react-firebase-hooks/auth';

function useSetupUser() {
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user && user.uid) {
      let canceled = false;
      const userDoc = firestore.doc(`users/${user.uid}`);

      userDoc
        .get()
        .then(snapshot => {
          console.log('Snapshot:', snapshot);
          if (canceled) {
            return;
          }
          if (!snapshot.exists) {
            userDoc.set({
              displayName: user.displayName,
              photoURL: user.photoURL
            });
          }
        })
        .catch(error => console.error('An error has occurred!!!', error));

      return () => (canceled = true);
    }
  }, [user]);
}

function LoginScreen({ navigation }) {
  useSetupUser();

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
        testID="login-button"
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
