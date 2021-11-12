import React, { Component, Profiler } from 'react'
import {View, Text, Button} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUser} from '../../redux/actions/index'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


import FeedSceen from './main/feed'
import ProfileScreen from './main/profile'

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () =>{
    return(null)
}
class Main extends Component {
    componentDidMount(){
        this.props.fetchUser()
}
    render(){        
    return (
        <Tab.Navigator initialRouteName="Feed" labeled={false}>
          <Tab.Screen name="feed" component={FeedSceen} 
          options={{
              tabBarIcon:({color,size}) =>(
                  <MaterialCommunityIcons name="home" color={color} size={26} />
              )
          }}
          />
          <Tab.Screen name="MainAdd" component={EmptyScreen} 
          listeners={({navigation}) =>({
              tabPress:event =>{
                  event.preventDefault();
                  navigation.navigate("Add")
              }
          })}
          options={{
              tabBarIcon:({color,size}) =>(
                  <MaterialCommunityIcons name="plus-box" color={color} size={26} />
              )
          }}
          />
          <Tab.Screen name="profile" component={ProfileScreen} 
          options={{
              tabBarIcon:({color,size}) =>(
                  <MaterialCommunityIcons name="account-circle" color={color} size={26} />
              )
          }}
          />
        </Tab.Navigator>
    )
}
}
const mapStateToProps = (store) =>({
    currentUser:store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)
export default connect(mapStateToProps, mapDispatchProps)(Main)
