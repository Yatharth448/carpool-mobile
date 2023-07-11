import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import { TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
export default function LoginScreen({ navigation }) {
    const [mobile, setMobile] = React.useState("");
    return (
        <View style={{ flex: 1, backgroundColor: AppColors.themesWhiteColor, justifyContent: 'center' }}>

            <View style={{ width: '100%', height: '48%',  alignItems: 'center'}}>
                <Image source={require('../../assets/login.png')} style={{ width: '60%', marginTop: '30%', resizeMode: 'contain' }} />
            </View>

            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', height: '30%' }}>
                <Text style={{ fontSize: 26, fontWeight: 'bold', color: AppColors.themeBlackColor  }}>
                    {'Verify your number'}
                </Text>
                <Text style={{ fontSize: 18, fontWeight: '300', textAlign: 'center', marginTop: 30, width: '70%', color: AppColors.themeBlackColor  }}>
                    {'Please enter your Phone Number using country code'}
                </Text>

                <View style={{ width: '100%', alignItems: 'center', marginTop: 50}}>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: '300', textAlign: 'center', color: AppColors.themeTextGrayColor }}>
                            {'Enter Mobile number'}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <Image source={require('../../assets/indFlag.png')} style={{marginRight: 5, width: 30, resizeMode: 'contain' }} />
                        <Image source={require('../../assets/downArrow.png')} style={{ marginRight: -45, width: 10, resizeMode: 'contain' }} />
                        <TextInput
                            style={{ textAlign: 'center', fontWeight: '700', fontSize: 17, width: '60%', height: 40, backgroundColor: 'transparent', color: AppColors.themeBlackColor }}
                            label=""
                            placeholder='Enter mobile number'
                            placeholderTextColor={AppColors.themeBlackColor}
                            value={mobile}
                            onChangeText={text => setMobile(text)}
                            left={<TextInput.Icon source= {"../../assets/indFlag.png"} size={30} style={{ marginRight: 5 }} color={AppColors.themeBlackColor} />}
                        />
                    </View>
                </View>
            </View>


            <View style={{ width: '100%', alignItems: 'center', marginTop: '13%' ,height: '22%'}}>
                <TouchableOpacity onPress={() => navigation.navigate('OTPScreen')} style={{ backgroundColor: AppColors.themePrimaryColor, width: '55%', height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: AppColors.themesWhiteColor }}>{'Generate OTP'}</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}
