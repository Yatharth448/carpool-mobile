import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper'
import { AppColors } from '../constants/AppColor'
export default function AddhaarInuputView(style, label, text, changeText, btnPress, btnTxt) {
    return (
        <View style={[{ width: '100%', marginTop: 20, height: 80}, ...style]}>

            <Text style={{ fontSize: 16, fontWeight: '400', color: AppColors.themeBlackColor }}>{label}</Text>
            <View style={{flexDirection: 'row', width: '100%', height: 50 ,alignItems: 'center', justifyContent: 'center'}}>


                <TextInput
                    style={{ width: '80%', height: 50, backgroundColor: AppColors.themesWhiteColor }}
                    mode="outlined"
                    theme={{ roundness: 10 }}
                    outlineColor={AppColors.themeSeperatorColor}
                    activeOutlineColor={AppColors.themePrimaryColor}
                    //   outlineStyle={borderRadius= 20}
                    label=""
                    value={text}
                    onChangeText={text => changeText(text)}
                />

                <TouchableOpacity onPress={btnPress}>
                    <Text style={{ width: '100%', color: AppColors.themePrimaryColor, paddingLeft: 10, fontSize: 16 }}>{btnTxt}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
