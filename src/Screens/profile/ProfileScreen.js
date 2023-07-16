import React, { useEffect } from 'react'
import { Text, View, Image, TouchableOpacity, Platform, Pressable } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import TextInputView from '../../components/Input/TextInputView';
import DateInput from '../../components/Input/DateInput';
import moment from 'moment';
import Toast from 'react-native-simple-toast'
import { hitApiToGetProfile, hitApiToUpdateProfile } from './ProfileModal';
export default function ProfileScreen({ navigation }) {

    const [fullName, setFullName] = React.useState("");
    const [email, setEmail] = React.useState("");
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

            <View style={{ width: '100%', height: Platform.OS == 'android' ? '10%' : '16%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '100%', flexDirection: 'row', marginTop: Platform.OS == 'android' ? 0 : '12%', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Pressable onPress={()=> navigation.goBack()} style={{ width: '50%', height: 50, alignItems: 'flex-start', paddingLeft: 20, justifyContent: 'center' }}>

                        <Image source={require('../../assets/close.png')} style={{ width: 20, height: 20 }} />
                    </Pressable>
                    <Pressable style={{ width: '50%', height: 50, alignItems: 'flex-end', paddingRight: 20, justifyContent: 'center' }}>
                        {/* <Image source={require('../../assets/profile.png')} style={{ width: 30, height: 30 }} /> */}
                    </Pressable>

                </View>
            </View>

            <View style={{ alignItems: 'center', backgroundColor: AppColors.themesWhiteColor, width: '100%', height: Platform.OS == 'android' ? '90%' : '84%', borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
                <View style={{ alignItems: 'center', width: '96%', marginTop: 35 }}>

                    <View style={{ width: '90%', height: '10%' }}>
                        <Text style={{ fontSize: 28, fontWeight: '700', color: AppColors.themeBlackColor }}>Profile</Text>
                    </View>

                    <View style={{ width: '90%', height: '55%' }}>

                        {TextInputView('', 'Full Name', fullName, setName)}
                        {TextInputView('', 'Email', email, setEmailId)}
                        {DateInput(open, date, onConfirm, onCancel, openDatePicker, selectedDate)}
                        {/* {TextInputView('', 'Phone number', fullName, setName)} */}
                    </View>

                    <View style={{ alignItems: 'center', width: '90%', height: '35%', justifyContent: 'center' }}>

                        <TouchableOpacity onPress={() => saveAndContinue()} style={{ backgroundColor: AppColors.themePrimaryColor, width: '55%', height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 15, fontWeight: '600', color: AppColors.themesWhiteColor }}>{'Update'}</Text>
                        </TouchableOpacity>

                        {/* <View style={{ alignItems: 'center', marginTop: 40 }}>

                            <Text style={{ fontSize: 14, fontWeight: '400', textAlign: 'center', color: AppColors.themeTextGrayColor }}>
                                {"Having trouble?"}
                                <Text style={{ fontSize: 14, fontWeight: '600', textAlign: 'center', color: AppColors.themePrimaryColor }}>
                                    {" Get help"}
                                </Text>
                            </Text>

                        </View> */}

                    </View>

                </View>
            </View>
        </View>
    )
}
