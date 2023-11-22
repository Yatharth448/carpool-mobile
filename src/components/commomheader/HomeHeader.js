import React from "react";
import { View, Text, Pressable, Image, Platform } from "react-native";
import { AppColors } from "../constants/AppColor";
import { Surface } from "react-native-paper";
import { AppFontFamily } from "../constants/AppFonts";
export const HomeHeader = ({ isBack = true, close, text = '', isRight = false, right, rightClick, count, walletAmount, walletClick }) => {

    // console.log(right, count, 'right')
    return (


        <View style={{ marginTop: Platform.OS == 'ios' ? 50 : 10, height: 70, width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
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
            <View style={{ width: '27%', height: 60, alignItems: 'center', paddingRight: 20, justifyContent: 'center' }}>
                <Text style={{ fontFamily: AppFontFamily.PopinsMedium, fontSize: 18, color: AppColors.themeBlackColor }}>{text}</Text>
            </View>
            {/* wallet */}
            <Pressable onPress={walletClick} style={{ width: '30%', height: 50, alignItems: 'flex-end', justifyContent: 'center' }}>
                

                    <Surface style={{ backgroundColor: AppColors.themesWhiteColor, padding: 8, paddingTop: 5, paddingBottom: 5, borderRadius: 5, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginBottom: 10 }} elevation={4}>
                        <Image source={require('../../assets/walletsmall.png')} style={{ width: 25, height: 25, marginRight: 3 }} />
                        <Text style={{ textAlign: 'center', fontFamily: AppFontFamily.PopinsMedium, fontSize: 10, color: AppColors.themeBlackColor }}>{"Balance:  " + (walletAmount ? walletAmount ?? 0 : 0)}</Text>
                    </Surface>

                
            </Pressable>



            <Pressable onPress={rightClick} style={{ width: '18%', height: 50, alignItems: 'flex-end', paddingRight: 20, justifyContent: 'center' }}>
                {
                    isRight ?
                        <>
                            <Surface style={{ backgroundColor: AppColors.themesWhiteColor, marginBottom: 10, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} elevation={4}>
                                <Image source={right} style={{ width: 25, height: 25 }} />
                            </Surface>
                            {
                                right == 4 ? count ?
                                    <View style={{ position: 'absolute', right: 5, top: 0, width: 20, height: 20, borderRadius: 10, backgroundColor: AppColors.themePrimaryColor, justifyContent: 'center', alignItems: 'center' }}>

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