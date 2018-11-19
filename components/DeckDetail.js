import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  getDeckDetails,
  deleteDeck,
} from '../actions';

class DeckDetail extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.navTitle
    }
  };

  componentDidMount() {
    this.props.getDeckDetails(this.props.navigation.state.params.entryId);
  }

  componentDidUpdate() {
    this.props.getDeckDetails(this.props.navigation.state.params.entryId);
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
        <Card title={this.props.title}>
          <Text style={{marginBottom: 10, textAlign: 'center', fontSize: 20, }}>
            {this.props.questions ? this.props.questions.length : 0} cards available
          </Text>
          <View>
            <Button
              icon={{name: 'add-circle'}}
              backgroundColor='purple'
              buttonStyle={styles.buttonStyle}
              title='Add your card'
              onPress={() => {
                  this.props.navigation.navigate(
                    'AddQuestion',
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
              icon={{name: 'play-arrow'}}
              backgroundColor='green'
              buttonStyle={[styles.buttonStyle, { marginTop: 10 }]}
              title='Quiz'
              onPress={() => {
                if(this.props.questions.length > 0){
                  this.props.navigation.navigate(
                    'QuizMain',
                    {
                      navTitle: this.props.title,
                      questions: this.props.questions }
                  )
                }
                else{
                 alert("You have to add card to start Quiz!");
                }
                  /* this.props.navigation.navigate(
                    'QuizMain',
                    {
                      navTitle: this.props.title,
                      questions: this.props.questions }
                  )*/
                }
              }
            />
          </View>
        </Card>
        <View>
          <Button
            icon={{name: 'delete'}}
            title="Delete Deck"
            buttonStyle={[styles.buttonStyle, { marginTop: 50 }, ]}
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
  deleteDeck, getDeckDetails })(DeckDetail);
