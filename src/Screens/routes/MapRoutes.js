import React, { useEffect } from 'react'
import { View, Text, Pressable, FlatList, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import { Header } from '../../components/commomheader/CommonHeader';
import { hitApiToRequestGetEstimatedPrice, hitApiToRequestUpdateEstimatedPrice, hitApiToSaveRide } from '../home/RideModal';
import Toast from 'react-native-simple-toast'
import MapView, { Polyline, Marker } from 'react-native-maps';
import { PriceSelection } from '../../components/priceselection/PriceSelection';
export default function MapRoutes({ navigation, route }) {
    // let  path1 = [];
    const mapRef = React.useRef(null);

    const { pick, drop, date, seat, routeData, price } = route.params;
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const [openPrice, setOpenPrice] = React.useState(false)
    const [estimatedPrice, setEstimatedPrice] = React.useState('')
    const [journeyId, setJourneyId] = React.useState('')
    // openPrice

    useEffect(() => {

        (async () => {

            // console.log(routeData, 'new data')


            console.log(price, 'abc')


        })();

        return () => {
            // clear/remove event listener

        }
    }, [journeyId, estimatedPrice, selectedIndex, openPrice]);


    const handleMapLayout = () => {
        const coordinates = routeData.reduce((acc, path) => {
            acc.push(path.origin, path.destination);
            return acc;
        }, []);

        mapRef.current.fitToCoordinates(coordinates, {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 100 },
            animated: true,
        });
    };



    const saveRide = async () => {

        const result = await hitApiToSaveRide(pick, drop, seat, date, selectedIndex, price)
        console.log(result)
        if (result.status) {

            setJourneyId(result.data.rideId)
            const price = await hitApiToRequestGetEstimatedPrice(result.data.rideId)
            if (price.status) {

                // {"data": 952.4361, "status": true} 
                setOpenPrice(true)
                setEstimatedPrice(String(price.data))
                // navigation.goBack()
            }
            console.log(price, 'result')

        }
        else {
            Toast.showWithGravity(result.message ?? result.error ?? 'Something went wrong', 2, Toast.TOP);
        }

    }


    const updateEstimatedRide = async (estimatedPrice) => {

        const result = await hitApiToRequestUpdateEstimatedPrice(journeyId, estimatedPrice)
        console.log(result)
        if (result.status) {


            // {"data": 952.4361, "status": true} 
           
           
            navigation.goBack()
            setOpenPrice(false)
           

        }
        else {
            Toast.showWithGravity(result.message ?? result.error ?? 'Something went wrong', 2, Toast.TOP);
        }

    }

    const save = (val) => {
        if (!val) {
            Toast.showWithGravity('Please enter estimated price', 2, Toast.TOP);
        }
        else {
           
            updateEstimatedRide(val)

        }
        console.log(val, 'price')

    }

    const selectedPrice = (val) => {
        setOpenPrice(false)
    }
    const closeEstimatePopup = () => {
        setOpenPrice(false)
    }

    return (
        <View style={{ flex: 1, width: '100%', backgroundColor: AppColors.themePickupDropSearchBg, alignItems: 'center' }}>
            <Header close={() => { navigation.goBack() }} />
            {routeData.length > 0 ?
                <MapView
                    ref={mapRef}
                    style={styles.maps}
                    onLayout={handleMapLayout}
                    initialRegion={{
                        latitude: routeData[0].origin.latitude,
                        longitude: routeData[0].origin.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>

                    {routeData.map((path, index) => (
                        <React.Fragment key={index}>
                            <Polyline
                                coordinates={path.cords}
                                strokeColor={index == selectedIndex ? AppColors.themePrimaryColor : AppColors.themeBlackColor}
                                strokeWidth={8}
                            />
                            <Marker coordinate={path.origin} />
                            <Marker coordinate={path.destination} />
                        </React.Fragment>
                    ))}

                </MapView> : null
            }


            <FlatList
                data={routeData}
                columnWrapperStyle={{ flexWrap: 'wrap' }}
                numColumns={3}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <>
                        <View style={{ padding: 0 }}>
                            <Pressable onPress={() => { setSelectedIndex(index) }} style={{ marginTop: 5, marginLeft: 5, backgroundColor: AppColors.themesWhiteColor, borderRadius: 10, borderWidth: 2, borderColor: selectedIndex == index ? AppColors.themePrimaryColor : AppColors.themeCardBorderColor }}>
                                <View style={{ padding: 10 }}>
                                    <Text numberOfLines={3} style={{ color: AppColors.themeBlackColor, fontSize: 16, fontWeight: '700' }}>{item.duration}</Text>
                                    <Text numberOfLines={3} style={{ color: AppColors.themeText2Color, fontSize: 14, fontWeight: '700' }}>{item.distance + " / " + item.summary}</Text>
                                </View>
                            </Pressable>
                        </View>

                    </>
                )}
            />

            <View style={{ justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width, height: Dimensions.get('window').height / 5 }}>

                <TouchableOpacity onPress={() => saveRide()} style={{ marginTop: 20, backgroundColor: AppColors.themePrimaryColor, width: '55%', height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: AppColors.themesWhiteColor }}>{'SAVE RIDE'}</Text>
                </TouchableOpacity>

            </View>

            {PriceSelection('Estimated Price', openPrice ? true : false, closeEstimatePopup, selectedPrice, estimatedPrice, price, save)}


        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    maps: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height / 2,
    },
});