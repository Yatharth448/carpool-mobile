import React, { useEffect } from 'react'
import { Text, View, Image, TouchableOpacity, Linking, Alert, ScrollView, Dimensions } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import TextInputView from '../../components/Input/TextInputView';
import IdentityView from '../../components/Itentity/IdentityView';
import UploadIdView from '../../components/Itentity/UploadIdView';
import SelectImagePopup from '../../Utils/SelectImagePopup';
import selectImage from "../../Utils/ImagePicker";
import Toast from 'react-native-simple-toast'
// import { SegmentedButtons } from 'react-native-paper';
import { cameraPermission, galleryPermission } from '../../Utils/RuntimePermission'
import AddhaarInuputView from '../../components/Input/AddhaarInputView';
import { hitApiForVerifyAdhaarNumber, hitApiForVerifyAdhaarOTP } from './KycModal';
// import { ScrollView } from 'react-native-gesture-handler';

export default function KycScreen({ navigation }) {
  const [idNumber, setIdNumber] = React.useState("");
  const [isFront, setIsFront] = React.useState(true)
  const [frontImg, setFrontImg] = React.useState(null)
  const [bckImg, setBackImg] = React.useState(null)
  const [open, setOpen] = React.useState(false)
  const [openPhoto, setOpenPhoto] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('Identity')
  const [addhaarNumber, setAdhaarNumber] = React.useState('');
  const [selectedIdType, setSelectedIdType] = React.useState('number');
  const [otp, setOtp] = React.useState('');
  const [clientId, setClientId] = React.useState('');


  useEffect(() => {
    console.log('se', selectedIdType)
    // setSelectedIdType('image')
  }, [selectedIdType, idNumber, frontImg, bckImg, idNumber, clientId, otp]);

  const selectedIdentity = (text) => {
    setSelectedId(text)
  }

  const uploadFrontClick = (text) => {
    setOpenPhoto(true)
    setIsFront(true)
    console.log('upload')
  }

  const uploadBackClick = (text) => {
    setOpenPhoto(true)
    setIsFront(false)
    console.log('upload')
  }

  const setNumber = (value) => {
    setIdNumber(value)
  }

  const setAddhaarNumber = (value) => {
    setAdhaarNumber(value)
  }

  const setAdhaarOtp = (val) => {
    setOtp(val)
  }

  const openCam = async () => {
    try {
      if (await cameraPermission()) {
        const data = await selectImage.cameraLaunch();
        console.log(data.replace(/^.*\//, ''), 'Image path')
        let imageName = data.replace(/^.*\//, '')
        let extension = imageName.split('.')[1]

        imageName = imageName.length > 20 ? `${String(imageName).substring(0, 18)}...` + extension : imageName;
        isFront ? setFrontImg(data.path) : setBackImg(data.path);
        setOpenPhoto(false)
        // if (this.state.imageType === 'front') {
        //   this.setState({ selectedIdFront: data, selectedIdFrontImageName: imageName, openPopup: false })
        // }
        // else {
        //   this.setState({ selectedIdBack: data, selectedIdBackImageName: imageName, openPopup: false })
        // }

      }
      else {

        Alert.alert(
          '',
          "Carpool does not have access to your camera. To enable access, tap Settings and turn on camera.",
          [
            { text: 'Cancel', onPress: () => null },
            { text: 'Settings', onPress: () => Linking.openSettings() },
          ],
          {
            cancelable: false,
          },
        );

      }

    } catch (error) {
      if (error.code == 'file_size') {
        Alert(error.message || 'File size cannot exceed 5MB')
        this.setState({ openPopup: false })
      }
    }

  }
  const openGall = async () => {

    try {
      if (await galleryPermission()) {
        const data = await selectImage.imageGalleryLaunch();
        console.log(data.path.replace(/^.*\//, ''), 'Image path')
        let imageName = data.path.replace(/^.*\//, '')
        let extension = imageName.split('.')[1]
        // if (Platform.OS == 'android') {

        imageName = imageName.length > 20 ? `${String(imageName).substring(0, 18)}...` + extension : imageName;
        // setBackImg(data.path)
        isFront ? setFrontImg(data.path) : setBackImg(data.path);
        setOpenPhoto(false)
        // }
        // else {
        //   imageName = data.filename.length > 20 ? `${String(data.filename).substring(0, 18)}...` : data.filename;
        // }
        // if (this.state.imageType === 'front') {
        //   this.setState({ selectedIdFront: data.path, selectedIdFrontImageName: imageName, openPopup: false })
        // }
        // else {
        //   this.setState({ selectedIdBack: data.path, selectedIdBackImageName: imageName, openPopup: false })
        // }
      }
      else {

        Alert.alert(
          '',
          "Carpool does not have access to your photos. To enable access, tap Settings and turn on photos.",
          [
            { text: 'Cancel', onPress: () => null },
            { text: 'Settings', onPress: () => Linking.openSettings() },
          ],
          {
            cancelable: false,
          },
        );

      }

    } catch (error) {
      console.log(error, 'error')
      if (error.code == 'file_size') {
        alert(error.message || 'File size cannot exceed 5MB')
        // this.setState({ openPopup: false })
      }
    }

  }


  function onChangeIdSelection(val) {
    setSelectedIdType(val)
  }

  function SelectionBtn() {
    return (
      <>

        <Text style={{ fontSize: 16, color: AppColors.themeBlackColor, marginTop: 25 }}>{"Verify you identity via"}</Text>

        <View style={{ borderRadius: 5, width: '100%', marginTop: 10, marginBottom: 0, backgroundColor: AppColors.themeCardBorderColor, padding: 10 }}>

          <View style={{ alignItems: 'center', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>

            <TouchableOpacity onPress={() => onChangeIdSelection('number')} style={{ borderRadius: 5, alignItems: 'center', justifyContent: 'center', width: '45%', height: 30, backgroundColor: selectedIdType == 'number' ? AppColors.themePrimaryColor : AppColors.themeTextGrayColor }}>
              <Text style={{ fontSize: 14, color: AppColors.themesWhiteColor }}>{'Id Number'}</Text>
            </TouchableOpacity>

            <Text style={{ textAlign: 'center', fontSize: 16, color: AppColors.themeBlackColor, width: '10%' }}>{"OR"}</Text>

            <TouchableOpacity onPress={() => onChangeIdSelection('image')} style={{ borderRadius: 5, alignItems: 'center', justifyContent: 'center', width: '45%', height: 30, backgroundColor: selectedIdType == 'number' ? AppColors.themeTextGrayColor : AppColors.themePrimaryColor }}>
              <Text style={{ fontSize: 14, color: AppColors.themesWhiteColor }}>{'Upload ID Image'}</Text>
            </TouchableOpacity>

          </View>

        </View>

      </>
    )

  }

  const sendOtp = async () => {

    const result = await hitApiForVerifyAdhaarNumber(addhaarNumber)
    if (result.status) {
      console.log(result.clientId, 'verify adhaar')
      
      setClientId(result.clientId)
    }
    else {
      Toast.showWithGravity(result.message ?? 'Something went wrong', 2, Toast.TOP);
    }

  }

  const verifyOtp = async () => {

    const result = await hitApiForVerifyAdhaarOTP(clientId, otp)
    console.log(result, 'verify addhaar otp', clientId)
    if (result.status) {

      navigation.reset({
        index: 0,
        routes: [{ name: 'RideTab' }],
      })
    }
    else {
      Toast.showWithGravity(result.message ?? 'Something went wrong', 2, Toast.TOP);
    }

  }

  return (
    <View style={{ flex: 1, backgroundColor: AppColors.themePrimaryColor }}>

      <View style={{ width: '100%', height: Platform.OS == 'android' ? '10%' : '16%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '100%', flexDirection: 'row', marginTop: Platform.OS == 'android' ? 0 : '12%', justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../../assets/check.png')} style={{ marginRight: 10, width: 32, resizeMode: 'contain' }} />
          <Text style={{ fontSize: 18, fontWeight: '600', textAlign: 'center', color: AppColors.themesWhiteColor }}>
            {'IDENTITY DETAILS'}
          </Text>

        </View>
      </View>

      <View style={{ alignItems: 'center', backgroundColor: AppColors.themesWhiteColor, width: '100%', height: Platform.OS == 'android' ? '90%' : '84%', borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
        <View style={{ alignItems: 'center', width: '96%', marginTop: 35 }}>


          <View style={{ width: '90%', height: Dimensions.get('window').height * .1 }}>
            <Text style={{ fontSize: 28, fontWeight: '700', color: AppColors.themeBlackColor }}>KYC</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ width: Dimensions.get('window').width - 20, alignItems: 'center' }}>
            <View style={{ width: '90%', height: Dimensions.get('window').height * .55 }}>

              {IdentityView(selectedId, open, selectedIdentity)}
              {SelectionBtn()}

              {/* {selectedIdType == 'number' ? TextInputView('', 'Enter id number', idNumber, setNumber) : UploadIdView(selectedId, uploadFrontClick, uploadBackClick, frontImg, bckImg)} */}
              {AddhaarInuputView('', 'Enter addhaar number', addhaarNumber, setAddhaarNumber, sendOtp, 'Send OTP')}
              {AddhaarInuputView('', 'Enter OTP', otp, setAdhaarOtp, verifyOtp, 'VerifyOTP')}
              {/* {UploadIdView(selectedId, uploadFrontClick, uploadBackClick, frontImg, bckImg)} */}
              {/* {TextInputView('', 'Enter id number', idNumber, setNumber)} */}

            </View>

            <View style={{ alignItems: 'center', width: '90%', height: Dimensions.get('window').height * .35, justifyContent: 'center' }}>

              <TouchableOpacity onPress={() => navigation.navigate('KycScreen')} style={{ backgroundColor: AppColors.themePrimaryColor, width: '55%', height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
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

          </ScrollView>
        </View>
      </View>


      <SelectImagePopup
        isLoading={openPhoto}
        closePopup={() => setOpenPhoto(false)}
        onPressCam={() => { openCam() }}
        onPressGal={() => { openGall() }}
      />

    </View>
  )
}
