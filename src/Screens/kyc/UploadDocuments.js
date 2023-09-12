import React from 'react'
import { Image, Text, View, TextInput, Dimensions, Alert, alert, Linking, Pressable, ScrollView } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import { AppFontFamily } from '../../components/constants/AppFonts'
import { ButtonPrimary } from '../../components/button/buttonPrimary'
import SelectImagePopup from '../../Utils/SelectImagePopup'
import { cameraPermission, galleryPermission } from '../../Utils/RuntimePermission'
import selectImage from '../../Utils/ImagePicker'
import { hitApiForDLKYC, hitApiForUploadDocument, hitApiForVerifyAdhaarNumber } from './KycModal'
import moment from 'moment';
import DOBView from '../../components/datetimeview/DOBView'
import { CommonActions } from '@react-navigation/native'
import CommonLoaders from '../../components/loader/Loader'

export default function UploadDocuments({ navigation, route }) {

    const [docNumber, setDocNumber] = React.useState('')
    const [rawDate, setRawDate] = React.useState('')
    const [licenceName, setLicenceName] = React.useState('')
    const [aadharName, setAadharName] = React.useState('')
    const screenWidth = Dimensions.get('screen').width / 2 - 35
    const [openPhoto, setOpenPhoto] = React.useState(false)
    const [openDOB, setDOB] = React.useState(false)
    const [selectedDate, setSelectedDate] = React.useState('DOB as per Driving Licence')
    const [progress, setProgress] = React.useState(0)
    const [isFront, setIsFront] = React.useState(true)
    const [frontImg, setFrontImg] = React.useState(null)
    const [bckImg, setBackImg] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)
    const { data } = route.params;

    const onNextPress = async () => {

        if (docNumber == '') {

            if (frontImg && bckImg) {
                uploadDoc()
                setIsLoading(true)
            }
            else {
                Alert.alert('Front/Back image is necessary')
            }

        }
        else {

            if (data.index == 0) {
                // console.log(data, 'data')

                if (docNumber.length < 1) {

                    Alert.alert('Enter valid aadhar number')

                }
                else if (aadharName < 4) {
                    Alert.alert('Enter full name as per aadhar card')
                }
                else {
                    AadharCardKYC()
                    setIsLoading(true)
                }
            }
            else {
                // console.log(data, 'data')

                if (docNumber.length < 12) {

                    Alert.alert('Enter valid licence number')

                }
                else if (selectedDate == 'DOB as per Driving Licence') {
                    Alert.alert('Enter DOB')
                }
                else if (licenceName < 4) {
                    Alert.alert('Enter full name as per driving licence')
                }
                else {
                    DrivingLicenceKYC()
                    setIsLoading(true)
                }
            }

        }



        // navigation.navigate('UploadDocuments')
    }


    const uploadDoc = async () => {

        const params = new FormData();
        params.append('type', data.type);
        params.append('file', {
            uri: frontImg,
            type: 'image/jpeg',
            name: 'front',
        })
        params.append('file', {
            uri: bckImg,
            type: 'image/jpeg',
            name: 'back',
        })

        const result = await hitApiForUploadDocument(params, onUploadProgress)
        if (result.status) {
            setIsLoading(false)
            console.log(result, 'upload doc result')
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'RideDrawer' }],
                })
            );

        }

    }

    const onUploadProgress = (data) => {
        var progress = data.loaded / data.total;
        setProgress(progress)
        console.log(progress, 'aaaaaa------')
    }

    const AadharCardKYC = async () => {

        const result = await hitApiForVerifyAdhaarNumber(docNumber)
        setIsLoading(false)
        console.log(result, 'verify doc result')
        navigation.navigate('VerifyAadharOTP', { clientId: result.clientId, name: aadharName, aadharNumber: docNumber })
    }

    const DrivingLicenceKYC = async () => {

        const result = await hitApiForDLKYC(docNumber, rawDate, licenceName)
        setIsLoading(false)
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'RideDrawer' }],
            })
        );
        console.log(result, 'DL KYC')
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
                setOpenPhoto(false)
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

    const onDateConfirm = (val) => {

        console.log(val)
        const raw = String(moment(val).format('yyyy-MM-DD'))
        setRawDate(raw)
        const selectedDate = String(moment(val).format('MMM-DD-YYYY'))
        setSelectedDate(selectedDate)
        setDOB(false)
    }

    const onDateCancel = () => {

        setDOB(false)
    }

    const openDatePicker = () => {

        setDOB(true)
    }


    const AadharView = () => {
        return (
            <View style={{ width: '92%', flexDirection: 'row', height: 100, alignItems: 'center' }}>

                <View style={{ width: '100%', justifyContent: 'center' }}>
                    <Text style={{ margintop: 0, marginBottom: 5, fontFamily: AppFontFamily.PopinsMedium, fontSize: 12, color: AppColors.themeBlackColor }}>
                        {'Name as per Aadhar Card'}
                    </Text>

                    <TextInput
                        onChangeText={text => setAadharName(text)}
                        value={aadharName}
                        placeholder={"Enter name as per Aadhar Card"}
                        placeholderTextColor={AppColors.themeTextGrayColor}
                        style={{ backgroundColor: AppColors.themesWhiteColor, borderColor: AppColors.themeCardBorderColor, borderWidth: 1, borderRadius: 5, fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeBlackColor, padding: 10, width: '100%', fontSize: 12, textAlign: 'left' }}
                    // keyboardType={
                    //     Platform.OS === 'android' ? 'numeric' : 'number-pad'
                    // }
                    />

                </View>

            </View>
        )
    }


    const DlView = () => {
        return (
            <>
                <View style={{ width: '92%', flexDirection: 'row', height: 100, alignItems: 'center' }}>

                    <View style={{ width: '100%', justifyContent: 'center' }}>
                        <Text style={{ margintop: 0, marginBottom: 5, fontFamily: AppFontFamily.PopinsMedium, fontSize: 12, color: AppColors.themeBlackColor }}>
                            {'DOB as per Driving Licence'}
                        </Text>

                        <View style={{ backgroundColor: AppColors.themesWhiteColor, borderColor: AppColors.themeCardBorderColor, borderWidth: 1, borderRadius: 5, width: '100%' }}>

                            {DOBView('date', openDOB, new Date(), onDateConfirm, onDateCancel, openDatePicker, selectedDate)}
                        </View>

                    </View>

                </View>

                <View style={{ width: '92%', flexDirection: 'row', height: 100, alignItems: 'center' }}>

                    <View style={{ width: '100%', justifyContent: 'center' }}>
                        <Text style={{ margintop: 0, marginBottom: 5, fontFamily: AppFontFamily.PopinsMedium, fontSize: 12, color: AppColors.themeBlackColor }}>
                            {'Name as per licence'}
                        </Text>

                        <TextInput
                            onChangeText={text => setLicenceName(text)}
                            value={licenceName}
                            placeholder={"Enter name as per DL"}
                            placeholderTextColor={AppColors.themeTextGrayColor}
                            style={{ backgroundColor: AppColors.themesWhiteColor, borderColor: AppColors.themeCardBorderColor, borderWidth: 1, borderRadius: 5, fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeBlackColor, padding: 10, width: '100%', fontSize: 12, textAlign: 'left' }}
                        // keyboardType={
                        //     Platform.OS === 'android' ? 'numeric' : 'number-pad'
                        // }
                        />

                    </View>

                </View>
            </>
        )
    }

    const uploadImagePress = (type) => {

        type == 'front' ? setIsFront(true) : setIsFront(false)
        setOpenPhoto(true)

    }

    return (
        <ScrollView>
            <View style={{ flex: 1, backgroundColor: AppColors.themesWhiteColor, paddingBottom: 30 }}>

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

                        {/* <Text style={{ marginTop: 0, width: '92%', fontFamily: AppFontFamily.PopinsRegular, fontSize: 12, color: AppColors.themeTextGrayColor }}>
            {'Choose a document that you would like to upload for address proof'}
        </Text> */}

                        <View style={{ marginTop: 10, width: '92%', flexDirection: 'row', height: 50, alignItems: 'center' }}>

                            <View style={{ width: '40%', flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={data.index == 0 ? require('../../assets/aadhar.png') : data.index == 1 ? require('../../assets/driverslicense.png') : require('../../assets/passport.png')} style={{ width: 30, height: 20, resizeMode: 'contain' }} />
                                <Text style={{ marginLeft: 20, fontFamily: AppFontFamily.PopinsRegular, fontSize: 12, color: AppColors.themeBlackColor }}>
                                    {data.name}
                                </Text>
                            </View>

                            <Pressable onPress={() => navigation.goBack()} style={{ width: '60%', alignItems: 'flex-end' }}>
                                <Text style={{ marginLeft: 20, fontFamily: AppFontFamily.PopinsRegular, fontSize: 10, color: AppColors.themeTextGrayColor }}>
                                    {'Change'}
                                </Text>
                            </Pressable>

                        </View>
                        <View style={{ width: '100%', height: 1, backgroundColor: AppColors.themeCardBorderColor }}></View>

                        <View style={{ width: '92%', flexDirection: 'row', height: 115, alignItems: 'center' }}>

                            <View style={{ width: '100%', justifyContent: 'center' }}>
                                <Text style={{ margintop: 20, marginBottom: 5, fontFamily: AppFontFamily.PopinsMedium, fontSize: 12, color: AppColors.themeBlackColor }}>
                                    {data.type}
                                </Text>

                                <TextInput
                                    onChangeText={text => setDocNumber(text)}
                                    value={docNumber}
                                    placeholder={"Enter " + data.type}
                                    placeholderTextColor={AppColors.themeTextGrayColor}
                                    style={{ backgroundColor: AppColors.themesWhiteColor, borderColor: AppColors.themeCardBorderColor, borderWidth: 1, borderRadius: 5, fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeBlackColor, padding: 10, width: '100%', fontSize: 12, textAlign: 'left' }}
                                    keyboardType={
                                        Platform.OS === 'android' ? 'numeric' : 'number-pad'
                                    }
                                />

                            </View>

                        </View>



                        {data.index == 1 ? DlView() : AadharView()}


                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', height: 20, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                        <View style={{ width: '40%', height: 1, backgroundColor: AppColors.themeCardBorderColor }}></View>
                        <Text style={{ marginLeft: 10, marginRight: 10, fontFamily: AppFontFamily.PopinsMedium, fontSize: 12, color: AppColors.themeBlackColor }}>
                            {'Or'}
                        </Text>
                        <View style={{ width: '40%', height: 1, backgroundColor: AppColors.themeCardBorderColor }}></View>

                    </View>


                    <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>

                        <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', justifyContent: 'center', backgroundColor: AppColors.themePickupDropSearchBg, borderRadius: 10, padding: 8 }}>
                            <Pressable onPress={(() => uploadImagePress('front'))}>

                                <Image source={frontImg ? { uri: frontImg } : require('../../assets/front.png')} style={{ width: screenWidth, height: screenWidth, resizeMode: 'cover' }} />
                            </Pressable>
                            <View style={{ width: 10 }}></View>
                            <Pressable onPress={(() => uploadImagePress('back'))}>

                                <Image source={bckImg ? { uri: bckImg } : require('../../assets/backdoc.png')} style={{ width: screenWidth, height: screenWidth, resizeMode: 'cover' }} />
                            </Pressable>

                        </View>

                    </View>

                </View>

                <View style={{ width: '100%', alignItems: 'center', marginTop: 50 }}>
                    <ButtonPrimary
                        style={{ width: '90%' }}
                        text={'Verify'}
                        onPress={() => onNextPress()}
                    />
                </View>


                <SelectImagePopup
                    isLoading={openPhoto}
                    closePopup={() => setOpenPhoto(false)}
                    onPressCam={() => { openCam() }}
                    onPressGal={() => { openGall() }}
                />

                <CommonLoaders.ChatLoader isLoading={isLoading} loaderText={'Updating KYC...Please wait'} />

            </View>
        </ScrollView>
    )
}
