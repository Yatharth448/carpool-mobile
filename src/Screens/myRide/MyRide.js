import React, { useEffect } from 'react'
import { View, Text, RefreshControl, Image, FlatList, Dimensions } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import { Header } from '../../components/commomheader/CommonHeader';
import moment from 'moment';
import { AppTexts } from '../../components/constants/AppTexts';
import { convertToKms } from '../../components/commonfunction/CommonFunctions';
import { hitApiToGetMyRide } from './MyRideModal';
export default function MyRide({ navigation, route }) {


    const [rideList, setRideList] = React.useState([])
    const [loading, setLoading] = React.useState(false)
   


    useEffect(() => {

        (async () => {

            //Put your logic here

            getMyRide()

        })();

        return () => {
            // clear/remove event listener

        }
    }, []);


    const getMyRide = async (load = '') => {

        if (load == 'refresh') { setLoading(true)}

            const result = await hitApiToGetMyRide();
            // console.log("ride list", result);
            if (result.status) {
                setRideList(result.data ?? [])
                setLoading(false)
            }
            else {
                console.log(result)
            }
    
    }


    return (
        <View style={{ flex: 1, width: '100%', backgroundColor: AppColors.themePickupDropSearchBg, alignItems: 'center' }}>
            <Header close={() => { navigation.goBack() }} isBack={false}  text='My Ride'/>
            <FlatList
                data={rideList}
                refreshControl={
                    <RefreshControl
                        onRefresh={() => getMyRide('refresh')}
                        refreshing={loading}
                        title={'Loading...'}
                        tintColor={AppColors.themeBlackColor}
                        titleColor={AppColors.themeBlackColor}
                    />
                }
                keyExtractor={(item, index) => index}
                // ListHeaderComponent={this.headerView()}
                showsVerticalScrollIndicator={false}
                // extraData={this.state}
                // onEndReached={() => this.getCartList()}
                renderItem={({ item, index }) => (
                    <View style={{ width: Dimensions.get('window').width, alignItems: 'center', marginTop: 10 }}>
                        <View style={{ width: '95%', backgroundColor: AppColors.themesWhiteColor, borderRadius: 10 }}>
                            <View style={{ flexDirection: 'row', width: '100%' }}>

                                <View style={{ width: '80%', justifyContent: 'center' }}>
                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-start' }}>

                                        <Text style={{ width: '27%', fontWeight: '700', padding: 10, fontSize: 14, color: AppColors.themeText2Color }}>{moment(item.journey_start_at).format('hh:mm A')}</Text>
                                        <Text style={{ width: '73%', fontWeight: '700', paddingLeft: 0, paddingRight: 0, paddingTop: 10, fontSize: 16, color: AppColors.themeText2Color }}>{item.journey_origin_address}</Text>
                                    </View>
                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-start', paddingTop: 3 }}>

                                        <Text style={{ width: '27%', fontWeight: '700', padding: 10, paddingTop: 0, fontSize: 14, color: AppColors.themeText2Color }}>{moment(item.journey_start_at).format('hh:mm A')}</Text>
                                        <Text style={{ width: '73%', fontWeight: '700', paddingLeft: 0, fontSize: 16, paddingRight: 0, paddingTop: 0, color: AppColors.themeText2Color }}>{item.journey_destination_address}</Text>
                                    </View>
                                </View>

                                <View style={{ width: '20%', alignItems: 'flex-end' }}>
                                    <Text style={{ width: '80%', paddingTop: 10, fontWeight: '700', fontSize: 16, color: AppColors.themeText2Color }}>{AppTexts.Rupee_Symbol + item.journey_expected_price_per_seat}</Text>


                                </View>
                            </View>
                            <View style={{ width: '90%', alignItems: 'flex-end' }}>
                                <Text style={{ width: '100%', padding: 10, paddingTop: 5, paddingBottom: 0, fontWeight: '400', fontSize: 16, color: AppColors.themeText2Color }}>{item.seat_available + " seat available"}</Text>
                                <Text style={{ width: '100%', paddingLeft: 10, fontWeight: '400', fontSize: 16, color: AppColors.themeText2Color }}>{"Total travel distance " + convertToKms(item.journey_approx_distance)}</Text>
                                <Text style={{ width: '100%', padding: 10, paddingTop: 0, fontWeight: '400', fontSize: 16, color: AppColors.themeText2Color }}>{"You are " + item.distance_from_source + " kms away from the nearest pickup point"}</Text>
                            </View>
                            <View style={{ width: '100%', marginBottom: 10, height: 2, backgroundColor: AppColors.themePickupDropSearchBg }}></View>
                            <View style={{ width: '90%', alignItems: 'center', flexDirection: 'row', marginBottom: 10, marginLeft: 10 }}>
                                <Image source={require('../../assets/check.png')} style={{ marginRight: 5, width: 40, height: 40, borderRadius: 20, resizeMode: 'contain' }} />
                                <View style={{ justifyContent: 'center' }}>

                                    <Text style={{ width: '100%', padding: 10, paddingTop: 0, paddingBottom: 0, fontWeight: '700', fontSize: 16, color: AppColors.themeText2Color }}>{item.user_name ?? "Sachin Gupta"}</Text>
                                    <Text style={{ width: '100%', padding: 10, paddingTop: 0, paddingBottom: 0, fontWeight: '700', fontSize: 16, color: AppColors.themeText2Color }}>{item.rating + " stars"}</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                )}
            />



        </View>
    )
}
