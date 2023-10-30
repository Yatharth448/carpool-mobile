import {Platform, NotificationService} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {PermissionsAndroid} from 'react-native';

import PushNotificationIOS from '@react-native-community/push-notification-ios';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppKeys} from '../components/constants/AppKeys';
import {showNotification} from '../components/notifications/LocalNotification';

// Must be outside of any component LifeCycle (such as `componentDidMount`).

export const getToken = async () => {
  const fcmToken = await firebase.messaging().getToken();
  if (fcmToken) {
    console.log('fcm Token', fcmToken);
    await AsyncStorage.setItem('fcmToken', fcmToken);
  } else {
    NotificationService.error(constant.error, 'Could not get the FCM token');
  }
};

export const requestUserPermission = async () => {
  const permission = await messaging().requestPermission();
  if (permission) {
    console.log('Permission granted');
  } else {
    console.log('Permission denied');
  }
};

export const configureNotification = () => {
  PushNotification.configure({
    onRegister: function (token) {
      messaging().subscribeToTopic('all');
      console.log('TOKEN:', token);
    },

    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
      if (notification.title != undefined && notification.message != undefined)
        PushNotification.localNotification(notification);

      // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);
    },
    onRegistrationError: function (err) {
      NotificationService.error(constant.error, err.message);
    },

    notification: {
      foreground: true, // BOOLEAN: If the notification was received in foreground or not
      userInteraction: false, // BOOLEAN: If the notification was opened by the user from the notification area or not
      message: 'My Notification Message', // STRING: The notification message
      data: {}, // OBJECT: The push data or the defined userInfo in local notifications
    },
    senderID: '275128898778',
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });

  requestUserPermission();

  // messaging().onMessage(async (remoteMessage) => {
  //     console.log('Received foreground notification: ', remoteMessage);
  // });

  // Handle incoming notifications when app is in background
  messaging().onNotificationOpenedApp(async remoteMessage => {
    // console.log('Received background notification: ', remoteMessage);
  });

  // Handle incoming notifications when app is closed
  messaging()
    .getInitialNotification()
    .then(async remoteMessage => {
      // console.log('Received closed app notification: ', remoteMessage);
    });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    // console.log('Message handled in the background!', remoteMessage);
  });
  let listenerVariable = messaging().onMessage(async remoteMessage => {
    // console.log('ios', remoteMessage);
    if (!remoteMessage.notification) {
      return;
    }
    // Platform.OS == 'ios'
    //   ? PushNotificationIOS.addNotificationRequest({
    //       id: remoteMessage.messageId,
    //       body: remoteMessage.notification.body,
    //       title: remoteMessage.notification.title,
    //       userInfo: remoteMessage.data,
    //     })
    //   :
    // PushNotification.createChannel(
    //     {
    //       channelId: AppKeys.LOCAL_NOTIFICATION_CHANNEL_ID, // (required)
    //       channelName: AppKeys.LOCAL_NOTIFICATION_CHANNEL_NAME, // (required)
    //       playSound: true, // (optional) default: true
    //       soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    //       importance: 4, // (optional) default: 4. Int value of the Android notification importance
    //       vibrate: true,
    //     },
    //     created => console.log(`createChannel returned '${created}'`),
    //   );
    // const dat = {
    //   channelId: AppKeys.LOCAL_NOTIFICATION_CHANNEL_ID, // Replace with your channel ID
    //   channelName: AppKeys.LOCAL_NOTIFICATION_CHANNEL_NAME, // Replace with your channel name
    //   body: remoteMessage.notification.body, // (required)
    //   title: remoteMessage.notification.title,
    // };
    console.log('Received foreground notification: ', remoteMessage);
    showNotification({
      title: remoteMessage.notification.title,
      message: remoteMessage.notification.body,
    });
    // console.log('dat', dat);
    // PushNotification.localNotification(dat);
  });
  console.log('listne variabl ', listenerVariable, typeof listenerVariable);
  return listenerVariable;
};
