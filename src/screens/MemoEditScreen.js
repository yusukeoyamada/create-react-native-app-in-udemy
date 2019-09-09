import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';

import CircleBotton from '../elements/CircleButton';

class MemoEditScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      body: '',
      key: '',
    };
  }

  componentWillMount(){
    const { params } = this.props.navigation.state;
    this.setState({
      body: params.body,
      key: params.key,
    });
  }

  handlePress(){
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    const newDate = firebase.firestore.Timestamp.now();
    db.collection(`users/${currentUser.uid}/memos`).doc(this.state.key)
      .update({
        body: this.state.body,
        createdOn: newDate,
      })
        .then(() =>{
          console.log("Document successfully updated!");

          const { navigation } = this.props;
          navigation.state.params.returnMemo({
            body: this.state.body,
            key: this.state.key,
            createdOn: newDate,
          });
          navigation.goBack();
        })
        .catch(error => {
          console.error("Error updating document: ", error);
        });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.memoEditInput}
          multiline
          value={this.state.body}
          onChangeText={text => {this.setState({
            body: text,
          });}}
          textAlignVertical="top"
          autoCapitalize="none"
        />
        <CircleBotton name="check" onPress={this.handlePress.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  memoEditInput: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    textAlignVertical: 'top',
    fontSize: 16,
  },
});

export default MemoEditScreen;
