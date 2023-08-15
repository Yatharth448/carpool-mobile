import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, FlatList, ImageBackground, Pressable, StyleSheet } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import { Header } from '../../components/commomheader/CommonHeader'
import { Surface } from 'react-native-paper'
import { AppFontFamily } from '../../components/constants/AppFonts'
import { AppTexts } from '../../components/constants/AppTexts'
import { ButtonPrimary } from '../../components/button/buttonPrimary'
import Carousel from 'react-native-reanimated-carousel';
import PaginationDot from 'react-native-animated-pagination-dot'
import { hitApiToAcceptOfferedRide, hitApiToAcceptRequestedRide } from '../ridehistory/RideHistoryModal'


function Cotravellers ({ navigation, route })  {
    // const data = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cotravellerArray, setCotravellerArray] = useState([]);
    const { data, from } = route.params

    useEffect(() => {

        (async () => {

            //Put your logic here

console.log(data, 'array of cotraveller')
setCotravellerArray(data)
            


        })();

        return () => {
            // clear/remove event listener

        }
    }, []);

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



    const acceptBtn = (item, index) =>{
        if (from === 'offered') {
        return(
                item.status === 'pending' ?
                <ButtonPrimary
                    style={{ width: '48%', backgroundColor: 'green' }}
                    text={'Accept Ride'}
                    onPress={()=> _acceptOfferedRide(item, index)}
                    loader={false}
                /> 
                : null
        )
        }
        else if (from === 'requested'){
            return(
                item.status === 'confirmed' ?
                <ButtonPrimary
                    style={{ width: '48%', backgroundColor: 'green' }}
                    text={'Accept Ride'}
                    onPress={()=> _acceptRequestRide(item, index)}
                    loader={false}
                /> 
                : null
        )
        }
        else{
            return(

                <ButtonPrimary
                style={{ width: '48%', backgroundColor: 'green' }}
                text={'Accept Ride'}
                onPress={()=> _acceptRequestRide1(item, index)}
                loader={false}
                /> 
            )
        }
    }

    const renderItem = ({ item, index }) => {

        // setActiveCard(index, 'current index')


        return (
            <View style={{ width: Dimensions.get('screen').width, height: Dimensions.get('window').height * .7, alignItems: 'center', justifyContent: 'center', paddingBottom: 10 }}>
                {/* <ImageBackground source={require('../../assets/paymentcardbg.png')} style={{ width: '100%', height: '100%', resizeMode: 'cover', alignItems: 'center' }}> */}
                <Surface elevation={4} style={{ padding: 10, width: '90%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>

                    <Image source={require('../../assets/paysuccess.png')} style={{ height: 60, width: 60, resizeMode: 'contain' }} />
                    <Text style={{ marginTop: 20, width: '80%', textAlign: 'center', fontSize: 16, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsBold }}>
                        {'Few drivers have accepted your request'}
                    </Text>


                    <View style={{ width: '100%', alignItems: 'center', marginTop: 30, marginBottom: 10 }}>
                        <Surface elevation={4} style={{ width: '95%', backgroundColor: AppColors.themesWhiteColor, borderRadius: 10 }}>

                            <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>

                                <View style={{ width: '75%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>

                                    <View style={{ width: '15%', alignItems: 'center' }}>

                                        <Image source={require('../../assets/dotone.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />
                                        <Image source={require('../../assets/dotline.png')} style={{ marginLeft: 0, width: 5, height: 40, resizeMode: 'contain' }} />
                                        <Image source={require('../../assets/triangle.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />

                                    </View>

                                    <View style={{ width: '85%', justifyContent: 'center', alignItems: 'center' }}>

                                        <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row' }}>

                                            <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: AppFontFamily.PopinsMedium, width: '100%', color: AppColors.themeTextPrimaryColor, fontSize: 12 }}>{item.origin_address}</Text>
                                            </View>
                                        </View>
                                        <View style={{ marginLeft: 0, width: '100%', height: 0 }}></View>
                                        <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row' }}>

                                            <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: AppFontFamily.PopinsMedium, width: '100%', color: AppColors.themeTextPrimaryColor, fontSize: 12 }}>{item.destination_address}</Text>
                                            </View>
                                        </View>

                                    </View>

                                </View>

                                <View style={{ width: '25%', alignItems: 'flex-end' }}>
                                    <Text style={{ paddingTop: 8, paddingRight: 10, fontFamily: AppFontFamily.PopinsBold, fontSize: 16, color: AppColors.themeText2Color }}>{AppTexts.Rupee_Symbol + item.price}</Text>
                                    {/* <Text style={{ padding: 10, paddingTop: 5, paddingBottom: 0, fontFamily: AppFontFamily.PopinsRegular, fontSize: 12, color: AppColors.themeText2Color }}>{'2' + " seats left"}</Text> */}

                                </View>
                            </View>


                            <View style={{ width: '100%', marginTop: 20, marginBottom: 10, height: 2, backgroundColor: AppColors.themePickupDropSearchBg }}></View>
                            <View style={{ width: '90%', alignItems: 'center', flexDirection: 'row', marginBottom: 10, marginLeft: 10 }}>
                                <Image source={require('../../assets/avtar.png')} style={{ marginRight: 5, width: 40, height: 40, borderRadius: 20, resizeMode: 'contain' }} />
                                <View style={{ justifyContent: 'center' }}>

                                    <Text style={{ width: '100%', padding: 10, paddingTop: 0, paddingBottom: 0, fontFamily: AppFontFamily.PopinsSemiBold, fontSize: 16, color: AppColors.themeText2Color }}>{item.name ?? "Sachin Gupta"}</Text>
                                    <Text style={{ width: '100%', padding: 10, paddingTop: 0, paddingBottom: 0, fontFamily: AppFontFamily.PopinsMedium, fontSize: 12, color: AppColors.themeText2Color }}>{item.user_gender}</Text>
                                </View>
                            </View>

                        </Surface>
                    </View>


                    <View style={{ width: '100%', flexDirection: 'row', height: 70, alignItems: 'center', marginTop: 30, justifyContent: 'space-between' }}>

                        { acceptBtn(item, index)}

                        <ButtonPrimary
                            style={{ width: '48%', backgroundColor: 'red' }}
                            text={'Reject ride'}
                            onPress={() => console.log('confirm', item)}
                            loader={false}
                        />

                    </View>


                </Surface>

                {/* </ImageBackground> */}
            </View>
        );
    }


    const handlePageChange = (event) => {
        const { contentOffset } = event.nativeEvent;
        const index = Math.round(contentOffset.x / Dimensions.get('window').width);
        setCurrentIndex(index);
    };

    return (
        <View style={{ flex: 1, backgroundColor: AppColors.themePickupDropSearchBg, alignItems: 'center' }}>
            <Header isBack={true} close={() => navigation.goBack()} />
            <View style={{height: Dimensions.get('window').height * .7, marginTop: 30}}>

            <FlatList
                ref={flatListRef}
                data={cotravellerArray}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handlePageChange}
            />
            </View>
            <View style={styles.paginationContainer}>
                {data.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            index === currentIndex && styles.activePaginationDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

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

export default Cotravellers;






// componentDidMount() {
//     console.log(this.props.route.params?.data, 'co traveller')
//     this.setState({ cotravellerArray: this.props.route.params?.data })
// }

// _acceptRide = ({ item }) => {
//     // const result = await hitApiToAcceptRide(item.ride_id, item.user_id)
//     console.log(item, 'vvv')
//     // if (result.status) {

//     // }

// }


// onIndexChange(currentCard) {
//     console.log(currentCard, 'card')
//     this.setState({ currentCard: currentCard })
// }


// PaymentCourousal() {
//     const nav = this.props.navigation;
//     return (
//         <View style={{ marginTop: 20, height: Dimensions.get('window').height * 0.7, justifyContent: 'center' }}>

//             <FlatList
//                 ref={flatListRef}
//                 data={data}
//                 renderItem={renderItem}
//                 horizontal
//                 pagingEnabled
//                 showsHorizontalScrollIndicator={false}
//                 onMomentumScrollEnd={handlePageChange}
//             />

//             {/* {bottomPaging()} */}
//         </View>
//     )
// }

// BottomPaging() {
//     return (
//         <View style={{ height: 20, width: this.state.screenWidth, marginTop: 30, alignItems: 'center' }}>

//             <PaginationDot
//                 activeDotColor={AppColors.themePrimaryColor}
//                 inactiveDotColor={AppColors.themeTextGrayColor}
//                 curPage={this.state.currentCard}
//                 maxPage={2}
//                 sizeRatio={1.5}
//             />
//         </View>
//     );
// }


// render() {
//     return (
//         <View style={{ flex: 1, backgroundColor: AppColors.themePickupDropSearchBg, alignItems: 'center' }}>
//             <Header isBack={true} close={() => this.props.navigation.goBack()} />
//             {this.PaymentCourousal()}
//             {this.BottomPaging()}

//             {/* <FlatList
//             data={['1', '2']}
//             keyExtractor={(item, index) => index}
//             horizontal={true}
//             contentContainerStyle={{ height: Dimensions.get('window').height - 100, marginTop: 50 }}
//             // ListHeaderComponent={this.headerView()}
//             showsHorizontalScrollIndicator={false}
//             pagingEnabled={true}
//             // extraData={this.state}
//             // onEndReached={() => this.getCartList()}
//             renderItem={({ item, index }) => (
//                 <View style={{ width: Dimensions.get('screen').width, height: Dimensions.get('window').height * .6, alignItems: 'center' }}>
                  
//                         <Surface elevation={4} style={{ padding: 10, width: '90%', height: '100%', alignItems: 'center' }}>

//                             <Image source={require('../../assets/paysuccess.png')} style={{ marginTop: 50, height: 60, width: 60, resizeMode: 'contain' }} />
//                             <Text style={{ marginTop: 20, width: '80%', textAlign: 'center', fontSize: 16, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsBold }}>
//                                 {'Few drivers have accepted your request'}
//                             </Text>


//                             <View style={{ width: '100%', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
//                                 <Surface elevation={4} style={{ width: '95%', backgroundColor: AppColors.themesWhiteColor, borderRadius: 10 }}>

//                                     <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>

//                                         <View style={{ width: '75%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>

//                                             <View style={{ width: '15%', alignItems: 'center' }}>

//                                                 <Image source={require('../../assets/dotone.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />
//                                                 <Image source={require('../../assets/dotline.png')} style={{ marginLeft: 0, width: 5, height: 40, resizeMode: 'contain' }} />
//                                                 <Image source={require('../../assets/triangle.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />

//                                             </View>

//                                             <View style={{ width: '85%', justifyContent: 'center', alignItems: 'center' }}>

//                                                 <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row' }}>

//                                                     <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
//                                                         <Text style={{ fontFamily: AppFontFamily.PopinsMedium, width: '100%', color: AppColors.themeTextPrimaryColor, fontSize: 12 }}>{'1, Thrale Street, London, SE19HW, UK'}</Text>
//                                                     </View>
//                                                 </View>
//                                                 <View style={{ marginLeft: 0, width: '100%', height: 0 }}></View>
//                                                 <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row' }}>

//                                                     <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
//                                                         <Text style={{ fontFamily: AppFontFamily.PopinsMedium, width: '100%', color: AppColors.themeTextPrimaryColor, fontSize: 12 }}>{'Ealing Broadway Shopping Centre, London, W55JY, UK'}</Text>
//                                                     </View>
//                                                 </View>

//                                             </View>

//                                         </View>

//                                         <View style={{ width: '25%', alignItems: 'flex-end' }}>
//                                             <Text style={{ paddingTop: 8, paddingRight: 10, fontFamily: AppFontFamily.PopinsBold, fontSize: 16, color: AppColors.themeText2Color }}>{AppTexts.Rupee_Symbol + '350'}</Text>
//                                             <Text style={{ padding: 10, paddingTop: 5, paddingBottom: 0, fontFamily: AppFontFamily.PopinsRegular, fontSize: 12, color: AppColors.themeText2Color }}>{'2' + " seats left"}</Text>

//                                         </View>
//                                     </View>


//                                     <View style={{ width: '100%', marginTop: 20, marginBottom: 10, height: 2, backgroundColor: AppColors.themePickupDropSearchBg }}></View>
//                                     <View style={{ width: '90%', alignItems: 'center', flexDirection: 'row', marginBottom: 10, marginLeft: 10 }}>
//                                         <Image source={require('../../assets/check.png')} style={{ marginRight: 5, width: 40, height: 40, borderRadius: 20, resizeMode: 'contain' }} />
//                                         <View style={{ justifyContent: 'center' }}>

//                                             <Text style={{ width: '100%', padding: 10, paddingTop: 0, paddingBottom: 0, fontFamily: AppFontFamily.PopinsSemiBold, fontSize: 16, color: AppColors.themeText2Color }}>{item.user_name ?? "Sachin Gupta"}</Text>
//                                             <Text style={{ width: '100%', padding: 10, paddingTop: 0, paddingBottom: 0, fontFamily: AppFontFamily.PopinsMedium, fontSize: 12, color: AppColors.themeText2Color }}>{item.rating + " rating"}</Text>
//                                         </View>
//                                     </View>

//                                 </Surface>
//                             </View>


//                             <View style={{ width: '100%', height: 70, alignItems: 'center', marginTop: 10 }}>
//                                 <ButtonPrimary
//                                     text={'confirm ride'}
//                                     onPress={() => console.log('confirem')}
//                                     loader={false}
//                                 />
//                             </View>


//                         </Surface>

//                 </View>
//             )}
//         /> */}


//         </View>
//     )
// }
// }

