import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { storeData } from './utils/LocalStorage'
import { clearLocalNotification, setLocalNotification } from './components/Notif'
import { purple } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

import AddDeck from './components/AddDeck'
import Decks from './components/Decks'
import Deck from './components/Deck'
import Card from './components/Card'
import AddCard from './components/AddCard'

class App extends Component {

  componentDidMount (){
    // Load the data (decks) from the AsyncStorage
    storeData()
    // Setting up the Notification at 06:00 PM
    clearLocalNotification()
      .then (()=>setLocalNotification())
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <NavigationContainer>
          <Tabs.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if(route.name === 'Decks') {
                  iconName = focused
                    ? 'archive'
                    : 'archive-outline'
                } else if (route.name === 'AddDeck') {
                  iconName = focused
                    ? 'add-circle'
                    : 'add-circle-outline'
                } 
                return <Ionicons name={iconName} size={size} color={color} />
              },
              tabBarActiveTintColor: purple,
              tabBarInactiveTintColor: 'gray'
            })}
          >
            <Tabs.Screen name="Decks" component={HomeStackScreen} />
            <Tabs.Screen name="AddDeck" component={AddDeck} />
          </Tabs.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const Tabs = createBottomTabNavigator()
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="ListDecks" component={Decks} />
      <HomeStack.Screen name="Deck" component={Deck} />
      <HomeStack.Screen name="AddCard" component={AddCard} />
      <HomeStack.Screen name="Card" component={Card} />
    </HomeStack.Navigator>
  );
}

export default App;