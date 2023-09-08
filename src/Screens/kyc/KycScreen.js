import React from 'react'
import { Alert, Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import { AppFontFamily } from '../../components/constants/AppFonts'
import { ButtonPrimary } from '../../components/button/buttonPrimary'
import { CommonActions } from '@react-navigation/native'
import Storage from '../../components/localStorage/storage'

export default function KycScreen({ navigation }) {

  const [doc, setDoc] = React.useState([{ 'index': 0, "name": 'Aadhar Card', 'type': 'Aadhar Number' }, { 'index': 1, "name": 'Driving Licence', 'type': 'Driving Licence Number' }, { 'index': 2, "name": 'Passport', 'type': 'Passport Number' }])
  const [indx, setIndx] = React.useState(3)
  const onNextPress = () => {

    if (indx == 3) {
      Alert.alert('', 'Please select document type')
    }
    else {

      navigation.navigate('UploadDocuments', { data: doc[indx] })
    }

  }

  const skipClick = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'RideDrawer' }],
      })
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: AppColors.themesWhiteColor }}>

      <View style={{ width: '100%', height: '20%' }}>
        <Image source={require('../../assets/logo.jpg')} style={{ marginLeft: 10, width: 200, height: 200, resizeMode: 'contain' }} />
      </View>

      <View style={{ width: '100%', alignItems: 'center' }}>
        <View style={{ width: '90%', justifyContent: 'center' }}>
          <Text style={{ fontSize: 28, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsMedium }}>
            {'Add your KYC'}
          </Text>
        </View>
      </View>

      <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>

        <View style={{ width: '90%', alignItems: 'center', backgroundColor: AppColors.themePickupDropSearchBg, borderRadius: 10 }}>

          <Text style={{ marginTop: 20, width: '92%', fontFamily: AppFontFamily.PopinsMedium, fontSize: 14, color: AppColors.themeBlackColor }}>
            {'Identity and Address proof'}
          </Text>

          <Text style={{ marginTop: 0, width: '92%', fontFamily: AppFontFamily.PopinsRegular, fontSize: 12, color: AppColors.themeTextGrayColor }}>
            {'Choose a document that you would like to upload for address proof'}
          </Text>

          <Pressable onPress={() => setIndx(0)} style={{ marginTop: 10, width: '92%', flexDirection: 'row', height: 50, alignItems: 'center' }}>

            <View style={{ width: '40%', flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../../assets/aadhar.png')} style={{ width: 30, height: 20, resizeMode: 'contain' }} />
              <Text style={{ marginLeft: 20, fontFamily: AppFontFamily.PopinsRegular, fontSize: 12, color: AppColors.themeBlackColor }}>
                {'Aadhar Card'}
              </Text>
            </View>

            <View style={{ width: '60%', alignItems: 'flex-end' }}>
              <Image source={indx == 0 ? require('../../assets/bluecircle.png') : require('../../assets/greycircle.png')} style={{ marginLeft: 10, width: 20, height: 20, resizeMode: 'contain' }} />
            </View>

          </Pressable>
          <View style={{ width: '100%', height: 1, backgroundColor: AppColors.themeCardBorderColor }}></View>

          <Pressable onPress={() => setIndx(1)} style={{ width: '92%', flexDirection: 'row', height: 50, alignItems: 'center', marginBottom: 5 }}>

            <View style={{ width: '40%', flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../../assets/driverslicense.png')} style={{ width: 30, height: 20, resizeMode: 'contain' }} />
              <Text style={{ marginLeft: 20, fontFamily: AppFontFamily.PopinsRegular, fontSize: 12, color: AppColors.themeBlackColor }}>
                {'Driving Licence'}
              </Text>
            </View>

            <View style={{ width: '60%', alignItems: 'flex-end' }}>
              <Image source={indx == 1 ? require('../../assets/bluecircle.png') : require('../../assets/greycircle.png')} style={{ marginLeft: 10, width: 20, height: 20, resizeMode: 'contain' }} />
            </View>

          </Pressable>
          {/* <View style={{ width: '100%', height: 1, backgroundColor: AppColors.themeCardBorderColor }}></View>

          <Pressable onPress={() => setIndx(2)} style={{ width: '92%', flexDirection: 'row', height: 50, alignItems: 'center', marginBottom: 5 }}>

            <View style={{ width: '40%', flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../../assets/passport.png')} style={{ width: 30, height: 20, resizeMode: 'contain' }} />
              <Text style={{ marginLeft: 20, fontFamily: AppFontFamily.PopinsRegular, fontSize: 12, color: AppColors.themeBlackColor }}>
                {'Passport'}
              </Text>
            </View>

            <View style={{ width: '60%', alignItems: 'flex-end' }}>
              <Image source={indx == 2 ? require('../../assets/bluecircle.png') : require('../../assets/greycircle.png')} style={{ marginLeft: 10, width: 20, height: 20, resizeMode: 'contain' }} />
            </View>

          </Pressable> */}
          {/* <View style={{width: '100%', height: 1, backgroundColor: AppColors.themeCardBorderColor}}></View> */}


        </View>

      </View>

      <View style={{ width: '100%', alignItems: 'center', marginTop: 50 }}>
        <ButtonPrimary
          style={{ width: '90%' }}
          text={'Next'}
          onPress={() => onNextPress()}
        />
      </View>

      <View style={{ width: '100%', alignItems: 'center', height: 50, position: 'absolute', bottom: 0 }}>
        <TouchableOpacity onPress={() => skipClick()} style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: AppColors.themeTextGrayColor }}>{"Skip"}
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}
