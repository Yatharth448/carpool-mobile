import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
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
export default function OTPScreen({ navigation, route }) {
  const [otp, setOtp] = React.useState("");
  console.log(route.params, 'route')
  const { email, secret } = route.params;

  const validateOTP = async (otp) => {

    const deviceToken = await Storage.getSavedItem('fcmToken')
    if ((!(otp) == '') && (otp.length == 4)) {

      const result = await hitApiForVerifyOTP(email, otp, secret, deviceToken)
      console.log(result, 'otp result')
      if (result.status) {
        Storage.saveItem(AppKeys.SECRET_KEY, result.secret)

        // if (result.kyc_status) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'RideDrawer' }],
          })
        // }
        // else {
        //   navigation.navigate('AcccountSetupScreen')

        // }
      }

    }
    else {

      Toast.showWithGravity('Invalid otp', 2, Toast.TOP);
      // Toast.show(themes.appCustomTexts.InvalidOTPText);
    }


  }


  return (
    <View style={{ flex: 1, backgroundColor: AppColors.themesWhiteColor }}>

      <View style={{ width: '100%', height: '20%' }}>
        <Image source={require('../../assets/logo.png')} style={{ width: '50%', marginTop: '5%', resizeMode: 'contain' }} />
      </View>



      <View style={{ width: '100%', alignItems: 'center' }}>
        <View style={{ width: '90%', justifyContent: 'center' }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: AppColors.themeBlackColor }}>
            {'Check your email'}
          </Text>
          <Text style={{ fontSize: 16, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsRegular }}>
            {'We’ve sent a 4-digit confirmation code to ' + email + '. Make sure you enter correct code.'}
          </Text>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20, height: 200 }}>
            <OTPInputView
              style={{ width: '50%', height: 40, marginRight: 60 }}
              pinCount={4}
              autoFocusOnLoad
              textContentType={'oneTimeCode'}
              onCodeChanged={(otpNumber) => setOtp(otpNumber)}
              codeInputFieldStyle={{ width: 50, borderWidth: 1, borderRadius: 5, height: 70, marginLeft: 10, color: AppColors.themeBlackColor, fontSize: 28, borderColor: AppColors.themeTextGrayColor, backgroundColor: AppColors.themeCardBorderColor }}
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



          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <ButtonPrimary
              text={'Verify'}
              onPress={() => userLogin()}
              loader={false}
            />
          </View>
        </View>
      </View>


      {/* <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', height: '30%' }}> */}
      {/* <Text style={{ fontSize: 26, fontWeight: 'bold', color: AppColors.themeBlackColor }}>
          {'Verification code'}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: '300', textAlign: 'center', marginTop: 30, width: '70%', color: AppColors.themeBlackColor }}>
          {'Enter the code sent to'}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 0, width: '70%', color: AppColors.themeBlackColor }}>
          {mobile}
        </Text> */}

      {/* <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            <OTPInputView
              style={{ width: '50%', height: 40 }}
              pinCount={4}
              autoFocusOnLoad
              textContentType={'oneTimeCode'}
              onCodeChanged={(otpNumber) => setOtp(otpNumber)}
              codeInputFieldStyle={{ borderWidth: 0, borderBottomWidth: 1.5, height: 50, marginRight: 8, color: AppColors.themeBlackColor, fontSize: 20, borderBottomColor: AppColors.themeTextGrayColor, }}
              codeInputHighlightStyle={{ borderBottomWidth: 1.5, borderBottomColor: AppColors.themePrimaryColor, }}
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
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text style={{ fontSize: 14, fontWeight: '400', textAlign: 'center', color: AppColors.themeTextGrayColor }}>
              {"Didn't you receive the OTP?"}
              <Text style={{ fontSize: 14, fontWeight: '600', textAlign: 'center', color: AppColors.themePrimaryColor }}>
                {" Resend OTP"}
              </Text>
            </Text>

          </View>
        </View> */}
      {/* </View> */}


      <View style={{ width: '100%', alignItems: 'center', height: 50, position: 'absolute', bottom: 0 }}>
        <TouchableOpacity onPress={() => userLogin()} style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: AppColors.themeTextGrayColor }}>{"Didn't receive code? "}
            <Text style={{ fontSize: 16, color: AppColors.themePrimaryColor }}>{' Resend Code'}</Text>
          </Text>
        </TouchableOpacity>
      </View>


    </View>
  )
}
