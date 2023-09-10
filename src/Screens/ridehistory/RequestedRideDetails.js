import React, { useRef, useEffect } from 'react'
import { View, Text, Image, Pressable, FlatList, StyleSheet, Dimensions, ScrollView, Linking } from 'react-native';
import { hitApiToGetOfferedRideDetails, hitApiToGetRequestedRideDetails } from './RideHistoryModal';
import { Header } from '../../components/commomheader/CommonHeader';
import { Surface } from 'react-native-paper';
import moment from 'moment';
import { AppColors } from '../../components/constants/AppColor';
import { AppFontFamily } from '../../components/constants/AppFonts';
import { AppTexts } from '../../components/constants/AppTexts';
import { ButtonPrimary } from '../../components/button/buttonPrimary';
import { hitApiToAcceptOfferedRide, hitApiToAcceptRequestedRide } from './RideHistoryModal'
import CommonLoaders from '../../components/loader/Loader';

export default function RequestedRideDetails({ navigation, route }) {

    const flatListRef = useRef(null);
    const [isLoading, setIsLoading] = React.useState(false)
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [acceptedData, setAcceptedData] = React.useState([]);
    const [userData, setUserData] = React.useState({});
    const [cotravellerArray, setCotravellerArray] = React.useState([]);
    const [rideData, setRideData] = React.useState('')
    const [cotraveller, setCotraveller] = React.useState('')
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

        // console.log(result.data.rideData, result.data.cotravellerData, 'request')





        if (result.status) {
            setRideData(result.data.rideData)
            setCotravellerArray(result.data.cotravellerData)
            setUserData(result.data.userData)
            setIsLoading(true)

            console.log(result.data.acceptedCotravellerData, 'accepted cotraveller \n', result.data?.cotravellerData, 'cotraveller data \n', result.data.rideData, 'ride data \n', result.data.userData, '\nuser data\n')
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

    const acceptRide = async (ind) => {

        const result = await hitApiToAcceptRequestedRide(userData[0].ride_id, userData[0].user_id, rideData[0].journey_published_by)
        console.log(result, 'vvv')
        if (result.status) {


            const updatedArray = userData.map((obj, index) =>
                index === 0 ? { ...obj, status: 'accepted' } : obj);

            // console.log(updatedArray, 'arr')
            setCotravellerArray(updatedArray)

            // navigation.goBack()
        }
        getRideDetail()

        // getRideDetail()
    }

    const ViewRideRequestBtn = ({ }) => {
        // if (userData[0].status == 'accepted')
        //     return (
        //         <View style={{ width: '100%', paddingLeft: 20, alignItems: 'center', marginTop: 20, justifyContent: 'center' }}>

        //             <ButtonPrimary
        //                 style={{ width: '90%' }}
        //                 text={'Accept the ride'}
        //                 onPress={() => acceptRide()}
        //                 loader={false}
        //             />

        //         </View>
        //     )
        // else
        return (
            <View style={{ paddingLeft: 20, width: '88%', alignItems: 'left', marginTop: 10, marginBottom: 20, justifyContent: 'center' }}>

                <Text style={{ fontSize: 14, fontFamily: AppFontFamily.PopinsBold, color: AppColors.themeBlackColor }}>
                    {userData[0].status == 'confirmed' ? 'Ride Confirmed' : userData[0].status == 'accepted' ? 'Accepted by ' + rideData[0].name : 'Awaited from ' + rideData[0].name}
                </Text>

            </View>
        )

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
                        <View style={{ width: '90%', alignItems: 'center', flexDirection: 'row', marginLeft: 10, marginTop: 10 }}>
                            <Image source={require('../../assets/avtar.png')} style={{ marginRight: 5, width: 42, height: 42, borderRadius: 20, resizeMode: 'contain' }} />
                            <View style={{ justifyContent: 'center' }}>

                                <Text style={{ width: '100%', padding: 10, paddingTop: 0, paddingBottom: 0, fontFamily: AppFontFamily.PopinsBold, fontSize: 16, color: AppColors.themeText2Color }}>{item.name ?? "Sachin Gupta"}</Text>
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
                        <View style={{ justifyContent: 'flex-end', width: '95%', flexDirection: 'row', alignItems: 'center', paddingBottom: 5 }}>
                            {/* <View style={{ width: '60%', justifyContent: 'center' }}>
                                <Text style={{ paddingLeft: 20, fontFamily: AppFontFamily.PopinsBold, fontSize: 16, color: AppColors.themeText2Color }}>{"Ride cost: "}
                                    <Text style={{ fontFamily: AppFontFamily.PopinsBold, fontSize: 11, color: AppColors.themeText2Color }}> {AppTexts.Rupee_Symbol} </Text>
                                    <Text style={{ fontFamily: AppFontFamily.PopinsSemiBold, fontSize: 18, color: AppColors.themeText2Color }}> {Number(item.price).toFixed(0)}</Text>
                                </Text>

                            </View> */}
                            <Pressable onPress={() => Linking.openURL(`tel:${item?.phoneNumber}`)} style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>

                                <Image source={require('../../assets/btncall.png')} style={{ marginLeft: 0, width: 58, height: 58, resizeMode: 'contain' }} />
                            </Pressable>
                            <Pressable onPress={() => navigation.navigate('Chat', { 'coTravellerId': item.user_id, 'id': item._id, 'cotravellerName': item.name })} style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>

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


    const CotravellerList = ({ cotravellrArray }) => {

        console.log(cotravellrArray.length, 'len')
        return (

            <>

                <View style={{ height: cotravellerArray.length > 0 ?  Dimensions.get('window').height * .9 :  Dimensions.get('window').height * .6, marginTop: 10 }}>

                    <FlatList
                        // contentContainerStyle={{alignItems: 'center', width: Dimensions.get('window').width,}}
                        ref={flatListRef}
                        ListHeaderComponent={<RideDetailView />}
                        data={cotravellrArray}
                        renderItem={AcceptedRideView}
                        // horizontal
                        // pagingEnabled
                        showsHorizontalScrollIndicator={false}
                    // onMomentumScrollEnd={handlePageChange}
                    />
                </View>
                { cotravellerArray.length > 0 ? null : CommonLoaders.NoDataInList('No co-traveller found', {height: '25%'})}

            </>


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

                                <Text style={{ width: '100%', padding: 10, fontFamily: AppFontFamily.PopinsBold, fontSize: 13, color: AppColors.themeText2Color }}>{moment(rideData[0].date).format('DD MMM YYYY, HH:mm')}</Text>

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

                                <Text style={{ padding: 10, paddingTop: 0, paddingBottom: 0, fontFamily: AppFontFamily.PopinsBold, fontSize: 16, color: AppColors.themeText2Color }}>{"Ride cost: "}
                                    <Text style={{ fontFamily: AppFontFamily.PopinsBold, fontSize: 11, color: AppColors.themeText2Color }}> {AppTexts.Rupee_Symbol} </Text>
                                    <Text style={{ fontFamily: AppFontFamily.PopinsSemiBold, fontSize: 18, color: AppColors.themeText2Color }}> {Number(rideData[0].journey_expected_price_per_seat).toFixed(0)}</Text>
                                </Text>

                                <Text style={{ padding: 10, paddingTop: 0, paddingBottom: 0, fontFamily: AppFontFamily.PopinsMedium, fontSize: 12, color: AppColors.themeText2Color }}>{Number(rideData[0].journey_approx_time / 60).toFixed(2) + " mins"}</Text>
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

            </Surface >

            {
                userData[0].status == 'accepted' ?

                    <View style={{ width: '100%', alignItems: 'center', marginTop: 20, justifyContent: 'center' }}>

                        <ButtonPrimary
                            style={{ width: '90%' }}
                            text={'Accept the ride'}
                            onPress={() => acceptRide()}
                            loader={false}
                        />

                    </View> : null
            }


        { cotravellerArray.length ? <CustomerInfoView /> : null }

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