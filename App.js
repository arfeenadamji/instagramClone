// import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import firebase from './firebase'

import LandingScreen from "./src/component/auth/landing";
import RegisterScreen from "./src/component/auth/Register"
import LoginScreen from "./src/component/auth/login"

const Stack = createStackNavigator();
export class App extends Component {

  constructor(props){
    super(props)
    this.state ={
      loaded:false
    }
  }
  componentDidMount(){
   
    firebase.auth().onAuthStateChanged((user) =>{
      if(!user){
        this.setState({
          loggedIn:false,
          loaded:true
        })

      }else{
        this.setState({
          loggedIn:true,
          loaded:true
        })
      }
    })
  }
  render(){
    const {loggedIn,loaded} =this.state;
    if(!loaded){
      return(
        <View style={{flex:1, justifyContent:'center'}}>
          <Text>user is loading</Text>
        </View>
      )
    }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="landing" component={LandingScreen} options={{headerShow:false}} />
        <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    </NavigationContainer>
    
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App