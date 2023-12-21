import React, { useEffect } from 'react'
import { Text, View, Image, TouchableOpacity, Pressable, BackHandler, Platform } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import Toast from 'react-native-simple-toast'
import { hitApiForAppleLogin, hitApiForGoogleLogin, hitApiForLogin } from './loginModal'
import Storage from '../../components/localStorage/storage'
import { AppKeys } from '../../components/constants/AppKeys'
import { InputView } from '../../components/Input/InputView'
import { AppFontFamily } from '../../components/constants/AppFonts'
import { ButtonPrimary } from '../../components/button/buttonPrimary'
import CommonLoaders from '../../components/loader/Loader'
import { GoogleLogin } from '../../components/googlelogin/GoogleLogin'
import { AppleButton } from '@invertase/react-native-apple-authentication';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import AppleLogin from '../../components/applelogin/AppleLogin'
import { hitApiToForgotPassword } from './ForgotModal'
import { Surface } from 'react-native-paper'

export default function ForgotPassword({ navigation }) {


    const [email, setEmail] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);


    useEffect(() => {

        BackHandler.addEventListener("hardwareBackPress", backActionHandler);

        return () => {
            // clear/remove event listener
            BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
        }

    }, [backActionHandler]);

    const backActionHandler = (async () => {


    });




    const sendOTP = async () => {
        setIsLoading(true)
        console.log('1')
        if (!email) {
            setIsLoading(false)
            // console.log('2')
            Toast.show('Enter email id');
        }
        else {

            const result = await hitApiToForgotPassword(email)
            setIsLoading(false)
            console.log(result, 'login Respnse')
            if (result.status) {

                navigation.navigate('ResetPassword', {'email': email})

            }
            else {

                // navigation.navigate('ResetPassword', {'email': email})
                Toast.show(result.message ?? result.error ?? "Something went wrong");
            }
            // 
            setIsLoading(false)
            console.log(result, '3')

        }

    }

    const onChangeEmail = (e) => {
        setEmail(e)
    }


    return (
        <View style={{ flex: 1, backgroundColor: AppColors.themesWhiteColor }}>

            <View style={{ width: '100%', marginTop: Platform.OS == 'android' ? 0 : 40, flexDirection: 'row', alignItems: 'center' }}>

                <Pressable onPress={() => navigation.goBack()} style={{ width: '25%', height: 70, alignItems: 'flex-start', paddingLeft: 10, justifyContent: 'center' }}>
                    <Surface style={{ backgroundColor: AppColors.themesWhiteColor, marginLeft: 5, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} elevation={4}>
                        <Image source={require('../../assets/bckarrow.png')} style={{ width: 40, height: 40 }} />
                    </Surface>
                </Pressable>

                <View style={{ width: '50%', height: 60, alignItems: 'center', paddingRight: 20, justifyContent: 'center' }}>
                    <Text style={{ fontFamily: AppFontFamily.PopinsMedium, fontSize: 18, color: AppColors.themeBlackColor }}>{'Forgot Password'}</Text>
                </View>
                <View style={{ width: '25%', height: 60, alignItems: 'center', paddingRight: 20, justifyContent: 'center' }}>

                </View>

            </View>

            <View style={{ width: '100%', height: 80, marginTop: 10 }}>
                <Image source={require('../../assets/logo.jpg')} style={{ marginLeft: 10, width: 200, height: 100, resizeMode: 'contain' }} />
            </View>

            <View style={{ width: '100%', marginTop: 10, alignItems: 'center' }}>
                <Text style={{ width: '90%', fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeBlackColor, fontSize: 13, textAlign: 'center' }}>
                    {`Uh-oh! It happens to the best of us. If you've forgotten your password, don't worry – we've got your back. Just enter the email address associated with your account below, and we'll send you an OTP to reset your password. Easy peasy!`}
                </Text>
            </View>

            <View style={{ width: '100%', alignItems: 'center' }}>

                <View style={{ width: '90%', justifyContent: 'center' }}>

                    <InputView left={require('../../assets/sms.png')} headText={'Email Id'} placeHolder={'Enter email id'} val={email} onChange={onChangeEmail} />

                    <View style={{ alignItems: 'center', marginTop: 30 }}>
                        <ButtonPrimary
                            text={'Submit'}
                            onPress={() => isLoading ? console.log('already clicked') : sendOTP()}
                            loader={isLoading}
                        />
                    </View>
                </View>
            </View>

        </View>
    )
}
