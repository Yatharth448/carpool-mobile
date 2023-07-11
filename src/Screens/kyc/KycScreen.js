import React from 'react'
import { Text, View, Image, TouchableOpacity, Linking, Alert } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import TextInputView from '../../components/Input/TextInputView';
import IdentityView from '../../components/Itentity/IdentityView';
import UploadIdView from '../../components/Itentity/UploadIdView';
import SelectImagePopup from '../../Utils/SelectImagePopup';
import selectImage from "../../Utils/ImagePicker";
import { cameraPermission, galleryPermission } from '../../Utils/RuntimePermission'

export default function KycScreen({ navigation }) {
  const [idNumber, setIdNumber] = React.useState("");
  const [open, setOpen] = React.useState(false)
  const [openPhoto, setOpenPhoto] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState()

  const selectedIdentity = (text) => {
    setSelectedId(text)
  }

  const onUploadClick = (text) => {
    setOpenPhoto(true)
    console.log('upload')
  }

  const setNumber = (value)  => {
    setIdNumber(value)
  }


  const openCam = async ()  =>{
    try {
      if (await cameraPermission()) {
        const data = await selectImage.cameraLaunch();
        console.log(data.replace(/^.*\//, ''), 'Image path')
        let imageName = data.replace(/^.*\//, '')
        let extension = imageName.split('.')[1]

        imageName = imageName.length > 20 ? `${String(imageName).substring(0, 18)}...` + extension : imageName;
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
        alert(error.message || 'File size cannot exceed 5MB')
        this.setState({ openPopup: false })
      }
    }

  }
  const openGall = async ()=> {

    try {
      if (await galleryPermission()) {
        const data = await selectImage.imageGalleryLaunch();
        console.log(data.path.replace(/^.*\//, ''), 'Image path')
        let imageName = data.path.replace(/^.*\//, '')
        let extension = imageName.split('.')[1]
        // if (Platform.OS == 'android') {

        //   imageName = imageName.length > 20 ? `${String(imageName).substring(0, 18)}...` + extension : imageName;
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



  return (
    <View style={{ flex: 1, backgroundColor: AppColors.themePrimaryColor }}>

      <View style={{ width: '100%', height:  Platform.OS == 'android' ? '10%' : '16%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '100%', flexDirection: 'row', marginTop:  Platform.OS == 'android' ? 0 : '12%', justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../../assets/check.png')} style={{ marginRight: 10, width: 32, resizeMode: 'contain' }} />
          <Text style={{ fontSize: 18, fontWeight: '600', textAlign: 'center', color: AppColors.themesWhiteColor }}>
            {'IDENTITY DETAILS'}
          </Text>

        </View>
      </View>

      <View style={{ alignItems: 'center', backgroundColor: AppColors.themesWhiteColor, width: '100%', height:  Platform.OS == 'android' ? '90%' : '84%', borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
        <View style={{ alignItems: 'center', width: '96%', marginTop: 35 }}>

          <View style={{ width: '90%', height: '10%' }}>
            <Text style={{ fontSize: 28, fontWeight: '700', color: AppColors.themeBlackColor }}>KYC</Text>
          </View>

          <View style={{ width: '90%', height: '55%' }}>

            {IdentityView('Identity', open, selectedIdentity)}
            {TextInputView('', 'Enter id number', idNumber, setNumber)}

            {UploadIdView('Identity', onUploadClick)}
            
          </View>

          <View style={{ alignItems: 'center', width: '90%', height: '35%', justifyContent: 'center' }}>

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

        </View>
      </View>


      <SelectImagePopup
        isLoading={openPhoto}
        closePopup={() => setOpenPhoto( false )}
        onPressCam={() => { openCam() }}
        onPressGal={() => { openGall() }}
      />

    </View>
  )
}
