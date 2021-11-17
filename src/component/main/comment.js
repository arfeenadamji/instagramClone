import React,{useState,useEffect} from 'react'
import {View, Text, Button, TextInput,FlatList} from 'react-native';

import * as firebase from 'firebase'

export default function Comment(props) {
    const [comments, setComments] = useState([]);
    const [postId, setPostId] = useState();
    const [text, setText] = useState('');

    useEffect(() =>{
        if(props.route.params.postId !== postId){
            firebase.firestore().collection('posts').doc(props.route.params.uid)
            .collection('userPosts').doc(props.route.params.postId)
            .collection('comments').get()
            .then((snapshot) =>{
                let comments = snapshot.docs.map(doc =>{
                    const data = doc.data();
                    const id = doc.id;
                    return {id, ...data}
                })
                setComments(comments)
            })
            setPostId(props.route.params.postId)

        }

    },[props.route.params.postId])

    const onCommentSend=() =>{
        
    }
    return (
        <View>
            <Text>Comment screen</Text>
            <FlatList
            data={comments}
            numColumns={1}
            horizontal={false}
            renderItem={(item) =>(
                <View>
                    <Text>{item.text}</Text>
                </View>
            )}
            />
            <View>
                <TextInput 
                placeholder="comments.."
                onChangeText={(test) => setText(text)}
                />
                <Button
                onPress={() =>onCommentSend()}
                title="Send"
                />
            </View>
        </View>
    )
}
