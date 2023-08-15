import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import { Header } from '../../components/commomheader/CommonHeader'
import RequestedRides from './RequestedRides'
import OfferedRides from './OfferedRide'
import { hitApiToGetRequestedRideDetails } from './RideHistoryModal'

export default function RideHistory({ navigation }) {

    const [isRequest, setIsRequest] = React.useState(false)


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
        navigation.navigate('RideDetails', { id: item._id, from: 'offered' })
    }

    const selectedRequest = (item) => {

        console.log(item, 'selected request')
        navigation.navigate('RideDetails', { id: item.ride_id, from: 'requested' })
    }


    const viewRequest = async (item) => {

        const result = await hitApiToGetRequestedRideDetails(item.ride_id)

        if (result.status) {
            navigation.navigate('Cotravellers', {data: result.data.rideData})
        }

        console.log(result.data.rideData, 'view request')
    }


    return (
        <View style={{ flex: 1, backgroundColor: AppColors.themePickupDropSearchBg }}>

            <Header isBack={false} close={() => { navigation.openDrawer() }} text='Ride History' right={false} />

            <View style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-evenly', marginTop: 10 }}>

                <TouchableOpacity style={{ width: '40%', height: 50, alignItems: 'center', justifyContent: 'center' }} onPress={() => changeTab('request')}>
                    <Text style={{ width: '100%', textAlign: 'center', color: isRequest ? AppColors.themePrimaryColor : AppColors.themeTextPrimaryColor, fontSize: 18 }}>{'Requested Rides'}</Text>
                    <View style={{ marginTop: 10, width: '100%', height: 2.5, backgroundColor: isRequest ? AppColors.themePrimaryColor : null }} />
                </TouchableOpacity>

                <TouchableOpacity style={{ width: '40%', height: 50, alignItems: 'center', justifyContent: 'center' }} onPress={() => changeTab('offer')}>
                    <Text style={{ width: '100%', textAlign: 'center', color: isRequest ? AppColors.themeTextPrimaryColor : AppColors.themePrimaryColor, fontSize: 18 }}>{'Offered Rides'}</Text>
                    <View style={{ marginTop: 10, width: '100%', height: 2.5, backgroundColor: isRequest ? null : AppColors.themePrimaryColor }} />
                </TouchableOpacity>

            </View>

            {isRequest ? <RequestedRides selectedRequest={selectedRequest} viewRequest={viewRequest} /> : <OfferedRides selectedData={selectedData} />}

        </View>
    )
}
