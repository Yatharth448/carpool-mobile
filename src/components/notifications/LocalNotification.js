import PushNotification from 'react-native-push-notification';
import { AppKeys } from '../constants/AppKeys';

export const showNotification = (data) => {
    PushNotification.localNotification({
        title: data.title,
        message: data.message,
        channelId: AppKeys.LOCAL_NOTIFICATION,
        //   channelName: 'Your Channel Name', // Replace with your channel name
        //   channelDescription: 'Your Channel Description',
    });
};

export const CreateNotificationChannel = () => {
    PushNotification.createChannel(
        {
            channelId: AppKeys.LOCAL_NOTIFICATION, // Replace with your channel ID
            // channelName: 'Your Channel Name', // Replace with your channel name
            // channelDescription: 'Your Channel Description', // Replace with your channel description (optional)
            playSound: true, // (optional) default: true
            soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
            importance: 4, // (optional) default: 4. Int value of the Android notification importance
            vibrate: true,
        },
        (created) => console.log(`Channel created: ${created}`), // Callback function
    )
}