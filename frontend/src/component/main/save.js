import React,{useState} from 'react'
import {View, Text,TextInput, Image,Button} from 'react-native'
import * as firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';

export default function Save(props) {
    const uri = props.route.params.image;
    const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;

    const [caption, setCaption] = useState("")

    console.log('props',props.route.params.image )

    const uploadImage= async()=>{
        const response = await fetch(uri)
        const blob = await response.blob();

        const task = firebase.storage().ref()
        .child(childPath)
        .put(blob);
        
        const taskProgress = snapshot =>{
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = snapshot =>{
            task.snapshot.ref.getDownloadURL().then((snapshot) =>{
                console.log('snapshot',snapshot)
                savePostData(snapshot)
            })
        }

        const taskError = snapshot =>{
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError,taskCompleted)
    }

    const savePostData = (downloadURL) =>{
        firebase.firestore()
        .collection('posts')
        .doc(firebase.auth().currentUser.uid)
        .collection('userPosts')
        .add({
            downloadURL,
            caption,
            likesCount:0,
            creation:firebase.firestore.FieldValue.serverTimestamp()
        }).then((function () {
            props.navigation.popToTop()
        }))
    }
    return (
        <View style={{flex:1}}>
             <Image source={{uri:uri}}/>
             <TextInput
             placeholder="Write a caption ..."
             onChangeText={(caption) => setCaption(caption) }
             />
             <Button
             title="save"
             onPress={() =>uploadImage()}
             />
        </View>
    )
}
