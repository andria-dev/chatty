import React from 'react';

function ChatRoomScreen({ navigation }) {
  return null;
}

ChatRoomScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title', 'Chat')
});

export default ChatRoomScreen;
