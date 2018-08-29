import React from 'react';
import { TextInput, Button, StyleSheet, Text, View } from 'react-native';

import { Auth } from 'aws-amplify';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

export default class App extends React.Component {
  state = {
    username: '',
    password: '',
    confirmationCode: '',
    user: {}
  }
  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }
  signIn() {
    const { username, password } = this.state
    Auth.signIn(username, password)
    .then(user => {
      this.setState({ user })
      console.log('successful sign in!')
    })
    .catch(err => console.log('error signing in!: ', err))
  }

  confirmSignIn() {
    Auth.confirmSignIn(this.state.user, this.state.confirmationCode)
    .then(() => {
      console.log('successful confirm sign in!')
      this.props.screenProps.authenticate(true)
    })
    .catch(err => console.log('error confirming signing in!: ', err))
  }

  logInWithGoogle() {

  }

  _signIn = async () => {
    GoogleSignin.configure({
      iosClientId: '208336264500-mviimo0598ar12h3nke3p8vli5tuavoe.apps.googleusercontent.com'
    });
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      //alert('timestamp ' + user.accessTokenExpirationDate);
      return Auth.federatedSignIn(
        // Initiate federated sign-in with Google identity provider 
        'google',
        { 
            // the JWT token
            token: user.serverAuthCode, 
            // the expiration time
            expires_at: 1
        },
        // a user object
        user
      ).then(() => {
          Auth.currentAuthenticatedUser()
          .then(userInfo => {
            console.log('login: ', userInfo);
            //alert('login success ' + userInfo.user.givenName);
            this.setState({ user: userInfo.user });
            this.props.screenProps.authenticate(true)
          })
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  _signOut = async () => {
    try {
      //await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();// Remember to remove the user from your app's state as well
      Auth.signOut()
      .then(() => {
        Auth.currentAuthenticatedUser()
        .then(userInfo => {
          console.log('login: ', userInfo.user);
          //alert('login success ' + userInfo.user.givenName);
        })
        .catch(error => {
          alert('error: ' + error);
        })
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={value => this.onChangeText('username', value)}
          style={styles.input}
          placeholder='username'
        />
        <TextInput
          onChangeText={value => this.onChangeText('password', value)}
          style={styles.input}
          secureTextEntry={true}
          placeholder='password'
        />
        <Button title="Sign In" onPress={this.signIn.bind(this)} />
        <GoogleSigninButton
          style={{ width: 48, height: 48 }}
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Dark}
          onPress={this._signIn.bind(this)}
          disabled={this.state.isSigninInProgress} />
        <TextInput
          onChangeText={value => this.onChangeText('confirmationCode', value)}
          style={styles.input}
          placeholder='confirmation Code'
        />
        <Button title="Confirm Sign In" onPress={this.confirmSignIn.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
    margin: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
