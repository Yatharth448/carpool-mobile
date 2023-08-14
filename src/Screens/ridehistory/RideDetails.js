import React, {useEffect} from 'react'
import { View } from 'react-native';
import { hitApiToGetOfferedRideDetails, hitApiToGetRequestedRideDetails } from './RideHistoryModal';
import { Header } from '../../components/commomheader/CommonHeader';

export default function RideDetails({navigation, route}) {

    const { id } = route.params;

    useEffect(() => {

        (async () => {

            //Put your logic here
            let result;
           

                result = await hitApiToGetOfferedRideDetails({id: id})
                // result = await hitApiToGetRequestedRideDetails({id: id})
            
            
            if (result.status) {

                console.log(result, 'data')
            }

        })();

        return () => {
            // clear/remove event listener

        }
    }, []);
    return (
        <View>
            <Header isBack={true} close={()=> navigation.goBack()} text='Ride Details'/>

        </View>
    )
}
