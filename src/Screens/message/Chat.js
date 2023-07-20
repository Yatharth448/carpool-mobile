import React, { useEffect, useRef } from 'react'
import { View, Text, RefreshControl, Image, FlatList, Dimensions, TextInput, Pressable, StyleSheet } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import { Header } from '../../components/commomheader/CommonHeader';
import moment from 'moment';
import Toast from 'react-native-simple-toast'
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { hitApiToMessageForParticularUser, hitApiToSendMessage } from './MessageModal';
import { Surface } from 'react-native-paper';
export default function Chat({ navigation, route }) {

    const [message, setMessage] = React.useState([])
    const { id, coTravellerId } = route.params;
    const [text, setText] = React.useState('')
    const [fetching, setFetching] = React.useState(false)
    const listViewRef = useRef()

    useEffect(() => {

        (async () => {

            //Put your logic here
            await getAllMsg()

            // setTimeout(() => {
            //     // listViewRef.scrollToEnd();
            // }, 1500);


        })();

        return () => {
            // clear/remove event listener

        }
    }, []);


    messaging().onMessage(async (remoteMessage) => {
        console.log('ios', remoteMessage)
        await getAllMsg()
        // Platform.OS == 'ios' ? PushNotificationIOS.addNotificationRequest({
        //     id: remoteMessage.messageId,
        //     body: remoteMessage.notification.body,
        //     title: remoteMessage.notification.title,
        //     userInfo: remoteMessage.data,
        // }) :
        // PushNotification.createChannel(
        //     {
        //         channelId: 'fcm_fallback_notification_channel', // (required)
        //         channelName: 'My channel', // (required)
        //         channelDescription: '',
        //         soundName: 'default',
        //         importance: 4,
        //         vibrate: true,
        //     },
        //     created => console.log(`createChannel returned '${created}'`),
        // );
        // const dat = {
        //     channelId: 'fcm_fallback_notification_channel', // (required)
        //     channelName: 'My channel',
        //     body: remoteMessage.notification.body, // (required)
        //     title: remoteMessage.notification.title,
        // };
        // console.log('dat', dat)
        // PushNotification.localNotification(dat);
    });


    const scrollToBottom = (msg) => {
        //OnCLick of down button we scrolled the list to bottom
        console.log(msg?.length, 'length')
        // listViewRef.current.initialScrollIndex = ({ scrollToBottom: 33 })
        // listViewRef.current.scrollToOffset({ offset: msg?.length * (Dimensions.get('window').height), animated: false });
        // listViewRef?.current.scrollToOffset({ animated: false, offset:  msg.length + 5});
    };


    const getAllMsg = async (fetching = '') => {
        if (fetching) {
            setFetching(true)
        }
        const result = await hitApiToMessageForParticularUser(id);
        console.log("ride list", result.data, id);
        if (result.status) {
            setMessage((result.data[0].messages.reverse()) ?? [])
            setFetching(false)
            scrollToBottom(result.data[0].messages)
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

            const result = await hitApiToSendMessage(coTravelerId, msg)
            if (result.status) {
                setText('')
                await getAllMsg()
            }
            else {

            }
        }

    }

    const rightBubble = (item) => {
        return (
            <View style={{ width: '98%', alignItems: item.right ? 'flex-end' : 'flex-start', paddingBottom: 0 }}>

                <View style={{ justifyContent: 'center', padding: 10, backgroundColor: item.right ? AppColors.themePrimaryColor : AppColors.themesWhiteColor, borderRadius: 10 }}>
                    <View style={{ width: '100%', alignItems: item.right ? 'flex-end' : 'flex-start' }}>
                        {/* {console.log(item)} */}
                        <Text style={{ width: '100%', fontWeight: '700', fontSize: 16, color: item.right ? AppColors.themesWhiteColor : AppColors.themeBlackColor }}>{(item.from_name)}</Text>
                        <Text style={{ width: '100%', marginTop: 10, fontWeight: '600', fontSize: 14, color: item.right ? AppColors.themesWhiteColor : AppColors.themeText2Color }}>{(item.message)}</Text>

                    </View>
                    {item.time ? <Text style={{ textAlign: 'left', width: '100%', marginTop: 10, fontWeight: '400', fontSize: 12, color: item.right ? AppColors.themesWhiteColor : AppColors.themeText2Color }}>{item.time ? (moment(item.time).format('hh:mm A')) : null}</Text> : null}


                </View>
                <View style={item.right ? styles.rightArrow : styles.leftArrow}>

                </View>
                <View style={item.right ? styles.rightArrowOverlap : styles.leftArrowOverlap}></View>
            </View>
        )
    }


    return (
        <View style={{ flex: 1, width: '100%', backgroundColor: AppColors.themePickupDropSearchBg, alignItems: 'center' }}>
            <Header close={() => { navigation.goBack() }} />
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
                            {rightBubble(item)}
                        </View>
                    )}

                />
            </View>


            <Surface style={{ position: 'absolute', bottom: 0, width: '100%', height: 60, flexDirection: 'row', alignItems: 'center' }}>

                <View style={{ width: '15%', height: 60, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../assets/add.png')} style={{ borderColor: AppColors.themeCardBorderColor, width: 30, height: 30, resizeMode: 'contain' }} />
                </View>
                <View style={{ width: '65%', height: 60, justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput
                        onChangeText={text => setText(text)}
                        value={text}
                        placeholder={"Enter message"}
                        placeholderTextColor={AppColors.themeText2Color}
                        style={{ color: AppColors.themeBlackColor, paddingLeft: 10, paddingRight: 10, width: '100%', fontSize: 16, textAlign: 'left', fontWeight: '700', borderColor: AppColors.themeCardBorderColor, borderWidth: 1, borderRadius: 5 }}
                    />
                </View>
                <Pressable onPress={() => sendMessage(coTravellerId, text)} style={{ width: '20%', height: 60, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: AppColors.themePrimaryColor, fontWeight: '700', fontSize: 16 }}>
                        {'SEND'}
                    </Text>
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