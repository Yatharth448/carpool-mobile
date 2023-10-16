import React, { useEffect } from 'react'
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import { TextInput } from 'react-native-paper'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Toast from 'react-native-simple-toast'
import { useRoute } from '@react-navigation/native'
import { hitApiForVerifyOTP } from './otpModal'
import Storage from '../../components/localStorage/storage'
import { AppKeys } from '../../components/constants/AppKeys'
import { ButtonPrimary } from '../../components/button/buttonPrimary'
import { AppFontFamily } from '../../components/constants/AppFonts'
import { hitApiForSignUp, hitApiToResentOTP } from '../signup/SignupModal'
export default function OTPScreen({ navigation, route }) {
  const [otp, setOtp] = React.useState("");
  const [newSecret, setNewSecter] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [timer, setTimer] = React.useState(30);
  const [isTimerRunning, setIsTimerRunning] = React.useState(false);
  console.log(route.params, 'route')
  const { email, secret } = route.params;
  // let { secret } = route.params;

  useEffect(() => {


    
    let interval;

    if (isTimerRunning) {
        interval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                setIsTimerRunning(false);
                clearInterval(interval);
            }
        }, 1000);
    }
    setNewSecter(secret)

    return () => {
        clearInterval(interval);
    };

    // console.log(data, 'result')
  }, [isTimerRunning, timer]);

  const validateOTP = async (otp) => {
    setIsLoading(true)
    const deviceToken = await Storage.getSavedItem('fcmToken')
    if ((!(otp) == '') && (otp.length == 4)) {

      const result = await hitApiForVerifyOTP(email, otp, newSecret, deviceToken)
      console.log(result, 'otp result')
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

        Toast.show('Invalid otp');
        // Toast.show(themes.appCustomTexts.InvalidOTPText);
      }
      setIsLoading(false)

    }



  }


  const resendOTP = async () => {

    setIsLoading(true)
        if (!isTimerRunning) {
    const result = await hitApiToResentOTP(email)

    setTimer(30)
    console.log(result, 'resend otp result',)
    if (result) {
      // secret = result.secret
      setNewSecter(result.secret)
      // console.log(newSecret, 'new' )

      Alert.alert('OTP resent successfully! Please check your email');
    }
  }
  setIsLoading(false)

  }

  return (
    <View style={{ flex: 1, backgroundColor: AppColors.themesWhiteColor }}>

      <View style={{ width: '100%', height: 100, marginTop: 30 }}>
        <Image source={require('../../assets/logo.jpg')} style={{ marginLeft: 10, width: 200, height: 80, resizeMode: 'contain' }} />
      </View>



      <View style={{ width: '100%', alignItems: 'center' }}>
        <View style={{ width: '90%', justifyContent: 'center' }}>
          <Text style={{ fontSize: 28, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsMedium }}>
            {'Check your email'}
          </Text>
          <Text style={{ fontSize: 16, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsRegular }}>
            {'We’ve sent a 4-digit confirmation code to ' + email + '. Make sure you enter correct code.'}
          </Text>
          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20, height: 200 }}>
            <OTPInputView
              style={{ width: '75%', alignItems: 'center', justifyContent: 'center' }}
              pinCount={4}
              autoFocusOnLoad
              textContentType={'oneTimeCode'}
              onCodeChanged={(otpNumber) => setOtp(otpNumber)}
              codeInputFieldStyle={{ width: 50, borderWidth: 1, borderRadius: 5, height: 70, marginRight: 5, marginLeft: 5, color: AppColors.themeBlackColor, fontSize: 28, borderColor: AppColors.themeTextGrayColor, backgroundColor: AppColors.themeCardBorderColor }}
              codeInputHighlightStyle={{ borderBottomWidth: 1.5, borderBottomColor: AppColors.themePrimaryColor }}
              keyboardType="numeric"
              code={otp}
              // clearInputs={this.state.clearOTP}
              onCodeFilled={(otpNumber => {
                if (otpNumber.length == 4) {
                  validateOTP(otpNumber)
                }
                // console.log(`Code is ${otpNumber}, you are good to go!`)
              })}
            />
          </View>

          <View style={{ width: '100%', alignItems: 'center', height: 50 }}>
            <TouchableOpacity onPress={() => resendOTP()} style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: AppColors.themeTextGrayColor }}>{"Didn't receive code? "}
              {isTimerRunning ?
                            <Text style={{ fontSize: 16, color: AppColors.themePrimaryColor }}>{` Resend in ${timer} seconds`}</Text>
                            :
                <Text style={{ fontSize: 16, color: AppColors.themePrimaryColor }}>{' Resend Code'}</Text>}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <ButtonPrimary
              text={'Verify'}
              onPress={() => isLoading ? console.log('already clicked') : validateOTP()}
              loader={isLoading}
            />
          </View>
        </View>
      </View>




    </View>
  )
}
