import React from 'react'
import {View,Text,Button} from 'react-native';
import * as firebase from 'firebase'
export default function feed() {
  const signOut = () =>{
    firebase.auth().signOut()
  }
    return (
        <View>
            <Text>
              feed screen  
                </Text>
                <Button
                title="logout"
                onPress={() => signOut()}
                />
                </View>
    )
}
