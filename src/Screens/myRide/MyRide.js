import React from "react";
import {View, TouchableOpacity, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { AppColors } from "../../components/constants/AppColor";

export default function MyRide({navigation}) {




    const clearAllData= (nav) => {
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
        <View style={{ width: '100%', alignItems: 'center', marginTop: '13%', height: 100 }}>

            <Text>My Ride</Text>
            <TouchableOpacity onPress={() => LogoutAlert(navigation)} style={{ backgroundColor: AppColors.themePrimaryColor, width: '55%', height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: AppColors.themesWhiteColor }}>{'Logout'}</Text>
            </TouchableOpacity>
        </View>
    )
}
