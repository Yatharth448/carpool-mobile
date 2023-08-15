import React, { useEffect } from 'react'
import { View, Text, Image, Pressable } from 'react-native';
import { hitApiToGetOfferedRideDetails, hitApiToGetRequestedRideDetails } from './RideHistoryModal';
import { Header } from '../../components/commomheader/CommonHeader';
import { Surface } from 'react-native-paper';
import moment from 'moment';
import { AppColors } from '../../components/constants/AppColor';
import { AppFontFamily } from '../../components/constants/AppFonts';
import { AppTexts } from '../../components/constants/AppTexts';

export default function RideDetails({ navigation, route }) {

    const [rideData, setRideData] = React.useState('')
    const [cotraveller, setCotraveller] = React.useState('')
    const { id, from } = route.params;

    useEffect(() => {

        (async () => {

            //Put your logic here



            let result; 
            if (from === 'offered')
            {

                result = await hitApiToGetOfferedRideDetails(id)
                setRideData(result.data.rideData[0])
                setCotraveller(result.data.cotravellerData)
                console.log(result.data.rideData, result.data.cotravellerData, 'offered')
            }
            else{

                result = await hitApiToGetRequestedRideDetails(id)
                setRideData(result.data.rideData[0])
                setCotraveller(result.data.cotravellerData)
                console.log(result.data.rideData, result.data.cotravellerData, 'request')
            }

           
           

            if (result.status) {

                console.log(result, 'data')
            }

        })();

        return () => {
            // clear/remove event listener

        }
    }, []);
    return (
        <View style={{ flex: 1, backgroundColor: AppColors.themePickupDropSearchBg, alignItems: 'center' }}>
            <Header isBack={true} close={() => navigation.goBack()} text='Ride Details' />

            <Surface elevation={4} style={{ width: '95%', backgroundColor: AppColors.themesWhiteColor, borderRadius: 10 }}>
                <View style={{ width: '90%', alignItems: 'center', flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                    <View style={{ justifyContent: 'center' }}>

                        <Text style={{ width: '100%', padding: 10, fontFamily: AppFontFamily.PopinsSemiBold, fontSize: 14, color: AppColors.themeText2Color }}>{moment(rideData.date).format('DD MMM YYYY, HH:mm:ss')}</Text>

                    </View>
                </View>
                <View style={{ width: '100%', marginBottom: 10, height: 2, backgroundColor: AppColors.themePickupDropSearchBg }}></View>

                <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>

                    <View style={{ width: '95%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>

                        <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>

                            <Image source={require('../../assets/dotone.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />
                            <Image source={require('../../assets/dotline.png')} style={{ marginLeft: 0, width: 5, height: 50, resizeMode: 'contain' }} />
                            <Image source={require('../../assets/triangle.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />

                        </View>

                        <View style={{ width: '85%', justifyContent: 'center', alignItems: 'center' }}>

                            <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>

                                <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: AppFontFamily.PopinsMedium, width: '100%', color: AppColors.themeTextPrimaryColor, fontSize: 12 }}>{rideData.journey_origin_address}</Text>
                                </View>
                            </View>
                            <View style={{ marginLeft: 0, width: '100%', height: 0 }}></View>
                            <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', marginBottom: 20 }}>

                                <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: AppFontFamily.PopinsMedium, width: '100%', color: AppColors.themeTextPrimaryColor, fontSize: 12 }}>{rideData.journey_destination_address}</Text>
                                </View>
                            </View>

                        </View>

                    </View>

                </View>

                <View style={{ width: '100%', marginBottom: 10, height: 2, backgroundColor: AppColors.themePickupDropSearchBg }}></View>
                <View style={{ width: '95%', alignItems: 'center', flexDirection: 'row', marginBottom: 10, marginLeft: 10 }}>
                    <View style={{ justifyContent: 'center', width: '95%' }}>

                        <Text style={{ padding: 10, paddingTop: 0, paddingBottom: 0, fontFamily: AppFontFamily.PopinsSemiBold, fontSize: 16, color: AppColors.themeText2Color }}>{"Ride cost: " + AppTexts.Rupee_Symbol + rideData.journey_expected_price_per_seat}</Text>
                        <Text style={{ padding: 10, paddingTop: 0, paddingBottom: 0, fontFamily: AppFontFamily.PopinsMedium, fontSize: 12, color: AppColors.themeText2Color }}>{Number(rideData.journey_approx_time / 60).toFixed(2) + " mins"}</Text>
                    </View>

                </View>

            </Surface>


            {cotraveller.length ?
                <Surface elevation={4} style={{ width: '95%', borderRadius: 10, marginTop: 20, justifyContent: 'center' }}>
                    <Pressable onPress={() => navigation.navigate('Cotravellers', {data: cotraveller, from: from})}>
                        <Text style={{ padding: 20, fontFamily: AppFontFamily.PopinsSemiBold, fontSize: 16, color: AppColors.themePrimaryColor }}>{'View your co-travellers'}</Text>
                    </Pressable>
                </Surface> : null}



        </View>
    )
}
