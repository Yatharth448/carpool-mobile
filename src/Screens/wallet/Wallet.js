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
import ConfettiCannon from 'react-native-confetti-cannon';

function Wallet({ data, loading, error, getProfileDataRequest, navigation, route }) {


    const goToHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'RideDrawer' }],
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: AppColors.themePickupDropSearchBg, alignItems: 'center' }}>
            <Header isBack={false} close={() => navigation.openDrawer()} />

            <View style={{ width: Dimensions.get('screen').width, height: Dimensions.get('window').height * .6, alignItems: 'center', justifyContent: 'center', paddingBottom: 10, marginTop: 50 }}>
                {/* <ImageBackground source={require('../../assets/paymentcardbg.png')} style={{ width: '100%', height: '100%', resizeMode: 'cover', alignItems: 'center' }}> */}
                <Surface elevation={4} style={{ padding: 0, width: '90%', height: '100%', alignItems: 'center'}}>

                    <Text style={{ marginTop: 20, width: '80%', textAlign: 'center', fontSize: 18, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsMedium }}>
                        {'Please recharge your wallet to book ride'}
                    </Text>


                    <View style={{ width: '100%', alignItems: 'center', marginTop: 0, marginBottom: 10 }}>

                        <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/Wallet.png')} style={{ marginLeft: 0, width: 250, height: 150, resizeMode: 'contain' }} />
                        </View>








                    </View>


                    <View style={{ width: '100%', height: 70, alignItems: 'center', marginTop: 30, justifyContent: 'space-between' }}>

                        {/* {acceptBtn(item, index)} */}

                        <ButtonPrimary
                            style={{ width: '98%' }}
                            text={'Pay'}
                            onPress={() => goToHome()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);