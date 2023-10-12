import React, { useRef, useEffect } from 'react'
import { View, Text, Image, Pressable, FlatList, StyleSheet, Dimensions, ScrollView, Linking, Alert } from 'react-native';
import { hitApiToCancelRideForCustomer, hitApiToGetOfferedRideDetails, hitApiToGetRequestedRideDetails, hitApiToRejectRequestedRide } from './RideHistoryModal';
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
import { ImageLoader } from '../../components/imageloader/ImageLoader';
import Toast from 'react-native-simple-toast'

export default function RequestedRideDetails({ navigation, route }) {

    const flatListRef = useRef(null);
    const [isLoading, setIsLoading] = React.useState(false)
    const [acceptLoader, setAcceptLoader] = React.useState(false);
    const [rejectLoader, setRejectLoader] = React.useState(false);
    const [cancelLoader, setCancelLoader] = React.useState(false);
    const [userData, setUserData] = React.useState({});
    const [cotravellerArray, setCotravellerArray] = React.useState([]);
    const [rideData, setRideData] = React.useState('')
    const [isCancel, setIsCancel] = React.useState('')
    const { id, from } = route.params;

    useEffect(() => {

        (async () => {

            //Put your logic here



            _unsubscribe = navigation.addListener('focus', async () => {
                getRideDetail()

            })

        })();

        return () => {
            // clear/remove event listener
            _unsubscribe();
        }
    }, []);


    const getRideDetail = async () => {
        const result = await hitApiToGetRequestedRideDetails(id)

        // console.log(result.data, 'status')





        if (result.status) {
            setIsCancel(result.data?.status)
            setRideData(result.data.rideData)
            setCotravellerArray(result.data.cotravellerData)
            setUserData(result.data.userData)
            setIsLoading(true)

            console.log(result.data, 'data')
        }
    }

    const CustomerInfoView = ({ item }) => {

        return (
            // <View style={{ width: Dimensions.get('screen').width, alignItems: 'center', justifyContent: 'center', paddingBottom: 10 }}>
            <View style={{ width: '90%', marginTop: 10 }}>

                <Text style={{ marginTop: 10, fontSize: 16, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsMedium }}>
                    {'Co-travellers'}
                </Text>
            </View>
            // </View>
        )

    }

    const kycAlert = () => {
        Alert.alert(
            '',
            'KYC pending! Please complete your KYC',
            [{ text: 'cancel' }, { text: 'OK', onPress: () => navigation.navigate('KycScreen') }],
            {
                cancelable: false,
            },
        );
    };


    const acceptRide = async (ind) => {
        console.log(userData[0], 'userData')
        setAcceptLoader(true)
        const result = await hitApiToAcceptRequestedRide(userData[0].ride_id, userData[0].user_id, rideData[0].journey_published_by)
        // console.log(result, 'vvv')
        if (result.status) {


            const updatedArray = userData.map((obj, index) =>
                index === 0 ? { ...obj, status: 'accepted' } : obj);

            // console.log(updatedArray, 'arr')
            setCotravellerArray(updatedArray)

            // navigation.goBack()
        }
        else {
            if (result.message == 'kyc not verified') {

                kycAlert()
            }
        }
        await getRideDetail()
        setAcceptLoader(false)
        // getRideDetail()
    }


    const rejectRide = async (ind) => {
        setRejectLoader(true)
        const result = await hitApiToRejectRequestedRide(userData[0].ride_id, userData[0].user_id, rideData[0].journey_published_by, 'reject')
        // console.log(result, 'vvv')
        if (result.status) {


            const updatedArray = userData.map((obj, index) =>
                index === 0 ? { ...obj, status: 'rejected' } : obj);

            // console.log(updatedArray, 'arr')
            setCotravellerArray(updatedArray)

            // navigation.goBack()
        }
        else {
            if (result.message == 'kyc not verified') {

                kycAlert()
            }
        }
        await getRideDetail()
        setRejectLoader(false)

        // getRideDetail()
    }

    const ViewRideRequestBtn = ({ }) => {

        return (
            <View style={{ paddingLeft: 20, width: '88%', alignItems: 'left', marginTop: 10, marginBottom: 10, justifyContent: 'center' }}>

                <Text style={{ fontSize: 16, fontFamily: AppFontFamily.PopinsBold, color: AppColors.themePrimaryColor }}>
                    {isCancel.toUpperCase()}
                </Text>

            </View>
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
        setCancelLoader(true)
        console.log(item, 'item')
        const result = await hitApiToCancelRideForCustomer(item._id)
        console.log(result, 'cancel result')

        if (result.status) {
            await getRideDetail()
            Alert.alert(
                '',
                'Ride cancelled successfully',
                [
                    { text: 'ok', onPress: () => navigation.goBack() },
                ],
                {
                    cancelable: false,
                },
            )
        }
        else{
            Toast.showWithGravity(result.message ?? result.error ?? "Something went wrong", 2, Toast.TOP);
        }
       
        setCancelLoader(false)


    }


    const AcceptedRideView = ({ item, index }) => {

        // setActiveCard(index, 'current index')
        // console.log(item, 'item')

        return (

            <View style={{ width: Dimensions.get('screen').width, alignItems: 'center', justifyContent: 'center', paddingBottom: 10 }}>

                <View style={{ width: '95%', alignItems: 'center', marginTop: 0, marginBottom: 10 }}>
                    <Surface elevation={4} style={{ width: '95%', backgroundColor: AppColors.themesWhiteColor, borderRadius: 10, alignItems: 'center' }}>
                        {/* <View style={{ width: '90%' }}>
                            <Text style={{ padding: 10, fontFamily: AppFontFamily.PopinsBold, fontSize: 13, color: AppColors.themeText2Color }}>{moment(item.date).format('DD MMM YYYY, HH:mm')}</Text>
                        </View>

                        <View style={{ width: '90%', marginTop: 0, marginBottom: 10, height: 2, backgroundColor: AppColors.themePickupDropSearchBg }}></View> */}
                        <View style={{ width: '90%', alignItems: 'center', flexDirection: 'row', marginLeft: 10, marginTop: 20 }}>

                            <ImageLoader
                                image={item?.profile ? item?.profile : ''}
                                width={42}
                                height={42}
                                borderRadius={21}
                            />

                            {/* <Image source={require('../../assets/avtar.png')} style={{ marginRight: 5, width: 42, height: 42, borderRadius: 20, resizeMode: 'contain' }} /> */}

                            <View style={{ justifyContent: 'center', width: '65%' }}>

                                <Text style={{ width: '100%', padding: 10, paddingTop: 0, paddingBottom: 0, fontFamily: AppFontFamily.PopinsBold, fontSize: 16, color: AppColors.themeText2Color }}>{item.name ?? "Sachin Gupta"}</Text>
                                <View style={{ paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../../assets/Star.png')} style={{ marginRight: 5, width: 12, height: 12, marginBottom: 3, resizeMode: 'contain' }} />
                                    <Text style={{ fontFamily: AppFontFamily.PopinsRegular, fontSize: 12, color: AppColors.themeText2Color }}>{'4.5 rating'}</Text>
                                </View>
                            </View>

                            <Pressable onPress={() => navigation.navigate('Chat', { 'coTravellerId': item.user_id, 'id': item._id, 'cotravellerName': item.name })} style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>

                                <Image source={require('../../assets/btnchat.png')} style={{ marginLeft: 0, width: 58, height: 58, resizeMode: 'contain' }} />
                            </Pressable>
                        </View>

                        <View style={{ width: '100%', marginTop: 10, marginBottom: 5, height: 2, backgroundColor: AppColors.themePickupDropSearchBg }}></View>

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

                        {/* <View style={{ justifyContent: 'flex-end', width: '95%', flexDirection: 'row', alignItems: 'center', paddingBottom: 5 }}> */}
                        {/* <View style={{ justifyContent: 'center', alignItems: 'flex-start', width: '55%' }}>

                                <Pressable onPress={() => cancelAlert(item)} style={{ backgroundColor: AppColors.themeButtonRed, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>

                                    <Text style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 3, fontFamily: AppFontFamily.PopinsRegular, fontSize: 13, color: AppColors.themesWhiteColor }}>{'Cancel you ride'}</Text>
                                </Pressable>


                            </View> */}
                        {/* <Pressable onPress={() => Linking.openURL(`tel:${item?.contact}`)} style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>

                                <Image source={require('../../assets/btncall.png')} style={{ marginLeft: 0, width: 58, height: 58, resizeMode: 'contain' }} />
                            </Pressable> */}
                        {/* <Pressable onPress={() => navigation.navigate('Chat', { 'coTravellerId': item.user_id, 'id': item._id, 'cotravellerName': item.name })} style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>

                                <Image source={require('../../assets/btnchat.png')} style={{ marginLeft: 0, width: 58, height: 58, resizeMode: 'contain' }} />
                            </Pressable> */}

                        {/* </View> */}


                    </Surface>
                </View>


            </View>
        );
    }


    const CotravellerList = ({ cotravellrArray }) => {

        // console.log(cotravellrArray.length, 'len')
        return (

            <>

                <View style={{ height: Dimensions.get('window').height * .9, marginTop: 10, paddingBottom: 30 }}>

                    <FlatList
                        // contentContainerStyle={{alignItems: 'center', width: Dimensions.get('window').width,}}
                        ref={flatListRef}
                        ListHeaderComponent={<RideDetailView />}
                        data={cotravellrArray.length > 0 ? cotravellrArray : [1]}
                        renderItem={cotravellerArray.length > 0 ? AcceptedRideView : noData}
                        // horizontal
                        // pagingEnabled
                        showsHorizontalScrollIndicator={false}
                    // onMomentumScrollEnd={handlePageChange}
                    />
                </View>
                {/* {cotravellerArray.length > 0 ? null : CommonLoaders.NoDataInList('No co-traveller found', { height: '25%' })} */}

            </>


        )
    }

    const noData = () => {
        return (

            CommonLoaders.NoDataInList('No co-traveller found', { height: 100 })
        )
    }

    const RideDetailView = () => {
        return (
            <>
                {userData.length ? <ViewRideRequestBtn /> : null}
                <View style={{ width: Dimensions.get('screen').width, alignItems: 'center', justifyContent: 'center', paddingBottom: 10 }}>

                    <Surface elevation={4} style={{ width: '90%', backgroundColor: AppColors.themesWhiteColor, borderRadius: 10 }}>
                        <View style={{ width: '90%', alignItems: 'center', flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                            <View style={{ justifyContent: 'center' }}>

                                <Text style={{ width: '100%', padding: 10, fontFamily: AppFontFamily.PopinsBold, fontSize: 13, color: AppColors.themeText2Color }}>{moment(rideData[0].journey_start_at).format('DD MMM YYYY, HH:mm')}</Text>

                            </View>
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
                                            <Text numberOfLines={2} style={{ fontFamily: AppFontFamily.PopinsRegular, width: '100%', color: AppColors.themeTextPrimaryColor, fontSize: 16 }}>{rideData[0].origin_address}</Text>
                                        </View>
                                    </View>
                                    <View style={{ marginLeft: 0, width: '100%', height: 0 }}></View>
                                    <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', marginBottom: 20, marginTop: 20 }}>

                                        <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                            <Text numberOfLines={2} style={{ fontFamily: AppFontFamily.PopinsRegular, width: '100%', color: AppColors.themeTextPrimaryColor, fontSize: 16 }}>{rideData[0].destination_address}</Text>
                                        </View>
                                    </View>

                                </View>

                            </View>

                        </View>

                        <View style={{ width: '90%', alignItems: 'center', flexDirection: 'row', marginLeft: 10, marginTop: 10 }}>
                            <Image source={require('../../assets/avtar.png')} style={{ marginRight: 5, width: 42, height: 42, borderRadius: 20, resizeMode: 'contain' }} />
                            <View style={{ justifyContent: 'center' }}>

                                <Text style={{ width: '100%', padding: 10, paddingTop: 0, paddingBottom: 0, fontFamily: AppFontFamily.PopinsBold, fontSize: 16, color: AppColors.themeText2Color }}>{rideData[0].name ?? "Sachin Gupta"}</Text>
                                <View style={{ paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../../assets/Star.png')} style={{ marginRight: 5, width: 12, height: 12, marginBottom: 3, resizeMode: 'contain' }} />
                                    <Text style={{ fontFamily: AppFontFamily.PopinsRegular, fontSize: 12, color: AppColors.themeText2Color }}>{'4.5 rating'}</Text>
                                </View>
                            </View>
                        </View>


                        <View style={{ width: '100%', marginTop: 10, marginBottom: 10, height: 2, backgroundColor: AppColors.themePickupDropSearchBg }}></View>
                        <View style={{ width: '95%', alignItems: 'center', flexDirection: 'row', marginBottom: 10, marginLeft: 10 }}>

                            <View style={{ justifyContent: 'flex-start', width: '55%' }}>


                                <RideCostView amount={rideData[0].price} />

                                <Text style={{ padding: 10, paddingTop: 0, paddingBottom: 0, fontFamily: AppFontFamily.PopinsMedium, fontSize: 12, color: AppColors.themeText2Color }}>{CalculateTimeFromMilies(Number(rideData[0].approx_time))}</Text>
                            </View>


                            <View style={{ justifyContent: 'flex-end', width: '45%', flexDirection: 'row', alignItems: 'center', paddingBottom: 5 }}>
                                <Pressable onPress={() => Linking.openURL(`tel:${rideData[0]?.contact}`)} style={{ width: '35%', justifyContent: 'center', alignItems: 'center' }}>

                                    <Image source={require('../../assets/btncall.png')} style={{ marginLeft: 0, width: 58, height: 58, resizeMode: 'contain' }} />
                                </Pressable>
                                <Pressable onPress={() => navigation.navigate('Chat', { 'coTravellerId': rideData[0].id, 'id': rideData[0]._id, 'cotravellerName': rideData[0].name, from: 'chat', phone: rideData[0].contact })} style={{ width: '35%', justifyContent: 'center', alignItems: 'center' }}>

                                    <Image source={require('../../assets/btnchat.png')} style={{ marginLeft: 0, width: 58, height: 58, resizeMode: 'contain' }} />
                                </Pressable>
                            </View>



                        </View>

                        {isCancel == 'confirmed' ?
                            <>

                                <View style={{ width: '100%', marginTop: 0, marginBottom: 10, height: 2, backgroundColor: AppColors.themePickupDropSearchBg }}></View>
                                <View style={{ marginLeft: 10, width: '100%', alignItems: 'flex-start', justifyContent: 'center', paddingBottom: 10 }}>
                                    <ButtonPrimary
                                        style={{ width: '90%', height: 30, backgroundColor: AppColors.themesWhiteColor }}
                                        textStyle={{ color: AppColors.themeButtonRed }}
                                        text={'Cancel your ride'}
                                        onPress={() => cancelLoader ? console.log('already clicked') : cancelAlert(rideData[0])}
                                        loader={cancelLoader}
                                        loaderColor={AppColors.themeButtonRed}
                                    />
                                </View>
                            </>
                            : null
                        }


                    </Surface >

                    {
                        userData[0]?.status.toLowerCase() == 'accepted' ?

                            <View style={{ width: '90%', alignItems: 'center', marginTop: 20, justifyContent: 'space-between', flexDirection: 'row' }}>

                                <ButtonPrimary
                                    style={{ width: '48%', height: 35, backgroundColor: AppColors.themeButtonRed }}
                                    text={'Reject'}
                                    onPress={() => rejectLoader ? console.log('already clicked') : rejectRide()}
                                    loader={rejectLoader}
                                />

                                <ButtonPrimary
                                    style={{ width: '48%', height: 35, backgroundColor: AppColors.themeAcceptBtnColor }}
                                    text={'Accept'}
                                    onPress={() => acceptLoader ? console.log('already clicked') : acceptRide()}
                                    loader={acceptLoader}
                                />


                            </View> : null
                    }


                    {cotravellerArray.length ? <CustomerInfoView /> : null}

                </View >
            </>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: AppColors.themePickupDropSearchBg, alignItems: 'center' }}>
            <Header isBack={true} close={() => navigation.goBack()} text='Ride Details' />

            {/* <ScrollView contentContainerStyle={{ width: Dimensions.get('window').width, alignItems: 'center' }}> */}

            {/* <RideDetailView /> */}


            {isLoading ?
                rideData.length ?
                    <CotravellerList cotravellrArray={cotravellerArray} />
                    :
                    null : CommonLoaders.RideDetailLoader()
            }
            {/* </ScrollView> */}



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

//accepted 'accept ride'
//confirmed 'ride confirmed'
//