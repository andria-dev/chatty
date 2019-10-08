import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import ChatListScreen from './screens/ChatListScreen';
import ChatRoomScreen from './screens/ChatRoomScreen';

export default createAppContainer(
  createStackNavigator({
    Login: LoginScreen,
    ChatList: ChatListScreen,
    ChatRoom: ChatRoomScreen
  })
);
