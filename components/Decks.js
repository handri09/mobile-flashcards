import React, { Component } from 'react'
import { StyleSheet, Text, View, Button,TouchableOpacity, ScrollView, Animated } from 'react-native';
import { white, gray, lightPurp } from '../utils/colors'
import { getDecks, DECKS_STORAGE_KEY } from '../utils/LocalStorage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

class Decks extends Component{
  state = {
    card: '',
    decks:{},
    coords: null,
    status: null,
    direction: '',
    bounceValue: new Animated.Value(1),
  }

  update = (e) => {
    getDecks()
      .then((decks) => {
        this.setState( (prev) => ({
          ...prev,
          decks
        }))
      })

    let tomorrow = new Date() + 0

    //tomorrow.setHours(22)
    //tomorrow.setMinutes(37)
    console.log(tomorrow)
    //setLocalNotification()
  }
  click = (e) => {
    const { bounceValue } = this.state
    getDecks()
      .then((decks) => {
        this.setState( (prev) => ({
          ...prev,
          decks
        }))
      })
    .then(()=> this.props.navigation.navigate('Deck', { entryId: e }))
    .then(() => {
      Animated.sequence([
          Animated.timing(bounceValue, { duration: 100, toValue: 1.10 }),
          Animated.spring(bounceValue, { toValue: 1, friction: 10})
        ]).start()
    })
  }

  componentDidMount() {
    getDecks()
      .then((decks) => {
        this.setState( (prev) => ({
          ...prev,
          decks
        }))
      })
  }

  render() {
    const { decks, bounceValue } = this.state;
    return(
    <View>
      <Button title='update' onPress={this.update} />
      <ScrollView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          {Object.keys(decks).map((title)=>(
            <TouchableOpacity key={title} style={{flex:1}} onPress={() => this.click(decks[title])}>
              <View style={styles.item}>
                <Animated.Text style={[styles.noDataText, {transform: [{scale: bounceValue}]} ]} >
                  {title} : {decks[title]['questions'].length} {decks[title]['questions'].length > 1 ? "cards":"card"}
                </Animated.Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
    );
  }
}

export default Decks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  item : {
    backgroundColor: lightPurp,
    borderRadius: Platform.OS === 'ios' ? 16 : 8,
    padding: 2,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'stretch',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)'
  },
  noDataText: {
    fontSize: 30,
    padding: 10,
    color: white,
  },
  cardCount: {
    color: white,
    fontSize: 20,
    padding: 10,
  }
})