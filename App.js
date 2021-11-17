import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LandingScreen from "./src/component/auth/landing";
import RegisterScreen from "./src/component/auth/Register"
import LoginScreen from "./src/component/auth/login"
import MainScreen from "./src//component/Main";
import AddScreen from "./src/component/main/add";
import SaveScreen from "./src/component/main/save";
import CommentScreen from "./src/component/main/comment"

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import firebase from './firebase'

import { Provider } from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(thunk) )
console.disableYellowBox=true

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
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Comment" component={CommentScreen} navigation={this.props.navigation}/>

            </Stack.Navigator>
        </NavigationContainer>
        </Provider>
      )
    }else if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{headerShow:false}} />
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