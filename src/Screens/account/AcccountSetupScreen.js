import React from 'react'
import { Text, View, Image, TouchableOpacity, Platform } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import TextInputView from '../../components/Input/TextInputView';
import DateInput from '../../components/Input/DateInput';
import moment from 'moment';
import Toast from 'react-native-simple-toast'
import { hitApiForAccountSetup } from './AccountModal';
export default function AcccountSetupScreen({ navigation }) {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [date, setDate] = React.useState(new Date())
  const [open, setOpen] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState('Select DOB')

  const setName = (text) => {
    setFullName(text)
  }

  const setEmailId = (text) => {
    setEmail(text)
  }

  const onConfirm = (date) => {
    setOpen(false)
    setDate(date)

    setSelectedDate(moment(date).format('DD/MM/YYYY'))

  }
  const onCancel = () => {
    setOpen(false)
  }

  const openDatePicker = (date) => {

    setOpen(true)
    // console.log(date, 'date')
  }

  const saveAndContinue = async () => {

    try {


      if (!fullName) {
        console.log('2')
        Toast.show('Enter full name');
      }
      else if (!email) {
        console.log('2')
        Toast.show('Enter email');
      }
      else if (!date) {
        console.log('2')
        Toast.show('Select Date');
      }
      else {

        const accountRes = await hitApiForAccountSetup(fullName, email, date)

        if (accountRes.status) {
          // Storage.saveItem(AppKeys.SECRET_KEY, loginRes.secret)
          navigation.navigate('KycScreen')
        }
        else {
          Toast.show(loginRes.message);
        }
        //    
      }
    }
      catch (error) {

      }

    }
  


  return (
    <View style={{ flex: 1, backgroundColor: AppColors.themePrimaryColor }}>

      <View style={{ width: '100%', height: Platform.OS == 'android' ? '10%' : '16%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '100%', flexDirection: 'row', marginTop: Platform.OS == 'android' ? 0 : '12%', justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../../assets/check.png')} style={{ marginRight: 10, width: 32, resizeMode: 'contain' }} />
          <Text style={{ fontSize: 18, fontWeight: '600', textAlign: 'center', color: AppColors.themesWhiteColor }}>
            {'PERSONAL DETAILS'}
          </Text>

        </View>
      </View>

      <View style={{ alignItems: 'center', backgroundColor: AppColors.themesWhiteColor, width: '100%', height: Platform.OS == 'android' ? '90%' : '84%', borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
        <View style={{ alignItems: 'center', width: '96%', marginTop: 35 }}>

          <View style={{ width: '90%', height: '10%' }}>
            <Text style={{ fontSize: 28, fontWeight: '700', color: AppColors.themeBlackColor }}>Account Setup</Text>
          </View>

          <View style={{ width: '90%', height: '55%' }}>

            {TextInputView('', 'Full Name', fullName, setName)}
            {TextInputView('', 'Email', email, setEmailId)}
            {DateInput(open, date, onConfirm, onCancel, openDatePicker, selectedDate)}
            {/* {TextInputView('', 'Phone number', fullName, setName)} */}
          </View>

          <View style={{ alignItems: 'center', width: '90%', height: '35%', justifyContent: 'center' }}>

            <TouchableOpacity onPress={() => saveAndContinue()} style={{ backgroundColor: AppColors.themePrimaryColor, width: '55%', height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: AppColors.themesWhiteColor }}>{'Save and continue'}</Text>
            </TouchableOpacity>

            <View style={{ alignItems: 'center', marginTop: 40 }}>

              <Text style={{ fontSize: 14, fontWeight: '400', textAlign: 'center', color: AppColors.themeTextGrayColor }}>
                {"Having trouble?"}
                <Text style={{ fontSize: 14, fontWeight: '600', textAlign: 'center', color: AppColors.themePrimaryColor }}>
                  {" Get help"}
                </Text>
              </Text>

            </View>

          </View>

        </View>
      </View>
    </View>
  )
}
