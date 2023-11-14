import React, { useEffect } from 'react'
import { View, TextInput, Text, FlatList, Dimensions, Image, Pressable, Alert } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import { Header } from '../../components/commomheader/CommonHeader'
import { AppFontFamily } from '../../components/constants/AppFonts'
import { ButtonPrimary } from '../../components/button/buttonPrimary'
import { hitApiToAddVehicle } from '../home/RideModal'
import Toast from 'react-native-simple-toast'
import { AppTexts } from '../../components/constants/AppTexts'
import { hitApiToGetAllBanks, hitApiToWithdrawFromWallet } from './BankModal'
import { Surface } from 'react-native-paper'
import { hitApiToGetPaymentHistory } from '../payment/PaymentModal'

export default function Withdraw({ navigation, route }) {

    const [walletAmount, setWalletAmount] = React.useState(0)
    const [amount, setAmount] = React.useState('')
    const [bankData, setBankData] = React.useState([])
    const [selIdx, setSelIdx] = React.useState(0)
    // const { walletAmount } = route.params;

    useEffect(() => {

        (async () => {


            await getPaymentHistory()
            await getBankList()


        })();

        return () => {
            // clear/remove event listener

        }
    }, []);

    const getBankList = async () => {

        const result = await hitApiToGetAllBanks()
        console.log(result, 'get bank list')
        if (result.status) {
            setBankData(result.data)
            // Toast.show(result.message);
            // navigation.navigate('FindRide', {'from': 'vehicle'})
        }
    }

    const getPaymentHistory = async () => {
        const result = await hitApiToGetPaymentHistory();
        console.log("notification", result);
        if (result.status) {
            setWalletAmount(result.data.totalAmount)

        }
        else {

        }

    }


    const selectedBank = (index) => {
        setSelIdx(index)
    }

    const withDrawBtnClick = async() => {

        if (amount < 10) {
            Alert.alert('Enter amount greater than 10')
        }
        else {

            const result = await hitApiToWithdrawFromWallet(bankData[selIdx]._id, amount)
            console.log(result, 'withdraw')
            if (result){
                Toast.show(result.message);
                await getPaymentHistory()
            }

        }

    }

    const BankList = () => {
        return (

            <>
                <View style={{ width: '95%', marginTop: 50 }}>
                    <Text style={{ color: AppColors.themeBlackColor, fontSize: 14, fontFamily: AppFontFamily.PopinsMedium }}> {'Withdraw to'}</Text>
                </View>
                <FlatList
                    data={bankData}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <Pressable
                            onPress={() => selectedBank(index)}
                            style={{ width: Dimensions.get('window').width, alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                            <Surface
                                elevation={4}
                                style={{ width: '95%', backgroundColor: AppColors.themesWhiteColor, borderRadius: 10 }}>
                                <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', padding: 15, justifyContent: 'space-between' }}>
                                    <View style={{ width: '13%', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Image
                                            source={require('../../assets/addbank.png')}
                                            style={{ width: 40, height: 40, resizeMode: 'contain' }}
                                        />
                                    </View>

                                    <View style={{ marginLeft: 20, width: '72%', justifyContent: 'flex-start' }}>
                                        <Text style={{ fontSize: 15, fontFamily: AppFontFamily.PopinsMedium, color: AppColors.themeBlackColor }}>
                                            {item.name}
                                        </Text>
                                        <Text style={{ fontSize: 13, fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeBlackColor }}>
                                            {item.account_number}
                                        </Text>
                                        <Text style={{ fontSize: 12, fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeBlackColor }}>
                                            {item.ifsc_code}
                                        </Text>
                                    </View>

                                    <View style={{ width: '15%', justifyContent: 'flex-end' }}>

                                        {selIdx == index ? <Image
                                            source={require('../../assets/dotone.png')}
                                            style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: AppColors.themePrimaryColor }}
                                        /> :
                                            null

                                        }

                                    </View>
                                </View>
                            </Surface>
                        </Pressable>
                    )}
                />
            </>
        )
    }

    return (
        <View style={{ flex: 1, width: '100%', backgroundColor: AppColors.themesWhiteColor, alignItems: 'center' }}>
            <Header close={() => { navigation.goBack() }} isBack={true} text='Withdraw' isRight={true} right={require('../../assets/addbank.png')} rightClick={() => navigation.navigate('AddBank')} />

            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>

                <View style={{ backgroundColor: AppColors.themePickupDropSearchBg, width: '95%', borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
                    <Text style={{ color: AppColors.themeBlackColor, fontSize: 14, fontFamily: AppFontFamily.PopinsMedium }}> {'Wallet Amount'}</Text>
                    <Text style={{ color: AppColors.themeBlackColor, fontSize: 14, fontFamily: AppFontFamily.PopinsMedium }}> {AppTexts.Rupee_Symbol + walletAmount}</Text>
                </View>

                <View style={{ backgroundColor: AppColors.themePickupDropSearchBg, width: '95%', borderRadius: 10, marginTop: 20 }}>
                    <TextInput
                        onChangeText={text => setAmount(text)}
                        value={amount}
                        placeholder={"Enter Amount"}
                        placeholderTextColor={AppColors.themeTextGrayColor}
                        style={{ fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeBlackColor, padding: 10, width: '95%', fontSize: 14, textAlign: 'left' }}
                    // keyboardType={
                    //     Platform.OS === 'android' ? 'numeric' : 'number-pad'
                    // }
                    />
                </View>


                {bankData.length > 0 ? <BankList /> : null}



                <Pressable onPress={() => navigation.navigate('AddBank')} style={{ width: '95%', marginTop: 40, alignItems: 'center' }}>
                    <Text style={{ color: AppColors.themePrimaryColor, fontSize: 12, fontFamily: AppFontFamily.PopinsMedium }}> {'Add Bank'}</Text>
                </Pressable>

                <View style={{ width: '95%', marginTop: 0 }}>

                    <ButtonPrimary
                        onPress={() => withDrawBtnClick()}
                        text={'Withdraw'}
                    />
                </View>


            </View>




        </View>
    )
}
