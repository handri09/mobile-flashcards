import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { white, gray, purple, red } from '../utils/colors';
import { clearLocalNotification, setLocalNotification } from './Notif';

class Card extends Component {
  state = {
    answer: false,
    iterator: 0,
    correct:0,
    incorrect:0,
  }
  componentDidMount() {
    this.props.navigation.setOptions({ 
      title: 'Quiz'
    });
  }
  answer = () => {
    this.setState({ answer: true })
  }
  render() {
    const { answer, iterator, correct, incorrect } = this.state
    const deck = this.props.route.params.entryId
    const title = deck.title
    const len = deck.questions.length

    if(len < 1) {
      return <Text style={styles.text}>No Card yet. You are not able to start a quiz. Please Add Card!</Text>;
    }

    if (iterator === len) {
      // Reset the notification for today and reschedule for tomorrow at 06:00 PM
      clearLocalNotification()
        .then(setLocalNotification());

      return (  
      <View style={{ flex: 1, textAlign: 'center', justifyContent: 'center' }}>
        <Text></Text>
        <Text style={{fontSize:35, textAlign:'center', margin: 20}}>With {len} {len>1 ? "Questions": "Question"}:</Text>
        <Text style={{fontSize:30, textAlign:'left', margin:20}}>{correct} {correct>1 ? "were correct" : "was correct"}</Text>
        <Text style={{fontSize:30, textAlign:'left', margin:20}}>{incorrect} {incorrect>1 ? "were incorrect": "was incorrect"}</Text>
        <Text style={{fontSize:50, margin:10, textAlign: 'center'}}>Final Score: {((correct/len)*100).toFixed(0)}%</Text>
        <Button style={{fontSize:20, textAlign:'center', margin: 10}} title="Back to Deck" onPress={() => this.props.navigation.navigate('Deck', {entryId: deck})}/>
        <Text></Text>
        <Button style={{fontSize:20, textAlign:'center', margin: 10}}  title="Back to Quiz" onPress={()=> this.setState({
          answer: false,
          iterator: 0,
          correct:0,
          incorrect:0,
          })} />
      </View>
      );
    }
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={styles.page}>{iterator+1} / {len}</Text>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {!answer && (<Text style={styles.text}>{deck.questions[iterator].question}?</Text>) }
          {answer && (<Text style={styles.textAnswer}>{deck.questions[iterator].answer}</Text>)}       
          {!answer && (<Text style={styles.answer} onPress={() => this.setState({answer: !this.state.answer})}>answer</Text>)}
          {answer && (<Text style={styles.answer} onPress={() => this.setState({answer: !this.state.answer})}>question</Text>)}
          
          <View>
            <TouchableOpacity 
              style={styles.androidSubmitBtn}
              onPress={() => {this.setState( (prev)=>({
                ...prev,
                iterator: prev.iterator+1,
                correct: prev.correct+1,
                answer: false,
            }))}}
              >
              <Text style={styles.submitBtnText} >Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.androidSubmitBtn}
              onPress={() => {this.setState( (prev)=>({
                ...prev,
                iterator: prev.iterator+1,
                incorrect: prev.incorrect+1,
                answer: false,
              }))}}
              >
              <Text style={styles.submitBtnText} >Incorrect</Text>
            </TouchableOpacity>
          </View>
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
  page: {
    color: purple,
    fontSize: 20,
    padding: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start' 
  },
  text: {
    color: white,
    fontSize: 30,
    padding: 10,
    backgroundColor: gray,
    borderRadius: 20,
    marginBottom: 20,
  },
  textAnswer: {
    color: white,
    fontSize: 30,
    padding: 10,
    backgroundColor: purple,
    borderRadius: 20,
    marginBottom: 20,
  },
  answer: {
    color: red,
    fontSize: 20,
    padding: 10,
    marginBottom: 40,
  },
  count: {
    color: gray,
    fontSize: 20,
    padding: 10,
    marginBottom: 30,
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight:30,
    height: 45,
    width: 200,
    borderRadius: 10,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  }, 
});

export default Card;