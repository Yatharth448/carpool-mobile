import React, { Component } from 'react'
import { View, Text, RefreshControl, Image, FlatList, Dimensions, TextInput, Pressable, StyleSheet, Linking, BackHandler, KeyboardAvoidingView, Platform } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import { Header } from '../../components/commomheader/CommonHeader';
import moment from 'moment';
import Toast from 'react-native-simple-toast'
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { hitApiToChackeChatExist, hitApiToMessageForParticularUser, hitApiToSendMessage } from './MessageModal';
import { Surface } from 'react-native-paper';
import { AppFontFamily } from '../../components/constants/AppFonts';
import CommonLoaders from '../../components/loader/Loader';
import { showNotification } from '../../components/notifications/LocalNotification';
export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {

            refreshPage: false,
            message: [],
            text: '',
            fetching: false,
            id: ''


        }


    }
    // const [refreshPage, setRefreshPage] = React.useState(false);
    // const [message, setMessage] = React.useState([])
    // const { coTravellerId, cotravellerName, from, phone } = route.params;
    // let { id } = route.params;
    // const [text, setText] = React.useState('')
    // const [fetching, setFetching] = React.useState(false)
    // const listViewRef = useRef()


    // useEffect(() => {

    //     (async () => {
    //     if (from == 'chat') {
    //             const result = await hitApiToChackeChatExist(coTravellerId)
    //             console.log(result)
    //             if (result?.data) {
    //                 id = result.data._id

    //                 await getAllMsg('')
    //             }

    //         }
    //     })

    // }, [])



    // useEffect(() => {

    // (async () => {

    //Put your logic here



    // const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {

    //     console.log("DEBUG: Received FCM message: " + JSON.stringify(remoteMessage));
    //     const title = JSON.stringify(remoteMessage.notification.title)
    //     const body = JSON.stringify(remoteMessage.notification.body)
    //     const sentTime = JSON.stringify(remoteMessage.sentTime)
    //     var oldTime;

    // if (sentTime == oldTime)
    // {
    //     oldTime  = sentTime
    // showNotification(
    //     {
    //         'title': title,
    //         'message': body,
    //     })

    // console.log('jwfdjwgfj')
    //  getAllMsg('push');
    // }


    // });

    // return  unsubscribeOnMessage



    // }, []);



    async componentWillUnmount() {
        // BackHandler.removeEventListener("hardwareBackPress", this.backActionHandler);
        this.messageListener();
    }
    async componentDidMount() {


        this.setState({ id: this.props.route.params?.id })

        if (this.props.route.params?.from == 'chat') {
            const result = await hitApiToChackeChatExist(this.props.route.params?.coTravellerId)
            console.log(result)
            if (result?.data) {
                this.setState({ id: result.data._id })


                await this.getAllMsg('')
            }

        }



        await this.getAllMsg('push');


        this.messageListener = messaging().onMessage(async remoteMessage => {



            console.log('jwfdjwgfj')
            this.getAllMsg('push');


        })


    }




    // messaging().onMessage(async (remoteMessage) => {
    //     console.log('Received foreground notification: ', remoteMessage);
    // });


    scrollToBottom(msg) {
        //OnCLick of down button we scrolled the list to bottom
        // console.log(msg?.length, 'length')
        // listViewRef.current.initialScrollIndex = ({ scrollToBottom: 33 })
        // listViewRef.current.scrollToOffset({ offset: msg?.length * (Dimensions.get('window').height), animated: false });
        // listViewRef?.current.scrollToOffset({ animated: false, offset:  msg.length + 5});
    };


    async getAllMsg(load) {

        if (load == '') {

            // setFetching(true)
            // this.setState({ fetching: true })
        }

        const result = await hitApiToMessageForParticularUser(this.state.id);
        console.log("ride list", result);
        if (result.status) {

            this.setState({ message: (result.data[0]?.messages.reverse()) ?? [] })
            // setMessage()
            // setFetching(false)
            // scrollToBottom(result.data[0]?.messages)
        }
        else {
            console.log(result)
        }
    }

    async sendMessage(msg) {






        if (msg == '') {
            Toast.showWithGravity('Enter message', 2, Toast.TOP);
        }
        else {

            // setFetching(true)
            // this.setState({ fetching: true })
            const result = await hitApiToSendMessage(this.props.route.params?.coTravellerId, msg)
            console.log(result, 'send')
            if (result.status) {
                // setText('')
                this.setState({ text: '' })
                id = result.data
                // this.setState({ fetching: false })
                await this.getAllMsg('')
            }
            else {

            }
        }

    }


    TopHeader() {
        return (
            <View style={{ backgroundColor: AppColors.themesWhiteColor, height: 70, width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Pressable onPress={() => this.props.navigation.goBack()} style={{ width: '25%', height: 70, alignItems: 'flex-start', paddingLeft: 10, justifyContent: 'center' }}>

                    <Surface style={{ backgroundColor: AppColors.themesWhiteColor, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} elevation={4}>
                        <Image source={require('../../assets/bckarrow.png')} style={{ width: 40, height: 40 }} />
                    </Surface>

                </Pressable>
                <View style={{ width: '50%', height: 60, alignItems: 'center', paddingRight: 20, justifyContent: 'center' }}>
                    <Text style={{ fontFamily: AppFontFamily.PopinsBold, fontSize: 20, color: AppColors.themeBlackColor }}>{this.props?.route?.params?.cotravellerName}</Text>
                </View>
                <View onPress={() => Linking.openURL(`tel:${phone}`)} style={{ width: '25%', height: 50, alignItems: 'flex-end', paddingRight: 20, justifyContent: 'center' }}>

                    {/* <View style={{ backgroundColor: AppColors.themesWhiteColor, marginBottom: 0, width: 58, height: 58, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../assets/btncall.png')} style={{ width: 58, height: 58 }} />
                    </View> */}
                </View>

            </View>
        )
    }


    LeftBubble(item) {
        return (
            <View style={{ width: '98%', alignItems: 'flex-start', paddingBottom: 0 }}>

                <View style={{ maxWidth: '80%', alignItems: 'flex-start', justifyContent: 'center', padding: 10, backgroundColor: AppColors.themesWhiteColor, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopRightRadius: 10 }}>
                    <View style={{ width: '100%', alignItems: 'flex-start' }}>
                        {/* {console.log(item)} */}
                        {/* <Text style={{ width: '100%', fontWeight: '700', fontSize: 16, color: item.right ? AppColors.themesWhiteColor : AppColors.themeBlackColor }}>{(item.from_name)}</Text> */}
                        <Text style={{ fontFamily: AppFontFamily.PopinsRegular, marginTop: 0, fontSize: 15, color: AppColors.themeText2Color }}>{(item.message)}</Text>

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

    RightBubble(item) {
        return (
            <View style={{ width: '98%', alignItems: 'flex-end', paddingBottom: 0 }}>

                <View style={{ maxWidth: '80%', alignItems: 'flex-end', justifyContent: 'center', padding: 10, backgroundColor: AppColors.themePrimaryColor, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopLeftRadius: 10 }}>
                    <View style={{ width: '100%', alignItems: 'center' }}>

                        <Text style={{ fontFamily: AppFontFamily.PopinsRegular, marginTop: 0, fontSize: 15, color: AppColors.themesWhiteColor }}>{(item.message)}</Text>

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

    footerView() {
        return (


            <Surface style={{ width: '100%', height: 60, flexDirection: 'row', alignItems: 'center' }}>

                <View style={{ width: '82%', height: 40, justifyContent: 'center', alignItems: 'center', marginLeft: 10, borderColor: AppColors.themeCardBorderColor, borderWidth: 1, borderRadius: 30, }}>

                    <TextInput
                        onChangeText={text => this.setState({ text: text })}
                        value={this.state.text}
                        placeholder={"Enter message"}
                        placeholderTextColor={AppColors.themeText2Color}
                        style={{ paddingTop: 0, paddingBottom: 0, color: AppColors.themeBlackColor, paddingLeft: 10, paddingRight: 10, width: '100%', fontSize: 16, textAlign: 'left', height: 40 }}
                    />
                    {/* </KeyboardAvoidingView> */}
                </View>
                <Pressable onPress={() => this.sendMessage(this.state.text)} style={{ width: '15%', height: 60, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: AppColors.themePrimaryColor }}>
                        <Image source={require('../../assets/sendmsg.png')} style={{ tintColor: AppColors.themesWhiteColor, width: 20, height: 20, resizeMode: 'contain' }} />
                    </View>
                </Pressable>

            </Surface>
        )
    }

    render() {


        return (
            // <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={10}>
                <View style={{ flex: 1, width: '100%', backgroundColor: AppColors.themePickupDropSearchBg, alignItems: 'center' }}>
                    {this.TopHeader()}



                    {/* <View style={{ height: '83%' }}> */}
                        <FlatList
                        // contentContainerStyle={{height: '100%'}}
                            data={this.state.message}
                            // inverted
                            scrollEnabled
                            style={{  transform: [{ scaleY: -1 }] }}
                            // ListHeaderComponent={this.footerView()}
                            // keyboardShouldPersistTaps
                            automaticallyAdjustKeyboardInsets={true}
                            keyExtractor={(item, index) => index}
                            // showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <View style={{ width: Dimensions.get('window').width, alignItems: 'center', padding: 10, paddingBottom: 0, transform: [{ scaleY: -1 }] }}>
                                    {item.right ? this.RightBubble(item) : this.LeftBubble(item)}
                                </View>
                            )}

                        />
                    {/* </View> */}
                    {this.footerView()}
                    <CommonLoaders.ChatLoader isLoading={this.state.fetching} loaderText={'Loading... messages'} />





                </View>
            // </KeyboardAvoidingView>
        )
    }
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