import React, { useEffect } from 'react'
import { View, Image, TextInput, Platform, Dimensions } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import Toast from 'react-native-simple-toast'
import { hitApiToUpdateProfile } from './ProfileModal';
import { Header } from '../../components/commomheader/CommonHeader';
import { connect } from 'react-redux';
import { getProfileDataRequest } from '../../redux/actions/actions';
import { AppFontFamily } from '../../components/constants/AppFonts';
import { Surface } from 'react-native-paper';
import { ButtonPrimary } from '../../components/button/buttonPrimary';
function UpdateProfile({ data, loading, error, getProfileDataRequest, navigation }) {


    const [fullName, setFullName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [mobile, setMobile] = React.useState("");
    const [date, setDate] = React.useState(new Date())
 

    useEffect(() => {
        getProfileDataRequest();

        setFullName(data.name)
        setEmail(data.email)
        setMobile(data.contact_number)
        console.log(data, 'result')

    }, []);

  

    const saveAndContinue = async () => {

        try {


            if (!fullName) {
                console.log('2')
                Toast.showWithGravity('Enter full name', 2, Toast.TOP);
            }
            else if (!email) {
                console.log('2')
                Toast.showWithGravity('Enter email', 2, Toast.TOP);
            }
            else if (!date) {
                console.log('2')
                Toast.showWithGravity('Select Date', 2, Toast.TOP);
            }
            else {

                const accountRes = await hitApiToUpdateProfile(fullName, email, date)

                if (accountRes.status) {
                    // Storage.saveItem(AppKeys.SECRET_KEY, loginRes.secret)
                    getProfileDataRequest();
                    navigation.goBack()
                }
                else {
                    Toast.showWithGravity(loginRes.message, 2, Toast.TOP);
                }
                //    
            }
        }
        catch (error) {

        }

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

    return (
        <View style={{ flex: 1, backgroundColor: AppColors.themePickupDropSearchBg }}>

            <Header close={() => { navigation.goBack() }} text='Profile' right={false} />


            <View style={{ alignItems: 'center', width: '100%', height: Platform.OS == 'android' ? '92%' : '84%' }}>

                <View style={{ width: '96%', borderRadius: 10, marginTop: 30, justifyContent: 'center' }}>

                    <View style={{ width: '96%', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../../assets/otp.png')} style={{ borderColor: AppColors.themeCardBorderColor, borderRadius: 40, borderWidth: 2, width: 80, height: 80, resizeMode: 'contain' }} />
                    </View>
                    <Image source={require('../../assets/edit.png')} style={{ marginLeft: Dimensions.get('window').width / 2 + 5, position: 'absolute', width: 20, height: 20, borderRadius: 40, borderRadius: 40, borderColor: AppColors.themesWhiteColor, borderWidth: .5, resizeMode: 'contain' }} />

                    <View style={{ width: '96%', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>

                        <TextInput
                            style={{ fontSize: 20, fontFamily: AppFontFamily.PopinsBold, color: AppColors.themeBlackColor }}
                            placeholder={'Enter fullname'}
                            placeholderTextColor={AppColors.themeTextGrayColor}
                            value={fullName}
                            onChangeText={(text) => onChangeFullName(text)}
                     
                        />
                       
                    </View>


                </View>


                <Surface style={{ width: '92%', borderRadius: 10, marginTop: 30, justifyContent: 'center', padding: 20 }}>

                    <View style={{ width: '90%', flexDirection: 'row', }}>

                        <View style={{ width: '20%', justifyContent: 'center' }}>
                            <Image source={require('../../assets/phone.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                        </View>
                        <View style={{ width: '80%', justifyContent: 'center' }}>

                            <TextInput
                                style={{ fontSize: 16, fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeText2Color }}
                                placeholder={'Enter mmobile'}
                                placeholderTextColor={AppColors.themeTextGrayColor}
                                value={mobile}
                                onChangeText={(text) => onChangeMobile(text)}
                            />
                        </View>

                    </View>
                    <View style={{ marginTop: 10, marginBottom: 15, marginLeft: 45, width: '88%', height: 1, backgroundColor: AppColors.themeCardBorderColor }}></View>


                    <View style={{ width: '90%', flexDirection: 'row', }}>

                        <View style={{ width: '20%', justifyContent: 'center' }}>
                            <Image source={require('../../assets/mail.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                        </View>
                        <View style={{ width: '80%', justifyContent: 'center' }}>
                            <TextInput
                                style={{ fontSize: 16, fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeText2Color }}
                                placeholder={'Enter mmobile'}
                                placeholderTextColor={AppColors.themeTextGrayColor}
                                value={email}
                                onChangeText={(text) => onChangeEmail(text)}
                            />
                        </View>

                    </View>
                    <View style={{ marginTop: 10, marginBottom: 15, marginLeft: 45, width: '88%', height: 1, backgroundColor: AppColors.themeCardBorderColor }}></View>


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

                    </View>


                </Surface>


                <View style={{ width: '100%', alignItems: 'center', marginTop: 10, }}>
                    <View style={{ width: '92%', alignItems: 'center' }}>
                        <ButtonPrimary
                            text={'Save info'}
                            onPress={() => saveAndContinue()}
                            loader={false}
                        />
                    </View>
                </View>

            </View>




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