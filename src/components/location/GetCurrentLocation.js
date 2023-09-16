import {Alert, Linking, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS} from 'react-native-permissions';

export const GetCurrentLocation = async () => {
  return new Promise((resolve, reject) => {
    try {
      Geolocation.getCurrentPosition(
        successCallback => {
          console.log('success');
          return resolve({
            latitude: successCallback.coords.latitude,
            longitude: successCallback.coords.longitude,
          });
        },

        errorCallback => {
          console.log('error 2');
          return resolve({latitude: 0.0, longitude: 0.0});
        },
        {
          enableHighAccuracy: true,
          timeout: 65000,
          maxAge: 60000,
          forceRequestLocation: true,
        },
      );
    } catch (ex) {
      console.log('error', ex);
      return resolve({latitude: 0.0, longitude: 0.0});
    }
  });
};

export const checkLocationPermission = async () => {
  try {
    const granted = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );

    if (granted === 'granted') {
      console.log('Location permission granted');
      return true;
    } else {
      console.log('Location permission denied');
    }
  } catch (error) {
    console.error('Error requesting location permission:', error);
  }
};

export function locationAlert() {
  Alert.alert(
    'Location Permission',
    'Shyptrack app collects location data to track rider location even when the app is closed or not in use, to help better route allocation for nearby pickup/delivery. ',
    [
      // { text: 'DENY', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      {
        text: 'DENY',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'ALLOW', onPress: () => requestLocationPermission()},
    ],
    {cancelable: false},
  );
}
export function requestLocationPermission() {
  Alert.alert(
    'Location Permission',
    'This app needs the location permission, Please on your GPS location',
    [{text: 'Enable Location', onPress: () => Linking.openSettings()}],
    {
      cancelable: false,
    },
  );
}
