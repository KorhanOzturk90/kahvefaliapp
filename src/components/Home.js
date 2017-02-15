import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

import { Actions } from 'react-native-router-flux';


import firebase from 'firebase';



var Login = React.createClass({
  render: function() {
    return (
      <View>
        <LoginButton
          readPermissions={["public_profile"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    // Build Firebase credential with the Facebook access token.
                    var credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

                    // Sign in with credential from the Google user.
                    firebase.auth().signInWithCredential(credential).catch(function(error) {
                      // Handle Errors here.
                      var errorCode = error.code;
                      var errorMessage = error.message;
                      // The email of the user's account used.
                      var email = error.email;
                      // The firebase.auth.AuthCredential type that was used.
                      var credential = error.credential;
                      // ...

                    });
                  }
                )
              }
            }
          }
          onLogoutFinished={() => firebase.auth().signOut()}/>
      </View>
    );
  }
});

export default class Home extends React.Component {
  state = {
    name: '',
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(JSON.stringify(user));
        alert("hey");
      } else {
        // No user is signed in.
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.label, {marginTop: 40}]}>
          Enter your name :
        </Text>
        <TextInput
          placeholder='John Smith'
          style={styles.textInput}
          onChangeText={(text) => {
            this.setState({
              name: text,
            });
          }}
          value={this.state.name}
        />
        <TouchableOpacity
          onPress={() => {
            Actions.chat({
              name: this.state.name,
            });
          }}
        >
          <Text style={styles.label}>
            Next
          </Text>
        </TouchableOpacity>
        <Login/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 20,
    marginLeft: 15,
  },
  textInput: {
    height: 40,
    marginLeft: 15,
  },
});
