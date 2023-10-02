import React from 'react'
import { View, FlatList, Image, Text, Modal, Pressable, Dimensions, TextInput, Alert } from 'react-native'
import { Surface } from 'react-native-paper'
import { AppColors } from '../../components/constants/AppColor'
import { AppFontFamily } from '../../components/constants/AppFonts'
import { AppTexts } from '../../components/constants/AppTexts'
import { ButtonPrimary } from '../../components/button/buttonPrimary'
import { connect } from 'react-redux';
import { getProfileDataRequest } from '../../redux/actions/actions';
import { Header } from '../../components/commomheader/CommonHeader'
import ConfettiCannon from 'react-native-confetti-cannon';
import { ScrollView } from 'react-native-gesture-handler'

export default function Wallet({ isLoading, closePopup, onPaymentPress, loader=false }) {

    const [price, setPrice] = React.useState('')
    const [ind, setInd] = React.useState('')
    const data = ['500', '1000', '1500', '2000', '5000']
    const selectedIndex = (ind) => {
        setPrice(data[ind])
        setInd(ind)
    }

    const pay = (amount) => {

        onPaymentPress(amount)

    }

    return (
        <Modal visible={isLoading} animationType="slide"
            onRequestClose={() => console.log('closed')} transparent={true} >
            <View onPress={closePopup}>
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>

                    {/* <View style={{ width: Dimensions.get('screen').width, height: Dimensions.get('window').height * .6, alignItems: 'center', justifyContent: 'center', paddingBottom: 10, marginTop: 50, borderRadius: 10 }}> */}
                    {/* <ImageBackground source={require('../../assets/paymentcardbg.png')} style={{ width: '100%', height: '100%', resizeMode: 'cover', alignItems: 'center' }}> */}
                    <Pressable onPress={closePopup} style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 10, top: 5 }}>
                        <Image source={require('../../assets/close.png')} style={{ marginLeft: 0, width: 20, height: 20, resizeMode: 'contain' }} />
                    </Pressable>
                    <Surface elevation={4} style={{ padding: 0, width: '90%', height: 550, alignItems: 'center', borderRadius: 10, backgroundColor: AppColors.themesWhiteColor }}>
                        {/* <ScrollView keyboardShouldPersistTaps={'handled'}> */}


                        <Text style={{ marginTop: 20, width: '80%', textAlign: 'center', fontSize: 18, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsMedium }}>
                            {'Please recharge your wallet to book ride'}
                        </Text>


                        <View style={{ width: '100%', alignItems: 'center', marginTop: 0, marginBottom: 10 }}>

                            <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../assets/Wallet.png')} style={{ marginLeft: 0, width: 250, height: 150, resizeMode: 'contain' }} />
                            </View>



                            <View style={{ width: '85%', alignItems: 'center' }}>

                                <FlatList
                                    data={data}
                                    // columnWrapperStyle={{ flexWrap: 'wrap' }}
                                    numColumns={2}
                                    keyExtractor={(item, index) => index}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item, index }) => (
                                        <>
                                            <View style={{ padding: 0 }}>
                                                <Pressable onPress={() => selectedIndex(index)} style={{ marginTop: 15, alignItems: 'center', justifyContent: 'center', marginLeft: 7.5, marginRight: 7.5, width: Dimensions.get('screen').width / 3, height: 30, backgroundColor: ind == index ? AppColors.themePrimaryColor : AppColors.themesWhiteColor, borderRadius: 5, borderWidth: 1.5, borderColor: AppColors.themeCardBorderColor }}>
                                                    {/* <View style={{ padding: 10 }}> */}
                                                    <Text numberOfLines={1} style={{ marginTop: 2, fontFamily: AppFontFamily.PopinsRegular, color: ind == index ? AppColors.themesWhiteColor : AppColors.themePrimaryColor, fontSize: 14 }}>{item}</Text>
                                                    {/* </View> */}
                                                </Pressable>
                                            </View>

                                        </>
                                    )}
                                />

                            </View>



                        </View>

                        <View style={{ width: '80%', justifyContent: 'center', marginTop: 20, backgroundColor: AppColors.themePickupDropSearchBg, borderColor: AppColors.themePrimaryColor, borderWidth: 1, borderRadius: 5 }}>
                            {/* <Pressable> */}

                            <TextInput
                                style={{ paddingLeft: 10, fontSize: 14, fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeBtnDisableColor }}
                                placeholder={'Enter amount'}
                                placeholderTextColor={AppColors.themeTextGrayColor}
                                value={price}
                                keyboardType='numeric'
                                onChangeText={(text) => setPrice(text)}
                            />
                            {/* </Pressable> */}
                        </View>

                        <View style={{ width: '100%', height: 70, alignItems: 'center', marginTop: 20, justifyContent: 'space-between' }}>

                            {/* {acceptBtn(item, index)} */}

                            <ButtonPrimary
                                style={{ width: '80%' }}
                                text={'Pay'}
                                onPress={() => pay(price)}
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
