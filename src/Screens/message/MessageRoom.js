import React, { useEffect } from 'react'
import { View, Text, RefreshControl, Image, FlatList, Dimensions, Pressable } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import { Header } from '../../components/commomheader/CommonHeader';
import moment from 'moment';
import { AppTexts } from '../../components/constants/AppTexts';
import { convertToKms } from '../../components/commonfunction/CommonFunctions';
import { hitApiToGetChatList } from './MessageModal';
import CommonLoaders from '../../components/loader/Loader';
export default function MessageRoom({ navigation, route }) {


    const [message, setMessage] = React.useState([])
    const [fetching, setFetching] = React.useState(false)
    // const { pick, drop, date, seat } = route.params;


    useEffect(() => {

        (async () => {

            //Put your logic here
            getChat()

        })();

        return () => {
            // clear/remove event listener

        }
    }, []);

    const getChat = async (fetching = '') => {

        setFetching(true)


        const result = await hitApiToGetChatList();
        console.log("msg room", result.data);
        if (result.status) {
            setMessage(result.data ?? [])

        }
        else {
            console.log(result)
        }
        setFetching(false)

    }


    const ListItemView = ({ item, index }) => {

        return (
            <View style={{ width: Dimensions.get('window').width, alignItems: 'center', marginTop: 10 }}>
                <Pressable onPress={() => navigation.navigate('Chat', { 'coTravellerId': item.cotraveller_id, 'id': item._id, 'cotravellerName': item.cotraveller_name, from: 'chat', phone: item?.cotraveller_contact })} style={{ width: '95%', backgroundColor: AppColors.themesWhiteColor, borderRadius: 10 }}>

                    <View style={{ width: '100%', justifyContent: 'center', padding: 10 }}>
                        <View style={{ width: '100%', alignItems: 'flex-start' }}>
                            {/* {console.log(item)} */}
                            <Text style={{ width: '100%', fontWeight: '700', fontSize: 16, color: AppColors.themeBlackColor }}>{(item.cotraveller_name)}</Text>
                            <Text style={{ width: '100%', marginTop: 10, fontWeight: '600', fontSize: 14, color: AppColors.themeText2Color }}>{(item.messages[item.messages.length - 1].message)}</Text>

                        </View>

                    </View>

                </Pressable>
            </View>
        )
    }

    const NoData = () =>{
        return(
            CommonLoaders.NoDataInList('No chats found', { height: 100 })
        )
    }
    return (
        <View style={{ flex: 1, width: '100%', backgroundColor: AppColors.themePickupDropSearchBg, alignItems: 'center' }}>
            <Header close={() => { navigation.goBack() }} text='Messages' isBack={true} />

            <FlatList
                data={message.length > 0 ? message : [1]}
                refreshControl={
                    <RefreshControl
                        onRefresh={() => getChat()}
                        refreshing={fetching}
                        title={'Loading...'}
                        tintColor={AppColors.themeBlackColor}
                        titleColor={AppColors.themeBlackColor}
                    />
                }
                keyExtractor={(item, index) => index}
                // ListHeaderComponent={this.headerView()}
                showsVerticalScrollIndicator={false}
                // extraData={this.state}
                // onEndReached={() => this.getCartList()}
                renderItem={
                    message.length > 0 ?
                        ListItemView : NoData
                }
            />

            {/* <CommonLoaders.ChatLoader isLoading={fetching} text={'Loading messages'} /> */}


        </View>
    )
}

