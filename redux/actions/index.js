import firebase from "firebase";
import {USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE,USER_FOLLOWING_STATE_CHANGE } from '../constants/index'

export function fetchUser(){
    return((dispatch) =>{
        console.log('currentUser.uid',firebase.auth().currentUser)
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser?.uid)
        
        .get()
        .then((snapshot) =>{
            if(snapshot.exists){
                // console.log('snapshot12',snapshot.data())
                dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data() })
            }
            else{console.log('does12312 not exists')}
        })
    })
}

export function fetchUserPosts(){
    return((dispatch) =>{
        firebase.firestore().collection('posts')
        .doc(firebase.auth().currentUser?.uid)
        .collection('userPosts')
        .orderBy("creation","asc")
        .get()
        .then((snapshot) =>{
            let posts = snapshot.docs.map(doc =>{
                const data = doc.data();
                const id = doc.id;
                return {id, ...data }

            })
            console.log('snapshot.docs',posts)
            // if(snapshot.exists){
                dispatch({type: USER_POSTS_STATE_CHANGE, posts })
            // }
            // else{console.log('does not exists')}
        })
    })
}

export function fetchUserFollowing(){
    return((dispatch) =>{
        firebase.firestore().collection('following')
        .doc(firebase.auth().currentUser?.uid)
        .collection('userFollowing')
        .onSnapshot((snapshot) =>{
            let following = snapshot.docs.map(doc =>{
                const id = doc.id;
                return id

            })
            console.log('snapshot.docs',following)
            // if(snapshot.exists){
                dispatch({type: USER_FOLLOWING_STATE_CHANGE, following })
            // }
            // else{console.log('does not exists')}
        })
    })
}