import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper';
import { AppFontFamily } from '../../components/constants/AppFonts';
import { AppColors } from '../../components/constants/AppColor';

export const statusColor = (status) => {

    switch (status) {
        case 'accepted':
            return '#898989';
        case 'confirmed':
            return '#ed6f07';
        case 'cancelled':
            return '#d71920';
        case 'completed':
            return '#67d1c3';
        case 'requested':
            return 'green'
        default:
            return '#000'
    }
}

export const RideStatusView = (status) => {
    switch (status) {
        case 'requested':
            return (

                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 14, fontFamily: AppFontFamily.PopinsBold, color: AppColors.themeNotificationBg }}></Text>
                </View>

            );
        case 'cancelled':
            return (

                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 14, fontFamily: AppFontFamily.PopinsBold, color: AppColors.themeNotificationBg }}></Text>
                </View>

            );
        case 'accepted':
            return (

                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 14, fontFamily: AppFontFamily.PopinsBold, color: AppColors.themeNotificationBg }}></Text>
                </View>

            )
    }
}
