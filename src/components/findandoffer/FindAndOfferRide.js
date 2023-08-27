import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { AppColors } from '../constants/AppColor'
import { AppFontFamily } from '../constants/AppFonts'

export function FindAndOfferRide(onFindClick, onOfferClick, find) {

    return (


        <View style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-evenly', marginTop: 30 }}>

            <TouchableOpacity style={{ width: '45%', height: 50, alignItems: 'center', justifyContent: 'center' }} onPress={onFindClick}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('../../assets/searchride.png')} style={{ width: 24, height: 24 }} />
                    <Text style={{ fontFamily: AppFontFamily.PopinsMedium, width: '70%', textAlign: 'center', color: find ? AppColors.themePrimaryColor : AppColors.themeTextPrimaryColor, fontSize: 16 }}>{'Search Ride'}</Text>
                </View>
                <View style={{ marginTop: 8, width: '100%', height: 2.5, backgroundColor: find ? AppColors.themePrimaryColor : null }} />
            </TouchableOpacity>

            <TouchableOpacity style={{ width: '45%', height: 50, alignItems: 'center', justifyContent: 'center' }} onPress={onOfferClick}>
                <Text style={{ fontFamily: AppFontFamily.PopinsMedium, width: '100%', textAlign: 'center', color: find ? AppColors.themeTextPrimaryColor : AppColors.themePrimaryColor, fontSize: 16 }}>{'Offer Ride'}</Text>
                <View style={{ marginTop: 8, width: '100%', height: 2.5, backgroundColor: find ? null : AppColors.themePrimaryColor }} />
            </TouchableOpacity>

        </View>

    )
}
