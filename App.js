// import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import * as firebase from 'firebase';
// import firebase from "firebase/app"
const firebaseConfig = {
  apiKey: "AIzaSyACmDUBXa-L5-hRew9JYwtHbRefj19ANjc",
  authDomain: "instagram-dev-be67f.firebaseapp.com",
  projectId: "instagram-dev-be67f",
  storageBucket: "instagram-dev-be67f.appspot.com",
  messagingSenderId: "65439395486",
  appId: "1:65439395486:web:3a33866ae0ec10225c958f",
  measurementId: "G-406YYPD17B"
};


  firebase.initializeApp(firebaseConfig)


import LandingScreen from "./src/component/auth/landing";
import RegisterScreen from "./src/component/auth/Register"
import LoginScreen from "./src/component/auth/login"

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Text>sjk</Text>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="landing" component={LandingScreen} options={{headerShow:false}} />
        <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
