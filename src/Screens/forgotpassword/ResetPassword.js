import React, { useEffect } from 'react'
import { Text, View, Image, TouchableOpacity, Pressable, BackHandler, Platform } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import Toast from 'react-native-simple-toast'
import { hitApiForAppleLogin, hitApiForGoogleLogin, hitApiForLogin } from './loginModal'
import Storage from '../../components/localStorage/storage'
import { AppKeys } from '../../components/constants/AppKeys'
import { InputView } from '../../components/Input/InputView'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppFontFamily } from '../../components/constants/AppFonts'
import { ButtonPrimary } from '../../components/button/buttonPrimary'
import CommonLoaders from '../../components/loader/Loader'
import { GoogleLogin } from '../../components/googlelogin/GoogleLogin'
import { AppleButton } from '@invertase/react-native-apple-authentication';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import AppleLogin from '../../components/applelogin/AppleLogin'
import { hitApiToForgotVerify } from './ForgotModal'
import { Surface } from 'react-native-paper'

export default function ResetPassword({ navigation, route }) {

    const { email } = route.params;
    const [otp, setOTP] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [showNewPassword, setShowNewPassword] = React.useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(true);

    useEffect(() => {

        BackHandler.addEventListener("hardwareBackPress", backActionHandler);

        return () => {
            // clear/remove event listener
            BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
        }

    }, [backActionHandler]);

    const backActionHandler = (async () => {


    });




    const resetOTP = async () => {
        setIsLoading(true)
        console.log('1')
        if (!otp) {
            setIsLoading(false)
            // console.log('2')
            Toast.show('Invalid otp');
        }
        else  if (!newPassword) {
            setIsLoading(false)
            // console.log('2')
            Toast.show('enter new password');
        }
        else  if (!confirmPassword) {
            setIsLoading(false)
            // console.log('2')
            Toast.show('enter confirm password');
        }
        else  if (newPassword != confirmPassword) {
            setIsLoading(false)
            // console.log('2')
            Toast.show('new password and confirm password not matched');
        }
        else {

            const result = await hitApiToForgotVerify(email, otp, newPassword)
            setIsLoading(false)
            console.log(result, 'login Respnse')
            if (result.status) {

               navigation.pop(2)

            }
            else {
                // navigation.pop(2)
                Toast.show(result.message ?? result.error ?? "Something went wrong");
            }
            // 
            setIsLoading(false)
            console.log(result, '3')

        }

    }

    const onChangeOTP = (e) => {
        setOTP(e)
    }

    const onChangeNewPassword = (e) => {
        setNewPassword(e)
    }

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e)
    }


    const rightClick = (e) => {
        setShowNewPassword(!showNewPassword)
    }
    const rightClick2 = (e) => {
        setShowConfirmPassword(!showConfirmPassword)
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
                    <Text style={{ fontFamily: AppFontFamily.PopinsMedium, fontSize: 18, color: AppColors.themeBlackColor }}>{'Reset Password'}</Text>
                </View>
                <View style={{ width: '25%', height: 60, alignItems: 'center', paddingRight: 20, justifyContent: 'center' }}>

                </View>

            </View>

            <View style={{ width: '100%', height: 80, marginTop: 10 }}>
                <Image source={require('../../assets/logo.jpg')} style={{ marginLeft: 10, width: 200, height: 100, resizeMode: 'contain' }} />
            </View>

            <View style={{ width: '100%', alignItems: 'center' }}>

                <View style={{ width: '90%', justifyContent: 'center' }}>

                    <InputView left={require('../../assets/sms.png')} headText={'OTP'} placeHolder={'Enter OTP'} val={otp} onChange={onChangeOTP} />
                    <InputView headText={'New Password'} placeHolder={'Enter new password'} val={newPassword} onChange={onChangeNewPassword} right={showNewPassword ? 'eye-off-outline' : 'eye-outline'} rightClick={rightClick} secureText={showNewPassword} />
                    <InputView headText={'Confirm Password'} placeHolder={'Enter confirm password'} val={confirmPassword} onChange={onChangeConfirmPassword} right={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} rightClick={rightClick2} secureText={showConfirmPassword} />

                    <View style={{ alignItems: 'center', marginTop: 30 }}>
                        <ButtonPrimary
                            text={'Submit'}
                            onPress={() => isLoading ? console.log('already clicked') : resetOTP()}
                            loader={isLoading}
                        />
                    </View>
                </View>
            </View>

        </View>
    )
}
