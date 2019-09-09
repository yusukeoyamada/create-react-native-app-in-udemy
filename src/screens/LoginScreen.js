import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Text,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import * as SecureStore from 'expo-secure-store';

import firebase from 'firebase';
import Loading from '../elements/Loading';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: true,
    };
  }

  async componentDidMount(){
    this.setState({ isLoading: true });
    const email = await SecureStore.getItemAsync('email');
    const password = await SecureStore.getItemAsync('password');

    if (email != null && password != null) {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({ isLoading: false });
          this.navigateToHome();
        })
        .catch(() => {
          this.setState({ isLoading: false });
        });
    } else {
      this.setState({ isLoading: false });
    }
  }

  navigateToHome(){
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' })
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  handleSubmitLogin(){
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        console.log('success', user);
        SecureStore.setItemAsync('email', this.state.email);
        SecureStore.setItemAsync('password', this.state.password);
        this.navigateToHome();
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  handleSubmitSignup(){
    this.props.navigation.navigate('Signup');
  }

  render() {
    return (
      <View style={styles.container}>
        <Loading
          text="ログイン中"
          isLoading={this.state.isLoading}
        />
        <Text style={styles.title}>
          ログイン
        </Text>
        <TextInput
          style={styles.input}
          value={this.state.email}
          onChangeText={(text) => {
            this.setState({email: text})
          }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email Address"
        />
        <TextInput
          style={styles.input}
          value={this.state.password}
          onChangeText={(text) => {
            this.setState({password: text})
          }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TouchableHighlight style={styles.login} onPress={this.handleSubmitLogin.bind(this)} underlayColor="#C70F66">
          <Text style={styles.loginText}>ログインする</Text>
        </TouchableHighlight>

        <TouchableOpacity style={styles.signup} onPress={this.handleSubmitSignup.bind(this)}>
          <Text style={styles.signupText} >メンバー登録する</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 24,
    backgroundColor: '#fff',
  },
  input: {
    backgroundColor: '#eee',
    height: 48,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 8,
  },
  title: {
    fontSize: 28,
    alignSelf: 'center',
    marginBottom: 24,
  },
  login: {
    backgroundColor: '#E31676',
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
  },
  signup: {
    marginTop: 16,
    alignSelf: 'center',
  },
  signupText: {
    fontSize: 16,
  }
});

export default LoginScreen;
