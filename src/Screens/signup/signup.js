import React from 'react'
import { Text, View, Image, TouchableOpacity, TextInput, Pressable, Dimensions } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
// import { TextInput } from 'react-native-paper'
import Toast from 'react-native-simple-toast'
// import Icon from 'react-native-vector-icons/MaterialIcons'
import { hitApiForLogin } from './loginModal'
import Storage from '../../components/localStorage/storage'
import { AppKeys } from '../../components/constants/AppKeys'
import { Checkbox, Button, Surface } from 'react-native-paper';
import { InputView } from '../../components/Input/InputView'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppFontFamily } from '../../components/constants/AppFonts'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { ButtonPrimary } from '../../components/button/buttonPrimary'
import { ScrollView } from 'react-native-gesture-handler'
import { hitApiForSignUp } from './SignupModal'
import { FindRideFilterView } from '../findridelist/FindRideComp'
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Configure Google Sign-In
GoogleSignin.configure({
    // webClientId is only required for Android
    webClientId: '275128898778-i0e4ir4972quag1n2r32ut3iasr8fu0k.apps.googleusercontent.com',
    offlineAccess: true, // if you want to access Google API on behalf of the user
});
export default function SignupScreen({ navigation }) {

    const [fullName, setFullName] = React.useState("");
    const [mobile, setMobile] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [checked, setChecked] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [selectedIndex, setIndex] = React.useState(0)
    const [gender, setGender] = React.useState('m')
    const countryCode = '+91';



    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo, 'userInfo');
            // Handle successful sign-in (e.g., store user info in state, navigate to another screen)
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // User cancelled the sign-in process
                console.log('Sign-in process cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // Operation (e.g., sign-in) is in progress already
                console.log('Operation in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // Play Services not available or outdated
                console.log('Play Services not available');
            } else {
                console.log('Error:', error);
            }
        }
    }

    const userLogin = async () => {

        console.log('1')
        if (!email) {
            console.log('2')
            Toast.showWithGravity('Enter mobile number', 2, Toast.TOP);
        }
        else {

            const loginRes = await hitApiForSignUp(fullName, email, password, mobile, gender)

            // navigation.navigate('OTPScreen', { email: email, secret: '' })
            if (loginRes.status) {
                // Storage.saveItem(AppKeys.SECRET_KEY, loginRes.secret)
                navigation.navigate('OTPScreen', { email: email, secret: loginRes.secret })
            }
            else {
                Toast.showWithGravity(loginRes.message, 2, Toast.TOP);
            }
            //    
            console.log(loginRes, '3')

        }


    }





    const onChangeFullName = (e) => {
        setFullName(e)
    }

    const onChangeEmail = (e) => {
        setEmail(e)
    }


    const onChangeMobile = (e) => {
        setMobile(e)
    }
    const onChangePassword = (e) => {
        setPassword(e)
    }

    const rightClick = (e) => {
        setShowPassword(!showPassword)
    }


    const setSelectedIndex = (i) => {
        if (i === 0) {
            setGender('m')
        }
        else if (i === 0) {
            setGender('f')
        }
        else {
            setGender('o')
        }
        setIndex(i)

    }

    return (
        <View style={{ flex: 1, backgroundColor: AppColors.themesWhiteColor }}>
            <ScrollView>
                <View style={{ width: '100%', height: 120 }}>
                    <Image source={require('../../assets/logo.png')} style={{ width: '50%', marginTop: '5%', resizeMode: 'contain' }} />
                </View>

                <View style={{ width: '100%', alignItems: 'center' }}>
                    <View style={{ width: '90%', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 26, fontWeight: 'bold', color: AppColors.themeBlackColor }}>
                            {'Sign up'}
                        </Text>
                        <InputView headText={'Full Name'} placeHolder={'Enter Full Name'} val={fullName} onChange={onChangeFullName} />
                        <InputView left={require('../../assets/call.png')} headText={'Mobile Number'} placeHolder={'Your Mobile Number'} val={mobile} onChange={onChangeMobile} />
                        <InputView left={require('../../assets/sms.png')} headText={'E-mail'} placeHolder={'Your email id'} val={email} onChange={onChangeEmail} />
                        <InputView headText={'Password'} placeHolder={'Enter Password'} val={password} onChange={onChangePassword} right={showPassword ? 'eye-off-outline' : 'eye-outline'} rightClick={rightClick} secureText={showPassword} />
                        <View style={{ width: '98%', alignItems: 'flex-start', marginTop: 20, marginBottom: 10 }}>
                            <Text style={{ marginBottom: 10, fontSize: 16, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsRegular }}>{'Select Gender'}</Text>
                            <FindRideFilterView
                                data={[{ 'name': 'Male' }, { 'name': 'Female' }, { 'name': 'Others' }]}
                                selectedIndex={selectedIndex}
                                setSelectedIndex={setSelectedIndex}
                            />
                        </View>
                        <View style={{ width: '100%', alignItems: 'center', height: 50, marginTop: 10, marginBottom: 10 }}>
                            <TouchableOpacity onPress={() => userLogin()} style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: AppColors.themeTextGrayColor }}>{"By signing up you agree to our"}
                                    <Text style={{ fontSize: 14, color: AppColors.themeText2Color }}>{' Terms & Condition'}</Text>
                                    <Text style={{ fontSize: 14, color: AppColors.themeTextGrayColor }}>{' and'}</Text>
                                    <Text style={{ fontSize: 14, color: AppColors.themeText2Color }}>{' Privacy Policy.*'}</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ alignItems: 'center', marginTop: 10 }}>
                            <ButtonPrimary
                                text={'Request OTP'}
                                onPress={() => userLogin()}
                                loader={false}
                            />
                        </View>
                    </View>
                </View>

                <View style={{ width: '100%', marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '25%', height: 2, backgroundColor: AppColors.themeCardBorderColor }} />
                        <Text style={{ color: AppColors.themeCardBorderColor, fontSize: 16, fontFamily: AppFontFamily.PopinsMedium }}>{'   or continue with   '}</Text>
                        <View style={{ width: '25%', height: 2, backgroundColor: AppColors.themeCardBorderColor }} />

                    </View>
                </View>
                <Pressable onPress={() => signIn()} style={{ width: '100%', marginTop: 20, alignItems: 'center' }}>

                    <Surface style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 47, borderRadius: 5 }} elevation={2}>

                        <View style={{ width: '30%', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/googlelogo.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                        </View>
                        <View style={{ width: '60%', justifyContent: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: AppColors.themeCardBorderColor, fontSize: 16, fontFamily: AppFontFamily.PopinsMedium }}>{'Sign up using Google'}</Text>
                        </View>

                    </Surface>

                </Pressable>

                <View style={{ width: '100%', alignItems: 'center', height: 50 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, color: AppColors.themeTextGrayColor }}>{"Already signed up ?"}
                            <Text style={{ fontSize: 16, color: AppColors.themePrimaryColor }}>{' Login'}</Text>
                        </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView >
        </View >
    )
}
