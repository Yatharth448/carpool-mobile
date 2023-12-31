import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../Screens/login/LoginScreen';
import KycScreen from '../../Screens/kyc/KycScreen';
import AcccountSetupScreen from '../../Screens/account/AcccountSetupScreen';
import OTPScreen from '../../Screens/otp/OTPScreen';
import FindRideList from '../../Screens/findridelist/FindRideList';
import { AppColors } from '../constants/AppColor';
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
import Payment from '../../Screens/payment/Payment';
import Cotravellers from '../../Screens/ridehistory/Cotravellers';
import Success from '../../Screens/success/Success';
import OfferedRideDetails from '../../Screens/ridehistory/OfferedRideDetails';
import RequestedRideDetails from '../../Screens/ridehistory/RequestedRideDetails';
import AddVehicle from '../../Screens/addnewvehicle/AddVehicle';
import UploadDocuments from '../../Screens/kyc/UploadDocuments';
import Support from '../../Screens/support/Support';
import VerifyAadharOTP from '../../Screens/kyc/VerifyAadharOTP';
import StartRideCarpooler from '../../Screens/startridecarpooler/StartRideCarpooler';
import Notification from '../../Screens/notification/Notification';
import AddGenderMobile from '../genderMobile/AddGenderMobile';
import RideCotravaller from '../../Screens/ridecotravaller/RideCotravaller';
import PaymentHistory from '../../Screens/payment/PaymentHistory';
import SendFeedback from '../../Screens/feeddback/SendFeedback';
import PayGateway from '../payment/PayGateway';
import PaymentSuccess from '../../Screens/payment/PaymentSuccess';
import PaymentFailure from '../../Screens/payment/PaymentFailure';
import AddBank from '../../Screens/bank/AddBank';
import Withdraw from '../../Screens/bank/Withdraw';
import ForgotPassword from '../../Screens/forgotpassword/ForgotPassword';
import ResetPassword from '../../Screens/forgotpassword/ResetPassword';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function RideDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerScreen {...props} />}
      initialRouteName="FindRide"
      screenOptions={{ headerShown: false, swipeEnabled: false }}>
      <Drawer.Screen
        name="FindRide"
        component={FindRide}
        options={{ swipeEnabled: false }}
      />

      <Drawer.Screen
        name="ActiveRideCarpooler"
        component={StartRideCarpooler}
      />
      <Drawer.Screen name="RideCotraveller" component={RideCotravaller} />
      <Drawer.Screen name="Payment" component={Payment} />

    </Drawer.Navigator>
  );
}

export default function RootNav() {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={AppColors.themePrimaryColor}
        barStyle="light-content"
      />

      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ animationEnabled: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ animationEnabled: false }}
        />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />
        <Stack.Screen
          name="AcccountSetupScreen"
          component={AcccountSetupScreen}
        />
        <Stack.Screen name="KycScreen" component={KycScreen} />
        <Stack.Screen name="RideHistory" component={RideHistory} />
        <Stack.Screen name="PaymentHistory" component={PaymentHistory} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="FindRideList" component={FindRideList} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="MapRoutes" component={MapRoutes} />
        <Stack.Screen name="Cotravellers" component={Cotravellers} />
        <Stack.Screen
          name="OfferedRideDetails"
          component={OfferedRideDetails}
        />
        <Stack.Screen
          name="RequestedRideDetails"
          component={RequestedRideDetails}
        />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="MessageRoom" component={MessageRoom} />
        <Stack.Screen name="Success" component={Success} />
        <Stack.Screen name="AddVehicle" component={AddVehicle} />
        <Stack.Screen name="Support" component={Support} />
        <Stack.Screen name="UploadDocuments" component={UploadDocuments} />
        <Stack.Screen name="VerifyAadharOTP" component={VerifyAadharOTP} />
        <Stack.Screen name="SearchLocation" component={SearchLocation} />
        <Stack.Screen name="AddGenderMobile" component={AddGenderMobile} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="SendFeedback" component={SendFeedback} />
        <Stack.Screen name="PayGateway" component={PayGateway} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
        <Stack.Screen name="PaymentFailure" component={PaymentFailure} />
        <Stack.Screen name="AddBank" component={AddBank} />
        <Stack.Screen name="Withdraw" component={Withdraw} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />

        <Stack.Screen
          name="RideDrawer"
          component={RideDrawer}
          options={{ animationEnabled: false, swipeEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
