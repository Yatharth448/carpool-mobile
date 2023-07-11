import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../Screens/login/LoginScreen';
import KycScreen from '../../Screens/kyc/KycScreen';
import AcccountSetupScreen from '../../Screens/account/AcccountSetupScreen';
import OTPScreen from '../../Screens/otp/OTPScreen';
import { AppColors } from '../constants/AppColor';

const Stack = createStackNavigator()
export default function RootNav() {
    return (
        <NavigationContainer>

            <StatusBar backgroundColor={AppColors.themePrimaryColor} barStyle='light-content' />


            <Stack.Navigator screenOptions={{ headerShown: false }} >

                {/* <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ animationEnabled: false }} /> */}
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="KycScreen" component={KycScreen} />
                <Stack.Screen name="AcccountSetupScreen" component={AcccountSetupScreen} />
                <Stack.Screen name="OTPScreen" component={OTPScreen} />



            </Stack.Navigator>

        </NavigationContainer>
    )
}
