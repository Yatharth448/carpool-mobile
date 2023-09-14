import React, { useEffect } from 'react'
import { View, Text, Alert, Image, FlatList, Dimensions } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import { hitApiToGetRideList, hitApiToRequestARide } from './RideListModal';
import { Header } from '../../components/commomheader/CommonHeader';
import moment from 'moment';
import { AppTexts } from '../../components/constants/AppTexts';
import { convertToKms } from '../../components/commonfunction/CommonFunctions';
import { AppFontFamily } from '../../components/constants/AppFonts';
import { FindRideFilterView } from './FindRideComp';
import { Surface } from 'react-native-paper';
import { ButtonPrimary } from '../../components/button/buttonPrimary';
import CommonLoaders from '../../components/loader/Loader';
import { showNotification } from '../../components/notifications/LocalNotification';
export default function FindRideList({ navigation, route }) {


    const [rideList, setRideList] = React.useState([])
    const { data, seat } = route.params;
    const [selectedIndex, setIndex] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const [startLoader, setStartLoader] = React.useState(false)

    useEffect(() => {

        (async () => {
            console.log(data, 'find ride')

            //Put your logic here
            // const result = await hitApiToGetRideList(pick, drop, date, seat);
            // console.log("ride list", result);
            // if (result.status) {
            setRideList(data ?? [])
            setIsLoading(true)
            // }
            // else {
            //     console.log(result)
            // }


        })();

        return () => {
            // clear/remove event listener

        }
    }, []);


    const setSelectedIndex = (i) => {
        setIndex(i)

    }


    const requestRide = async (item, itemIndex) => {
        setStartLoader(true)
        const result = await hitApiToRequestARide(
            item._id,
            seat,
            item.intresected_source_lat,
            item.intresected_source_long,
            item.intresected_destination_lat,
            item.intresected_destination_long
        )
        console.log(result, 'request ride response')
        if (result.status) {

            const updatedArray = rideList.map((obj, index) =>
                index === itemIndex ? { ...obj, alreadyRequest: true } : obj
            );
            updatedArray.reverse()
            setRideList(updatedArray);
            setStartLoader(false)

            showNotification(
                {
                    'title': 'Congratulations!',
                    'message': 'Your ride request has been sent succesfully to ' + item.user_name,
                })

        }
        else {

            setStartLoader(false)
            if (result.message == "Please add money to wallet") {
                Alert.alert(result.message)
            }

        }
    }

    const ListView = () => {
        return (
            <>

                {/* <View style={{ width: '98%', alignItems: 'center' }}> */}

                {/* <FindRideFilterView
                        data={[{ 'name': 'Female co-traveller' }, { 'name': 'Smoking Allowed' }, { 'name': 'Pets Allowed' }]}
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}
                    /> */}
                {/* </View> */}

                <FlatList
                    data={rideList.reverse()}
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
                        <View style={{ width: Dimensions.get('window').width, alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                            <Surface elevation={4} style={{ width: '95%', backgroundColor: AppColors.themesWhiteColor, borderRadius: 10 }}>

                                <View style={{ width: '90%', alignItems: 'center', flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                                    <View style={{ justifyContent: 'center' }}>

                                        <Text style={{ width: '100%', padding: 10, fontFamily: AppFontFamily.PopinsBold, fontSize: 13, color: AppColors.themeText2Color }}>{moment(item.journey_start_at).format('DD MMM YYYY, HH:mm')}</Text>

                                    </View>
                                </View>
                                <View style={{ width: '100%', marginBottom: 10, height: 2, backgroundColor: AppColors.themePickupDropSearchBg }}></View>

                                <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>

                                    <View style={{ width: '75%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>

                                        <View style={{ width: '15%', alignItems: 'center' }}>

                                            <Image source={require('../../assets/dotone.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />
                                            <Image source={require('../../assets/dotline.png')} style={{ marginLeft: 0, width: 5, height: 40, resizeMode: 'contain' }} />
                                            <Image source={require('../../assets/triangle.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />

                                        </View>

                                        <View style={{ width: '85%', justifyContent: 'center', alignItems: 'center' }}>

                                            <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>

                                                <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text numberOfLines={1} style={{ fontFamily: AppFontFamily.PopinsRegular, width: '100%', color: AppColors.themeTextPrimaryColor, fontSize: 12 }}>{item.pick_main_text}</Text>
                                                </View>
                                            </View>
                                            <View style={{ marginLeft: 0, width: '100%', height: 20 }}></View>
                                            <View style={{ width: '100%', alignItems: 'center', marginBottom: 10 }}>

                                                <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text numberOfLines={1} style={{ fontFamily: AppFontFamily.PopinsRegular, width: '100%', color: AppColors.themeTextPrimaryColor, fontSize: 12 }}>{item.drop_main_text}</Text>
                                                </View>
                                            </View>

                                        </View>

                                    </View>

                                    <View style={{ width: '25%', alignItems: 'flex-end' }}>
                                        <Text style={{ paddingTop: 8, paddingRight: 10, fontFamily: AppFontFamily.PopinsBold, fontSize: 16, color: AppColors.themeText2Color }}>{AppTexts.Rupee_Symbol + Number(item.journey_expected_price_per_seat).toFixed(0)}</Text>
                                        <Text style={{ padding: 10, paddingTop: 5, paddingBottom: 0, fontFamily: AppFontFamily.PopinsRegular, fontSize: 13, color: AppColors.themeBlackColor }}>{item.seat_available + " seats left"}</Text>

                                    </View>
                                </View>



                                {/* <View style={{ width: '90%', alignItems: 'flex-end' }}>
                                <Text style={{ width: '100%', padding: 10, paddingTop: 5, paddingBottom: 0, fontFamily: AppFontFamily.PopinsRegular, fontSize: 16, color: AppColors.themeText2Color }}>{item.seat_available + " seat available"}</Text>
                                <Text style={{ width: '100%', paddingLeft: 10, fontWeight: '400', fontSize: 16, color: AppColors.themeText2Color }}>{"Total travel distance " + convertToKms(item.journey_approx_distance)}</Text>
                                <Text style={{ width: '100%', padding: 10, paddingTop: 0, fontWeight: '400', fontSize: 16, color: AppColors.themeText2Color }}>{"You are " + item.distance_from_source + " kms away from the nearest pickup point"}</Text>
                            </View> */}
                                <View style={{ width: '100%', marginBottom: 10, height: 2, backgroundColor: AppColors.themePickupDropSearchBg }}></View>
                                <View style={{ width: '95%', alignItems: 'center', flexDirection: 'row', marginBottom: 10, marginLeft: 10 }}>
                                    <View style={{ width: '50%', flexDirection: 'row' }}>

                                        <View style={{ width: '25%' }}>
                                            <Image source={require('../../assets/avtar.png')} style={{ marginRight: 5, width: 40, height: 40, borderRadius: 20, resizeMode: 'contain' }} />
                                        </View>
                                        <View style={{ justifyContent: 'center', width: '75%' }}>

                                            <Text style={{ padding: 10, paddingTop: 0, paddingBottom: 0, fontFamily: AppFontFamily.PopinsBold, fontSize: 14, color: AppColors.themeText2Color }}>{item.user_name ?? "Sachin Gupta"}</Text>
                                            <View style={{ paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                                                <Image source={require('../../assets/Star.png')} style={{ marginRight: 5, width: 12, height: 12, marginBottom: 3, resizeMode: 'contain' }} />
                                                <Text style={{ fontFamily: AppFontFamily.PopinsRegular, fontSize: 12, color: AppColors.themeText2Color }}>{item.rating + ' rating'}</Text>
                                            </View>
                                        </View>

                                    </View>

                                    <View style={{ width: '50%', alignItems: 'flex-end'}}>
                                        {item?.alreadyRequest ?

                                            <View style={{ width: '70%' }}>
                                                <ButtonPrimary
                                                    style={{ height: 35 }}
                                                    textStyle={{ fontFamily: AppFontFamily.PopinsRegular, fontSize: 12 }}
                                                    disabled={true}
                                                    text={'Requested'}
                                                    onPress={() => console.log('Requested')}
                                                    loader={false}
                                                />
                                            </View>
                                            :
                                            <View style={{ width: startLoader ? '75%' : '70%' }}>
                                                <ButtonPrimary
                                                    style={{ height: 35 }}
                                                    textStyle={{ fontFamily: AppFontFamily.PopinsRegular, fontSize: 12 }}
                                                    text={'Request Ride'}
                                                    onPress={() => startLoader ? console.log('empty') : requestRide(item, index)}
                                                    loader={startLoader}
                                                />
                                            </View>
                                        }
                                    </View>
                                </View>

                            </Surface>
                        </View>
                    )}
                />

            </>
        )
    }

    return (
        <View style={{ flex: 1, width: '100%', backgroundColor: AppColors.themePickupDropSearchBg, alignItems: 'center' }}>
            <Header close={() => { navigation.navigate('RideDrawer', { screen: 'FindRide', params: { from: 'reset' } }) }} text='Ride options' />




            {isLoading ? rideList.length ? ListView() : CommonLoaders.NoDataInList('No rides found') : CommonLoaders.RideHistoryLoader()}



        </View>
    )
}
