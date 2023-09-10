import React, { useEffect } from 'react'
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
import { hitApiForSignUp } from '../signup/SignupModal'
import { hitApiForVerifyAdhaarNumber, hitApiForVerifyAdhaarOTP } from './KycModal'
import CommonLoaders from '../../components/loader/Loader'

export default function VerifyAadharOTP({ navigation, route }) {
    const [otp, setOtp] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false)
    console.log(route.params, 'route')
    const { name, aadharNumber } = route.params;
    let { clientId } = route.params;

    useEffect(() => {

        // setNewSecter(secret)

        // console.log(data, 'result')
    }, []);

    const validateOTP = async (otp) => {

        // const deviceToken = await Storage.getSavedItem('fcmToken')
        if ((!(otp) == '') && (otp.length == 6)) {
            setIsLoading(true)
            const result = await hitApiForVerifyAdhaarOTP(clientId, otp, name)
            console.log(result, 'kyc result')
            if (result.status) {
                // Storage.saveItem(AppKeys.SECRET_KEY, result.secret)
                setIsLoading(false)
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
            else {
                setIsLoading(false)
                Toast.showWithGravity('Invalid otp', 2, Toast.TOP);
                // Toast.show(themes.appCustomTexts.InvalidOTPText);
            }

        }



    }


    const resendAadharOTP = async () => {

        const result = await hitApiForVerifyAdhaarNumber(aadharNumber)

        if (result.status) {

            clientId = result.clientId
            Toast.showWithGravity('OTP successfully sent to the number associated with your aadhar card', 2, Toast.TOP);
            console.log(result, 'result')
        }

    }

    return (
        <View style={{ flex: 1, backgroundColor: AppColors.themesWhiteColor }}>

            <View style={{ width: '100%', height: '20%' }}>
                <Image source={require('../../assets/logo.jpg')} style={{ marginLeft: 10, width: 200, height: 200, resizeMode: 'contain' }} />
            </View>



            <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={{ width: '90%', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 28, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsMedium }}>
                        {'Check your SMS'}
                    </Text>
                    <Text style={{ fontSize: 16, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsRegular }}>
                        {'We’ve sent a 6-digit confirmation code to the phone number linked with your aadhar card'}
                    </Text>
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20, height: 200 }}>
                        <OTPInputView
                            style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}
                            pinCount={6}
                            autoFocusOnLoad
                            textContentType={'oneTimeCode'}
                            onCodeChanged={(otpNumber) => setOtp(otpNumber)}
                            codeInputFieldStyle={{ width: 50, borderWidth: 1, borderRadius: 5, height: 70, marginLeft: 5, marginRight: 5, color: AppColors.themeBlackColor, fontSize: 28, borderColor: AppColors.themeTextGrayColor, backgroundColor: AppColors.themeCardBorderColor }}
                            codeInputHighlightStyle={{ borderBottomWidth: 1.5, borderBottomColor: AppColors.themePrimaryColor }}
                            keyboardType="numeric"
                            code={otp}
                            // clearInputs={this.state.clearOTP}
                            onCodeFilled={(otpNumber => {
                                if (otpNumber.length == 6) {
                                    validateOTP(otpNumber)
                                }
                                // console.log(`Code is ${otpNumber}, you are good to go!`)
                            })}
                        />
                    </View>



                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <ButtonPrimary
                            text={'Verify'}
                            onPress={() => validateOTP()}
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
                <TouchableOpacity onPress={() => resendAadharOTP()} style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, color: AppColors.themeTextGrayColor }}>{"Didn't receive code? "}
                        <Text style={{ fontSize: 16, color: AppColors.themePrimaryColor }}>{' Resend Code'}</Text>
                    </Text>
                </TouchableOpacity>
            </View>

            <CommonLoaders.ChatLoader isLoading={isLoading} loaderText={'OTP verification in process...Please wait'} />


        </View>
    )
}