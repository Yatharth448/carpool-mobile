import { Alert, Linking } from 'react-native';
import Geolocation from 'react-native-geolocation-service';


export  const GetCurrentLocation = async () => {

    return new Promise((resolve, reject) => {

        try {

         Geolocation.getCurrentPosition(
                (successCallback) => {
                    console.log('success')
                    return resolve({ latitude: successCallback.coords.latitude, longitude: successCallback.coords.longitude });
                },

                (errorCallback) => {
                    console.log('error 2')
                    return resolve({ latitude: 0.0, longitude: 0.0 })
                },
                { enableHighAccuracy: true, timeout: 15000, maxAge: 10000 }

            )
        }
        catch (ex) {
            console.log('error', ex)
            return resolve({ latitude: 0.0, longitude: 0.0 })
        };
    })
}

export function locationAlert() {

    Alert.alert(
        'Location Permission',
        'Shyptrack app collects location data to track rider location even when the app is closed or not in use, to help better route allocation for nearby pickup/delivery. ',
        [
            // { text: 'DENY', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'DENY', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'ALLOW', onPress: () => requestLocationPermission() },
        ],
        { cancelable: false });
}
export function requestLocationPermission() {

    Alert.alert(
        'Location Permission',
        'This app needs the location permission, Please on your GPS location'
        ,
        [
            { text: 'Enable Location', onPress: () => Linking.openSettings() },
        ],
        {
            cancelable: false,
        },
    );
}