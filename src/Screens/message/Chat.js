import React, { useEffect, useRef } from 'react'
import { View, Text, RefreshControl, Image, FlatList, Dimensions, TextInput, Pressable, StyleSheet } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import { Header } from '../../components/commomheader/CommonHeader';
import moment from 'moment';
import Toast from 'react-native-simple-toast'
import messaging from '@react-native-firebase/messaging';
// import PushNotification from 'react-native-push-notification';
import { hitApiToChackeChatExist, hitApiToMessageForParticularUser, hitApiToSendMessage } from './MessageModal';
import { Surface } from 'react-native-paper';
import { AppFontFamily } from '../../components/constants/AppFonts';
import CommonLoaders from '../../components/loader/Loader';
export default function Chat({ navigation, route }) {
    const [refreshPage, setRefreshPage] = React.useState(false);
    const [message, setMessage] = React.useState([])
    const { coTravellerId, cotravellerName, from } = route.params;
    let { id } = route.params;
    const [text, setText] = React.useState('')
    const [fetching, setFetching] = React.useState(false)
    const listViewRef = useRef()

    useEffect(() => {

        (async () => {

            //Put your logic here


            // setTimeout(() => {
            //     // listViewRef.scrollToEnd();
            // }, 1500);

            //           messaging().onMessage(async (remoteMessage) => {
            //     console.log('ios', remoteMessage)
            //     await getAllMsg()

            // })
            if (from == 'chat') {
                const result = await hitApiToChackeChatExist(coTravellerId)
                console.log(result)
                if (result?.data) {
                    id = result.data._id

                    await getAllMsg()
                }
                // console.log('exist', result)
            }





        })();

        return () => {
            // clear/remove event listener
            unsubscribeOnMessage();
        }
    }, []);



    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {

    console.log("DEBUG: Received FCM message: " + JSON.stringify(remoteMessage));

    // Function to process new message and insert into local storage
    // if (refreshPage)
    // {

    await getAllMsg();
    // }

    // Display notification to user

    // Trigger refresh of FlatList component with setState
    // setRefreshPage(Math.random() * 100);

    });

    const scrollToBottom = (msg) => {
        //OnCLick of down button we scrolled the list to bottom
        // console.log(msg?.length, 'length')
        // listViewRef.current.initialScrollIndex = ({ scrollToBottom: 33 })
        // listViewRef.current.scrollToOffset({ offset: msg?.length * (Dimensions.get('window').height), animated: false });
        // listViewRef?.current.scrollToOffset({ animated: false, offset:  msg.length + 5});
    };


    const getAllMsg = async (fetching = '') => {

        setFetching(true)

        const result = await hitApiToMessageForParticularUser(id);
        console.log("ride list", result);
        if (result.status) {
            setMessage((result.data[0]?.messages.reverse()) ?? [])
            setFetching(false)
            // scrollToBottom(result.data[0]?.messages)
        }
        else {
            console.log(result)
        }
    }

    const sendMessage = async (coTravelerId, msg) => {

        if (msg == '') {
            Toast.showWithGravity('Enter message', 2, Toast.TOP);
        }
        else {

            setFetching(true)
            const result = await hitApiToSendMessage(coTravelerId, msg)
            console.log(result, 'send')
            if (result.status) {
                setText('')
                id = result.data
                // setFetching(false)
                await getAllMsg()
            }
            else {

            }
        }

    }


    const TopHeader = () => {
        return (
            <View style={{ backgroundColor: AppColors.themesWhiteColor, height: 70, width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Pressable onPress={() => navigation.goBack()} style={{ width: '25%', height: 70, alignItems: 'flex-start', paddingLeft: 10, justifyContent: 'center' }}>

                    <Surface style={{ backgroundColor: AppColors.themesWhiteColor, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} elevation={4}>
                        <Image source={require('../../assets/bckarrow.png')} style={{ width: 40, height: 40 }} />
                    </Surface>

                </Pressable>
                <View style={{ width: '50%', height: 60, alignItems: 'center', paddingRight: 20, justifyContent: 'center' }}>
                    <Text style={{ fontFamily: AppFontFamily.PopinsBold, fontSize: 20, color: AppColors.themeBlackColor }}>{cotravellerName}</Text>
                </View>
                <Pressable style={{ width: '25%', height: 50, alignItems: 'flex-end', paddingRight: 20, justifyContent: 'center' }}>

                    {/* <Surface style={{ backgroundColor: AppColors.themesWhiteColor, marginBottom: 10, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} elevation={4}>
                        <Image source={require('../../assets/bckarrow.png')} style={{ width: 25, height: 25 }} />
                    </Surface> */}
                </Pressable>

            </View>
        )
    }


    const LeftBubble = ({ item }) => {
        return (
            <View style={{ width: '98%', alignItems: 'flex-start', paddingBottom: 0 }}>

                <View style={{ justifyContent: 'center', padding: 10, backgroundColor: AppColors.themesWhiteColor, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopRightRadius: 10 }}>
                    <View style={{ width: '100%', alignItems: 'flex-start' }}>
                        {/* {console.log(item)} */}
                        {/* <Text style={{ width: '100%', fontWeight: '700', fontSize: 16, color: item.right ? AppColors.themesWhiteColor : AppColors.themeBlackColor }}>{(item.from_name)}</Text> */}
                        <Text style={{ fontFamily: AppFontFamily.PopinsRegular, width: '100%', marginTop: 0, fontSize: 15, color: AppColors.themeText2Color }}>{(item.message)}</Text>

                    </View>

                </View>


                {item.time ?
                    <Text style={{
                        fontFamily: AppFontFamily.PopinsRegular,
                        paddingLeft: 5,
                        paddingRight: 0,
                        textAlign: 'left',
                        width: '100%',
                        marginTop: 5,
                        fontSize: 11,
                        color: AppColors.themeText2Color
                    }}>
                        {item.time ? (moment(item.time).format('hh:mm A')) : null}
                    </Text> : null}

            </View>
        )
    }

    const RightBubble = ({ item }) => {
        return (
            <View style={{ width: '98%', alignItems: 'flex-end', paddingBottom: 0 }}>

                <View style={{ justifyContent: 'center', padding: 10, backgroundColor: AppColors.themePrimaryColor, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopLeftRadius: 10 }}>
                    <View style={{ width: '100%', alignItems: 'flex-end' }}>
                        {/* {console.log(item)} */}
                        {/* <Text style={{ width: '100%', fontWeight: '700', fontSize: 16, color: item.right ? AppColors.themesWhiteColor : AppColors.themeBlackColor }}>{(item.from_name)}</Text> */}
                        <Text style={{ fontFamily: AppFontFamily.PopinsRegular, width: '100%', marginTop: 0, fontSize: 15, color: AppColors.themesWhiteColor }}>{(item.message)}</Text>

                    </View>

                </View>


                {item.time ?
                    <Text style={{
                        fontFamily: AppFontFamily.PopinsRegular,
                        paddingLeft: 0,
                        paddingRight: 5,
                        textAlign: 'right',
                        width: '100%',
                        marginTop: 5,
                        fontSize: 11,
                        color: AppColors.themeText2Color
                    }}>
                        {item.time ? (moment(item.time).format('hh:mm A')) : null}
                    </Text> : null}

            </View>
        )
    }


    return (
        <View style={{ flex: 1, width: '100%', backgroundColor: AppColors.themePickupDropSearchBg, alignItems: 'center' }}>
            <TopHeader />



            <View style={{ height: '83%' }}>
                <FlatList
                    data={message}
                    // refreshControl={
                    //     <RefreshControl
                    //         onRefresh={async () => await getAllMsg('get')}
                    //         refreshing={fetching}
                    //         title={'Loding...'}
                    //         tintColor={AppColors.themeBlackColor}
                    //         titleColor={AppColors.themeBlackColor}
                    //     />
                    // }
                    // initialScrollIndex={message?.messages?.length ? message.messages.length - 1 : 7}
                    // ref={listViewRef}
                    inverted
                    keyExtractor={(item, index) => index}
                    // ListHeaderComponent={this.headerView()}
                    showsVerticalScrollIndicator={false}
                    // extraData={this.state}
                    // onEndReached={() => this.getCartList()}
                    renderItem={({ item, index }) => (
                        <View style={{ width: Dimensions.get('window').width, alignItems: 'center', padding: 10, paddingBottom: 0 }}>
                            {item.right ? <RightBubble item={item} /> : <LeftBubble item={item} />}
                        </View>
                    )}

                />
            </View>

            <CommonLoaders.ChatLoader isLoading={fetching} loaderText={'Loading... messages'} />



            <Surface style={{ width: '100%', height: 60, flexDirection: 'row', alignItems: 'center' }}>

                {/* <View style={{ width: '10%', height: 60, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../assets/add.png')} style={{ borderColor: AppColors.themeCardBorderColor, width: 30, height: 30, resizeMode: 'contain' }} />
                </View> */}
                <View style={{ width: '85%', height: 60, justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput
                        onChangeText={text => setText(text)}
                        value={text}
                        placeholder={"Enter message"}
                        placeholderTextColor={AppColors.themeText2Color}
                        style={{ color: AppColors.themeBlackColor, padding: 10, width: '100%', fontSize: 16, textAlign: 'left', borderColor: AppColors.themeCardBorderColor, borderWidth: 1, borderRadius: 30, height: 40 }}
                    />
                </View>
                <Pressable onPress={() => sendMessage(coTravellerId, text)} style={{ width: '15%', height: 60, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: AppColors.themePrimaryColor }}>
                        <Image source={require('../../assets/sendmsg.png')} style={{ tintColor: AppColors.themesWhiteColor, width: 20, height: 20, resizeMode: 'contain' }} />
                    </View>
                </Pressable>

            </Surface>

        </View>
    )
}

const styles = StyleSheet.create({
    rightArrow: {
        position: "absolute",
        //   backgroundColor: "#0078fe",
        backgroundColor: AppColors.themePrimaryColor,
        width: 25,
        height: 25,
        bottom: -3,
        borderBottomLeftRadius: 30,
        right: -10,

    },

    rightArrowOverlap: {
        position: "absolute",
        //   backgroundColor: "#eeeeee",
        backgroundColor: AppColors.themePickupDropSearchBg,
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomLeftRadius: 18,
        right: -20,


    },
    leftArrow: {
        position: "absolute",
        //   backgroundColor: "#0078fe",
        backgroundColor: AppColors.themesWhiteColor,
        width: 25,
        height: 25,
        bottom: -3,
        borderBottomRightRadius: 30,
        left: -10
    },

    leftArrowOverlap: {
        position: "absolute",
        //   backgroundColor: "#eeeeee",
        backgroundColor: AppColors.themePickupDropSearchBg,
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomRightRadius: 18,
        left: -20

    },
})