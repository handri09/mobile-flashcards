import AsyncStorage from '@react-native-async-storage/async-storage';
export const DECKS_STORAGE_KEY = 'decks:key';

const Data = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
};

export const storeData = async (decks) => {
  try {
    const jsonValue = decks ? JSON.stringify(decks) : JSON.stringify(Data)
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, jsonValue)
  } catch (e) {
    console.log('ERROR.StoreData: ', e)
  }
  return getDecks()
}

export function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((value) => {
      return value ? JSON.parse(value) : storeData();
    });
}

export function addDeck(title) {
  const newDeck = { title, questions: [] }
  let decks = {}

  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      decks = results ? JSON.parse(results) : {}
      decks[title] = newDeck;
      return newDeck
    })
    .then((newDeck) => {
      const jsonValue = JSON.stringify(decks)
      AsyncStorage.setItem(DECKS_STORAGE_KEY, jsonValue)
      return newDeck
    })
    .then((result) => result)
}

export function addCardToDeck(title, question, answer) {
  const newCard = { question: question, answer: answer };
  let decks = {};
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((value) => {
      decks = value ? JSON.parse(value) : {};
      decks = {
        ...decks,
        [title]: {
          title: decks[title].title,
          questions: decks[title].questions.concat(newCard)
        }
      }
    })
    .then(() => {
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
    })
}