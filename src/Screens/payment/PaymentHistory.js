import React, { useEffect } from 'react'
import { View, Text, Modal, Image, FlatList, Dimensions, Pressable, Alert } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import { hitApiToGetRideList, hitApiToRequestARide } from './RideListModal';
import { Header } from '../../components/commomheader/CommonHeader';
import moment from 'moment';
import { AppTexts } from '../../components/constants/AppTexts';
import { convertToKms } from '../../components/commonfunction/CommonFunctions';
import { AppFontFamily } from '../../components/constants/AppFonts';
import { FindRideFilterView } from './FindRideComp';
import { Surface } from 'react-native-paper';
import { ButtonPrimary } from '../../components/button/buttonPrimary';
import CommonLoaders from '../../components/loader/Loader';
import { showNotification } from '../../components/notifications/LocalNotification';
import { hitApiToGetNotifications } from './NotificationModal';
import { hitApiToAddMoneyToWallet, hitApiToGetPaymentHistory } from './PaymentModal';
import Wallet from '../wallet/Wallet';
export default function PaymentHistory({ navigation, route }) {


    const [paymentData, setPaymentData] = React.useState([])
    const [data, setData] = React.useState([])
    // const { data, seat } = route.params;
    // const [selectedIndex, setIndex] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const [tab, setTab] = React.useState('all')
    const [startLoader, setStartLoader] = React.useState(false)
    const [openWallet, setOpenWallet] = React.useState(false)



    useEffect(() => {

        (async () => {


            await getPaymentHistory()


        })();

        return () => {
            // clear/remove event listener

        }
    }, []);



    const getPaymentHistory = async () => {
        setIsLoading(false)
        //Put your logic here
        const result = await hitApiToGetPaymentHistory();
        console.log("notification", result);
        if (result.status) {
            setPaymentData(result.data)
            setData(result.data.walletHistory)
        }
        else {

        }
        setIsLoading(true)
    }


    const TabPressed = (tab) => {

        setTab(tab)
        if (tab == 'all') {

            setData(paymentData.walletHistory)
        }
        else if (tab == 'spent') {

            setData(paymentData.debit)
        }
        else {
            setData(paymentData.cred)
        }

    }

    // const checkArrayLength = (type) =>{

    //     if (paymentData.length < 0) {

    //         if (type == 'all')
    //         {
    //             console.log(paymentData.walletHistory.length, 'length')
    //             return paymentData.walletHistory.length ?? ''
    //         }
    //         else if (type == 'spent')
    //         {
    //             console.log(paymentData.debit.length, 'length')
    //             return paymentData.debit.length ?? ''
    //         }
    //         else 
    //         {
    //             console.log(paymentData.cred.length, 'length')
    //             return paymentData.cred.length ?? ''
    //         }
    //     }

    // }

    const HistoryTopView = () => {
        return (
            <View style={{ width: '100%', alignItems: 'center' }}>

                <View style={{ width: '90%', alignItems: 'center', backgroundColor: AppColors.themePrimaryColor, height: 200, borderRadius: 10 }}>

                    <View style={{ width: '90%', marginTop: 5 }}>
                        <Text style={{ padding: 10, fontSize: 16, fontFamily: AppFontFamily.PopinsMedium, color: AppColors.themesWhiteColor }}>{"Available Balance: " + AppTexts.Rupee_Symbol + " " + paymentData.totalAmount}</Text>
                    </View>
                    <View style={{ width: '90%', backgroundColor: '#3972FF', borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 50 }}>

                        <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ paddingTop: 5, fontSize: 12, fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themesWhiteColor }}>{"Spent: " + AppTexts.Rupee_Symbol + " " + paymentData.debitAmount}</Text>
                        </View>

                        <View style={{ width: 1, height: 20, backgroundColor: AppColors.themesWhiteColor }}>
                        </View>

                        <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ paddingTop: 5, fontSize: 12, fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themesWhiteColor }}>{"Received: " + AppTexts.Rupee_Symbol + " " + paymentData.creditAmount}</Text>
                        </View>

                    </View>

                    {/* <Pressable onPress={() => setOpenWallet(true)} style={{ marginTop: 20, width: '90%', backgroundColor: '#3972FF', borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 50 }}> */}
                    <Pressable onPress={() => navigation.navigate('PayGateway')} style={{ marginTop: 20, width: '90%', backgroundColor: '#3972FF', borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 50 }}>
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ paddingTop: 5, fontSize: 16, fontFamily: AppFontFamily.PopinsMedium, color: AppColors.themesWhiteColor }}>{"Top Up The Balance"}</Text>
                        </View>

                    </Pressable>


                </View>

                {paymentData.walletHistory.length ?
                    <View style={{ width: '90%', borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 50, marginTop: 10 }}>

                        <Pressable onPress={() => TabPressed('all')} style={{ width: '30%', backgroundColor: tab == 'all' ? AppColors.themePrimaryColor : AppColors.themesWhiteColor, alignItems: 'center', justifyContent: 'center', borderColor: AppColors.themePrimaryColor, borderWidth: 1, borderRadius: 10, }}>
                            <Text style={{ paddingTop: 8, paddingBottom: 5, fontSize: 12, fontFamily: AppFontFamily.PopinsRegular, color: tab == 'all' ? AppColors.themesWhiteColor : AppColors.themePrimaryColor }}>{`All (${paymentData.walletHistory.length})`}</Text>
                        </Pressable>

                        <Pressable onPress={() => TabPressed('spent')} style={{ width: '32%', backgroundColor: tab == 'spent' ? AppColors.themePrimaryColor : AppColors.themesWhiteColor, alignItems: 'center', justifyContent: 'center', borderColor: AppColors.themePrimaryColor, borderWidth: 1, borderRadius: 10, }}>
                            <Text style={{ paddingTop: 8, paddingBottom: 5, fontSize: 12, fontFamily: AppFontFamily.PopinsRegular, color: tab == 'spent' ? AppColors.themesWhiteColor : AppColors.themePrimaryColor }}>{`Spent (${paymentData.debit.length})`}</Text>
                        </Pressable>

                        <Pressable onPress={() => TabPressed('received')} style={{ width: '34%', backgroundColor: tab == 'received' ? AppColors.themePrimaryColor : AppColors.themesWhiteColor, alignItems: 'center', justifyContent: 'center', borderColor: AppColors.themePrimaryColor, borderWidth: 1, borderRadius: 10, }}>
                            <Text style={{ paddingTop: 8, paddingBottom: 5, fontSize: 12, fontFamily: AppFontFamily.PopinsRegular, color: tab == 'received' ? AppColors.themesWhiteColor : AppColors.themePrimaryColor }}>{`Received (${paymentData.cred.length})`}</Text>
                        </Pressable>

                    </View> : null}

            </View>
        )
    }


    const debitCredit = (type) => {

        if (type == 'debit') {
            return "- " + AppTexts.Rupee_Symbol
        }
        else if (type == 'credit') {
            return "+ " + AppTexts.Rupee_Symbol
        }
        else {
            return "" + AppTexts.Rupee_Symbol
        }

    }

    const ListView = () => {
        return (
            <>
                <HistoryTopView />
                <FlatList
                    data={data.length > 0 ? data.reverse() : ['']}
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
                        data.length > 0 ?

                            <View style={{ width: Dimensions.get('window').width, alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                                <Surface elevation={4} style={{ width: '90%', backgroundColor: AppColors.themesWhiteColor, borderRadius: 10 }}>

                                    <View style={{ width: '90%', alignItems: 'center', flexDirection: 'row', padding: 15 }}>

                                        <View style={{ width: '13%', justifyContent: 'flex-start', alignItems: 'center' }}>

                                            <Image source={require('../../assets/Wallet.png')} style={{ width: 40, height: 40, resizeMode: 'contain', tintColor: item.type == 'debit' ? AppColors.themeButtonRed : AppColors.themePrimaryColor}} />

                                        </View>

                                        <View style={{ marginLeft: 20, width: '47%', justifyContent: 'flex-start' }}>

                                            <Text style={{ fontSize: 14, fontFamily: AppFontFamily.PopinsMedium, color: AppColors.themeBlackColor }}>{item.transaction_type}</Text>
                                            <Text style={{ fontSize: 12, fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeBlackColor }}>{moment(item.created).format('HH:mm | DD MMM YYYY')}</Text>
                                            <Text style={{ fontSize: 8, fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeBlackColor }}>{item.transaction_id}</Text>
                                        </View>

                                        <View style={{ marginLeft: 20, width: '40%', alignItems: 'flex-end' }}>

                                            <Text style={{ fontSize: 16, fontFamily: AppFontFamily.PopinsMedium, color: AppColors.themeBlackColor }}>{debitCredit(item.type) + item.amount}</Text>


                                        </View>

                                        {/* <View style={{  width: '15%', justifyContent: 'flex-start' }}>



             </View> */}

                                    </View>


                                </Surface>
                            </View>
                            :
                            CommonLoaders.NoDataInList('No transaction yet', {height: 300})
                    )}
                />

            </>
        )
    }

    const payPressed = async (amount) => {
        if (amount == '') {
            Alert.alert('enter amount')

        }
        else {
            const result = await hitApiToAddMoneyToWallet(amount)
            if (result.status) {
                await getPaymentHistory()
                setOpenWallet(false)
                Alert.alert('amount added successfully')
            }
            console.log(result)
        }

    }

    return (
        <View style={{ flex: 1, width: '100%', backgroundColor: AppColors.themePickupDropSearchBg, alignItems: 'center' }}>
            <Header close={() => { navigation.goBack()}} text='Payment History' />




            {isLoading ?

                ListView()


                : CommonLoaders.RideHistoryLoader()
            }

            <Wallet
                isLoading={openWallet}
                closePopup={() => setOpenWallet(false)}
                onPaymentPress={payPressed}

            />

        </View>
    )
}
