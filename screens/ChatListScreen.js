import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';

import { auth, firestore } from '../firebase';
import { FontAwesome5 } from '@expo/vector-icons';

import { FloatingAction } from 'react-native-floating-action';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

import withUser from '../utilities/withUser';

function ChatListScreen({ navigation, user, loadingUser, errorLoadingUser }) {
  if (loadingUser) {
    return <Text>Loading...</Text>;
  }

  if (errorLoadingUser || !user) {
    return <Text>Unable to load your account.</Text>;
  }

  return <ChatList userID={user.uid} />;
}

function ChatList({ userID }) {
  const [userSnapshot, loadingUserData, errorLoadingUserData] = useDocument(
    firestore.doc(`users/${userID}`)
  );

  if (loadingUserData) {
    return <Text>Loading your chat rooms...</Text>;
  }

  if (errorLoadingUserData) {
    return <Text>Unable to load your chat rooms.</Text>;
  }

  const userData = userSnapshot.data();

  return (
    <View>
      {userData.activeChatRooms.map(id => (
        <ChatRoomListItem chatRoomID={id} />
      ))}
      <FloatingAction />
      <Text>Test</Text>
    </View>
  );
}

ChatListScreen.navigationOptions = {
  title: 'Chats',
  headerLeft: null
};

export default withUser(ChatListScreen);
