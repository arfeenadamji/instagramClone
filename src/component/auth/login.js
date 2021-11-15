import React,{ Component } from 'react';
 import { View, Text, StyleSheet, Button, TextInput } from "react-native"; 
 import * as firebase from "firebase"
 
 export class Login extends Component {
     constructor(props){
         super(props);
         this.state={
             email:'',
             password:''
         }
         this.onSingnIn = this.onSignIn.bind(this)
     }
     onSignIn(){
         const {email,password} = this.state;
firebase.auth().signInWithEmailAndPassword(email,password)
.then((result) =>{
    console.log('result from login',result)
})
.catch((error) =>{
    console.log(error)
})
     }
     render(){
     return (
        <View>
      <Text style={styles.heading}>Login Screen</Text>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        // value={email}
        style={styles.inputEmail}
        onChangeText={(email) => this.setState({email})}
      />

      <TextInput
        placeholder="Password"
        autoCapitalize="none"
        // value={pass}
        style={styles.inputPassword}
        onChangeText={(password) => this.setState({password})}
      />
      <Button
        style={[styles.btn]}
        onPress={() => this.onSignIn()}
        title="Login "
      />
      </View>
     )}
 }
 const styles = StyleSheet.create({
    textStyle: {
      fontSize: 10,
    },
    inputEmail: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      marginBottom: 25,
    },
    inputPassword: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      marginBottom: 25,
    },
    btn: {
      margin: 100,
      marginTop: 10,
    },
    heading: {
      textAlign: "center",
      fontSize: 30,
    },
    btnR: {
      margin: 100,
      marginTop: 50,
      paddingTop: 50,
    },
  });

  export default Login