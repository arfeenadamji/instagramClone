import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, Button } from "react-native";
import * as firebase from "firebase";

import { connect } from "react-redux";

function Feed(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (props.usersFollowingLoaded == props.following.length && props.following.length !== 0) {
      
      props.feed.sort(function (x, y) {
        return x.creation - y.creation
      })
      setPosts(props.feed);

    }
    console.log(posts)
  }, [props.usersFollowingLoaded, props.feed]);
  const onLikePress =(userId,postId) =>{
    firebase
    .firestore()
    .collection("posts")
    .doc(userId)
    .collection("userPosts")
    .doc(postId)
    .collection('likes')
    .doc(firebase.auth().currentUser.uid)
    .set({})
  }
  
  const onDisLikePress =(userId, postId) =>{
    firebase
    .firestore()
    .collection("posts")
    .doc(userId)
    .collection("userPosts")
    .doc(postId)
    .collection('likes')
    .doc(firebase.auth().currentUser.uid)
    .delete()
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerGallery}>
        <Text>Feed Screen</Text>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.containerimage}>
              <Text style={styles.container}>{item.user.name}</Text>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
             {item.currentUserLike ?(
               <Button
               title="DisLike"
               onPress={() => onDisLikePress(item.user.uid,item.id)}
               />
             ):(
              <Button
              title="Like"
              onPress={() => onLikePress(item.user.uid,item.id)}
              />
            )}
              <Text
                onPress={() => props.navigation.navigate('Comment', { postId: item.id, uid: item.user.uid })}
              >View Comment</Text>
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
  // img:store.userState.posts.downloadURL,
  following: store.userState.following,
  // test:store.userState,
  feed: store.usersState.feed,
  usersFollowingLoaded: store.usersState.usersFollowingLoaded

});

export default connect(mapStateToProps, null)(Feed);
