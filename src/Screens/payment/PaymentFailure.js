import React, { useEffect } from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import { URL, URLSearchParams } from 'react-native-url-polyfill';
import { Header } from '../../components/commomheader/CommonHeader'
import { AppColors } from '../../components/constants/AppColor'
import { AppFontFamily } from '../../components/constants/AppFonts'
import base64 from 'react-native-base64'

export default function PaymentFailure({ navigation, route }) {
    const { data } = route.params;
    const [transactionData, setTransData] = React.useState({})
    useEffect(() => {

        if (data) {

            console.log(data, 'transaction data')

            let urlData = new URL(data)
            console.log(urlData, 'urlData')
            console.log(urlData.searchParams, 'urlData searchParams')
            let decodedData = base64.decode(urlData.searchParams.get("val"))
           
            try {
                setTransData(JSON.parse(decodedData))
                console.log(transactionData, 'actualData')
            } catch (error) {

            }
        }





        return () => {
            // clear/remove event listener

        }
    }, [data]);

    return (
        <View style={{ flex: 1, width: '100%', backgroundColor: AppColors.themePickupDropSearchBg, alignItems: 'center' }}>
            <Header isBack={true} close={() => navigation.pop(2)} text="Failure" />
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' , backgroundColor: AppColors.themesWhiteColor}}>

                <Image source={require('../../assets/failure.gif')} style={{ width: Dimensions.get('screen').width, height: 200, resizeMode: 'contain' }} />

                <Text style={{ marginTop: 5, fontSize: 20, fontFamily: AppFontFamily.PopinsSemiBold, color: AppColors.themeButtonRed }}>{"Transaction Failed"}</Text>
            </View>
            <View>
                <View style={{width: '98%', marginTop: 20}}>
                    <Text style={{ marginTop: 5, fontSize: 14, fontFamily: AppFontFamily.PopinsMedium, color: AppColors.themeTextGrayColor }}>{"Transaction ID"}</Text>
                    <Text style={{ fontSize: 16, fontFamily: AppFontFamily.PopinsSemiBold, color: AppColors.themeBlackColor }}>{transactionData.tracking_id}</Text>
                </View>
                <View style={{width: '98%', marginTop: 5}}>
                    <Text style={{ marginTop: 5, fontSize: 14, fontFamily: AppFontFamily.PopinsMedium, color: AppColors.themeTextGrayColor }}>{"Payment Mode"}</Text>
                    <Text style={{ fontSize: 16, fontFamily: AppFontFamily.PopinsSemiBold, color: AppColors.themeBlackColor }}>{transactionData.payment_mode}</Text>
                </View>
                <View style={{width: '98%', marginTop: 5}}>
                    <Text style={{ marginTop: 5, fontSize: 14, fontFamily: AppFontFamily.PopinsMedium, color: AppColors.themeTextGrayColor }}>{"Order ID"}</Text>
                    <Text style={{ fontSize: 16, fontFamily: AppFontFamily.PopinsSemiBold, color: AppColors.themeBlackColor }}>{transactionData.order_id}</Text>
                </View>
                <View style={{width: '98%', marginTop: 5}}>
                    <Text style={{ marginTop: 5, fontSize: 14, fontFamily: AppFontFamily.PopinsMedium, color: AppColors.themeTextGrayColor }}>{"Transaction Date"}</Text>
                    <Text style={{ fontSize: 16, fontFamily: AppFontFamily.PopinsSemiBold, color: AppColors.themeBlackColor }}>{transactionData.trans_date}</Text>
                </View>
            </View>

        </View>
    )
}
