import React from 'react'
import * as Notifications from 'expo-notifications';
import { AsyncStorage } from 'react-native';

const NOTIFICATION_KEY = 'mobileFlashCards:notifications'

export function clearLocalNotification(){
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then( Notifications.cancelAllScheduledNotificationsAsync );
}

function createNotification(){
  return {
    title: 'Log your stats',
    body: '👋 Dont forget to lo your stats for today',
    ios:{
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification(){
  AsyncStorage.getItem( NOTIFICATION_KEY )
    .then(JSON.parse)
    .then( data => {
      if ( !data ){
        Notifications.requestPermissionsAsync()
          .then( ({ status }) => {
            if ( status === 'granted' ){
              Notifications.cancelAllScheduledNotificationsAsync()
                .catch(console.error);

              Notifications.scheduleNotificationAsync({
                content: createNotification(),
                trigger: {
                  hour: 18,
                  minute: 0,
                  repeats: true
                }
              })
              .catch(console.error);

              Notifications.setNotificationHandler({
                handleNotification: async () => ({
                  shouldShowAlert: true,
                  shouldPlaySound: false,
                  shouldSetBadge: false,
                })
              })

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
              }
            })
      }
    })
}