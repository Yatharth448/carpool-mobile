import React from "react";
import { View, TouchableOpacity, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { AppColors } from "../../components/constants/AppColor";
import { Header } from "../../components/commomheader/CommonHeader";

export default function MyRide({ navigation }) {




    const clearAllData = (nav) => {
        AsyncStorage.getAllKeys()

            .then(keys => AsyncStorage.multiRemove(keys))
            .then(() => nav.reset({
                index: 0,
                routes: [{ name: 'SplashScreen' }],
            }));
    }

    const LogoutAlert = (navigation) => {
        Alert.alert(
            '',
            'Are you sure you want to logout ?',
            [
                { text: 'OK', onPress: clearAllData(navigation) },
            ],
            {
                cancelable: false,
            },
        );
    }



    return (
        <View style={{ flex: 1, backgroundColor: AppColors.themePickupDropSearchBg }}>
            <Header close={() => { navigation.goBack() }} text='My Ride' isBack={false}/>
            <Text>My Ride</Text>
          
        </View>
    )
}
