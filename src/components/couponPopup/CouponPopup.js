import React from 'react'
import { View, FlatList, Image, Text, Modal, Pressable, Dimensions, TextInput, Alert, Platform } from 'react-native'
import { Surface } from 'react-native-paper'
import { AppColors } from '../../components/constants/AppColor'
import { AppFontFamily } from '../../components/constants/AppFonts'
import { ButtonPrimary } from '../../components/button/buttonPrimary'
import { AppTexts } from '../constants/AppTexts'

export default function CouponPopup({ walletBal, isLoading, closePopup, onPaymentPress, applyCoupon, applyLoader = false, loader = false, rideCost, couponCode, couponAmount, showDel, removeCoupon, coupon, couponError }) {

    const amountPayable = (rideCost, discountAmt) => {

        const amt = Number(rideCost) - Number(discountAmt)
        return amt
    }


    return (
        <Modal visible={isLoading} animationType="slide"
            onRequestClose={() => console.log('closed')} transparent={true} >
            <View onPress={closePopup}>
                <View style={{ width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>

                    {/* <View style={{ width: Dimensions.get('screen').width, height: Dimensions.get('window').height * .6, alignItems: 'center', justifyContent: 'center', paddingBottom: 10, marginTop: 50, borderRadius: 10 }}> */}
                    {/* <ImageBackground source={require('../../assets/paymentcardbg.png')} style={{ width: '100%', height: '100%', resizeMode: 'cover', alignItems: 'center' }}> */}
                    <Pressable onPress={closePopup} style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 10, top: Platform.OS == 'ios' ? 40 : 5 }}>
                        <Image source={require('../../assets/close.png')} style={{ marginLeft: 0, width: 20, height: 20, resizeMode: 'contain' }} />
                    </Pressable>
                    <Surface elevation={4} style={{ padding: 0, width: '100%', height: '40%', alignItems: 'center', borderRadius: 10, backgroundColor: AppColors.themesWhiteColor }}>
                        {/* <ScrollView keyboardShouldPersistTaps={'handled'}> */}

                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ marginTop: 20, fontSize: 18, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsMedium }}>
                                {'Available Balance'}
                            </Text>
                            <Text style={{ marginTop: 20, fontSize: 18, color: AppColors.themePrimaryColor, fontFamily: AppFontFamily.PopinsMedium }}>
                                {AppTexts.Rupee_Symbol + walletBal}
                            </Text>
                        </View>

                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>


                            <View style={{ flexDirection: 'row', width: '72%', justifyContent: 'space-between', backgroundColor: AppColors.themePickupDropSearchBg, borderColor: AppColors.themePrimaryColor, borderWidth: 1, borderRadius: 5 , alignItems: 'center'}}>

                                <View style={{ width: '75%' }}>
                                    <TextInput
                                        style={{ width: '100%', paddingLeft: 10, height: 40, fontSize: 14, fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themePrimaryColor }}
                                        placeholder={'Enter coupon code'}
                                        placeholderTextColor={AppColors.themeTextGrayColor}
                                        value={coupon}
                                        // keyboardType='numeric'
                                        onChangeText={couponCode}
                                    />
                                    {couponError == '' ? null : 
                                    <Text style={{ marginLeft: 5, fontSize: 12, color: AppColors.themeButtonRed, fontFamily: AppFontFamily.PopinsMedium }}>
                                        {couponError}
                                    </Text>}
                                </View>
                                {showDel ?
                                    <Pressable onPress={removeCoupon} style={{ width: 60, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 12, color: AppColors.themePrimaryColor, fontFamily: AppFontFamily.PopinsMedium }}>
                                            {'Remove'}
                                        </Text>
                                    </Pressable> : null}

                            </View>

                            <ButtonPrimary
                                style={{ width: '25%', height: 30, }}
                                text={'Apply'}
                                onPress={applyCoupon}
                                loader={applyLoader}
                            />

                            {/* <Pressable onPress={applyCoupon} style={{ backgroundColor: couponAmount > 0 ? AppColors.themeBtnDisableColor : AppColors.themePrimaryColor, width: '22%', marginTop: 20, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                                <Text style={{ fontSize: 14, color: AppColors.themesWhiteColor, fontFamily: AppFontFamily.PopinsMedium }}>
                                    {'Apply'}
                                </Text>
                            </Pressable> */}
                        </View>


                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ marginTop: 20, fontSize: 16, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsMedium }}>
                                {'Ride Cost'}
                            </Text>
                            <Text style={{ marginTop: 20, fontSize: 16, color: AppColors.themePrimaryColor, fontFamily: AppFontFamily.PopinsMedium }}>
                                {AppTexts.Rupee_Symbol + rideCost}
                            </Text>
                        </View>

                        {couponAmount > 0 ?
                            <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginTop: 5, fontSize: 16, color: AppColors.themeGreenColor, fontFamily: AppFontFamily.PopinsMedium }}>
                                    {'Coupon discount'}
                                </Text>
                                <Text style={{ marginTop: 5, fontSize: 16, color: AppColors.themeGreenColor, fontFamily: AppFontFamily.PopinsMedium }}>
                                    {"- " + AppTexts.Rupee_Symbol + couponAmount}
                                </Text>
                            </View> : null}

                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ marginTop: 5, fontSize: 16, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsMedium }}>
                                {'Amount Payable'}
                            </Text>
                            <Text style={{ marginTop: 5, fontSize: 16, color: AppColors.themePrimaryColor, fontFamily: AppFontFamily.PopinsMedium }}>
                                {AppTexts.Rupee_Symbol + amountPayable(rideCost, couponAmount)}
                            </Text>
                        </View>

                        <View style={{ width: '100%', height: 70, alignItems: 'center', marginTop: 30, justifyContent: 'space-between' }}>

                            {/* {acceptBtn(item, index)} */}

                            <ButtonPrimary
                                style={{ width: '94%' }}
                                text={'Pay'}
                                onPress={onPaymentPress}
                                loader={loader}
                            />

                        </View>

                        {/* </ScrollView> */}
                    </Surface>

                    {/* </ImageBackground> */}
                    {/* </View> */}

                </View>
            </View>
        </Modal>
    )
}
