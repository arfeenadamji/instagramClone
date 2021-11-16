import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity,StyleSheet } from 'react-native';
import * as firebase from 'firebase';
// require('firebase/firestore')

export default function Search(props) {
    const [users, setUsers] = useState([])

    const fetchUser = (search) => {
        firebase.firestore()
            .collection('users')
            .where('name', '>=', search)
            .get()
            .then((snapshot) => {
                let users = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                });
                setUsers(users);
            })
    }
    console.log('userssss', users)
    return (
        <View>
        <View style={{flex:1,marginTop:40,marginBottom:20,justifyContent:'center',alignItems:'center'}}>
            <TextInput
            style={styles.inputSearch}
                placeholder="serach iuser"
                onChangeText={(search) => fetchUser(search)} />
            </View>
            <FlatList
            style={{marginLeft:24}}
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("Profile", { uid: item.id })}>
                        <Text>{item.name} {"\n"}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}
const styles=StyleSheet.create({
    inputSearch: {
        height: 40,
        // margin: 12,
        borderWidth: 0.8,
        borderColor:'gray',
        borderRadius:10,
        padding: 10,
        marginBottom: 25,
        width:'90%',

      },
})