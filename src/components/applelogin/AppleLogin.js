import React, { useEffect } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { Surface } from 'react-native-paper'
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { AppFontFamily } from '../constants/AppFonts';
import { AppColors } from '../constants/AppColor';

export default function AppleLogin({ userData, startLoader, isLogin }) {

    useEffect(() => {

        return () => {
            // clear/remove event listener
            appleAuth.Operation.LOGOUT
            return appleAuth.onCredentialRevoked(async () => {
                console.warn('If this function executes, User Credentials have been Revoked');
            })
        }

    }, []);

    const onAppleButtonPress = async () => {

        try {
            startLoader(true)
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });

            const { email, fullName, identityToken, user } = appleAuthRequestResponse;
            let data = {
                "email": email,
                "familyName": fullName.familyName,
                "givenName": fullName.givenName,
                "id": identityToken,
                "user": user,
                "photo": ''
            }
            console.log('Apple Sign-In Response:', appleAuthRequestResponse);
            return userData({user: data})
            // Use the obtained data as needed
        } catch (error) {
            if (error.code === appleAuth.Error.CANCELED) {
                console.log('User canceled Apple Sign-In.');
                return userData({"error": 'cancelled'})
            } else {
                console.error('Apple Sign-In Error:', error);
                return userData({"error": "apple sign in error"})
            }
        }
    };

    return (
        <Pressable onPress={() => onAppleButtonPress()} style={{ width: '100%', marginTop: 40, alignItems: 'center' }}>

            <Surface style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 47, borderRadius: 5 }} elevation={4}>

                <View style={{ width: '30%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../assets/apple.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                </View>
                <View style={{ width: '60%', justifyContent: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: AppColors.themeBlackColor, fontSize: 16, fontFamily: AppFontFamily.PopinsMedium }}>{isLogin ? 'Sign in with Apple' : 'Sign up with Apple'}</Text>
                </View>

            </Surface>

        </Pressable>
    )
}
