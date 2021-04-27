import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import Home from './Screens/Home';
import AddChat from './Screens/AddChat';
import ChatScreen from './Screens/ChatScreen';
const Stack =createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator /*initialRouteName={"Home"}*/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: () => (
              <Text
                style={{ fontWeight: "bold", fontSize: 18, color: "white" }}
              >
                Signal
              </Text>
            ),
          }}
        />
        <Stack.Screen name="AddChat" component={AddChat} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
  
});
