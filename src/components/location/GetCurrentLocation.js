import {Alert, Linking, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS} from 'react-native-permissions';
import {AppKeys} from '../constants/AppKeys';
import Storage from '../localStorage/storage';

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
        ? PERMISSIONS.IOS.LOCATION_ALWAYS
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );

    console.log('Location permission = '+ granted);
    if (granted === 'granted') {
      Storage.saveItem(AppKeys.LOCATION_PERMISSION_KEY, 'yes')
      return true;
    } else {
      console.log('Location permission denied');
      return false;
    }
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
};

export const locationAlert = async () => {
  Alert.alert(
    'Location Permission',
    'ShareWheelz app collects location data to track carpooler location even when the app is closed or not in use, to help better route allocation for nearby pickup points.',
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

export const getCurrentLocationFromLatLong = async (lat, long) => {
  console.log(lat, long, 'lat lng');

  const placeName = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&sensor=true/false&key=${AppKeys.API_KEY}`;

  try {
    const response = await fetch(placeName);
    const data = await response.json();
    if (data) {
      return data.results[0].formatted_address;
    }
  } catch (error) {
    console.error('Error fetching predictions:', error);
  }
};
