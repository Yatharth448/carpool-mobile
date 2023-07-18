import React, { useEffect } from 'react'
import { Text, View, Image, TouchableOpacity, Platform, Pressable } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import TextInputView from '../../components/Input/TextInputView';
import DateInput from '../../components/Input/DateInput';
import moment from 'moment';
import Toast from 'react-native-simple-toast'
import { hitApiToGetProfile, hitApiToUpdateProfile } from './ProfileModal';
import { Header } from '../../components/commomheader/CommonHeader';
export default function ProfileScreen({ navigation }) {

    const [fullName, setFullName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [mobile, setMobile] = React.useState("");
    const [date, setDate] = React.useState(new Date())
    const [open, setOpen] = React.useState(false)
    const [selectedDate, setSelectedDate] = React.useState('Select DOB')

    useEffect(() => {

        (async () => {

            // console.log(routeData, 'new data')

            const result = await hitApiToGetProfile()
            console.log(result, 'abc')

            if (result.status) {
                const date2 = new Date(result.data.date_of_birth)
                console.log(date2, 'date 2')
                setFullName(result.data.name)
                setEmail(result.data.email)
                setMobile(result.data.contact_number)
                setSelectedDate(moment(date2).format('DD/MM/YYYY'))
            }
            else {
                Toast.showWithGravity(result.message ?? 'something went wrong', 2, Toast.TOP);
            }

        })();

        return () => {
            // clear/remove event listener

        }
    }, []);


    const setName = (text) => {
        setFullName(text)
    }

    const setEmailId = (text) => {
        setEmail(text)
    }

    const onConfirm = (date) => {
        setOpen(false)
        setDate(date)

        setSelectedDate(moment(date).format('DD/MM/YYYY'))

    }
    const onCancel = () => {
        setOpen(false)
    }

    const openDatePicker = (date) => {

        setOpen(true)
        // console.log(date, 'date')
    }

    const saveAndContinue = async () => {

        try {


            if (!fullName) {
                console.log('2')
                Toast.showWithGravity('Enter full name', 2, Toast.TOP);
            }
            else if (!email) {
                console.log('2')
                Toast.showWithGravity('Enter email', 2, Toast.TOP);
            }
            else if (!date) {
                console.log('2')
                Toast.showWithGravity('Select Date', 2, Toast.TOP);
            }
            else {

                const accountRes = await hitApiToUpdateProfile(fullName, email, date)

                if (accountRes.status) {
                    // Storage.saveItem(AppKeys.SECRET_KEY, loginRes.secret)
                    navigation.goBack()
                }
                else {
                    Toast.showWithGravity(loginRes.message, 2, Toast.TOP);
                }
                //    
            }
        }
        catch (error) {

        }

    }



    return (
        <View style={{ flex: 1, backgroundColor: AppColors.themePrimaryColor }}>

            <Header close={() => { navigation.goBack() }} text='Profile' />

            <View style={{ alignItems: 'center', backgroundColor: AppColors.themePickupDropSearchBg, width: '100%', height: Platform.OS == 'android' ? '92%' : '84%' }}>

                <View style={{ width: '96%', backgroundColor: AppColors.themesWhiteColor, borderRadius: 10, marginTop: 10 }}>

                    <View style={{ alignItems: 'center', flexDirection: 'row', width: '100%' }}>

                        <View style={{ width: '80%', paddingLeft: 10 }}>
                            <Text style={{ fontSize: 24, color: AppColors.themeBlackColor, fontWeight: '700' }}>
                                {fullName}
                            </Text>
                            <Text style={{ fontSize: 16, color: AppColors.themeText2Color, fontWeight: '700' }}>
                                {'55 y/o'}
                            </Text>

                        </View>

                        <View style={{ width: '20%', alignItems: 'center', paddingRight: 20 }}>
                            <Image source={require('../../assets/otp.png')} style={{ borderColor: AppColors.themeCardBorderColor, borderRadius: 40, borderWidth: 2, width: 80, height: 80, resizeMode: 'contain' }} />
                        </View>

                    </View>

                    <View style={{ width: '100%', paddingLeft: 10 }}>

                        <TouchableOpacity onPress={() => console.log('Add vehicle')} style={{ width: '96%', height: 40, borderRadius: 20, alignItems: 'center', flexDirection: 'row' }}>
                            <Image source={require('../../assets/add.png')} style={{ borderColor: AppColors.themeCardBorderColor, borderRadius: 10, borderWidth: 2, width: 20, height: 20, resizeMode: 'contain' }} />
                            <Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: '600', color: AppColors.themePrimaryColor }}>{'Edit peronal detail'}</Text>
                        </TouchableOpacity>


                    </View>

                </View>

                <View style={{ width: '96%', backgroundColor: AppColors.themesWhiteColor, borderRadius: 10, marginTop: 10 }}>

                    <View style={{ alignItems: 'center', width: '100%' }}>

                        <View style={{ width: '100%', padding: 10 }}>
                            <Text style={{ fontSize: 24, color: AppColors.themeBlackColor, fontWeight: '700' }}>
                                {'Verify your profile'}
                            </Text>
                            {/* <Text style={{ fontSize: 16, color: AppColors.themeText2Color, fontWeight: '700' }}>
                                {'55 y/o'}
                            </Text> */}

                        </View>

                    </View>

                    <View style={{ width: '100%', paddingLeft: 10 }}>

                        <TouchableOpacity onPress={() => console.log('Add vehicle')} style={{ width: '96%', height: 40, borderRadius: 20, alignItems: 'center', flexDirection: 'row' }}>
                            <Image source={require('../../assets/add.png')} style={{ borderColor: AppColors.themeCardBorderColor, borderRadius: 10, borderWidth: 2, width: 20, height: 20, resizeMode: 'contain' }} />
                            <Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: '600', color: AppColors.themePrimaryColor }}>{'Verify your Govt. ID'}</Text>
                        </TouchableOpacity>



                    </View>
                    <View style={{ width: '100%', paddingLeft: 10 }}>

                        <TouchableOpacity onPress={() => console.log('Add vehicle')} style={{ width: '96%', height: 40, borderRadius: 20, alignItems: 'center', flexDirection: 'row' }}>
                            <Image source={require('../../assets/add.png')} style={{ borderColor: AppColors.themeCardBorderColor, borderRadius: 10, borderWidth: 2, width: 20, height: 20, resizeMode: 'contain' }} />
                            <Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: '600', color: AppColors.themePrimaryColor }}>{'Confirm email ' + email}</Text>
                        </TouchableOpacity>



                    </View>
                    <View style={{ width: '100%', paddingLeft: 10 }}>

                        <TouchableOpacity onPress={() => console.log('Add vehicle')} style={{ width: '96%', height: 40, borderRadius: 20, alignItems: 'center', flexDirection: 'row' }}>
                            <Image source={require('../../assets/checkblue.png')} style={{ borderColor: AppColors.themeCardBorderColor, borderRadius: 10, borderWidth: 2, width: 20, height: 20, resizeMode: 'contain' }} />
                            <Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: '600', color: AppColors.themePrimaryColor }}>{mobile}</Text>
                        </TouchableOpacity>



                    </View>

                </View>



                <View style={{ width: '96%', backgroundColor: AppColors.themesWhiteColor, borderRadius: 10, marginTop: 10 }}>

                    <View style={{ alignItems: 'center', width: '100%' }}>

                        <View style={{ width: '100%', padding: 10 }}>
                            <Text style={{ fontSize: 24, color: AppColors.themeBlackColor, fontWeight: '700' }}>
                                {'About you'}
                            </Text>
                            {/* <Text style={{ fontSize: 16, color: AppColors.themeText2Color, fontWeight: '700' }}>
                                {'55 y/o'}
                            </Text> */}

                        </View>

                    </View>

                    <View style={{ width: '100%', paddingLeft: 10 }}>

                        <TouchableOpacity onPress={() => console.log('Add vehicle')} style={{ width: '96%', height: 40, borderRadius: 20, alignItems: 'center', flexDirection: 'row' }}>
                            <Image source={require('../../assets/add.png')} style={{ borderColor: AppColors.themeCardBorderColor, borderRadius: 10, borderWidth: 2, width: 20, height: 20, resizeMode: 'contain' }} />
                            <Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: '600', color: AppColors.themePrimaryColor }}>{'Add a mini bio'}</Text>
                        </TouchableOpacity>



                    </View>
                    <View style={{ width: '100%', paddingLeft: 10 }}>

                        <TouchableOpacity onPress={() => console.log('Add vehicle')} style={{ width: '96%', height: 40, borderRadius: 20, alignItems: 'center', flexDirection: 'row' }}>
                            <Image source={require('../../assets/add.png')} style={{ borderColor: AppColors.themeCardBorderColor, borderRadius: 10, borderWidth: 2, width: 20, height: 20, resizeMode: 'contain' }} />
                            <Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: '600', color: AppColors.themePrimaryColor }}>{'Add travel preferences'}</Text>
                        </TouchableOpacity>



                    </View>

                </View>




                <View style={{ width: '96%', backgroundColor: AppColors.themesWhiteColor, borderRadius: 10, marginTop: 10 }}>

                    <View style={{ alignItems: 'center', width: '100%' }}>

                        <View style={{ width: '100%', padding: 10 }}>
                            <Text style={{ fontSize: 24, color: AppColors.themeBlackColor, fontWeight: '700' }}>
                                {'Vehicles'}
                            </Text>
                            {/* <Text style={{ fontSize: 16, color: AppColors.themeText2Color, fontWeight: '700' }}>
                                {'55 y/o'}
                            </Text> */}

                        </View>

                    </View>

                    <View style={{ width: '100%', paddingLeft: 10 }}>

                        <TouchableOpacity onPress={() => console.log('Add vehicle')} style={{ width: '96%', height: 40, borderRadius: 20, alignItems: 'center', flexDirection: 'row' }}>
                            <Image source={require('../../assets/add.png')} style={{ borderColor: AppColors.themeCardBorderColor, borderRadius: 10, borderWidth: 2, width: 20, height: 20, resizeMode: 'contain' }} />
                            <Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: '600', color: AppColors.themePrimaryColor }}>{'Add vehicle'}</Text>
                        </TouchableOpacity>



                    </View>

                </View>


                <View style={{ alignItems: 'center', width: '96%', marginTop: 35 }}>

                    <TouchableOpacity onPress={() => LogoutAlert(navigation)} style={{ width: '55%', height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: AppColors.themeBlackColor }}>{'Logout'}</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}
