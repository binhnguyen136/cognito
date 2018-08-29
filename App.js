/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import Amplify, { Auth } from 'aws-amplify';
import AWSConfig from './aws-exports';
Amplify.configure(AWSConfig);

import Tabs from './Tabs';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

export default class App extends Component {
  state = {
    isAuthenticated: false
  }
  authenticate(isAuthenticated) {
    this.setState({ isAuthenticated })
  }

  _signOut = async () => {
    try {
      //await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();// Remember to remove the user from your app's state as well
      Auth.signOut()
      .then(() => {
        alert('logged out successfully ');
      });
      this.setState({ isAuthenticated: false })
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    if (this.state.isAuthenticated) {
      console.log('Auth: ', Auth.user.user.givenName, ' ', Auth.user.user.familyName)
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Hello {Auth.user.user.givenName + ' ' + Auth.user.user.familyName}!</Text>
          <Button title="Sign Out" onPress={this._signOut.bind(this)} />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Tabs
          screenProps={{
            authenticate: this.authenticate.bind(this)
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
