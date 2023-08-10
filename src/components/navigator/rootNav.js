import React from 'react';
import { StatusBar, View, Image, BlurView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../Screens/login/LoginScreen';
import KycScreen from '../../Screens/kyc/KycScreen';
import AcccountSetupScreen from '../../Screens/account/AcccountSetupScreen';
import OTPScreen from '../../Screens/otp/OTPScreen';
import FindRideList from '../../Screens/findridelist/FindRideList';
import { AppColors } from '../constants/AppColor';
import MyRide from '../../Screens/myRide/MyRide';
import MapRoutes from '../../Screens/routes/MapRoutes';
import MessageRoom from '../../Screens/message/MessageRoom';
import FindRide from '../../Screens/home/FindRide';
import ProfileScreen from '../../Screens/profile/ProfileScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from '../../Screens/splash/SplashScreen';
import Chat from '../../Screens/message/Chat';
import SignupScreen from '../../Screens/signup/signup';
import SearchLocation from '../GooglLocation/SearchLocation';
import DrawerScreen from '../drawer/Drawer';
import RideHistory from '../../Screens/ridehistory/RideHistory';
import UpdateProfile from '../../Screens/profile/UpdateProfile';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator()


function RideDrawer() {

    return (

        // <NavigationContainer>
        <Drawer.Navigator drawerContent={(props) => <DrawerScreen {...props} />} initialRouteName="FindRide" screenOptions={{ headerShown: false }}>
            <Drawer.Screen name="FindRide" component={FindRide} />
            <Drawer.Screen name="RideHistory" component={RideHistory} />
            {/* <Drawer.Screen name="MessageRoom" component={MessageRoom} />
                <Drawer.Screen name='MapRoutes' component={MapRoutes} />
                <Drawer.Screen name='ProfileScreen' component={ProfileScreen} /> */}
            {/* <Drawer.Screen name='FindRideList' component={FindRideList} /> */}
            {/* <Drawer.Screen name='Chat' component={Chat} /> */}
            {/* Add more screens here */}
        </Drawer.Navigator>
        // </NavigationContainer>


    );
}


export default function RootNav() {

    return (
        <NavigationContainer>

            <StatusBar backgroundColor={AppColors.themePrimaryColor} barStyle='light-content' />

            <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }} >

                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ animationEnabled: false }} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="OTPScreen" component={OTPScreen} />
                <Stack.Screen name="AcccountSetupScreen" component={AcccountSetupScreen} />
                <Stack.Screen name="KycScreen" component={KycScreen} />
                <Stack.Screen name='SignupScreen' component={SignupScreen} />
                <Stack.Screen name='FindRideList' component={FindRideList} />
                <Stack.Screen name='UpdateProfile' component={UpdateProfile} />
                <Stack.Screen name='ProfileScreen' component={ProfileScreen} /> 
                <Stack.Screen name="RideDrawer" component={RideDrawer} options={{ animationEnabled: false }} />

            </Stack.Navigator>

        </NavigationContainer>
    )
}


