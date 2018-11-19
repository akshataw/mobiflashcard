import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { Constants } from 'expo';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import DeckMain from './components/DeckMain';
import AddEntry from './components/AddEntry';
import AddCard from './components/AddCard';
import DeckDetails from './components/DeckDetails';
import Quiz from './components/Quiz';
import reducer from './reducers';
import { setLocalNotification } from './utils/helpers';

const Tabs = TabNavigator({
  Decks: {
    screen: DeckMain,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" size={30} color={ tintColor } />
    }
  },
   AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="plus-square" size={30} color={ tintColor } />
    }
  }
});

const Stacks = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: "Flashcard",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "blue"
      }
    }
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "blue"
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "blue"
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "blue"
      }
    }
  }
});

export default class App extends React.Component {
  componentDidMount(){
    setLocalNotification();
  }
  render() {
    const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <Stacks />
        </View>
      </Provider>
    );
  }
}