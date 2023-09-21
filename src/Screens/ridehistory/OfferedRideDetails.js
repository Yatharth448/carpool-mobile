import React, { useRef, useEffect } from 'react'
import { View, Text, Image, Pressable, FlatList, StyleSheet, Dimensions, ScrollView, Linking, Alert } from 'react-native';
import { hitApiToCancelRideForDriver, hitApiToGetOfferedRideDetails, hitApiToGetRequestedRideDetails } from './RideHistoryModal';
import { Header } from '../../components/commomheader/CommonHeader';
import { Surface } from 'react-native-paper';
import moment from 'moment';
import { AppColors } from '../../components/constants/AppColor';
import { AppFontFamily } from '../../components/constants/AppFonts';
import { AppTexts } from '../../components/constants/AppTexts';
import { ButtonPrimary } from '../../components/button/buttonPrimary';
import { hitApiToAcceptOfferedRide, hitApiToAcceptRequestedRide } from './RideHistoryModal'
import CommonLoaders from '../../components/loader/Loader';
import { RideCostView } from './RideHistoryComponent';
import { CalculateTimeFromMilies } from '../../components/commonfunction/CommonFunctions';

export default function OfferedRideDetails({ navigation, route }) {

    const flatListRef = useRef(null);
    const [isLoading, setIsLoading] = React.useState(false)
    const [acceptedData, setAcceptedData] = React.useState([]);
    const [cotravellerArray, setCotravellerArray] = React.useState([]);
    const [rideData, setRideData] = React.useState('')
    const [cotraveller, setCotraveller] = React.useState('')
    const { id, from } = route.params;

    useEffect(() => {

        (async () => {

            //Put your logic here

            _unsubscribe = navigation.addListener('focus', async () => {

                const result = await hitApiToGetOfferedRideDetails(id)

                if (result.status) {
                    setRideData(result.data.rideData)
                    setCotravellerArray(result.data?.cotravellerData)
                    setAcceptedData(result.data?.acceptedCotravellerData)
                    setIsLoading(true)
                    console.log(result.data.acceptedCotravellerData, 'accepted cotraveller \n', result.data?.cotravellerData, 'cotraveller data \n', result.data.rideData, 'ride data', result.data)
                }
            })
        })();

        return () => {
            // clear/remove event listener
            _unsubscribe();

        }
    }, []);
    const handlePageChange = (event) => {
        const { contentOffset } = event.nativeEvent;
        const index = Math.round(contentOffset.x / Dimensions.get('window').width);
        setCurrentIndex(index);
    };


    const CustomerInfoView = ({ item }) => {

        return (
            // <View style={{ width: Dimensions.get('screen').width, alignItems: 'center', justifyContent: 'center', paddingBottom: 10 }}>
            <View style={{ width: '90%', marginTop: 5 }}>

                <Text style={{ marginTop: 10, fontSize: 16, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsMedium }}>
                    {'Customer Info'}
                </Text>
            </View>
            // </View>
        )

    }


    const ViewRideRequestBtn = ({ }) => {
        return (
            <View style={{ width: '100%', alignItems: 'center', marginTop: 20, justifyContent: 'center' }}>

                <ButtonPrimary
                    style={{ width: '90%' }}
                    text={'View ride requests'}
                    onPress={() => navigation.navigate('Cotravellers', { data: cotravellerArray })}
                    loader={false}
                />

            </View>
        )
    }


    const AcceptedRideView = ({ item, index }) => {

        // setActiveCard(index, 'current index')
        console.log(item, 'item')

        return (
            <View style={{ width: Dimensions.get('screen').width, alignItems: 'center', justifyContent: 'center', paddingBottom: 10 }}>

                <View style={{ width: '95%', alignItems: 'center', marginTop: 0, marginBottom: 10 }}>
                    <Surface elevation={4} style={{ width: '95%', backgroundColor: AppColors.themesWhiteColor, borderRadius: 10, alignItems: 'center' }}>
                        <View style={{ width: '95%', marginTop: 10 }}>
                            <Text style={{ padding: 10, fontFamily: AppFontFamily.PopinsRegular, fontSize: 15, color: AppColors.themeBlackColor }}>{item.status}</Text>
                        </View>

                        <View style={{ width: '90%', marginTop: 0, marginBottom: 10, height: 2, backgroundColor: AppColors.themePickupDropSearchBg }}></View>
                        <View style={{ width: '90%', alignItems: 'center', flexDirection: 'row', marginLeft: 10, marginTop: 20 }}>
                            <Image source={require('../../assets/avtar.png')} style={{ marginRight: 5, width: 42, height: 42, borderRadius: 20, resizeMode: 'contain' }} />
                            <View style={{ justifyContent: 'center' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <Text style={{ marginLeft: 10, fontFamily: AppFontFamily.PopinsBold, fontSize: 16, color: AppColors.themeText2Color }}>{item.name ?? "Sachin Gupta"}</Text>

                                </View>

                                <View style={{ paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../../assets/Star.png')} style={{ marginRight: 5, width: 12, height: 12, marginBottom: 3, resizeMode: 'contain' }} />
                                    <Text style={{ fontFamily: AppFontFamily.PopinsRegular, fontSize: 12, color: AppColors.themeText2Color }}>{'4.5 rating'}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', width: '100%', marginTop: 0, justifyContent: 'center' }}>

                            <View style={{ width: '92%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>


                                <View style={{ width: '10%', alignItems: 'center', justifyContent: 'center' }}>

                                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                                        <Image source={require('../../assets/dotone.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 5, marginTop: 5 }}>

                                        <View style={{ width: 2, height: 45, backgroundColor: AppColors.themeBlackColor }}>
                                        </View>
                                        {/* <Image source={require('../../assets/dotline.png')} style={{ marginLeft: 0, width: 5, height: 50, resizeMode: 'contain' }} /> */}
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                                        <Image source={require('../../assets/triangle.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />
                                    </View>

                                </View>

                                <View style={{ marginLeft: 0, width: '90%', justifyContent: 'center', alignItems: 'center' }}>

                                    <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', marginTop: 20, marginBottom: 0 }}>

                                        <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                            <Text numberOfLines={2} style={{ fontFamily: AppFontFamily.PopinsRegular, width: '95%', color: AppColors.themeTextPrimaryColor, fontSize: 16 }}>{item.origin_address}</Text>
                                        </View>
                                    </View>
                                    <View style={{ marginLeft: 0, width: '100%', height: 0 }}></View>
                                    <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', marginBottom: 20, marginTop: 20 }}>

                                        <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                            <Text numberOfLines={2} style={{ fontFamily: AppFontFamily.PopinsRegular, width: '95%', color: AppColors.themeTextPrimaryColor, fontSize: 16 }}>{item.destination_address}</Text>
                                        </View>
                                    </View>

                                </View>

                            </View>

                        </View>
                        <View style={{ width: '100%', marginTop: 10, marginBottom: 5, height: 2, backgroundColor: AppColors.themePickupDropSearchBg }}></View>
                        <View style={{ justifyContent: 'center', width: '95%', flexDirection: 'row', alignItems: 'center', paddingBottom: 5 }}>
                            <View style={{ width: '60%', justifyContent: 'center' }}>

                                <RideCostView amount={Number(item.price).toFixed(0)} />

                            </View>
                            <Pressable onPress={() => Linking.openURL(`tel:${item?.phoneNumber}`)} style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>

                                <Image source={require('../../assets/btncall.png')} style={{ marginLeft: 0, width: 58, height: 58, resizeMode: 'contain' }} />
                            </Pressable>
                            <Pressable onPress={() => navigation.navigate('Chat', { 'coTravellerId': item.user_id, 'id': item._id, 'cotravellerName': item.name, from: 'chat', phone: item.contact })} style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>

                                <Image source={require('../../assets/btnchat.png')} style={{ marginLeft: 0, width: 58, height: 58, resizeMode: 'contain' }} />
                            </Pressable>

                        </View>




                    </Surface>
                </View>


                {/* <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between' }}>

                        {acceptBtn(item, index)}

                        <ButtonPrimary
                            style={{ width: '48%', backgroundColor: 'red' }}
                            text={'Reject ride'}
                            onPress={() => console.log('confirm', item)}
                            loader={false}
                        />

                    </View> */}

            </View>
        );
    }

    const _acceptOfferedRide = async (item, ind) => {
        const result = await hitApiToAcceptOfferedRide(item.ride_id, item.user_id)
        console.log(result, 'vvv')
        if (result.status) {


            const updatedArray = data.map((obj, index) =>
                index === ind ? { ...obj, status: 'accepted' } : obj);

            // console.log(updatedArray, 'arr')
            setCotravellerArray(updatedArray)


            navigation.goBack()
        }

    }

    const _acceptRequestRide = async (item, ind) => {
        const result = await hitApiToAcceptRequestedRide(item._id, item.user_id, item.journey_published_by)
        console.log(result, 'vvv')
        if (result.status) {


            const updatedArray = data.map((obj, index) =>
                index === ind ? { ...obj, status: 'accepted' } : obj);

            // console.log(updatedArray, 'arr')
            setCotravellerArray(updatedArray)


            navigation.goBack()
        }

    }

    const _acceptRequestRide1 = async (item, ind) => {
        const result = await hitApiToAcceptRequestedRide(item._id, '', item.journey_published_by)
        console.log(result, 'vvv')
        if (result.status) {


            const updatedArray = data.map((obj, index) =>
                index === ind ? { ...obj, status: 'accepted' } : obj);

            // console.log(updatedArray, 'arr')
            setCotravellerArray(updatedArray)


            navigation.goBack()
        }

    }



    const acceptBtn = (item, index) => {
        if (from === 'offered') {
            return (
                item.status === 'pending' ?
                    <ButtonPrimary
                        style={{ width: '48%', backgroundColor: 'green' }}
                        text={'Accept Ride'}
                        onPress={() => _acceptOfferedRide(item, index)}
                        loader={false}
                    />
                    : null
            )
        }
        else if (from === 'requested') {
            return (
                item.status === 'confirmed' ?
                    <ButtonPrimary
                        style={{ width: '48%', backgroundColor: 'green' }}
                        text={'Accept Ride'}
                        onPress={() => _acceptRequestRide(item, index)}
                        loader={false}
                    />
                    : null
            )
        }
        else {
            return (

                <ButtonPrimary
                    style={{ width: '48%', backgroundColor: 'green' }}
                    text={'Accept Ride'}
                    onPress={() => _acceptRequestRide1(item, index)}
                    loader={false}
                />
            )
        }
    }

    const CotravellerList = ({ cotravllerArray }) => {

        console.log(cotravllerArray, 'len')
        return (

            <>

                <View style={{ height: Dimensions.get('window').height * .89, marginTop: 10, paddingBottom: 30 }}>

                    <FlatList
                        ref={flatListRef}
                        ListHeaderComponent={<RideDetailView />}
                        data={cotravllerArray.length > 0 ? cotravllerArray : [1]}
                        renderItem={cotravllerArray.length > 0 ? AcceptedRideView : noData}
                        showsHorizontalScrollIndicator={false}

                    />
                </View>

            </>


        )
    }

    const noData = () => {
        return (
            CommonLoaders.NoDataInList('No co-traveller found', { height: 100 })
        )
    }

    const cancelAlert = (item) => {

        Alert.alert(
            '',
            'Are you sure you want to cancel this ride ?',
            [
                { text: 'no' },
                { text: 'yes', onPress: () => cancelRide(item) },
            ],
            {
                cancelable: false,
            },
        );

    }


    const cancelRide = async (item) => {

        const result = await hitApiToCancelRideForDriver(item._id)

        console.log(result, 'cancel result')
        if (result.status) {
            Alert.alert('Ride cancelled successfully')
        }


    }

    const RideDetailView = () => {
        return (

            <View style={{ width: Dimensions.get('screen').width, alignItems: 'center', justifyContent: 'center', paddingBottom: 10 }}>

                <Surface elevation={4} style={{ width: '90%', backgroundColor: AppColors.themesWhiteColor, borderRadius: 10 }}>
                    <View style={{ width: '92%', alignItems: 'center', flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'flex-start', width: '50%' }}>

                            <Text style={{ padding: 10, fontFamily: AppFontFamily.PopinsBold, fontSize: 13, color: AppColors.themeText2Color }}>{moment(rideData[0].journey_start_at).format('DD MMM YYYY, HH:mm')}</Text>

                        </View>
                        {rideData[0].status == 'cancelled' ?
                            <View style={{ justifyContent: 'center', alignItems: 'flex-end', width: '50%' }}>

                                <Text style={{ padding: 10, fontFamily: AppFontFamily.PopinsBold, fontSize: 13, color: AppColors.themeButtonRed }}>{(rideData[0].status).toUpperCase()}</Text>

                            </View> : null
                        }

                    </View>
                    <View style={{ width: '100%', marginBottom: 10, height: 2, backgroundColor: AppColors.themePickupDropSearchBg }}></View>

                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 0, justifyContent: 'center' }}>

                        <View style={{ width: '92%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>


                            <View style={{ width: '10%', alignItems: 'center', justifyContent: 'center' }}>

                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                                    <Image source={require('../../assets/dotone.png')} style={{ width: 10, height: 10, resizeMode: 'contain' }} />
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 5, marginTop: 5 }}>

                                    <View style={{ width: 2, height: 45, backgroundColor: AppColors.themeBlackColor }}>
                                    </View>
                                    {/* <Image source={require('../../assets/dotline.png')} style={{ marginLeft: 0, width: 5, height: 50, resizeMode: 'contain' }} /> */}
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                                    <Image source={require('../../assets/triangle.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />
                                </View>

                            </View>

                            <View style={{ marginLeft: 5, width: '90%', justifyContent: 'center', alignItems: 'center' }}>

                                <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', marginTop: 20, marginBottom: 0 }}>

                                    <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                        <Text numberOfLines={2} style={{ fontFamily: AppFontFamily.PopinsRegular, width: '100%', color: AppColors.themeTextPrimaryColor, fontSize: 16 }}>{rideData[0].journey_origin_address}</Text>
                                    </View>
                                </View>
                                <View style={{ marginLeft: 0, width: '100%', height: 0 }}></View>
                                <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', marginBottom: 20, marginTop: 20 }}>

                                    <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                        <Text numberOfLines={2} style={{ fontFamily: AppFontFamily.PopinsRegular, width: '100%', color: AppColors.themeTextPrimaryColor, fontSize: 16 }}>{rideData[0].journey_destination_address}</Text>
                                    </View>
                                </View>

                            </View>

                        </View>

                    </View>

                    <View style={{ width: '100%', marginBottom: 10, height: 2, backgroundColor: AppColors.themePickupDropSearchBg }}></View>
                    <View style={{ width: '95%', flexDirection: 'row', marginBottom: 10, marginLeft: 10 }}>
                        <View style={{ justifyContent: 'flex-start', width: '50%' }}>

                            <RideCostView amount={rideData[0].journey_expected_price_per_seat} />
                            <Text style={{ padding: 10, paddingTop: 0, paddingBottom: 0, fontFamily: AppFontFamily.PopinsMedium, fontSize: 12, color: AppColors.themeText2Color }}>{CalculateTimeFromMilies(Number(rideData[0].journey_approx_time))}</Text>

                        </View>

                        <View style={{ alignItems: 'flex-end', width: '50%', justifyContent: 'flex-start' }}>

                            <Text style={{ padding: 10, fontFamily: AppFontFamily.PopinsMedium, fontSize: 12, color: AppColors.themeText2Color }}>{rideData[0].seat_left + ' Seats left'}</Text>

                        </View>




                    </View>

                    {rideData[0].status == 'cancelled' ? null :

                        CancelView()}

                </Surface >

                {cotravellerArray.length ? <ViewRideRequestBtn /> : null}

                {acceptedData.length ? <CustomerInfoView /> : null}

            </View>
        )
    }


    const CancelView = () => {
        return (
            <>
                <View style={{ width: '100%', marginBottom: 10, height: 2, backgroundColor: AppColors.themePickupDropSearchBg }}></View>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 10 }}>

                    <Pressable onPress={() => cancelAlert(rideData[0])} style={{ backgroundColor: AppColors.themesWhiteColor, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>

                        <Text style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 3, fontFamily: AppFontFamily.PopinsRegular, fontSize: 13, color: AppColors.themeButtonRed }}>{'Cancel you ride'}</Text>
                    </Pressable>


                </View>
            </>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: AppColors.themePickupDropSearchBg, alignItems: 'center' }}>
            <Header isBack={true} close={() => navigation.goBack()} text='Ride Details' />




            {isLoading ?
                rideData.length ?
                    <CotravellerList cotravllerArray={acceptedData} />
                    :
                    null : CommonLoaders.RideDetailLoader()
            }



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatListItem: {
        width: Dimensions.get('window').width,
        // height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'green',
        marginTop: 30,
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'gray',
        marginHorizontal: 5,
    },
    activePaginationDot: {
        backgroundColor: 'black',
    },
});