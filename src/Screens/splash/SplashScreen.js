import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	Image,
	Platform,
	BackHandler,
	Dimensions
} from 'react-native';

import { LogBox } from 'react-native';
import Storage from '../../components/localStorage/storage';
import { AppKeys } from '../../components/constants/AppKeys';
import { AppColors } from '../../components/constants/AppColor';
import {getToken, configureNotification} from '../../Utils/PushNotification';



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
		getToken()
		configureNotification()
		let token
		token = await Storage.getSavedItem(AppKeys.SECRET_KEY)
		return token

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
			setTimeout(async() => {
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
						source={require('../../assets/mapbg.png')}
						style={{ marginRight: 5, width: Dimensions.get('screen').width, height: Dimensions.get('screen').height, resizeMode: 'contain' }} />
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
