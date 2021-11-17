import firebase from "firebase";
import {
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,


  USERS_DATA_STATE_CHANGE,
  USERS_POSTS_STATE_CHANGE,
  CLEAR_DATA
} from "../constants/index";

export function clearData(){
  return ((dispatch) =>{
    dispatch({type: CLEAR_DATA})
  })
}
export function fetchUser() {
  console.log("fetch user called")
  return (dispatch) => {
    console.log("currentUser.uid", firebase.auth().currentUser);
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser?.uid)

      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          console.log('snapshot12',snapshot.data())
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
          console.log("does12312 not exists");
        }
      });
  };
}

export function fetchUserPosts() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser?.uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          // return { id, ...data, user };
          return { id, ...data};

        });
        console.log("snapshot.docs", posts);
        // dispatch({ type: USER_POSTS_STATE_CHANGE, posts, uid });
        dispatch({ type: USER_POSTS_STATE_CHANGE, posts});
  
      });
  };
}

export function fetchUserFollowing() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser?.uid)
      .collection("userFollowing")
      .onSnapshot((snapshot) => {
        let following = snapshot.docs.map((doc) => {
          const id = doc.id;
          return id;
        });
        // console.log("snapshot.docs followiinf", following);
        dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following });
        for(let i=0; i<following.length; i++){
          dispatch(fetchUsersData(following[i],true));
        }
      });
  };
}

export function fetchUsersData(uid,getPosts) {
  console.log("uid",uid)
  return (dispatch, getState) => {
    console.log("get state",getState())
    const found = getState()?.usersState.users.some(el => el.uid === uid);
    console.log(found,'found')
    if (!found) {
      firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => {
          console.log("user snap",snapshot)
          if (snapshot.exists) {
            let user = snapshot.data();
            user.uid = snapshot.id;
            dispatch({ type: USERS_DATA_STATE_CHANGE, user });
          } else {
            console.log("does not exists");
          }
        });
        if(getPosts){
          dispatch(fetchUsersFollowingPosts(uid));

        }
    }
  };
}

export function fetchUsersFollowingPosts(uid) {
  console.log('fun')
    return (dispatch, getState) => {
      firebase
        .firestore()
        .collection("posts")
        .doc(uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => { 
          const uid = snapshot.query._.C_.path.segments[1]
          const user = getState()?.usersState.users.find(el => el.uid === uid);

          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data, user };
          });
          // console.log("snapshot.docs1233", posts);
          // console.log('posts index actions',posts);
          dispatch({ type: USERS_POSTS_STATE_CHANGE, posts:posts, uid:uid });
          // console.log('getState()',getState());
        });
    };
  }
