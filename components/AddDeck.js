import React, { Component } from 'react'
import { 
  Text, 
  View, 
  Button, 
  KeyboardAvoidingView,
  TextInput
} from 'react-native'
import { blue, white, red } from '../utils/colors'
import { getDecks, addDeck } from '../utils/LocalStorage'

class AddDeck extends Component{
  state = {
    newDeck: '',
    decks: {},
    deck: {},
  }

  submit = () => {
    // Back Home
    this.props.navigation.navigate('Decks')
    this.setState({
      newDeck:'',
    })
  }

  componentDidMount () {
    getDecks()
      .then((decks) => {
        this.setState( (prev) => ({
          ...prev,
          decks
        }))
      })
  }
  onSubmit = (e) => {
    addDeck(e)
      .then((newDeck)=> this.props.navigation.navigate('Deck', { entryId: newDeck }))
      .then(()=>this.setState({
        newDeck: '',
        decks: {},
        deck: {}, 
        }))
  }

  render(){
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize:50, margin:10, textAlign: 'center'}}>What is the title of your new deck?</Text>
        <KeyboardAvoidingView behavior="position" enabled>
          <TextInput
            style={{ borderWidth: 2, borderColor: blue, borderRadius: 5, minHeight: 40, padding: 6, marginBottom: 20, marginTop:20 }}
            placeholder="Add New Deck"
            value={this.state.newDeck}
            multiline={true}
            onChangeText={(newDeck) => this.setState({newDeck})}/>
        </KeyboardAvoidingView>
        <Button title="Create Deck" onPress={() => this.onSubmit(this.state.newDeck)} disabled={this.state.newDeck ? false : true} />
      </View>
    );
  }
}

export default AddDeck;