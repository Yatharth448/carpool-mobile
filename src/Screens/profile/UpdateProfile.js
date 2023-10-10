import React, { useEffect } from 'react'
import { View, Image, TextInput, Platform, Dimensions, Pressable, Alert, Linking } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import Toast from 'react-native-simple-toast'
import { hitApiToUpdateProfile } from './ProfileModal';
import { Header } from '../../components/commomheader/CommonHeader';
import { connect } from 'react-redux';
import { getProfileDataRequest } from '../../redux/actions/actions';
import { AppFontFamily } from '../../components/constants/AppFonts';
import { Surface } from 'react-native-paper';
import { ButtonPrimary } from '../../components/button/buttonPrimary';
import SelectImagePopup from '../../Utils/SelectImagePopup'
import { cameraPermission, galleryPermission } from '../../Utils/RuntimePermission'
import selectImage from '../../Utils/ImagePicker'
import { ImageLoader } from '../../components/imageloader/ImageLoader';
function UpdateProfile({ data, loading, error, getProfileDataRequest, navigation }) {


    const [fullName, setFullName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [mobile, setMobile] = React.useState("");
    const [date, setDate] = React.useState(new Date())
    const [isLoading, setIsLoading] = React.useState(false);
    const [openPhoto, setOpenPhoto] = React.useState(false)
    const [progress, setProgress] = React.useState(0);
    const [newImg, setNewImg] = React.useState(false);

    const [img, setImg] = React.useState()

    useEffect(() => {
        getProfileDataRequest();

        setFullName(data.name)
        setEmail(data.email)
        setMobile(data.contact_number)
        setImg(data?.profilePath ? {uri: data?.profilePath} : "")
        console.log(data, 'result')

    }, []);



    const openCam = async () => {
        try {
            if (await cameraPermission()) {
                const data = await selectImage.cameraLaunch();
                console.log(data.replace(/^.*\//, ''), 'Image path')
                let imageName = data.replace(/^.*\//, '')
                let extension = imageName.split('.')[1]

                imageName = imageName.length > 20 ? `${String(imageName).substring(0, 18)}...` + extension : imageName;
                setImg(data.path);
                setOpenPhoto(false)
                setNewImg(true)

            }
            else {

                Alert.alert(
                    '',
                    "ShareWheel does not have access to your camera. To enable access, tap Settings and turn on camera.",
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
                Alert.alert(error.message || 'File size cannot exceed 5MB')
                setOpenPhoto(false)
                setNewImg(false)
            }
        }

    }
    const openGall = async () => {

        // console.log(isFront, 'front')
        try {
            if (await galleryPermission()) {
                const data = await selectImage.imageGalleryLaunch();
                console.log(data.path.replace(/^.*\//, ''), 'Image path')
                let imageName = data.path.replace(/^.*\//, '')
                let extension = imageName.split('.')[1]
                // if (Platform.OS == 'android') {

                imageName = imageName.length > 20 ? `${String(imageName).substring(0, 18)}...` + extension : imageName;
                // setBackImg(data.path)
                setImg(data.path);
                setNewImg(true)
                setOpenPhoto(false)

            }
            else {

                Alert.alert(
                    '',
                    "ShareWheel does not have access to your photos. To enable access, tap Settings and turn on photos.",
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
                Alert.alert(error.message || 'File size cannot exceed 5MB')
                // this.setState({ openPopup: false })
                setNewImg(false)
            }
        }

    }

    const saveAndContinue = async () => {

        try {


            if (!fullName) {
                console.log('2')
                Toast.showWithGravity('Enter full name', 2, Toast.TOP);
            }
            else if (!mobile) {
                console.log('2')
                Toast.showWithGravity('Enter mobile number', 2, Toast.TOP);
            }
            else if (!date) {
                console.log('2')
                Toast.showWithGravity('Select Date', 2, Toast.TOP);
            }
            else {

                setIsLoading(true)

                const params = new FormData();
                params.append('name', fullName);
                params.append('contact_number', mobile);
                console.log(img, 'img')
               if (newImg)
               {

                   params.append('file', {
                       uri: img,
                       type: 'image/jpeg',
                       name: 'profile',
                   }) 
               }

                const accountRes = await hitApiToUpdateProfile(params)

                if (accountRes.status) {
                    // Storage.saveItem(AppKeys.SECRET_KEY, loginRes.secret)
                    await getProfileDataRequest();
                    navigation.goBack()
                }
                else {
                    console.log(accountRes, 'res')
                    Toast.showWithGravity(accountRes?.message ?? 'Something went wrong', 2, Toast.TOP);
                }
                setIsLoading(false)
                //    
            }
        }
        catch (error) {

        }

    }


    const onUploadProgress = (data) => {
        var progress = data.loaded / data.total;
        setProgress(progress)
        console.log(progress, 'aaaaaa------')
    }

    const onChangeFullName = (e) => {
        setFullName(e)
    }

    const onChangeEmail = (e) => {
        setEmail(e)
    }

    const onChangeMobile = (e) => {
        setMobile(e)
    }

    const uploadProfileImage = () => {
        setOpenPhoto(true)
    }

    return (
        <View style={{ flex: 1, backgroundColor: AppColors.themePickupDropSearchBg }}>

            <Header close={() => { navigation.goBack() }} text='Profile' right={false} />


            <View style={{ alignItems: 'center', width: '100%', height: Platform.OS == 'android' ? '92%' : '84%' }}>

                <View style={{ width: '96%', borderRadius: 10, marginTop: 30, justifyContent: 'center' }}>
                    <Pressable onPress={() => uploadProfileImage()}>

                        <View style={{ width: '96%', alignItems: 'center', justifyContent: 'center' }}>
                            <ImageLoader
                                image={newImg ? {uri: img} : img ? img : ''}
                                width={80}
                                height={80}
                                borderRadius={40}
                            />
                            {/* <Image source={img ? { uri: img } : require('../../assets/avtar.png')} style={{ borderColor: AppColors.themeCardBorderColor, borderRadius: 40, borderWidth: 2, width: 80, height: 80, resizeMode: 'contain' }} /> */}
                        </View>
                        <Image source={require('../../assets/edit.png')} style={{ marginLeft: Dimensions.get('window').width / 2 + 5, bottom: 0, position: 'absolute', width: 20, height: 20, borderRadius: 40, borderRadius: 40, borderColor: AppColors.themesWhiteColor, borderWidth: .5, resizeMode: 'contain' }} />
                    </Pressable>

                    <View style={{ width: '96%', alignItems: 'center', justifyContent: 'center', marginTop: 20, flexDirection: 'row' }}>

                        <TextInput
                            style={{ fontSize: 20, fontFamily: AppFontFamily.PopinsBold, color: AppColors.themeBlackColor }}
                            placeholder={'Enter fullname'}
                            placeholderTextColor={AppColors.themeTextGrayColor}
                            value={fullName}
                            onChangeText={(text) => onChangeFullName(text)}

                        />
                        <View style={{ width: '5%', justifyContent: 'center' }}>
                            <Image source={require('../../assets/edit.png')} style={{ width: 15, height: 15, resizeMode: 'contain' }} />
                        </View>


                    </View>


                </View>


                <Surface style={{ width: '92%', borderRadius: 10, marginTop: 30, justifyContent: 'center', padding: 20, alignItems: 'flex-end' }}>

                    <View style={{ width: '100%', flexDirection: 'row' }}>

                        <View style={{ width: '15%', justifyContent: 'center' }}>
                            <Image source={require('../../assets/phone.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                        </View>
                        <View style={{ width: '80%', justifyContent: 'center' }}>

                            <TextInput
                                style={{ fontSize: 16, fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeText2Color }}
                                placeholder={'Enter mobile'}
                                placeholderTextColor={AppColors.themeTextGrayColor}
                                value={mobile}
                                onChangeText={(text) => onChangeMobile(text)}
                            />
                        </View>
                        <View style={{ width: '5%', justifyContent: 'center' }}>
                            <Image source={require('../../assets/edit.png')} style={{ width: 15, height: 15, resizeMode: 'contain' }} />
                        </View>


                    </View>
                    <View style={{ marginTop: 10, marginBottom: 15, marginLeft: 45, width: '88%', height: 1, backgroundColor: AppColors.themeCardBorderColor }}></View>


                    <View style={{ width: '100%', flexDirection: 'row', }}>

                        <View style={{ width: '15%', justifyContent: 'center' }}>
                            <Image source={require('../../assets/mail.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                        </View>
                        <View style={{ width: '85%', justifyContent: 'center' }}>
                            <TextInput
                                style={{ fontSize: 16, fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeBtnDisableColor }}
                                placeholder={'Enter mmobile'}
                                placeholderTextColor={AppColors.themeTextGrayColor}
                                value={email}
                                editable={false}
                                onChangeText={(text) => onChangeEmail(text)}
                            />
                        </View>

                    </View>
                    {/* <View style={{ marginTop: 10, marginBottom: 15, marginLeft: 45, width: '88%', height: 1, backgroundColor: AppColors.themeCardBorderColor }}></View>


                    <View style={{ width: '90%', flexDirection: 'row', }}>

                        <View style={{ width: '20%', justifyContent: 'center' }}>
                            <Image source={require('../../assets/facebook.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                        </View>
                        <View style={{ width: '80%', justifyContent: 'center' }}>
                            <TextInput
                                style={{ fontSize: 16, fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeText2Color }}
                                placeholder={'Enter mmobile'}
                                placeholderTextColor={AppColors.themeTextGrayColor}
                                value={fullName}
                                onChangeText={(text) => onChangeFullName(text)}
                            />
                        </View>

                    </View> */}


                </Surface>


                <View style={{ width: '100%', alignItems: 'center', marginTop: 30, }}>
                    <View style={{ width: '92%', alignItems: 'center' }}>
                        <ButtonPrimary
                            text={'Save info'}
                            onPress={() => isLoading ? console.log('already clicked') : saveAndContinue()}
                            loader={isLoading}
                        />
                    </View>
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

const mapStateToProps = (state) => ({
    data: state.data,
    loading: state.loading,
    error: state.error,
});

const mapDispatchToProps = {
    getProfileDataRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);