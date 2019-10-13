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
          const { displayName, photoURL, activeChatRooms } =
            snapshot.data() || {};
          if (
            !snapshot.exists ||
            displayName !== user.displayName ||
            photoURL !== user.photoURL ||
            !activeChatRooms
          ) {
            userDoc.set({
              displayName: user.displayName,
              photoURL: user.photoURL,
              activeChatRooms: activeChatRooms || []
            });
          }
        })
        .catch(error => console.error('An error has occurred!!!', error));
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
