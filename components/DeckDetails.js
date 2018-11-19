import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  getDeckInfo,
  deleteDeck,
} from '../actions';

class DeckDetails extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.navTitle
    }
  };

  componentDidMount() {
    this.props.getDeckInfo(this.props.navigation.state.params.entryId);
  }

  componentDidUpdate() {
    this.props.getDeckInfo(this.props.navigation.state.params.entryId);
  }

  deleteItem() {
    const title = this.props.title;
    this.props.deleteDeck(title);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center'
        }}
      >
        <Card title={this.props.title} >
          <Text style={{marginBottom: 10, textAlign: 'center'}}>
            {this.props.questions ? this.props.questions.length : 0} cards available
          </Text>
          <View>
            <Button
              backgroundColor='dodgerblue'
              buttonStyle={styles.buttonStyle}
              title='Add Card'
              onPress={() => {
                  this.props.navigation.navigate(
                    'AddCard',
                    {
                      navTitle: this.props.title,
                      title: this.props.title
                    }
                  );
                }
              }
            />
          </View>
          <View>
            <Button
              backgroundColor='green'
              buttonStyle={[styles.buttonStyle, { marginTop: 10 }]}
              title='Start Quiz'
              onPress={() => {
                  this.props.navigation.navigate(
                    'Quiz',
                    {
                      navTitle: this.props.title,
                      questions: this.props.questions }
                  );
                }
              } />
          </View>
        </Card>
        <View>
          <Button
            title="Delete Deck"
            buttonStyle={[styles.buttonStyle, { marginTop: 40 }]}
            backgroundColor="red"
            onPress={() => this.deleteItem()}
          />
        </View>
      </View>
    )
  }
}

const styles = {
  buttonStyle: {
    borderRadius: 10,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  }
};

const mapStateToProps = state => {

  const { title, questions } = state.deckDetail ? state.deckDetail : ('', []);

  return { title, questions };
};

export default connect(mapStateToProps, {
  deleteDeck, getDeckInfo })(DeckDetails);
