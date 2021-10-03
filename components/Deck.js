import React, { Component } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  Button 
} from 'react-native';
import { white, gray } from '../utils/colors'
import { getDecks } from '../utils/LocalStorage'

class Deck extends Component {
  state= {
    decks: {}
  }

  update = (e) => {
    getDecks()
      .then((decks) => {
        this.setState( (prev) => ({
          ...prev,
          decks
        }))
      })
  }

  setTitle = (entryId) => { 
    if (!entryId) return;
    this.props.navigation.setOptions({ 
      title: entryId.title
    }); 
  }

  componentDidMount(){
    getDecks()
      .then( (decks)=> {
        this.setState ((prev)=>({
          ...prev,
          decks
        }))
      })
    this.setTitle(this.props.route.params.entryId.title); 
  } 

  pressAddCard = (e) => {
    this.props.navigation.navigate('AddCard', {entryId: e})
  }
  
  render() {
    const { decks } = this.state;
    const deck = this.props.route.params.entryId;
    const title = deck.title;
    const len = decks[title] ? decks[title].questions.length : 0
    //console.log(decks)

    return (
      <View style={styles.container}>
        <Button title='update' onPress={this.update} />
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.count}>{len} {len > 1 ? 'cards':'card'}</Text>
          <Button title="Add Card" onPress={() => this.pressAddCard(deck)} />
          <Text></Text>
          <Button title="Start Quiz" onPress={()=>this.props.navigation.navigate('Card', {entryId: decks[title]})} />
        </View>
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
    fontSize: 30,
    padding: 5,
    marginTop: 30
  },
  count: {
    color: gray,
    fontSize: 20,
    padding: 10,
    marginBottom: 30,
  }
});

export default Deck;