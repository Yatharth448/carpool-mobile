import React from 'react'
import { Modal, View, Text, Image, StyleSheet, Pressable, TextInput, TouchableOpacity } from 'react-native'
import { AppKeys } from '../constants/AppKeys';
import { AppColors } from '../constants/AppColor';
import { AppTexts } from '../constants/AppTexts';
export const PriceSelection = (headerText, isLoading, closePopup, selectedPrice, estimatedPrice, price, save) => {

    const [seatPrice, setSeatPrice] = React.useState('')
    React.useEffect(() => {
        // console.log('se', selectedIdType)

        setSeatPrice(price)
    }, []);


    const selectEstimatedPrice = () => {

        // console.log('abcsd', isLoading)
        setSeatPrice(estimatedPrice)
        // closePopup
    }

    return (
        <Modal visible={isLoading} animationType="slide"
            onRequestClose={() => console.log('closed')} transparent={true}>
            <Pressable>
                {/* onPress={closePopup}> */}
                <View style={styles.popupBg}>

                    <View style={styles.smallCont}>

                        <View style={{ width: '100%', height: 60, justifyContent: 'center', backgroundColor: AppColors.themePrimaryColor }}>
                            <Pressable onPress={closePopup} style={{ marginLeft: 20, flexDirection: 'row', alignItems: 'center' }}>

                                <Image source={require('../../assets/close.png')} style={{ marginRight: 10, width: 18, height: 18, resizeMode: 'contain' }} />
                                <Text style={{ fontSize: 18, color: AppColors.themesWhiteColor }}>
                                    {headerText}
                                </Text>
                            </Pressable>

                        </View>

                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <View style={{ width: '90%', alignItems: 'center' }}>


                                <Text style={{ fontSize: 18, fontFamily: '500', color: AppColors.themeBlackColor, marginTop: 20 }}>
                                    {'Hey, we have calculated an estimated price for your ride'}
                                </Text>
                                <Text style={{ fontSize: 18, fontFamily: '600', color: AppColors.themeBlackColor, marginTop: 10 }}>
                                    {'Estimated ride price:' + AppTexts.Rupee_Symbol + " " + estimatedPrice}
                                </Text>

                                <Text style={{ fontSize: 18, fontFamily: '600', color: AppColors.themeBlackColor, marginTop: 10 }}>
                                    {'Your entered price:' + AppTexts.Rupee_Symbol + " " + price}
                                </Text>

                                <View style={{ width: '100%', alignItems: 'center', marginTop: 0, marginBottom: 10 }}>
                                    <TouchableOpacity onPress={() => selectEstimatedPrice()} style={{ borderColor: AppColors.themePrimaryColor, borderWidth: 2, marginTop: 20, width: '75%', height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 18, fontWeight: '400', color: AppColors.themePrimaryColor }}>{'Select estimated price'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ width: '90%', marginTop: 30 }}>

                                <TextInput
                                    onChangeText={text => setSeatPrice(text)}
                                    value={seatPrice}
                                    // onFocus={true}
                                    placeholder={AppTexts.Rupee_Symbol + " price"}
                                    placeholderTextColor={AppColors.themeText2Color}
                                    style={{ borderColor: AppColors.themeCardBorderColor, borderWidth: 1, color: AppColors.themeBlackColor, marginLeft: 20, width: '90%', fontSize: 16, textAlign: 'center', fontWeight: '700' }}
                                />

                            </View>
                            <View style={{ width: '100%', alignItems: 'center', marginTop: 30, marginBottom: 20}}>
                                <TouchableOpacity onPress={()=>save(seatPrice)} style={{ backgroundColor: AppColors.themePrimaryColor, width: '55%', height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, fontWeight: '600', color: AppColors.themesWhiteColor }}>{'Save'}</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                </View>
            </Pressable>
        </Modal>
    )



};
const styles = StyleSheet.create({
    popupBg: {
        width: '100%',
        height: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    smallCont: {
        // position: 'absolute',
        // alignItems: 'center',
        // justifyContent: 'center',
        // marginTop: 50,
        // bottom: 0,
        width: '100%',
        // height: '60%',
        // paddingTop: 10,
        // paddingBottom: 10,
        borderRadius: 10,
        backgroundColor: AppColors.themesWhiteColor,

    },
    btnText: {
        color: AppColors.themesWhiteColor,
        fontSize: 16,
        // fontFamily: themes.appFontFamily.medium,
    },


})