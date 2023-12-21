import React, { useEffect } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput, Pressable, Dimensions, BackHandler } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import Toast from 'react-native-simple-toast'
import Storage from '../../components/localStorage/storage'
import { AppKeys } from '../../components/constants/AppKeys'
import { InputView } from '../../components/Input/InputView'
import { AppFontFamily } from '../../components/constants/AppFonts'
import { FindRideFilterView } from '../../Screens/findridelist/FindRideComp'
import { CommonActions } from '@react-navigation/native'
import { ButtonPrimary } from '../button/buttonPrimary'
import { hitApiForAppleSignUp, hitApiForGoogleSignUp } from '../../Screens/signup/SignupModal'


export default function AddGenderMobile({ navigation, route }) {


    const [gender, setGender] = React.useState("m");
    const [mobile, setMobile] = React.useState("");
    const [selectedIndex, setIndex] = React.useState(0)
    const [isLoading, setIsLoading] = React.useState(false)
    const { email, familyName, givenName, id, photo, type } = route.params;

    useEffect(() => {

        BackHandler.addEventListener("hardwareBackPress", backActionHandler);
        setIsLoading(false)
        return () => {
            // clear/remove event listener
            BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
        }

    }, [backActionHandler]);

    const backActionHandler = (async () => {
        navigation.goBack()

    });


    const userGoogleLogin = async (userInfo) => {

        const deviceToken = await Storage.getSavedItem('fcmToken')
        // console.log(email, familyName, givenName, id, photo, deviceToken, mobile, gender, 'google sign up')
        setIsLoading(true)

        if (mobile == '') {
            Toast.show('Enter mobile');
            setIsLoading(false)
        }
        else if (gender == '') {
            Toast.show('Enter mobile');
            setIsLoading(false)
        }
        else {

            console.log(email, familyName, givenName, id, photo, deviceToken, mobile, gender, type, 'sign up data')
            const deviceToken = await Storage.getSavedItem('fcmToken')
            let result;
            if (type == 'google') {
                result = await hitApiForGoogleSignUp(email, familyName, givenName, id, photo, deviceToken, mobile, gender)
            }
            else{
                result = await hitApiForAppleSignUp(email, familyName, givenName, id, photo, deviceToken, mobile, gender)
            }
            console.log(result, 'google signup Respnse')

            if (result.status) {
                Storage.saveItem(AppKeys.SECRET_KEY, result.secret)
                navigation.navigate('KycScreen')
            }
            else {
                console.log(result, 'res')
                Toast.show(result?.message ?? 'Something went wrong');
            }
            setIsLoading(false)


        }



    }


    const onChangeMobile = (e) => {
        setMobile(e)
    }



    const setSelectedIndex = (i) => {
        if (i === 0) {
            setGender('m')
        }
        else if (i === 1) {
            setGender('f')
        }
        else {
            setGender('o')
        }
        setIndex(i)

    }


    return (
        <View style={{ flex: 1, backgroundColor: AppColors.themesWhiteColor }}>

            <View style={{ width: '100%', height: '20%' }}>
                <Image source={require('../../assets/logo.jpg')} style={{ marginLeft: 10, width: 200, height: 200, resizeMode: 'contain' }} />
            </View>

            {/* <View style={{ width: '90%', justifyContent: 'center' }}>
                <Text style={{ marginLeft: 20, fontSize: 28, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsMedium }}>
                    {'Login'}
                </Text>
            </View> */}

            <View style={{ width: '100%', alignItems: 'center' }}>

                <View style={{ width: '90%', justifyContent: 'center' }}>

                    <InputView left={require('../../assets/call.png')} headText={'Mobile Number'} placeHolder={'Your Mobile Number'} val={mobile} onChange={onChangeMobile} />

                    <View style={{ width: '98%', alignItems: 'flex-start', marginTop: 20, marginBottom: 10 }}>
                        <Text style={{ marginBottom: 10, fontSize: 16, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsRegular }}>{'Select Gender'}</Text>
                        <FindRideFilterView
                            data={[{ 'name': 'Male' }, { 'name': 'Female' }, { 'name': 'Others' }]}
                            selectedIndex={selectedIndex}
                            setSelectedIndex={setSelectedIndex}
                        />
                    </View>

                </View>
            </View>
            <View style={{ alignItems: 'center', marginTop: 30 }}>
                <ButtonPrimary
                    style={{ width: '90%' }}
                    text={'Save'}
                    onPress={() => isLoading ? console.log('already clicked') : userGoogleLogin()}
                    loader={isLoading}
                />
            </View>

        </View>
    )
}
