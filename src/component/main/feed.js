import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, Button } from "react-native";
import * as firebase from "firebase";

import { connect } from "react-redux";

function Feed(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let posts = [];
    if(props.usersLoaded == props.following.length ){
      for(let i=0; i < props.following.length; i++){
        const user = props.users.find(el => el.uid === props.following[i]);

        if(user != undefined){
        posts = [...posts, ...user.posts]
        }
      }
      posts.sort(function(x,y){
        return x.creation - y.creation  
      })
      setPosts(posts);
      
    }
  }, [props.usersLoaded]);
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
  following:store.userState.following,
  // test:store.userState,
  users:store.usersState.users,
  usersLoaded:store.usersState.usersLoaded

});

export default connect(mapStateToProps, null)(Feed);
