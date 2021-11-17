import React,{useState,useEffect} from 'react'
import {View, Text, Button, TextInput,FlatList} from 'react-native';

import * as firebase from 'firebase'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsersData } from '../../../redux/actions/index';

 function Comment(props) {
    const [comments, setComments] = useState([]);
    const [postId, setPostId] = useState();
    const [text, setText] = useState('');

    useEffect(() =>{

        function matchUserToComment(comments) {
            for (let i=0; i<comments.length;i++){
               if(comments[i].hasOwnProperty(úser)){
                   continue;
               }
                const user = props.user.find(x =>x.uid ===comments[i].creator)
                if(user == undefined){
                    props.fetchUsersData(comments[i].creator,false)
                }else{
                    comments[i].user = user
                }
            }
            matchUserToComment(comments)
        }
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
            setPostId(props.route.params.postId, props.users)
}else{
    matchUserToComment(comments)
}

    },[props.route.params.postId])

    const onCommentSend=() =>{
        
        firebase.firestore().collection('posts').doc(props.route.params.uid)
        .collection('userPosts').doc(props.route.params.postId)
        .collection('comments')
        .add({
            creator:firebase.auth().currentUser.uid,
            text
        })
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
                    {item.user !== undefined ? 
                <Text>{item.user.name}</Text>
                : null  }
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

const mapStateToProps = (store) =>{
    console.log('store main',store)
    return{
        users:store.usersState.users,
        // user:user
    }
    

}
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUsersData}, dispatch)
export default connect(mapStateToProps, mapDispatchProps)(Comment)
