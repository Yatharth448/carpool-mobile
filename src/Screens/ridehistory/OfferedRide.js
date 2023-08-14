import React, {useEffect} from 'react'
import { View, Text, FlatList, Image, Dimensions, Pressable } from 'react-native'
import { Surface } from 'react-native-paper'
import { AppColors } from '../../components/constants/AppColor'
import { AppFontFamily } from '../../components/constants/AppFonts'
import { AppTexts } from '../../components/constants/AppTexts'
import moment from 'moment'
import { hitApiToGetOfferedRide } from './RideHistoryModal'

export default function OfferedRides({ selectedData }) {

    const [offeredArr, setOfferedArr] = React.useState([])

    useEffect(() => {

        (async () => {

            //Put your logic here



            const result = await hitApiToGetOfferedRide()

            if (result.status) {

                setOfferedArr(result.data)
                console.log(offeredArr, 'offered')
            }


        })();

        return () => {
            // clear/remove event listener

        }
    }, []);


    return (
        <View style={{ height: Dimensions.get('window').height * .78 }}>
            <FlatList
                data={offeredArr}
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

                                    <Text style={{ width: '100%', padding: 10, fontFamily: AppFontFamily.PopinsSemiBold, fontSize: 14, color: AppColors.themeText2Color }}>{moment(item.date).format('DD MMM YYYY, HH:mm:ss')}</Text>

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
                                                <Text style={{ fontFamily: AppFontFamily.PopinsMedium, width: '100%', color: AppColors.themeTextPrimaryColor, fontSize: 12 }}>{item.journey_origin_address}</Text>
                                            </View>
                                        </View>
                                        <View style={{ marginLeft: 0, width: '100%', height: 0 }}></View>
                                        <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', marginBottom: 20 }}>

                                            <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: AppFontFamily.PopinsMedium, width: '100%', color: AppColors.themeTextPrimaryColor, fontSize: 12 }}>{item.journey_destination_address}</Text>
                                            </View>
                                        </View>

                                    </View>

                                </View>

                            </View>

                        </Surface>
                    </Pressable>
                )}
            />
        </View>
    )
}
