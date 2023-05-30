import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Perfil from '../screens/Perfil';
import Chat from '../screens/Chat';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator initialRouteName="Perfil">
    <Stack.Screen
      name="Perfil"
      component={Perfil}
      screenOptions={{headerShown: false, headerBackTitleVisible: false}}
    />
    <Stack.Screen
      name="Chat"
      component={Chat}
      screenOptions={{headerBackTitleVisible: false}}
    />
  </Stack.Navigator>
);
