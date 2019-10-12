import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';

import { auth, firestore } from '../firebase';
import { FontAwesome5 } from '@expo/vector-icons';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

function ChatRoomScreen({ navigation }) {
  const [user] = useAuthState(auth);
  const [userData, loading, error] = useDocument(`users/${user.uid}`);

  if (!loading && !error) {
    return (
      <View>
        {userData.activeChatRooms.map(id => (
          <ChatRoomListItem chatRoomID={id} />
        ))}
      </View>
    );
  }
}

ChatRoomScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title', 'Chat')
});

export default ChatRoomScreen;
