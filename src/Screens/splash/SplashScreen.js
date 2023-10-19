import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	Image,
	Platform,
	BackHandler,
	Dimensions,
	Alert
} from 'react-native';

import { LogBox } from 'react-native';
import Storage from '../../components/localStorage/storage';
import { AppKeys } from '../../components/constants/AppKeys';
import { AppColors } from '../../components/constants/AppColor';
import { getToken, configureNotification } from '../../Utils/PushNotification';
import { pushNotificationPermission } from '../../Utils/RuntimePermission';
import PushNotification from 'react-native-push-notification';
import { CreateNotificationChannel } from '../../components/notifications/LocalNotification';
import { checkLocationPermission, locationAlert } from '../../components/location/GetCurrentLocation';


export default class SplashScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	backPress = () => {
		// RNExitApp.exitApp()
	}

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
		let locationPermission
		locationPermission = await Storage.getSavedItem(AppKeys.LOCATION_PERMISSION_KEY)
		getToken()
		configureNotification()

		// PushNotification.checkPermissions(function(permissions) {  console.log(permissions, 'noti'); });
		// PushNotification.requestPermissions()
		// console.log(permission, 'noti')
		
		await pushNotificationPermission()
		await CreateNotificationChannel()
		console.log(locationPermission, 'location permission')
		if (locationPermission === null || locationPermission === undefined)
		{
			this.getLocationPermissionPopup()
		}

		let token
		token = await Storage.getSavedItem(AppKeys.SECRET_KEY)
		return token

	}

	async getLocationPermissionPopup(){
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
			  {text: 'ALLOW', onPress: async () => await checkLocationPermission()},
			],
			{cancelable: false},
		  );
	}

	async componentDidMount() {
		LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
		LogBox.ignoreAllLogs(); //Ignore all log notifications
		// SplashScreen.hide();
		//   

		await this.startTimer()

	}
	async startTimer() {
		await new Promise((resolve, reject) => {
			setTimeout(async () => {
				resolve(true);
				const token = await this.getSavedToken()
				console.log(token, 'ttt')
				if (token) {
					this.props.navigation.navigate('RideDrawer');
				}
				else {
					this.props.navigation.navigate('LoginScreen');
				}

				// this.setState({ showSplash: 2 })
			}, 2000);
		})
	}


	render() {

		return (
			<View style={styles.main}>


				{/* <View style={styles.SplashScreen_RootView}> */}
				<Image
					source={require('../../assets/splashscreen.png')}
					style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').height, resizeMode: 'cover' }} />
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
