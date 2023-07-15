import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import { hitApiToGetRideList } from './RideListModal';
import { Header } from '../../components/commomheader/CommonHeader';
import moment from 'moment';
import { AppTexts } from '../../components/constants/AppTexts';
export default function FindRideList({ navigation, route }) {


    const [rideList, setRideList] = React.useState([])
    const { pick, drop, date, seat } = route.params;


    useEffect(() => {

        (async () => {

            //Put your logic here
            const result = await hitApiToGetRideList(pick, drop, date, seat);
            console.log("ride list", result);
            if (result.status) {
                setRideList(result.data ?? [])
            }
            else {
                console.log(result)
            }


        })();

        return () => {
            // clear/remove event listener

        }
    }, []);

    return (
        <View style={{ flex: 1, width: '100%', backgroundColor: AppColors.themePickupDropSearchBg, alignItems: 'center' }}>
            <Header close={()=> {navigation.goBack()}}/>
            <FlatList
                data={rideList}
                // refreshControl={
                //     <RefreshControl
                //         onRefresh={() => this.getCartList()}
                //         refreshing={this.state.isFetching}
                //         title={themes.appCustomTexts.PullToRefreshText}
                //         tintColor={themes.appColors.themeBackgroundBlackColor}
                //         titleColor={themes.appColors.themeBackgroundBlackColor}
                //     />
                // }
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
                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>

                                        <Text style={{ width: '35%', fontWeight: '700', padding: 10, fontSize: 14, color: AppColors.themeText2Color }}>{moment(item.journey_start_at).format('hh:mm A')}</Text>
                                        <Text style={{ width: '65%', fontWeight: '700', padding: 10, fontSize: 16, color: AppColors.themeText2Color }}>{'Gurugram'}</Text>
                                    </View>
                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>

                                        <Text style={{ width: '35%', fontWeight: '700', padding: 10, paddingTop: 0, fontSize: 14, color: AppColors.themeText2Color }}>{moment(item.journey_start_at).format('hh:mm A')}</Text>
                                        <Text style={{ width: '65%', fontWeight: '700', padding: 10, paddingTop: 0, fontSize: 16, color: AppColors.themeText2Color }}>{'Gurugram'}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '20%', alignItems: 'flex-end' }}>
                                    <Text style={{ width: '80%', paddingTop: 10, fontWeight: '700', fontSize: 16, color: AppColors.themeText2Color }}>{ AppTexts.Rupee_Symbol + item.journey_expected_price_per_seat}</Text>
                                    
                                </View>
                            </View>
                            <View style={{ width: '90%', alignItems: 'flex-end' }}>
                                <Text style={{ width: '100%', padding: 10, paddingTop: 0, fontWeight: '700', fontSize: 16, color: AppColors.themeText2Color }}>{item.seat_available + " seat available"}</Text>
                                <Text style={{ width: '100%', padding: 10, paddingTop: 0, fontWeight: '700', fontSize: 16, color: AppColors.themeText2Color }}>{"you are "+item.distance_from_source +" kms away from the nearest pickup point"}</Text>
                            </View>
                            <View style={{ width: '100%', marginBottom: 10, height: 2, backgroundColor: AppColors.themePickupDropSearchBg }}></View>
                            <View style={{ width: '90%', alignItems: 'center', flexDirection: 'row', marginBottom: 10, marginLeft: 10 }}>
                                <Image source={require('../../assets/check.png')} style={{ marginRight: 5, width: 40, height: 40, borderRadius: 20, resizeMode: 'contain' }} />
                                <View style={{justifyContent: 'center'}}>

                                <Text style={{ width: '100%', padding: 10, paddingTop: 0, paddingBottom: 0, fontWeight: '700', fontSize: 16, color: AppColors.themeText2Color }}>{ item.user_name ?? "Sachin Gupta"}</Text>
                                <Text style={{ width: '100%', padding: 10, paddingTop: 0, paddingBottom: 0, fontWeight: '700', fontSize: 16, color: AppColors.themeText2Color }}>{item.rating +" stars" }</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                )}
            />



        </View>
    )
}
