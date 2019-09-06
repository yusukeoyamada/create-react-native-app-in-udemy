import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';

import MemoList from '../components/MemoList';
import CircleButton from '../elements/CircleButton';

class MemoListScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      memoList: [],
    }
  }

  componentWillMount(){
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    db.collection(`users/${currentUser.uid}/memos`)
      .get()
      .then(snapshot => {
        let memoList = [];
        snapshot.forEach(doc => {
          memoList.push({ ...doc.data(), key: doc.id });
        });
        this.setState({ memoList });
      })
      .catch(error => {
        console.log(error);
      })
  }

  handlePress(){
    const { navigation } = this.props;
    navigation.navigate('MemoCreate');
  }

  render() {
    return (
      <View style={styles.container}>
        <MemoList memoList={this.state.memoList} navigation={this.props.navigation} />
        <CircleButton name="plus" onPress={this.handlePress.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFDF6',
  },
});

export default MemoListScreen;
