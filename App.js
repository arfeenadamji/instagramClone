import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LandingScreen from "./src/component/auth/landing";
import RegisterScreen from "./src/component/auth/Register"
import LoginScreen from "./src/component/auth/login"
import MainScreen from "./src/component/Main";
import AddScreen from "./src/component/main/add";

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import firebase from './firebase'


// import  * as firebase from 'firebase';
// const firebaseConfig = {
//   apiKey: "AIzaSyACmDUBXa-L5-hRew9JYwtHbRefj19ANjc",
//   authDomain: "instagram-dev-be67f.firebaseapp.com",
//   projectId: "instagram-dev-be67f",
//   storageBucket: "instagram-dev-be67f.appspot.com",
//   messagingSenderId: "65439395486",
//   appId: "1:65439395486:web:3a33866ae0ec10225c958f",
//   measurementId: "G-406YYPD17B"
// };

// if(firebase.apps.length == 0){
//     firebase.initializeApp(firebaseConfig)
// }

import { Provider } from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(thunk) )


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
    if(loggedIn){
      return(
        <Provider store={store}>
           <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} options={{headerShow:false}} />
            <Stack.Screen name="Add" component={AddScreen}/>

            </Stack.Navigator>
        </NavigationContainer>
        </Provider>
      )
    }else if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="landing">
            <Stack.Screen name="landing" component={LandingScreen} options={{headerShow:false}} />
            <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
        
      );
    }else{
      return(
        <View>
          <Text>
            user is not logged in
          </Text>
        </View>
      )
    }
  

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