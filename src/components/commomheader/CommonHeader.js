import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { AppColors } from "../constants/AppColor";
export const Header = ({close}) => {


    return (

        <View style={{ backgroundColor: AppColors.themePrimaryColor, width: '100%', height: 60 }}>

            <View style={{ width: '100%', height: Platform.OS == 'android' ? 60 : 160, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '100%', flexDirection: 'row', marginTop: Platform.OS == 'android' ? 0 : '12%', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Pressable onPress={close} style={{ width: '50%', height: 50, alignItems: 'flex-start', paddingLeft: 20, justifyContent: 'center' }}>

                        <Image source={require('../../assets/close.png')} style={{ width: 15, height: 15 }} />
                    </Pressable>
                    <View style={{ width: '50%', height: 50, alignItems: 'flex-end', paddingRight: 20, justifyContent: 'center' }}>
                        {/* <Image source={require('../../assets/profile.png')} style={{ width: 30, height: 30 }} /> */}
                    </View>

                </View>
            </View>
            {/* <View style={{alignItems: 'center', backgroundColor: AppColors.themePickupDropSearchBg, width: '100%', height: 50, borderTopLeftRadius: 40, borderTopRightRadius: 40}}></View> */}
        </View>


    )

}