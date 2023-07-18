import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { AppColors } from "../constants/AppColor";
export const Header = ({ isBack= true, close, text = '' }) => {


    return (

        <View style={{ backgroundColor: AppColors.themePrimaryColor, width: '100%', height: 60 }}>

            <View style={{ width: '100%', height: Platform.OS == 'android' ? 60 : 160, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '100%', flexDirection: 'row', marginTop: Platform.OS == 'android' ? 0 : '12%', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Pressable onPress={ isBack ? close : console.log('')} style={{ width: '30%', height: 50, alignItems: 'flex-start', paddingLeft: 20, justifyContent: 'center' }}>

                       {isBack ?  <Image source={require('../../assets/close.png')} style={{ width: 15, height: 15 }} /> : null}
                    </Pressable>
                    <View style={{ width: '40%', height: 50, alignItems: 'center', paddingRight: 20, justifyContent: 'center' }}>
                        <Text style={{ fontWeight: '600', alignItems: 'center', color: AppColors.themesWhiteColor, fontSize: 18 }}>{text}</Text>
                    </View>
                    <View style={{ width: '30%', height: 50, alignItems: 'flex-end', paddingRight: 20, justifyContent: 'center' }}>
                        {/* <Image source={require('../../assets/profile.png')} style={{ width: 30, height: 30 }} /> */}
                    </View>

                </View>
            </View>
            {/* <View style={{alignItems: 'center', backgroundColor: AppColors.themePickupDropSearchBg, width: '100%', height: 50, borderTopLeftRadius: 40, borderTopRightRadius: 40}}></View> */}
        </View>


    )

}