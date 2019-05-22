import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDGFc7oSp4XlWOpx5B123_DPgZl6iFjI8k',
      authDomain: 'authentication-e1be6.firebaseapp.com',
      databaseURL: 'https://authentication-e1be6.firebaseio.com',
      projectId: 'authentication-e1be6',
      storageBucket: 'authentication-e1be6.appspot.com',
      messagingSenderId: '299112794340',
      appId: '1:299112794340:web:3b314e8136e9bd51'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
        <CardSection>
          <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
        </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return (
        <View style={styles.spinnerView}>
         <Spinner size="large" />
        </View>);
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}
const styles = {
  spinnerView: { flex: 1 }
}

export default App;
