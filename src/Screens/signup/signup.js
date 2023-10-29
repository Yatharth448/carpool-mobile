import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import Toast from 'react-native-simple-toast'
import { InputView } from '../../components/Input/InputView'
import { AppFontFamily } from '../../components/constants/AppFonts'
import { ButtonPrimary } from '../../components/button/buttonPrimary'
import { ScrollView } from 'react-native-gesture-handler'
import { hitApiForSignUp } from './SignupModal'
import { FindRideFilterView } from '../findridelist/FindRideComp'
import CommonLoaders from '../../components/loader/Loader'
import { GoogleLogin } from '../../components/googlelogin/GoogleLogin'


export default function SignupScreen({ navigation }) {

    const [fullName, setFullName] = React.useState("");
    const [mobile, setMobile] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(true);
    const [selectedIndex, setIndex] = React.useState(0)
    const [gender, setGender] = React.useState('m')
    const [isLoading, setIsLoading] = React.useState(false);
    const [isLoadingGoogle, setIsLoadingGoogle] = React.useState(false);



    const startLoader = (start) => {
        setIsLoadingGoogle(start)
    }

    const googleData = (userInfo) => {
        console.log(userInfo, 'google')
        setIsLoadingGoogle(true)
        if (userInfo?.user) {
            userGoogleSignup(userInfo)

        }
        else {
            console.log(userInfo, 'google error')
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

            Toast.show(result.message);
        }
        setIsLoadingGoogle(false)

    }

    const userLogin = async () => {
        setIsLoading(true)
        console.log('1')
        if (!fullName) {
            setIsLoading(false)
            Toast.show('Enter name');
        }
        if (!email) {
            setIsLoading(false)
            Toast.show('Enter email');
        }
        else if (!mobile) {
            setIsLoading(false)
            Toast.show('Enter mobile number');
        }
        else if (!password) {
            setIsLoading(false)
            Toast.show('Enter password');
        }
        else {

            const loginRes = await hitApiForSignUp(fullName, email, password, mobile, gender)

            if (loginRes.status) {
                navigation.navigate('OTPScreen', { email: email, secret: loginRes.secret })
            }
            else {
                Toast.show(loginRes.message);
            }
            setIsLoading(false)
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
            <ScrollView>
                <View style={{ width: '100%', height: 80, marginTop: 30 }}>
                    <Image source={require('../../assets/logo.jpg')} style={{ marginLeft: 10, width: 200, height: 100, resizeMode: 'contain' }} />
                </View>

                <GoogleLogin userData={googleData} startLoader={startLoader} isLogin={false} />

                <View style={{ width: '100%', marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '25%', height: 2, backgroundColor: AppColors.themePrimaryColor }} />
                        <Text style={{ color: AppColors.themePrimaryColor, fontSize: 16, fontFamily: AppFontFamily.PopinsMedium }}>{'   or continue with   '}</Text>
                        <View style={{ width: '25%', height: 2, backgroundColor: AppColors.themePrimaryColor }} />

                    </View>
                </View>

                <View style={{ width: '100%', alignItems: 'center' }}>
                    <View style={{ width: '90%', justifyContent: 'center' }}>


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
                                onPress={() => isLoading ? console.log('already clicked') : userLogin()}
                                loader={isLoading}
                            />
                        </View>
                    </View>
                </View>



                <View style={{ width: '100%', alignItems: 'center', height: 50 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, color: AppColors.themeTextGrayColor }}>{"Already signed up ?"}
                            <Text style={{ fontSize: 16, color: AppColors.themePrimaryColor }}>{' Login'}</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
                <CommonLoaders.startLoader isLoading={isLoadingGoogle} />
            </ScrollView >
        </View >
    )
}
