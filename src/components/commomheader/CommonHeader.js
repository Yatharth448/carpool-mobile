import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { AppColors } from "../constants/AppColor";
import { Surface } from "react-native-paper";
import { AppFontFamily } from "../constants/AppFonts";
export const Header = ({ isBack = true, close, text = '', isRight= false, right , rightClick, count}) => {

// console.log(right, count, 'right')
    return (


        <View style={{ marginTop: 10, height: 70, width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <Pressable onPress={close} style={{ width: '25%', height: 70, alignItems: 'flex-start', paddingLeft: 10, justifyContent: 'center' }}>
                {
                    isBack ?
                        <Surface style={{ backgroundColor: AppColors.themesWhiteColor, marginLeft: 5, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} elevation={4}>
                            <Image source={require('../../assets/bckarrow.png')} style={{ width: 40, height: 40 }} />
                        </Surface>
                        :
                        <Image source={require('../../assets/menu.png')} style={{ marginLeft: -10, width: 70, height: 70 }} />
                }

            </Pressable>
            <View style={{ width: '50%', height: 60, alignItems: 'center', paddingRight: 20, justifyContent: 'center' }}>
                <Text style={{ fontFamily: AppFontFamily.PopinsMedium, fontSize: 18, color: AppColors.themeBlackColor }}>{text}</Text>
            </View>
            <Pressable onPress={rightClick} style={{ width: '25%', height: 50, alignItems: 'flex-end', paddingRight: 20, justifyContent: 'center' }}>
            {
                    isRight ?
                    <>
                <Surface style={{ backgroundColor: AppColors.themesWhiteColor, marginBottom: 10, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} elevation={4}>
                    <Image source={right} style={{ width: 25, height: 25 }} />
                </Surface> 
                {
                   right == 4 ? count ?
                   <View style={{ position: 'absolute', right: 5, top: 0, width: 20, height: 20, borderRadius: 10, backgroundColor: AppColors.themePrimaryColor, justifyContent: 'center', alignItems: 'center'}}>

                       <Text style={{ textAlign: 'center', fontFamily: AppFontFamily.PopinsMedium, fontSize: 12, color: AppColors.themesWhiteColor }}>{count}</Text> 
                   </View> 
                   : null : null
                }
                
                    </> : 
                null
            }
            </Pressable>

        </View>


    )

}