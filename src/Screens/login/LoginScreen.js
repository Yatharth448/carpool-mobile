import React, { useEffect } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput, Pressable, Dimensions, BackHandler } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
// import { TextInput } from 'react-native-paper'
import Toast from 'react-native-simple-toast'
// import Icon from 'react-native-vector-icons/MaterialIcons'
import { hitApiForGoogleLogin, hitApiForLogin } from './loginModal'
import Storage from '../../components/localStorage/storage'
import { AppKeys } from '../../components/constants/AppKeys'
import { Checkbox, Button, Surface } from 'react-native-paper';
import { InputView } from '../../components/Input/InputView'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppFontFamily } from '../../components/constants/AppFonts'
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { ButtonPrimary } from '../../components/button/buttonPrimary'
import { CommonActions } from '@react-navigation/native';
import CommonLoaders from '../../components/loader/Loader'


export default function LoginScreen({ navigation }) {


    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [checked, setChecked] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isLoadingGoogle, setIsLoadingGoogle] = React.useState(false);
    const countryCode = '+91';


    useEffect(() => {
        // Configure Google Sign-In
        GoogleSignin.configure({
            scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
            webClientId:
                '330513389777-567cdgj32v08pt2ojmoa9iogn416kh40.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });

        BackHandler.addEventListener("hardwareBackPress", backActionHandler);

        return () => {
            // clear/remove event listener
            BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
        }

    }, [backActionHandler]);

    const backActionHandler = (async () => {


    });

    _signIn = async () => {
        try {
            setIsLoadingGoogle(true)
            await signOut()
            await GoogleSignin.hasPlayServices();
            console.log('success 1')
            // const { accessToken, idToken } = await GoogleSignin.signIn();
            const userInfo = await GoogleSignin.signIn();
            if (userInfo?.user) {

                await userGoogleLogin(userInfo)
            }
            console.log(userInfo, 'success')
            setloggedIn(true);
        } catch (error) {

            setIsLoadingGoogle(false)
            console.log(error, 'error')

            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                // alert('Cancel');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // alert('Signin in progress');
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // alert('PLAY_SERVICES_NOT_AVAILABLE');
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            //   setloggedIn(false);
            //   setuserInfo([]);
        } catch (error) {
            console.error(error);
        }
    };


    const userGoogleLogin = async (userInfo) => {

        const deviceToken = await Storage.getSavedItem('fcmToken')
        const result = await hitApiForGoogleLogin(userInfo.user.email, userInfo.user.id, deviceToken)
        console.log(result, 'login Respnse')
        if (result.status) {
            Storage.saveItem(AppKeys.SECRET_KEY, result.secret)

            if (result?.kyc_status) {
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

            Toast.showWithGravity(result.message, 2, Toast.TOP);
        }
        setIsLoadingGoogle(false)
    }

    const userLogin = async () => {
        setIsLoading(true)
        console.log('1')
        if (!email) {
            setIsLoading(false)
            // console.log('2')
            Toast.showWithGravity('Enter mobile email', 2, Toast.TOP);
        }
        else if (!password) {
            setIsLoading(false)
            Toast.showWithGravity('Enter password', 2, Toast.TOP);
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

                // navigation.dispatch(
                //     CommonActions.reset({
                //         index: 0,
                //         routes: [{ name: 'RideDrawer' }],
                //     })
                // );

            }
            else {

                Toast.showWithGravity(loginRes.message, 2, Toast.TOP);
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

            <View style={{ width: '100%', height: '20%' }}>
                <Image source={require('../../assets/logo.jpg')} style={{ marginLeft: 10, width: 200, height: 200, resizeMode: 'contain' }} />
            </View>

            <View style={{ width: '90%', justifyContent: 'center' }}>
                <Text style={{ marginLeft: 20, fontSize: 28, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsMedium }}>
                    {'Login'}
                </Text>
            </View>

            <View style={{ width: '100%', alignItems: 'center' }}>

                <Pressable onPress={() => _signIn()} style={{ width: '100%', marginTop: 40, alignItems: 'center' }}>

                    <Surface style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 47, borderRadius: 5 }} elevation={4}>

                        <View style={{ width: '30%', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/googlelogo.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                        </View>
                        <View style={{ width: '60%', justifyContent: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: AppColors.themeBlackColor, fontSize: 16, fontFamily: AppFontFamily.PopinsMedium }}>{'Sign in with Google'}</Text>
                        </View>

                    </Surface>

                </Pressable>

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
