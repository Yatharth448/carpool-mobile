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
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Configure Google Sign-In
GoogleSignin.configure({
  // webClientId is only required for Android
  webClientId: '275128898778-i0e4ir4972quag1n2r32ut3iasr8fu0k.apps.googleusercontent.com',
  offlineAccess: true, // if you want to access Google API on behalf of the user
});
export default function LoginScreen({ navigation }) {

    
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [checked, setChecked] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
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

            
            const loginRes = await hitApiForLogin( email, password)

           
            if (loginRes.status) {
                // Storage.saveItem(AppKeys.SECRET_KEY, loginRes.secret)
                // navigation.navigate('OTPScreen', { mobile: countryCode + email, secret: loginRes.secret })
            }
            else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'RideDrawer' }],
                  })
                Toast.showWithGravity(loginRes.message, 2, Toast.TOP);
            }
            //    
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
                <Image source={require('../../assets/logo.png')} style={{ width: '50%', marginTop: '5%', resizeMode: 'contain' }} />
            </View>

            <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={{ width: '90%', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 26, fontWeight: 'bold', color: AppColors.themeBlackColor }}>
                        {'Login'}
                    </Text>
                    <InputView left={require('../../assets/sms.png')} headText={'Email Id'} placeHolder={'Enter email id'} val={email} onChange={onChangeEmail} />
                    <InputView headText={'Password'} placeHolder={'Enter Password'} val={password} onChange={onChangePassword} right={showPassword ? 'eye-off-outline' : 'eye-outline'} rightClick={rightClick} secureText={showPassword} />

                    <Pressable onPress={() => setChecked(!checked)} style={{ width: '100%', flexDirection: 'row', alignItems: 'center', height: 40, marginTop: 10 }}>

                        <Icon name={checked ? 'checkbox-outline' : 'checkbox-blank-outline'} size={24} color={checked ? AppColors.themePrimaryColor : AppColors.themeCardBorderColor} />
                        <Text style={{ marginLeft: 10, fontSize: 16, color: AppColors.themeTextGrayColor }}>Remember Me</Text>

                    </Pressable>

                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <ButtonPrimary
                            text={'Login'}
                            onPress={() => userLogin()}
                            loader={ false }
                        />
                    </View>
                </View>
            </View>

            <View style={{ width: '100%', marginTop: 40 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                    <View style={{ width: '25%', height: 2, backgroundColor: AppColors.themeCardBorderColor }} />
                    <Text style={{ color: AppColors.themeCardBorderColor, fontSize: 16, fontFamily: AppFontFamily.PopinsMedium }}>{'   or continue with   '}</Text>
                    <View style={{ width: '25%', height: 2, backgroundColor: AppColors.themeCardBorderColor }} />

                </View>
            </View>
            <Pressable onPress={()=> signIn()} style={{ width: '100%', marginTop: 40, alignItems: 'center' }}>

                <Surface style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 47, borderRadius: 5 }} elevation={2}>

                    <View style={{ width: '30%', justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../assets/googlelogo.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                    </View>
                    <View style={{ width: '60%', justifyContent: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: AppColors.themeCardBorderColor, fontSize: 16, fontFamily: AppFontFamily.PopinsMedium }}>{'Sign in with Google'}</Text>
                    </View>

                </Surface>

            </Pressable>

            <View style={{ width: '100%', alignItems: 'center', height: 50, position: 'absolute', bottom: 0 }}>
                <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')} style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, color: AppColors.themeTextGrayColor }}>{"Don't have an account? "}
                        <Text style={{ fontSize: 16, color: AppColors.themePrimaryColor }}>{' Signup'}</Text>
                    </Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}
