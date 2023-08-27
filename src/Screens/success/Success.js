import React from 'react'
import { View, Dimensions, Image, Text } from 'react-native'
import { Surface } from 'react-native-paper'
import { AppColors } from '../../components/constants/AppColor'
import { AppFontFamily } from '../../components/constants/AppFonts'
import { AppTexts } from '../../components/constants/AppTexts'
import { ButtonPrimary } from '../../components/button/buttonPrimary'
import { connect } from 'react-redux';
import { getProfileDataRequest } from '../../redux/actions/actions';
import { Header } from '../../components/commomheader/CommonHeader'

function Success({ data, loading, error, getProfileDataRequest, navigation, route }) {

    const { item } = route.params;

    return (
        <View style={{ flex: 1, backgroundColor: AppColors.themePickupDropSearchBg, alignItems: 'center' }}>
        <Header close={()=> navigation.pop(2)}/>

            <View style={{ width: Dimensions.get('screen').width, height: Dimensions.get('window').height * .6, alignItems: 'center', justifyContent: 'center', paddingBottom: 10, marginTop: 30 }}>
                {/* <ImageBackground source={require('../../assets/paymentcardbg.png')} style={{ width: '100%', height: '100%', resizeMode: 'cover', alignItems: 'center' }}> */}
                <Surface elevation={4} style={{ padding: 10, width: '90%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>

                    <Image source={require('../../assets/paysuccess.png')} style={{ height: 60, width: 60, resizeMode: 'contain' }} />
                    <Text style={{ marginTop: 20, width: '80%', textAlign: 'center', fontSize: 18, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsBold }}>
                        {'Your ride is created!'}
                    </Text>


                    <View style={{ width: '100%', alignItems: 'center', marginTop: 30, marginBottom: 10 }}>
                        <Surface elevation={4} style={{ width: '95%', backgroundColor: AppColors.themesWhiteColor, borderRadius: 10 }}>

                            <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>

                                <View style={{ width: '95%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>

                                    <View style={{ width: '15%', alignItems: 'center' }}>

                                        <Image source={require('../../assets/dotone.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />
                                        <Image source={require('../../assets/dotline.png')} style={{ marginLeft: 0, width: 5, height: 40, resizeMode: 'contain' }} />
                                        <Image source={require('../../assets/triangle.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />

                                    </View>

                                    <View style={{ width: '85%', justifyContent: 'center', alignItems: 'center' }}>

                                        <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row' }}>

                                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text numberOfLines={2} style={{ fontFamily: AppFontFamily.PopinsRegular, width: '100%', color: AppColors.themeTextPrimaryColor, fontSize: 14 }}>{item.pick}</Text>
                                            </View>
                                        </View>
                                        <View style={{ marginLeft: 0, width: '100%', height: 10 }}></View>
                                        <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row' }}>

                                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text numberOfLines={2} style={{ fontFamily: AppFontFamily.PopinsRegular, width: '100%', color: AppColors.themeTextPrimaryColor, fontSize: 14 }}>{item.drop}</Text>
                                            </View>
                                        </View>

                                    </View>

                                </View>

                            </View>


                            <View style={{ width: '100%', marginTop: 20, marginBottom: 10, height: 2, backgroundColor: AppColors.themePickupDropSearchBg }}></View>
                            <View style={{ width: '90%', alignItems: 'center', flexDirection: 'row', marginBottom: 10, marginLeft: 10 }}>
                                <Image source={require('../../assets/avtar.png')} style={{ marginRight: 5, width: 40, height: 40, borderRadius: 20, resizeMode: 'contain' }} />
                                <View style={{ justifyContent: 'center' }}>

                                    <Text style={{ width: '100%', padding: 10, paddingTop: 0, paddingBottom: 0, fontFamily: AppFontFamily.PopinsBold, fontSize: 14, color: AppColors.themeText2Color }}>{data.name ?? "Sachin Gupta"}</Text>
                                    <View style={{ paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={require('../../assets/Star.png')} style={{ marginRight: 5, width: 12, height: 12, marginBottom: 3, resizeMode: 'contain' }} />
                                        <Text style={{ fontFamily: AppFontFamily.PopinsRegular, fontSize: 12, color: AppColors.themeText2Color }}>{'4.5 rating'}</Text>
                                    </View>
                                </View>
                            </View>

                        </Surface>
                    </View>


                    <View style={{ width: '100%', flexDirection: 'row', height: 70, alignItems: 'center', marginTop: 30, justifyContent: 'space-between' }}>

                        {/* {acceptBtn(item, index)} */}

                        <ButtonPrimary
                            style={{ width: '98%' }}
                            text={'Back to home'}
                            onPress={() => navigation.pop(2)}
                            loader={false}
                        />

                    </View>


                </Surface>

                {/* </ImageBackground> */}
            </View>
        </View>
    )
}

const mapStateToProps = (state) => ({
    data: state.data,
    loading: state.loading,
    error: state.error,
});

const mapDispatchToProps = {
    getProfileDataRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Success);