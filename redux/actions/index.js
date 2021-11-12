import firebase from "firebase";
import {USER_STATE_CHANGE} from '../constants/index/'

export function fetchUser(){
    return((dispatch) =>{
        // console.log("uid is,",firebase.auth().currentUser.uid)
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser?.uid)
        .get()
        .then((snapshot) =>{
            if(snapshot.exists){
                // console.log('snapshot12',snapshot.data())
                dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data() })
            }
            else{console.log('does not exists')}
        })
    })
}