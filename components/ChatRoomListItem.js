import React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { firestore } from '../firebase';

function ChatRoomListItem({ chatRoomID }) {
  const [chatRoom, loadingChatRoom, error] = useDocument(
    firestore.doc(`chat-rooms/${chatRoomID}`)
  );

  if (!loadingChatRoom && !error) {
    const lastMessage = chatRoom.messages[chatRoom.messages.length - 1];
    return (
      <View>
        <Text>{chatRoom.name}</Text>
        <Text>{lastMessage.text}</Text>
      </View>
    );
  }

  return null;
}

export default ChatRoomListItem;
