import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Decks from './Decks';

export default class DeckMain extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Decks {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});