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
import Message from '../../Screens/message/Message';
import FindRide from '../../Screens/home/FindRide';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from '../../Screens/splash/SplashScreen';
const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator()
const ACTIVE_TAB_COLOR = AppColors.themePrimaryColor;
const INACTIVE_TAB_COLOR = AppColors.themeBlackColor;


function RideTab() {
    const customTabBarStyle = {
       backgroundColor: AppColors.themePrimaryColor
       
    }
    return (
        <BottomTab.Navigator
        
            initialRouteName="My Ride"
            activeColor="red"
            inactiveTintColor= 'gray'
            screenOptions={{
                // activeTintColor: 'red',
                headerShown: false,
                // barStyle:{backgroundColor: 'red'},
                // style:{backgroundColor: 'red'},
                tabBarStyle: {backgroundColor: 'white' , height: 60, marginLeft: 8, marginRight: 8,paddingBottom: 10, borderRadius: 10, marginBottom: 8},
              }}
            // backgroundColor={'blue'}
            tabBarOptions={customTabBarStyle}
            shifting="false">
            <BottomTab.Screen
                name="My Ride"
                options={{
                    marginLeft: 10,
                    tabBarLabel: 'MY RIDE',
                    tabBarIcon: ({ color, focused }) => (
                        style={marginLeft: 10},
                        <Image source={require('../../assets/myride.png')} style={{width: 26, tintColor: color}}/>
                        // <Icon name="home" color={color} size={26} />
                    )
                }}
                component={MyRide} />
            <BottomTab.Screen
                name="Add"
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 0, // space from bottombar
                                height: 68,
                                width: 68,
                                borderRadius: 34,
                                // borderColor: AppColors.themeCardBorderColor,
                                // borderWidth: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: AppColors.themesWhiteColor
                            }}
                        >
                             <Image source={require('../../assets/locationtab.png')} style={{ width: 75, marginTop: 15, resizeMode: 'contain' }} />
                            {/* <Icon name="add-circle-outline" color="grey" size={68} /> */}
                        </View>
                    )
                }}
                component={FindRide} />
            <BottomTab.Screen
                name="Message"
                options={{
                    tabBarLabel: 'MESSAGE',
                    tabBarIcon: ({ color }) => (
                        <Icon name="messenger-outline" color={color} size={26} />
                    )
                }}
                component={Message} />
        </BottomTab.Navigator>
    );
}


export default function RootNav() {



    return (
        <NavigationContainer>

            <StatusBar backgroundColor={AppColors.themePrimaryColor} barStyle='light-content' />


            <Stack.Navigator screenOptions={{ headerShown: false }} >

                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ animationEnabled: false }} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="OTPScreen" component={OTPScreen} />
                <Stack.Screen name="AcccountSetupScreen" component={AcccountSetupScreen} />
                <Stack.Screen name="KycScreen" component={KycScreen} />
                <Stack.Screen name='FindRideList' component={FindRideList}/>
                <Stack.Screen name='MapRoutes' component={MapRoutes}/>
                <Stack.Screen name="RideTab" component={RideTab} options={{ animationEnabled: false }} />



            </Stack.Navigator>

        </NavigationContainer>
    )
}


