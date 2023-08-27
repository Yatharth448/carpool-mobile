import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import { Header } from '../../components/commomheader/CommonHeader'
import RequestedRides from './RequestedRides'
import OfferedRides from './OfferedRide'
import { hitApiToGetRequestedRideDetails } from './RideHistoryModal'
import { AppFontFamily } from '../../components/constants/AppFonts'

export default function RideHistory({ navigation }) {

    const [isRequest, setIsRequest] = React.useState(true)


    const changeTab = async (val) => {
        if (val === 'request') {

            setIsRequest(true)

        }
        else {

            setIsRequest(false)

        }
    }


    const selectedData = (item) => {

        console.log(item, 'selected data')
        navigation.navigate('OfferedRideDetails', { id: item._id, from: 'offered' })
    }

    const selectedRequest = (item) => {

        console.log(item, 'selected request')
        navigation.navigate('RequestedRideDetails', { id: item.ride_id, from: 'requested' })
    }


    const viewRequest = async (item) => {

        const result = await hitApiToGetRequestedRideDetails(item.ride_id)

        if (result.status) {
            navigation.navigate('Cotravellers', {data: result.data.rideData})
        }

        console.log(result.data.cotravellerData, 'cotraveller data', result.data.rideData, 'ride data')
    }


    return (
        <View style={{ flex: 1, backgroundColor: AppColors.themePickupDropSearchBg }}>

            <Header isBack={false} close={() => { navigation.openDrawer() }} text='Ride History' right={false} />

            <View style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-evenly', marginTop: 10 }}>

                <TouchableOpacity style={{ width: '40%', height: 50, alignItems: 'center', justifyContent: 'center' }} onPress={() => changeTab('request')}>
                    <Text style={{ width: '100%', textAlign: 'center', color: isRequest ? AppColors.themePrimaryColor : AppColors.themeTextPrimaryColor, fontSize: 16, fontFamily: AppFontFamily.PopinsMedium }}>{'Requested Rides'}</Text>
                    <View style={{ marginTop: 10, width: '100%', height: 2.5, backgroundColor: isRequest ? AppColors.themePrimaryColor : null }} />
                </TouchableOpacity>

                <TouchableOpacity style={{ width: '40%', height: 50, alignItems: 'center', justifyContent: 'center' }} onPress={() => changeTab('offer')}>
                    <Text style={{ width: '100%', textAlign: 'center', color: isRequest ? AppColors.themeTextPrimaryColor : AppColors.themePrimaryColor, fontSize: 16, fontFamily: AppFontFamily.PopinsMedium }}>{'Offered Rides'}</Text>
                    <View style={{ marginTop: 10, width: '100%', height: 2.5, backgroundColor: isRequest ? null : AppColors.themePrimaryColor }} />
                </TouchableOpacity>

            </View>

            {isRequest ? <RequestedRides selectedRequest={selectedRequest} viewRequest={viewRequest} /> : <OfferedRides selectedData={selectedData} />}

        </View>
    )
}
