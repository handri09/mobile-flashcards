import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { getDecks } from '../utils/LocalStorage'

class Result extends Component {
  update = () => {
    this.props.nav.navigate('Deck', {entryId: this.props.deck})
    
    console.log(this.props)
  }
  render() {
    const { len, iterator, correct, incorrect, deck } = this.props
    console.log(this.props)
    return (
      <View style={{ flex: 1 }}>
        <Text style={{fontSize:35, textAlign:'center', margin: 20}}>With {len} {len>1 ? "Questions": "Question"}:</Text>
        <Text style={{fontSize:30, textAlign:'left', margin:20}}>{correct} {correct>1 ? "were correct" : "was correct"}</Text>
        <Text style={{fontSize:30, textAlign:'left', margin:20}}>{incorrect} {incorrect>1 ? "were incorrect": "was incorrect"}</Text>
        <Text style={{fontSize:50, margin:10, textAlign: 'center'}}>Final Score: {((correct/len)*100).toFixed(0)}%</Text>
        <Button style={{fontSize:20, textAlign:'center', margin: 10}} title="Back to Deck" onPress={()=>this.props.nav.navigate('Deck', {entryId: deck})}/>
        <Button style={{fontSize:20, textAlign:'center', margin: 10}}  title="Back to Quiz" onPress={()=>this.update} />
        <Button  style={{fontSize:20, textAlign:'center', margin: 10}} title="Back to Deck" onPress={()=>this.props.nav.navigate('Result', {entryId: deck})}/>
      </View>
    );
  }
}
export default Result