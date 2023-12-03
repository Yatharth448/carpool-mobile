import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Platform,
  BackHandler,
  Dimensions,
  Alert,
} from 'react-native';

import { LogBox } from 'react-native';
import Storage from '../../components/localStorage/storage';
import { AppKeys } from '../../components/constants/AppKeys';
import { AppColors } from '../../components/constants/AppColor';
import { connect } from 'react-redux';
import { getProfileDataRequest } from '../../redux/actions/actions';
import { getToken, configureNotification, requestUserPermission } from '../../Utils/PushNotification';
import { pushNotificationPermission } from '../../Utils/RuntimePermission';
import PushNotification from 'react-native-push-notification';
import { CreateNotificationChannel } from '../../components/notifications/LocalNotification';
import {
  checkLocationPermission,
  checkLocationPermissionIOS,
  locationAlert,
} from '../../components/location/GetCurrentLocation';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  backPress = () => {
    // RNExitApp.exitApp()
  };

  UNSAFE_componentWillMount() {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.backPress);
    }
  }
  UNSAFE_componentWillUnmount() {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.backPress);
    }
  }
  getSavedToken = async () => {



    
      console.log('request permission')
      await requestUserPermission();
      await getToken()
 

    if (Platform.OS == 'android') {
      pushNotificationPermission();
      CreateNotificationChannel();
    }


    let locationPermission;
    locationPermission = await Storage.getSavedItem(
      AppKeys.LOCATION_PERMISSION_KEY,
    );

    console.log(locationPermission, 'location permission');
    if (locationPermission === null || locationPermission === undefined) {
      this.getLocationPermissionPopup();
    }

    let token;
    token = await Storage.getSavedItem(AppKeys.SECRET_KEY);
    return token;
  };

  async getLocationPermissionPopup() {
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
        { text: 'ALLOW', onPress: async () => Platform.OS == 'android' ?  await checkLocationPermission() : await checkLocationPermissionIOS() },
      ],
      { cancelable: false },
    );
  }

  async componentDidMount() {
    LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
    LogBox.ignoreAllLogs(); //Ignore all log notifications
    // SplashScreen.hide();
    //
    this.props.getProfileDataRequest()
    await this.startTimer();
  }
  async startTimer() {
    await new Promise((resolve, reject) => {
      setTimeout(async () => {
        resolve(true);
        console.log('timer ');
        const token = await this.getSavedToken();
        console.log(token, 'ttt');
        if (token) {
          console.log('inside token');
          this.props.navigation.navigate('RideDrawer');
        } else {
          this.props.navigation.navigate('LoginScreen');
        }

        // this.setState({ showSplash: 2 })
      }, 4000);
    });
  }

  render() {
    return (
      <View style={styles.main}>
        {/* <View style={styles.SplashScreen_RootView}> */}
        <Image
          source={require('../../assets/splashscreen.png')}
          style={{
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height,
            resizeMode: 'cover',
          }}
        />
        {/* </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColors.themesWhiteColor,
  },
  container: {
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  data: state.data,
  loading: state.loading,
  error: state.error,
});

const mapDispatchToProps = {
  getProfileDataRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);