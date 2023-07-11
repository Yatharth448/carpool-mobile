import React from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';

export async function request_storage_runtime_permission() {

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        'title': 'Storage Permission',
        'message': 'App needs access to your storage to download Photos.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

      Alert.alert("Storage Permission Granted.");
    }
    else {

      Alert.alert("Storage Permission Not Granted");

    }
  } catch (err) {
    console.warn(err)
  }
}

export const galleryPermission = async () => {

  const permission = await request(Platform.OS == 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
  console.log(permission, 'gal')
  if (permission == 'blocked' || permission == 'unavailable' || permission == 'denied') {
    return false
  }
  else return true

}

export const cameraPermission = async () => {

  const permission = await request(Platform.OS == 'ios' ? PERMISSIONS.IOS.CAMERA: PERMISSIONS.ANDROID.CAMERA)
  console.log(permission, 'gal')
  if (permission == 'blocked' || permission == 'unavailable' || permission == 'denied') {
    return false
  }
  else return true

}