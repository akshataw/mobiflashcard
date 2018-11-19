import React from 'react';
import {
  Text,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import {
  Button,
  Card,
  FormInput,
  FormValidationMessage
} from 'react-native-elements';
import { saveDeckTitle } from '../utils/api';


class AddEntry extends React.Component {
  state = {
    titleText: '',
    errorMessage: false
  };

  handleSubmit = () => {
    if (this.state.titleText) {
      const { titleText } = this.state;
      saveDeckTitle(titleText);
      this.setState({
        errorMessage: false,
        titleText: ''
      });
      this.props.navigation.navigate(
        'DeckDetail',
        {
          entryId: titleText,
          navTitle: titleText
        },
        Keyboard.dismiss()
      );
    } else {
      this.setState({
         errorMessage: true
          })
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={{
        flex: 1,
          justifyContent: 'center',
          alignContent: 'center'
        }}
        behavior="padding"
      >
        <Card title="Suggest a title for your new deck..." >
          <FormInput
            onChangeText={titleText => this.setState({ titleText })}
            value={this.state.titleText}
          />
          <FormValidationMessage>
            {this.state.errorMessage ? alert('You haven\'t give any name to your deck!') : ''}
          </FormValidationMessage>
          <Button style={styles.butn}
            title="Create My Deck"
            raised
            backgroundColor= 'purple'
            borderRadius= { 10 }
            onPress={this.handleSubmit}
          />
        </Card>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  butn : {
            justifyContent: 'center',
            alignContent: 'center',
            fontSize: 20,
  }
}

export default AddEntry;
