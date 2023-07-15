import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { AppColors } from '../constants/AppColor'
export default function UploadIdView(label, onFrontUploadClick, onBackUploadClick, frontImg, bckImg) {

    return (
        <View style={{ width: '100%', marginTop: 20 }}>

            <View>

            <Text style={{ fontSize: 16, fontWeight: '400', marginBottom: 5, color: AppColors.themeBlackColor }}>{"Upload " + " " +label+ " front"}</Text>

                <TouchableOpacity onPress={() => onFrontUploadClick()} style={{ flexDirection: 'row', borderRadius: 10, alignItems: 'center', width: '100%', height: 100, backgroundColor: AppColors.themeIdentityBgColor, borderWidth: 1, borderColor: AppColors.themeCardBorderColor, justifyContent: 'center' }}>

                    <View style={{ width: '80%', alignItems: 'center', justifyContent: 'center', height: '100%' }}>

                        <Text style={{ fontSize: 16, fontWeight: '400', width: '96%', height: '25%', color: AppColors.themeBlackColor }}>
                            {'Country Identity card'}
                        </Text>
                        <Text style={{ fontSize: 14, fontWeight: '400', width: '96%', height: '40%', color: AppColors.themeText2Color }}>
                            {'Upload your Govt. Identity card. acceptable formats: JPEG, JPG or PNG.'}
                        </Text>

                        <Text style={{ fontSize: 12, fontWeight: '400', width: '96%', height: '20%', color: AppColors.themeTextGrayColor }}>
                            {'Only Aadhaar/DL acceptable'}
                        </Text>

                    </View>

                    <View style={{ width: '20%' }}>
                        <Image source={ frontImg ? {uri: frontImg} : require('../../assets/uploadId.png')} style={{ marginRight: 10, width: 60, height: 80, resizeMode: 'contain' }} />
                    </View>
                </TouchableOpacity>

                <Text style={{ fontSize: 16, fontWeight: '400', marginBottom: 5 , marginTop: 5, color: AppColors.themeBlackColor}}>{"Upload " + " " +label+ " back"}</Text>

                <TouchableOpacity onPress={() => onBackUploadClick()} style={{ flexDirection: 'row', borderRadius: 10, alignItems: 'center', width: '100%', height: 100, backgroundColor: AppColors.themeIdentityBgColor, borderWidth: 1, borderColor: AppColors.themeCardBorderColor, justifyContent: 'center' }}>

                    <View style={{ width: '80%', alignItems: 'center', justifyContent: 'center', height: '100%' }}>

                        <Text style={{ fontSize: 16, fontWeight: '400', width: '96%', height: '25%', color: AppColors.themeBlackColor }}>
                            {'Country Identity card'}
                        </Text>
                        <Text style={{ fontSize: 14, fontWeight: '400', width: '96%', height: '40%', color: AppColors.themeText2Color }}>
                            {'Upload your Govt. Identity card. acceptable formats: JPEG, JPG or PNG.'}
                        </Text>

                        <Text style={{ fontSize: 12, fontWeight: '400', width: '96%', height: '20%', color: AppColors.themeTextGrayColor }}>
                            {'Only Aadhaar/DL acceptable'}
                        </Text>

                    </View>

                    <View style={{ width: '20%' }}>
                        <Image source={ bckImg ? {uri: bckImg} : require('../../assets/uploadId.png') } style={{ marginRight: 10, width: 60,height: 80, resizeMode: 'contain' }} />
                    </View>
                </TouchableOpacity>

            </View>


        </View>
    )
}
