import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { AppColors } from "../constants/AppColor";
import { Surface } from "react-native-paper";
import { AppFontFamily } from "../constants/AppFonts";
export const Header = ({ isBack = true, close, text = '', isRight= false, right }) => {


    return (


        <View style={{ marginTop: 20, height: 70, width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <Pressable onPress={close} style={{ width: '30%', height: 70, alignItems: 'flex-start', paddingLeft: 10, justifyContent: 'center' }}>
                {
                    isBack ?
                        <Surface style={{ backgroundColor: AppColors.themesWhiteColor, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} elevation={4}>
                            <Image source={require('../../assets/bckarrow.png')} style={{ width: 40, height: 40 }} />
                        </Surface>
                        :
                        <Image source={require('../../assets/menu.png')} style={{ width: 70, height: 70 }} />
                }

            </Pressable>
            <View style={{ width: '40%', height: 60, alignItems: 'center', paddingRight: 20, justifyContent: 'center' }}>
                <Text style={{ fontFamily: AppFontFamily.PopinsMedium, fontSize: 18, color: AppColors.themeBlackColor }}>{text}</Text>
            </View>
            <Pressable style={{ width: '30%', height: 50, alignItems: 'flex-end', paddingRight: 20, justifyContent: 'center' }}>
            {
                    isRight ?
                <Surface style={{ backgroundColor: AppColors.themesWhiteColor, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} elevation={4}>
                    <Image source={right} style={{ width: 30, height: 30 }} />
                </Surface> : 
                null
            }
            </Pressable>

        </View>


    )

}