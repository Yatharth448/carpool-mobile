import React from 'react'
import { View, TextInput } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import { Header } from '../../components/commomheader/CommonHeader'
import { AppFontFamily } from '../../components/constants/AppFonts'
import { ButtonPrimary } from '../../components/button/buttonPrimary'
import { hitApiToAddVehicle } from '../home/RideModal'
import Toast from 'react-native-simple-toast'
import { hitApiToAddBank } from './BankModal'

export default function AddBank({ navigation, route }) {

    const [bankName, setBankName] = React.useState('')
    const [accountNumber, setAccountNumber] = React.useState('')
    const [confirmAccountNumber, setConfirmAccountNumber] = React.useState('')
    const [ifscNumber, setIFSCNumber] = React.useState('')


    const AddBank = async () => {

        if (bankName == '') {
            Toast.show('Enter bank name');
        }
        else if (accountNumber == '') {
            Toast.show('Enter account number');
        }
        else if (accountNumber !== confirmAccountNumber) {
            Toast.show('Account number and confirm account number are not same');
        }
        else if (ifscNumber == '') {
            Toast.show('Enter ifsc code');
        }
        else {

            const result = await hitApiToAddBank(accountNumber, ifscNumber, bankName)
            console.log(result, 'add bank result')
            if (result.status) {

                Toast.show(result.message);
                navigation.goBack()
            }
        }
    }

    return (
        <View style={{ flex: 1, width: '100%', backgroundColor: AppColors.themesWhiteColor, alignItems: 'center' }}>
            <Header close={() => { navigation.goBack() }} isBack={true} text='Add Bank' />

            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>


                <View style={{ backgroundColor: AppColors.themePickupDropSearchBg, width: '95%', borderRadius: 10 }}>
                    <TextInput
                        onChangeText={text => setBankName(text)}
                        value={bankName}
                        placeholder={"Bank Name"}
                        placeholderTextColor={AppColors.themeTextGrayColor}
                        style={{ fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeBlackColor, padding: 10, width: '95%', fontSize: 14, textAlign: 'left' }}
                    // keyboardType={
                    //     Platform.OS === 'android' ? 'numeric' : 'number-pad'
                    // }
                    />
                </View>




                <View style={{ backgroundColor: AppColors.themePickupDropSearchBg, width: '95%', borderRadius: 10, marginTop: 20, marginBottom: 10 }}>
                    <TextInput
                        onChangeText={text => setAccountNumber(text)}
                        value={accountNumber}
                        placeholder={"Account Number"}
                        placeholderTextColor={AppColors.themeTextGrayColor}
                        style={{ fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeBlackColor, padding: 10, width: '95%', fontSize: 14, textAlign: 'left' }}
                    // keyboardType={
                    //     Platform.OS === 'android' ? 'numeric' : 'number-pad'
                    // }
                    />
                </View>

                <View style={{ backgroundColor: AppColors.themePickupDropSearchBg, width: '95%', borderRadius: 10, marginTop: 10, marginBottom: 10 }}>
                    <TextInput
                        onChangeText={text => setConfirmAccountNumber(text)}
                        value={confirmAccountNumber}
                        placeholder={"Confirm Account Number"}
                        placeholderTextColor={AppColors.themeTextGrayColor}
                        style={{ fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeBlackColor, padding: 10, width: '95%', fontSize: 14, textAlign: 'left' }}
                    // keyboardType={
                    //     Platform.OS === 'android' ? 'numeric' : 'number-pad'
                    // }
                    />
                </View>


                <View style={{ backgroundColor: AppColors.themePickupDropSearchBg, width: '95%', borderRadius: 10, marginTop: 10, marginBottom: 10 }}>
                    <TextInput
                        onChangeText={text => setIFSCNumber(text)}
                        value={ifscNumber}
                        placeholder={"ifsc code"}
                        placeholderTextColor={AppColors.themeTextGrayColor}
                        style={{ fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeBlackColor, padding: 10, width: '95%', fontSize: 14, textAlign: 'left' }}
                    // keyboardType={
                    //     Platform.OS === 'android' ? 'numeric' : 'number-pad'
                    // }
                    />
                </View>

                <View style={{ width: '95%', marginTop: 50 }}>

                    <ButtonPrimary
                        onPress={() => AddBank()}
                        text={'Add Bank'}
                    />
                </View>


            </View>




        </View>
    )
}
