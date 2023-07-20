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
export default function OTPScreen({ navigation, route }) {
  const [otp, setOtp] = React.useState("");
  console.log(route.params, 'route')
  const { mobile, secret } = route.params;
  
  const validateOTP = async (otp) => {
    
    const deviceToken = await Storage.getSavedItem('fcmToken')
    if ((!(otp) == '') && (otp.length == 4)) {

    const result = await hitApiForVerifyOTP(mobile, otp, secret, deviceToken)
    console.log(result, 'otp result')
    if (result.status)
    {
      Storage.saveItem(AppKeys.SECRET_KEY, result.secret)

      if (result.kyc_status)
      {
        navigation.reset({
          index: 0,
          routes: [{ name: 'RideTab' }],
        })
      }
      else{
        navigation.navigate('AcccountSetupScreen')
       
      }
    }

    }
    else {

      Toast.showWithGravity('Invalid otp', 2, Toast.TOP);
      // Toast.show(themes.appCustomTexts.InvalidOTPText);
    }


  }


  return (
    <View style={{ flex: 1, backgroundColor: AppColors.themesWhiteColor, justifyContent: 'center' }}>

      <View style={{ width: '100%', height: '48%', alignItems: 'center' }}>
        <Image source={require('../../assets/otp.png')} style={{ width: '60%', marginTop: '30%', resizeMode: 'contain' }} />
      </View>

      <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', height: '30%' }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold', color: AppColors.themeBlackColor }}>
          {'Verification code'}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: '300', textAlign: 'center', marginTop: 30, width: '70%', color: AppColors.themeBlackColor }}>
          {'Enter the code sent to'}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 0, width: '70%', color: AppColors.themeBlackColor }}>
          {mobile}
        </Text>

        <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            {/* <Image source={require('../../assets/indFlag.png')} style={{ marginRight: 5, width: 30, resizeMode: 'contain' }} />
            <Image source={require('../../assets/downArrow.png')} style={{ marginRight: -45, width: 10, resizeMode: 'contain' }} /> */}
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
        </View>
      </View>


      <View style={{ width: '100%', alignItems: 'center', marginTop: '13%', height: '22%' }}>
        <TouchableOpacity onPress={() => validateOTP()} style={{ backgroundColor: AppColors.themePrimaryColor, width: '55%', height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: AppColors.themesWhiteColor }}>{'Verify'}</Text>
        </TouchableOpacity>
      </View>


    </View>
  )
}
