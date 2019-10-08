import React, { useState } from 'react';
import AppContainer from './navigation';

import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function App({ skipLoadingScreen }) {
  const [, isLoadingUser, errorLoadingUser] = useAuthState(auth);
  const [isLoadingResources, setLoadingResources] = useState(true);

  if (errorLoadingUser) {
    console.warn(errorLoadingUser);

    return (
      <View style={styles.container}>
        <Text>An error has occurred while loading the user</Text>
      </View>
    );
  } else if (!skipLoadingScreen && (isLoadingUser || isLoadingResources)) {
    console.log('isLoadingUser', isLoadingUser);
    console.log('isLoadingResources', isLoadingResources);

    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onFinish={() => setLoadingResources(false)}
        onError={console.warn}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppContainer />
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png')
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...FontAwesome5.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
    })
  ]);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
