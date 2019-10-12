import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';

import { auth, firestore } from '../firebase';
import { FontAwesome5 } from '@expo/vector-icons';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

function ChatRoomScreen({ navigation }) {
  const [user] = useAuthState(auth);

  return <View></View>;
}

ChatRoomScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title', 'Chat')
});

export default ChatRoomScreen;
