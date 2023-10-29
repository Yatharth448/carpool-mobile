import React, { useEffect } from 'react'
import { Text, View, Image, TouchableOpacity, Pressable, BackHandler } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import Toast from 'react-native-simple-toast'
import { hitApiForGoogleLogin, hitApiForLogin } from './loginModal'
import Storage from '../../components/localStorage/storage'
import { AppKeys } from '../../components/constants/AppKeys'
import { InputView } from '../../components/Input/InputView'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppFontFamily } from '../../components/constants/AppFonts'
import { ButtonPrimary } from '../../components/button/buttonPrimary'
import CommonLoaders from '../../components/loader/Loader'
import { GoogleLogin } from '../../components/googlelogin/GoogleLogin'


export default function LoginScreen({ navigation }) {


    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [checked, setChecked] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isLoadingGoogle, setIsLoadingGoogle] = React.useState(false);


    useEffect(() => {

        BackHandler.addEventListener("hardwareBackPress", backActionHandler);

        return () => {
            // clear/remove event listener
            BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
        }

    }, [backActionHandler]);

    const backActionHandler = (async () => {


    });

    const startLoader = (start) => {
        setIsLoadingGoogle(start)
    }

    const googleData = (userInfo) => {
        console.log(userInfo, 'google')
        setIsLoadingGoogle(true)
        if (userInfo?.user) {
            userGoogleLogin(userInfo)
           
        }
        else {
            console.log(userInfo, 'google error')
        }
        setIsLoadingGoogle(false)
    }


    const userGoogleLogin = async (userInfo) => {

        const deviceToken = await Storage.getSavedItem('fcmToken')
        const result = await hitApiForGoogleLogin(userInfo.user.email, userInfo.user.id, deviceToken)
        console.log(result, 'login Respnse')
        if (result.status) {
            Storage.saveItem(AppKeys.SECRET_KEY, result.secret)

            if (result?.kyc_status == 1 || result?.kyc_status == 2) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'RideDrawer' }],
                })
            }
            else {
                navigation.navigate('KycScreen')

            }

        }
        else {
            if (result.message == 'User Doest not exist with the given email') {
                userGoogleSignup(userInfo.user)
            }
            else {

                Toast.show(result.message ?? "");
            }
        }
        setIsLoadingGoogle(false)
    }


    const userGoogleSignup = async (userInfo) => {

        if (userInfo) {
          
            if (!userInfo?.gender || !userInfo?.mobile) {
                navigation.navigate('AddGenderMobile', { "email": userInfo?.email, 'familyName': userInfo?.familyName, 'givenName': userInfo?.givenName, 'id': userInfo?.id, 'photo': userInfo?.photo })
            }
            else {

                navigation.navigate('KycScreen')
            }
        }
        else {

            Toast.show(result.message ?? "");
        }
        setIsLoadingGoogle(false)

    }

    const userLogin = async () => {
        setIsLoading(true)
        console.log('1')
        if (!email) {
            setIsLoading(false)
            // console.log('2')
            Toast.show('Enter email id');
        }
        else if (!password) {
            setIsLoading(false)
            Toast.show('Enter password');
        }
        else {

            const deviceToken = await Storage.getSavedItem('fcmToken')
            const loginRes = await hitApiForLogin(email, password, deviceToken)
            setIsLoading(false)
            console.log(loginRes, 'login Respnse')
            if (loginRes.status) {
                Storage.saveItem(AppKeys.SECRET_KEY, loginRes.secret)

                if (loginRes?.kyc_status) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'RideDrawer' }],
                    })
                }
                else {
                    navigation.navigate('KycScreen')

                }

            }
            else {

                Toast.show(loginRes.message ?? loginRes.error ?? "Something went wrong");
            }
            // 
            setIsLoading(false)
            console.log(loginRes, '3')

        }

    }

    const onChangeEmail = (e) => {
        setEmail(e)
    }

    const onChangePassword = (e) => {
        setPassword(e)
    }

    const rightClick = (e) => {
        setShowPassword(!showPassword)
    }

    return (
        <View style={{ flex: 1, backgroundColor: AppColors.themesWhiteColor }}>

            <View style={{ width: '100%', height: 80, marginTop: 30 }}>
                <Image source={require('../../assets/logo.jpg')} style={{ marginLeft: 10, width: 200, height: 100, resizeMode: 'contain' }} />
            </View>

            <View style={{ width: '100%', alignItems: 'center' }}>

                <GoogleLogin userData={googleData} startLoader={startLoader} isLogin={true}/>

                <View style={{ width: '100%', marginTop: 40 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '22%', height: 2, backgroundColor: AppColors.themePrimaryColor }} />
                        <Text style={{ color: AppColors.themePrimaryColor, fontSize: 16, fontFamily: AppFontFamily.PopinsMedium }}>{'   or continue with   '}</Text>
                        <View style={{ width: '22%', height: 2, backgroundColor: AppColors.themePrimaryColor }} />

                    </View>
                </View>

                <View style={{ width: '90%', justifyContent: 'center' }}>

                    <InputView left={require('../../assets/sms.png')} headText={'Email Id'} placeHolder={'Enter email id'} val={email} onChange={onChangeEmail} />
                    <InputView headText={'Password'} placeHolder={'Enter Password'} val={password} onChange={onChangePassword} right={showPassword ? 'eye-off-outline' : 'eye-outline'} rightClick={rightClick} secureText={showPassword} />

                    <Pressable onPress={() => setChecked(!checked)} style={{ width: '100%', flexDirection: 'row', alignItems: 'center', height: 40, marginTop: 10 }}>

                        <Icon name={checked ? 'checkbox-outline' : 'checkbox-blank-outline'} size={24} color={checked ? AppColors.themePrimaryColor : AppColors.themeCardBorderColor} />
                        <Text style={{ marginLeft: 10, fontSize: 16, color: AppColors.themeTextGrayColor }}>Remember Me</Text>

                    </Pressable>

                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <ButtonPrimary
                            text={'Login'}
                            onPress={() => isLoading ? console.log('already clicked') : userLogin()}
                            loader={isLoading}
                        />
                    </View>
                </View>
            </View>

            <View style={{ width: '100%', alignItems: 'center', height: 50 }}>
                <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')} style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, color: AppColors.themeTextGrayColor }}>{"Don't have an account? "}
                        <Text style={{ fontSize: 16, color: AppColors.themePrimaryColor }}>{' Signup'}</Text>
                    </Text>
                </TouchableOpacity>
            </View>

            <CommonLoaders.startLoader isLoading={isLoadingGoogle} />
        </View>
    )
}
