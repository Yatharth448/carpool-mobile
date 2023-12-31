import React, { useEffect } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { AppColors } from '../../components/constants/AppColor';
import { TextInput } from 'react-native-paper';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Toast from 'react-native-simple-toast';
import { useRoute } from '@react-navigation/native';
import { hitApiForVerifyOTP } from './otpModal';
import Storage from '../../components/localStorage/storage';
import { AppKeys } from '../../components/constants/AppKeys';
import { ButtonPrimary } from '../../components/button/buttonPrimary';
import { AppFontFamily } from '../../components/constants/AppFonts';
import { hitApiForSignUp } from '../signup/SignupModal';
import {
  hitApiForVerifyAdhaarNumber,
  hitApiForVerifyAdhaarOTP,
} from './KycModal';
import CommonLoaders from '../../components/loader/Loader';

export default function VerifyAadharOTP({ navigation, route }) {
  const [otp, setOtp] = React.useState('');
  const [timer, setTimer] = React.useState(30);
  const [isTimerRunning, setIsTimerRunning] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [resend, setResend] = React.useState(false);
  console.log(route.params, 'route');
  const { name, aadharNumber } = route.params;
  let { clientId } = route.params;

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

    return () => {
      clearInterval(interval);
    };
  }, [isTimerRunning, timer]);

  const validateOTP = async otp => {
    // const deviceToken = await Storage.getSavedItem('fcmToken')
    if (!otp == '' && otp.length == 6) {
      setIsLoading(true);
      const result = await hitApiForVerifyAdhaarOTP(clientId, otp, name);
      console.log(result, 'kyc result');
      if (result.status) {
        // Storage.saveItem(AppKeys.SECRET_KEY, result.secret)
        setIsLoading(false);
        // if (result.kyc_status) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'RideDrawer' }],
        });
        // }
        // else {
        //   navigation.navigate('AcccountSetupScreen')

        // }
      } else {
        setIsLoading(false);
        Toast.show('Invalid otp');
        // Toast.show(themes.appCustomTexts.InvalidOTPText);
      }
    }
  };

  const resendAadharOTP = async () => {
    setResend(true);
    if (!isTimerRunning) {
      const result = await hitApiForVerifyAdhaarNumber(aadharNumber);
      setTimer(30);
      setIsTimerRunning(true);
      if (result.status) {
        clientId = result.clientId;
        Toast.show(
          'OTP successfully sent to the number associated with your aadhar card'
        );
        console.log(result, 'result');
      }
    }
    setResend(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: AppColors.themesWhiteColor }}>
      <View style={{ width: '100%',  height: 100, marginTop: 30 }}>
        <Image
          source={require('../../assets/logo.jpg')}
          style={{
            marginLeft: 10,
            width: 200,
            height: 80,
            resizeMode: 'contain',
          }}
        />
      </View>

      <View style={{ width: '100%', alignItems: 'center' }}>
        <View style={{ width: '90%', justifyContent: 'center' }}>
          <Text
            style={{
              fontSize: 28,
              color: AppColors.themeBlackColor,
              fontFamily: AppFontFamily.PopinsMedium,
            }}>
            {'Check your SMS'}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: AppColors.themeBlackColor,
              fontFamily: AppFontFamily.PopinsRegular,
            }}>
            {
              'We’ve sent a 6-digit confirmation code to the phone number linked with your aadhar card'
            }
          </Text>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              height: 200,
            }}>
            <OTPInputView
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              pinCount={6}
              autoFocusOnLoad
              textContentType={'oneTimeCode'}
              onCodeChanged={otpNumber => setOtp(otpNumber)}
              codeInputFieldStyle={{
                width: 40,
                borderWidth: 1,
                borderRadius: 5,
                height: 70,
                marginLeft: 5,
                marginRight: 5,
                color: AppColors.themeBlackColor,
                fontSize: 28,
                borderColor: AppColors.themeTextGrayColor,
                backgroundColor: AppColors.themeCardBorderColor,
              }}
              codeInputHighlightStyle={{
                borderBottomWidth: 1.5,
                borderBottomColor: AppColors.themePrimaryColor,
              }}
              keyboardType="numeric"
              code={otp}
              // clearInputs={this.state.clearOTP}
              onCodeFilled={otpNumber => {
                if (otpNumber.length == 6) {
                  validateOTP(otpNumber);
                }
                // console.log(`Code is ${otpNumber}, you are good to go!`)
              }}
            />
          </View>



          <View style={{ width: '100%', alignItems: 'center', marginBottom: 10 }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('UploadDocuments', {
                  data: { index: 0, name: 'Aadhar Card', type: 'Aadhar Number' },
                })
              }
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 16, color: AppColors.themeTextGrayColor }}>
                {'Not working? '}

                <Text style={{ fontSize: 16, color: AppColors.themePrimaryColor }}>
                  {' Upload documents'}
                </Text>

              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,

            }}>


            <ButtonPrimary
              style={{ width: '48%', backgroundColor: AppColors.themesWhiteColor , borderColor: AppColors.themePrimaryColor, borderWidth: 1, borderRadius: 5}}
              textStyle={{color: AppColors.themePrimaryColor}}
              text={isTimerRunning ? ` Resend in ${timer} ` : 'Resend OTP'}
              onPress={() =>
                isTimerRunning ? console.log('already clicked') : resendAadharOTP()
              }
              loader={isTimerRunning}
              loaderColor={AppColors.themePrimaryColor}
            />


            <ButtonPrimary
              style={{ width: '48%' }}
              text={'Verify'}
              onPress={() =>
                isLoading ? console.log('already clicked') : validateOTP()
              }
              loader={isLoading}
            />


          </View>
        </View>
      </View>



      {/* <View style={{width: '100%', alignItems: 'center', height: 50}}>
        <TouchableOpacity
          onPress={() => resendAadharOTP()}
          style={{
            width: '100%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, color: AppColors.themeTextGrayColor}}>
            {"Didn't receive code? "}
            {isTimerRunning ? (
              <Text
                style={{
                  fontSize: 16,
                  color: AppColors.themePrimaryColor,
                }}>{` Resend in ${timer} seconds`}</Text>
            ) : (
              <Text style={{fontSize: 16, color: AppColors.themePrimaryColor}}>
                {' Resend OTP'}
              </Text>
            )}
          </Text>
        </TouchableOpacity>
      </View> */}



      {/* <CommonLoaders.ChatLoader isLoading={isLoading} loaderText={'OTP verification in process...Please wait'} /> */}
    </View>
  );
}
