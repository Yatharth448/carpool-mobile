import React from 'react'
import { View, TextInput } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import { Header } from '../../components/commomheader/CommonHeader'
import { AppFontFamily } from '../../components/constants/AppFonts'
import { ButtonPrimary } from '../../components/button/buttonPrimary'
import { hitApiToAddVehicle } from '../home/RideModal'
import Toast from 'react-native-simple-toast'

export default function AddVehicle({ navigation, route }) {

    const [vehicleName, setVehicleName] = React.useState('')
    const [vehicleNumber, setVehicleNumber] = React.useState('')


    const AddVehicle = async () => {

        const result = await hitApiToAddVehicle(vehicleName, vehicleNumber)
        // console.log(result, 'add vehicle result')
        if (result.status) {
            Toast.show(result.message);
            navigation.navigate('FindRide', {'from': 'vehicle'})
        }
    }

    return (
        <View style={{ flex: 1, width: '100%', backgroundColor: AppColors.themesWhiteColor, alignItems: 'center' }}>
            <Header close={() => { navigation.navigate('FindRide', {'from': 'vehicle'}) }} isBack={true} text='Add Vehicle' />

            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>


                <View style={{ backgroundColor: AppColors.themePickupDropSearchBg, width: '95%', borderRadius: 10 }}>
                    <TextInput
                        onChangeText={text => setVehicleName(text)}
                        value={vehicleName}
                        placeholder={"Vehicle Name"}
                        placeholderTextColor={AppColors.themeTextGrayColor}
                        style={{ fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeBlackColor, padding: 10, width: '95%', fontSize: 14, textAlign: 'left' }}
                    // keyboardType={
                    //     Platform.OS === 'android' ? 'numeric' : 'number-pad'
                    // }
                    />
                </View>




                <View style={{ backgroundColor: AppColors.themePickupDropSearchBg, width: '95%', borderRadius: 10, marginTop: 20, marginBottom: 10 }}>
                    <TextInput
                        onChangeText={text => setVehicleNumber(text)}
                        value={vehicleNumber}
                        placeholder={"Vehicle Number"}
                        placeholderTextColor={AppColors.themeTextGrayColor}
                        style={{ fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeBlackColor, padding: 10, width: '95%', fontSize: 14, textAlign: 'left' }}
                    // keyboardType={
                    //     Platform.OS === 'android' ? 'numeric' : 'number-pad'
                    // }
                    />
                </View>

                <View style={{ width: '95%', marginTop: 50 }}>

                    <ButtonPrimary
                        onPress={() => AddVehicle()}
                        text={'Add Vehicle'}
                    />
                </View>


            </View>




        </View>
    )
}
