import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import { Header } from '../../components/commomheader/CommonHeader'

export default function RideHistory({ navigation }) {

    const [isRequest, setIsRequest] = React.useState(false)

    return (
        <View style={{ flex: 1, backgroundColor: AppColors.themePickupDropSearchBg }}>

            <Header isBack={false} close={() => { navigation.openDrawer() }} text='Ride History' right={false} />

            <View style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-evenly', marginTop: 10 }}>

                <TouchableOpacity style={{ width: '45%', height: 50, alignItems: 'center', justifyContent: 'center' }} onPress={()=> console.log('a')}>
                    <Text style={{ width: '100%', textAlign: 'center', color: isRequest ? AppColors.themePrimaryColor : AppColors.themeTextPrimaryColor, fontSize: 18 }}>{'Requested Rides'}</Text>
                    <View style={{ marginTop: 10, width: '100%', height: 2.5, backgroundColor: isRequest ? AppColors.themePrimaryColor : null }} />
                </TouchableOpacity>

                <TouchableOpacity style={{ width: '45%', height: 50, alignItems: 'center', justifyContent: 'center' }} onPress={()=> console.log('b')}>
                    <Text style={{ width: '100%', textAlign: 'center', color: isRequest ? AppColors.themeTextPrimaryColor : AppColors.themePrimaryColor, fontSize: 18 }}>{'Offered Rides'}</Text>
                    <View style={{ marginTop: 10, width: '100%', height: 2.5, backgroundColor: isRequest ? null : AppColors.themePrimaryColor }} />
                </TouchableOpacity>

            </View>

        </View>
    )
}
