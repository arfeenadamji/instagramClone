import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, Button } from "react-native";
import * as firebase from "firebase";

import { connect } from "react-redux";

function Profile(props) {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false);

  const { currentUser, posts } = props;
  console.log({ currentUser, posts });

  useEffect(() => {
    const { currentUser, posts } = props;
    console.log('props.currentUser profile',props)
    // console.log({ currentUser, posts });
    // console.log("props.route.params.uid", props.route.params.uid);
    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      setUser(currentUser);
      setUserPosts(posts);
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUser(snapshot.data());
          } else {
            console.log("does not exist");
          }
        });

      firebase
        .firestore()
        .collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            console.log("data123", data);
            const id = doc.id;
            return { id, ...data };
          });
          setUserPosts(posts);
        });
    }
    if(props.following.indexOf(props.route.params.uid) > -1){
      setFollowing(true)
    }else{
      setFollowing(false)
    }

  }, [props.route.params.uid, props.following]);
  if (user === null) {
    return <View />;
  }

  const onFollow = () => {
    alert("onFollow");
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .set({});
  };
  const onUnFollow = () => {
    alert("onUnFollow");
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .delete({});
  };
  const signOut=() =>{
    firebase.auth().signOut();

  }
  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
        {props.route.params.uid !== firebase.auth().currentUser.uid ? (
          <View>
            {following ? (
              <Button title="Following" onPress={() => onUnFollow()} />
            ) : (
              <Button title="Follow" onPress={() => onFollow()} />
            )}
          </View>
        ) : <Button title="Sign Out"
      
      onPress={() => signOut()}/>
      }
      </View>

      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => (
            <View style={styles.containerimage}>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginLeft: 10,
  },

  containerInfo: {
    // margin: 20,
  },

  containerGallery: {
    flex: 1,
  },

  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },

  containerimage: {
    flex: 1 / 3,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following:store.userState.following
});

export default connect(mapStateToProps, null)(Profile);


// import React, { useState, useEffect } from "react";
// import { StyleSheet, View, Text, Image, FlatList, Button } from "react-native";
// import * as firebase from "firebase";

// import { connect } from "react-redux";

// function Profile(props) {
//   const [userPosts, setUserPosts] = useState([]);
//   const [user, setUser] = useState(null);
//   const [following, setFollowing] = useState(false);

//   const { currentUser, posts } = props;
//   console.log({ currentUser, posts });

//   useEffect(() => {
//     const { currentUser, posts } = props;
//     console.log({ currentUser, posts });
//     console.log("props.route.params.uid", props.route.params.uid);
//     if (props.route.params.uid === firebase.auth().currentUser.uid) {
//       setUser(currentUser);
//       setUserPosts(posts);
//     } else {
//       firebase
//         .firestore()
//         .collection("users")
//         .doc(props.route.params.uid)
//         .get()
//         .then((snapshot) => {
//           if (snapshot.exists) {
//             setUser(snapshot.data());
//           } else {
//             console.log("does not exist");
//           }
//         });

//       firebase
//         .firestore()
//         .collection("posts")
//         .doc(props.route.params.uid)
//         .collection("userPosts")
//         .orderBy("creation", "asc")
//         .get()
//         .then((snapshot) => {
//           let posts = snapshot.docs.map((doc) => {
//             const data = doc.data();
//             console.log("data123", data);
//             const id = doc.id;
//             return { id, ...data };
//           });
//           setUserPosts(posts);
//         });
//     }
//     if(props.following.indexOf(props.route.params.uid) > -1){
//       setFollowing(true)
//     }else{
//       setFollowing(false)
//     }

//   }, [props.route.params.uid, props.following]);
//   if (user === null) {
//     return <View />;
//   }

//   const onFollow = () => {
//     alert("onFollow");
//     firebase
//       .firestore()
//       .collection("following")
//       .doc(firebase.auth().currentUser.uid)
//       .collection("userFollowing")
//       .doc(props.route.params.uid)
//       .set({});
//   };
//   const onUnFollow = () => {
//     alert("onUnFollow");
//     firebase
//       .firestore()
//       .collection("following")
//       .doc(firebase.auth().currentUser.uid)
//       .collection("userFollowing")
//       .doc(props.route.params.uid)
//       .delete({});
//   };
//   return (
//     <View style={styles.container}>
//       <View style={styles.containerInfo}>
//         <Text>{user.name}</Text>
//         <Text>{user.email}</Text>
//         {props.route.params.uid !== firebase.auth().currentUser.uid ? (
//           <View>
//             {following ? (
//               <Button title="Following" onPress={() => onUnFollow()} />
//             ) : (
//               <Button title="Follow" onPress={() => onFollow()} />
//             )}
//           </View>
//         ) : null}
//       </View>

//       <View style={styles.containerGallery}>
//         <FlatList
//           numColumns={3}
//           horizontal={false}
//           data={userPosts}
//           renderItem={({ item }) => (
//             <View style={styles.containerimage}>
//               <Image style={styles.image} source={{ uri: item.downloadURL }} />
//             </View>
//           )}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 20,
//     marginLeft: 10,
//   },

//   containerInfo: {
//     margin: 20,
//   },

//   containerGallery: {
//     flex: 1,
//   },

//   image: {
//     flex: 1,
//     aspectRatio: 1 / 1,
//   },

//   containerimage: {
//     flex: 1 / 3,
//   },
// });

// const mapStateToProps = (store) => ({
//   currentUser: store.userState.currentUser,
//   posts: store.userState.posts,
//   following:store.userState.following
// });

// export default connect(mapStateToProps, null)(Profile);
