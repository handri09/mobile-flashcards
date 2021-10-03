import React, { Component } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  Button, 
  KeyboardAvoidingView,
  TextInput
} from 'react-native';
import { white, gray, purple } from '../utils/colors'
import { addCardToDeck } from '../utils/LocalStorage'

class Card extends Component {
  state = {
    question:'',
    answer: '',
  }

  componentDidMount() {
    this.props.navigation.setOptions({ 
      title: 'Add New Card in ' + this.props.route.params.entryId.title
    });
  }
  onSubmit = (e) => {
    // save new Card
    const { question, answer } = this.state
    // update asyncstorage
    addCardToDeck(e, question, answer);
    // GoBack
    this.props.navigation.goBack()
  }
  render() {
    const deck = this.props.route.params.entryId
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Text style={[styles.text,{fontSize:25}]}>Add new Card in {deck.title}</Text>
        <KeyboardAvoidingView behavior="position" enabled>
          <TextInput
            style={{ borderWidth: 2, width: 250, borderColor: purple, borderRadius: 5, minHeight: 40, padding: 6, marginBottom: 20, marginTop:20 }}
            placeholder="Add Question"
            multiline={true}
            onChangeText={(question) => this.setState( (prev)=> ({
              ...prev,
              question
            }))}/>
          <TextInput
            style={{ borderWidth: 2, width: 250, borderColor: purple, borderRadius: 5, minHeight: 40, padding: 6, marginBottom: 20, marginTop:20 }}
            placeholder="Add Answer"
            multiline={true}
            onChangeText={(answer) => this.setState( (prev)=> ({
              ...prev,
              answer,
            }))}/>
        </KeyboardAvoidingView>
        <Button title="Submit" onPress={() => this.onSubmit(deck.title)} disabled={(this.state.question && this.state.answer) ? false : true}/>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  text: {
    color: purple,
    fontSize: 45,
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
  }
});

export default Card;