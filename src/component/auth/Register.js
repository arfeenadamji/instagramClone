import React, { Component } from 'react'
import { TextInput, View, Button, Text, StyleSheet } from 'react-native';
import  * as firebase from 'firebase'
export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection("users")
                .doc(result.user.uid)
                .set({
                    name,
                    email
                })
                console.log('result from register',result)
            })
            .catch((error) => {
                console.log(error)
            })

    }
    render() {
        return (
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="name"
                    onChangeText={(name) => this.setState({ name })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="email"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="password"
                    secureTextEntry
                    onChangeText={(password) => this.setState({ password })}
                />
                <Button
                    onPress={() => this.onSignUp()}
                    title="Sign Up"
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 25,
    }
})
export default Register