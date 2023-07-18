import React, { useEffect, useRef } from 'react'
import { View, Text, RefreshControl, Image, FlatList, Dimensions, TextInput, Pressable } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import { Header } from '../../components/commomheader/CommonHeader';
import moment from 'moment';
import Toast from 'react-native-simple-toast'
import { hitApiToGetChatList, hitApiToMessageForParticularUser, hitApiToSendMessage } from './MessageModal';
import { Surface } from 'react-native-paper';
export default function Chat({ navigation, route }) {

    const [message, setMessage] = React.useState([])
    const { id } = route.params;
    const [text, setText] = React.useState('')
    const [fetching, setFetching] = React.useState(false)
    const listViewRef = useRef()

    useEffect(() => {

        (async () => {

            //Put your logic here
            getAllMsg()


        })();

        return () => {
            // clear/remove event listener

        }
    }, []);

    const scrollToBottom = (msg) => {
        //OnCLick of down button we scrolled the list to bottom
       console.log(msg.length, 'length')
        listViewRef.current.scrollToOffset({ offset: msg.length*50, animated: true });
        // listViewRef?.current.scrollToOffset({ animated: false, offset:  msg.length + 5});
    };


    const getAllMsg = async (fetching = '') => {
        if (fetching) {
            setFetching(true)
        }
        const result = await hitApiToMessageForParticularUser(id);
        console.log("ride list", result.data, id);
        if (result.status) {
            setMessage(result.data[0] ?? [])
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
                getAllMsg()
            }
            else {

            }
        }

    }

    const rightBubble = (item) => {
        return (
            <View style={{ width: '100%', alignItems: item.right ? 'flex-end' : 'flex-start' }}>

                <View style={{ justifyContent: 'center', padding: 10, backgroundColor: AppColors.themesWhiteColor, borderRadius: 10 }}>
                    <View style={{ width: '100%', alignItems: item.right ? 'flex-end' : 'flex-start' }}>
                        {/* {console.log(item)} */}
                        <Text style={{ width: '100%', fontWeight: '700', fontSize: 16, color: AppColors.themeBlackColor }}>{(item.from)}</Text>
                        <Text style={{ width: '100%', marginTop: 10, fontWeight: '600', fontSize: 14, color: AppColors.themeText2Color }}>{(item.message)}</Text>

                    </View>

                </View>

            </View>
        )
    }


    return (
        <View style={{ flex: 1, width: '100%', backgroundColor: AppColors.themePickupDropSearchBg, alignItems: 'center' }}>
            <Header close={() => { navigation.goBack() }} />
            <View style={{ height: '83%' }}>
                <FlatList
                    data={message.messages}
                    refreshControl={
                        <RefreshControl
                            onRefresh={() => getAllMsg('get')}
                            refreshing={fetching}
                            title={'Loding...'}
                            tintColor={AppColors.themeBlackColor}
                            titleColor={AppColors.themeBlackColor}
                        />
                    }
                    // initialScrollIndex={message?.messages?.length ? message.messages.length - 1 : 7}
                    
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
                ref={listViewRef}
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
                <Pressable onPress={() => sendMessage(id, text)} style={{ width: '20%', height: 60, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: AppColors.themePrimaryColor, fontWeight: '700', fontSize: 16 }}>
                        {'SEND'}
                    </Text>
                </Pressable>

            </Surface>

        </View>
    )
}
