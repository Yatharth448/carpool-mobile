import React, { Component } from 'react'
import { View, Text, Image, FlatList, Dimensions, TextInput, Pressable, StyleSheet, Linking } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import moment from 'moment';
import Toast from 'react-native-simple-toast'
import messaging from '@react-native-firebase/messaging';
import { hitApiToChackeChatExist, hitApiToMessageForParticularUser, hitApiToSendMessage } from './MessageModal';
import { Surface } from 'react-native-paper';
import { AppFontFamily } from '../../components/constants/AppFonts';
import CommonLoaders from '../../components/loader/Loader';
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

    async componentWillUnmount() {
        this.messageListener();
    }
    async componentDidMount() {

        console.log(this.props.route.params, "data")
        this.setState({ id: this.props.route.params?.id })

        if (this.props.route.params?.from == 'chat') {
            const result = await hitApiToChackeChatExist(this.props.route.params?.coTravellerId)
            console.log(result, 'exist data')
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


    async getAllMsg() {


        const result = await hitApiToMessageForParticularUser(this.state.id);

        if (result.status) {

            this.setState({ message: (result.data[0]?.messages.reverse()) ?? [] })

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


            const result = await hitApiToSendMessage(this.props.route.params?.coTravellerId, msg)
            console.log(result, 'send')
            if (result.status) {
                this.setState({ text: '', id: result.data })
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
                </View>

            </View>
        )
    }


    LeftBubble(item) {
        return (
            <View style={{ width: '98%', alignItems: 'flex-start', paddingBottom: 0 }}>

                <View style={{ maxWidth: '80%', alignItems: 'flex-start', justifyContent: 'center', padding: 10, backgroundColor: AppColors.themesWhiteColor, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopRightRadius: 10 }}>
                    <View style={{ width: '100%', alignItems: 'flex-start' }}>

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
            <View style={{ flex: 1, width: '100%', backgroundColor: AppColors.themePickupDropSearchBg, alignItems: 'center' }}>
                {this.TopHeader()}

                <FlatList
                    data={this.state.message}
                    scrollEnabled
                    style={{ transform: [{ scaleY: -1 }] }}
                    automaticallyAdjustKeyboardInsets={true}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => (
                        <View style={{ width: Dimensions.get('window').width, alignItems: 'center', padding: 10, paddingBottom: 0, transform: [{ scaleY: -1 }] }}>
                            {item.right ? this.RightBubble(item) : this.LeftBubble(item)}
                        </View>
                    )}

                />
                {this.footerView()}
                <CommonLoaders.ChatLoader isLoading={this.state.fetching} loaderText={'Loading... messages'} />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    rightArrow: {
        position: "absolute",
        backgroundColor: AppColors.themePrimaryColor,
        width: 25,
        height: 25,
        bottom: -3,
        borderBottomLeftRadius: 30,
        right: -10,

    },

    rightArrowOverlap: {
        position: "absolute",
        backgroundColor: AppColors.themePickupDropSearchBg,
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomLeftRadius: 18,
        right: -20,


    },
    leftArrow: {
        position: "absolute",
        backgroundColor: AppColors.themesWhiteColor,
        width: 25,
        height: 25,
        bottom: -3,
        borderBottomRightRadius: 30,
        left: -10
    },

    leftArrowOverlap: {
        position: "absolute",
        backgroundColor: AppColors.themePickupDropSearchBg,
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomRightRadius: 18,
        left: -20

    },
})