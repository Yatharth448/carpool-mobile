import React, { useEffect } from 'react'
import { BackHandler, Image, Platform, Pressable, Text, View } from 'react-native'
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { Surface } from 'react-native-paper';
import { AppColors } from '../constants/AppColor';
import { AppFontFamily } from '../constants/AppFonts';

export function GoogleLogin({ userData, startLoader, isLogin }) {

    useEffect(() => {
        // Configure Google Sign-In
        GoogleSignin.configure({
            scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
            webClientId:
                Platform.OS == 'android' ? '330513389777-567cdgj32v08pt2ojmoa9iogn416kh40.apps.googleusercontent.com' : '330513389777-aducc5b5g09b5ftttsa2s760a85u9lcc.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });

    }, []);

    _signIn = async () => {
        startLoader(true)
        console.log('success 1')
        try {
           
            await signOut()
            await GoogleSignin.hasPlayServices();
            console.log('success 1')
            // const { accessToken, idToken } = await GoogleSignin.signIn();
            const userInfo = await GoogleSignin.signIn();
            if (userInfo?.user) {

                // await userGoogleLogin(userInfo)
                userData({user: userInfo.user})
            }
            console.log(userInfo, 'success')
            // setloggedIn(true);
        } catch (error) {

            // setIsLoadingGoogle(false)
            console.log(error, 'error')
            userData({"error": 'error'})
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


    return (
        <Pressable onPress={() => _signIn()} style={{ width: '100%', marginTop: 40, alignItems: 'center' }}>

            <Surface style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 47, borderRadius: 5 }} elevation={4}>

                <View style={{ width: '30%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../assets/googlelogo.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                </View>
                <View style={{ width: '60%', justifyContent: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: AppColors.themeBlackColor, fontSize: 16, fontFamily: AppFontFamily.PopinsMedium }}>{isLogin ? 'Sign in with Google' : 'Sign up with Google'}</Text>
                </View>

            </Surface>

        </Pressable>
    )
}

