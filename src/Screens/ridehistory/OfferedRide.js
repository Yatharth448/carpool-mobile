import React, { useEffect } from 'react'
import { View, Text, FlatList, Image, Dimensions, Pressable } from 'react-native'
import { Surface } from 'react-native-paper'
import { AppColors } from '../../components/constants/AppColor'
import { AppFontFamily } from '../../components/constants/AppFonts'
import { AppTexts } from '../../components/constants/AppTexts'
import moment from 'moment'
import { hitApiToGetOfferedRide } from './RideHistoryModal'
import CommonLoaders from '../../components/loader/Loader'
import { calculatedJourneyEndTime } from '../../components/commonfunction/CommonFunctions'

export default function OfferedRides({ selectedData }) {

    const [offeredArr, setOfferedArr] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    useEffect(() => {

        (async () => {

            //Put your logic here



            const result = await hitApiToGetOfferedRide()

            if (result.status) {

                setOfferedArr(result.data)
                setIsLoading(true)
                console.log(result, 'offered')
                // console.log(result.data.cotravellerData, 'cotraveller data', result.data.rideData, 'ride data')
            }


        })();

        return () => {
            // clear/remove event listener

        }
    }, []);


    

    const listView = () => {
        return (
            <FlatList
                data={offeredArr.reverse()}
                // contentContainerStyle={{width: 300, height: 600}}
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
                    <Pressable onPress={() => selectedData(item)} style={{ width: Dimensions.get('window').width, alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                        <Surface elevation={4} style={{ width: '95%', backgroundColor: AppColors.themesWhiteColor, borderRadius: 10 }}>
                            <View style={{ width: '90%', alignItems: 'center', flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                                <View style={{ justifyContent: 'center' }}>

                                    <Text style={{ width: '100%', padding: 10, fontFamily: AppFontFamily.PopinsBold, fontSize: 13, color: AppColors.themeText2Color }}>{moment(item.journey_start_at).format('DD MMM YYYY, HH:mm')}</Text>

                                </View>
                            </View>
                            <View style={{ width: '100%', marginBottom: 10, height: 2, backgroundColor: AppColors.themePickupDropSearchBg }}></View>

                            <View style={{ flexDirection: 'row', width: '100%', marginTop: 0, justifyContent: 'center' }}>

                                <View style={{ width: '92%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>


                                    <View style={{ width: '25%', alignItems: 'center', justifyContent: 'center' }}>

                                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                            <Text style={{ fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeTextPrimaryColor, fontSize: 13 }}>{moment(item.journey_start_at).format('HH:mm') + '   '}</Text>
                                            <Image source={require('../../assets/dotone.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />
                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                            <Text style={{ fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themesWhiteColor, fontSize: 13 }}>{moment(item.date).format('HH:mm') + '   '}</Text>
                                            <View style={{ width: 2, height: 25, backgroundColor: AppColors.themeBlackColor }}>
                                            </View>
                                            {/* <Image source={require('../../assets/dotline.png')} style={{ marginLeft: 0, width: 5, height: 50, resizeMode: 'contain' }} /> */}
                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                            <Text style={{ fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeTextPrimaryColor, fontSize: 13 }}>{calculatedJourneyEndTime(item.journey_start_at, item.journey_approx_time) + '   '}</Text>
                                            <Image source={require('../../assets/triangle.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />
                                        </View>

                                    </View>

                                    <View style={{ marginLeft: 0, width: '75%', justifyContent: 'center', alignItems: 'center' }}>

                                        <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', marginTop: 20, marginBottom: 0 }}>

                                            <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                                <Text numberOfLines={2} style={{ fontFamily: AppFontFamily.PopinsRegular, width: '100%', color: AppColors.themeTextPrimaryColor, fontSize: 15 }}>{item.pick_main_text}</Text>
                                            </View>
                                        </View>
                                        <View style={{ marginLeft: 0, width: '100%', height: 0 }}></View>
                                        <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', marginBottom: 20, marginTop: 20 }}>

                                            <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                                <Text numberOfLines={2} style={{ fontFamily: AppFontFamily.PopinsRegular, width: '100%', color: AppColors.themeTextPrimaryColor, fontSize: 15 }}>{item.drop_main_text}</Text>
                                            </View>
                                        </View>

                                    </View>

                                </View>

                            </View>

                        </Surface>
                    </Pressable>
                )}
            />
        )
    }

    return (
        <View style={{ height: Dimensions.get('window').height * .83 , paddingBottom: 50}}>
            {isLoading ? offeredArr.length ? listView() : CommonLoaders.NoDataInList('No offered ride found') : CommonLoaders.RideHistoryLoader()}
        </View>
    )
}
