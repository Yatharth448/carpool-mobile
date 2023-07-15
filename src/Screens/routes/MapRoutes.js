import React, { useEffect } from 'react'
import { View, Text, Pressable, FlatList, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import { Header } from '../../components/commomheader/CommonHeader';
import { hitApiToSaveRide } from '../home/RideModal';
import Toast from 'react-native-simple-toast'
import MapView, { Polyline, Marker } from 'react-native-maps';
export default function MapRoutes({ navigation, route }) {
    // let  path1 = [];
    const mapRef = React.useRef(null);

    const { pick, drop, date, seat, routeData, price } = route.params;
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    useEffect(() => {

        (async () => {

            // console.log(routeData, 'new data')


            console.log(routeData[0].origin, 'abc')


        })();

        return () => {
            // clear/remove event listener

        }
    }, []);


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



    const saveRide = async () =>{

        const result = await hitApiToSaveRide(pick, drop, seat, date, selectedIndex, price)
        console.log(result)
        if (result.status)
        {

            navigation.goBack()

        }
        else{
            Toast.showWithGravity(result.message ?? result.error ?? 'Something went wrong', 2, Toast.TOP);
        }

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

            <TouchableOpacity onPress={() =>  saveRide()} style={{ marginTop: 20, backgroundColor: AppColors.themePrimaryColor, width: '55%', height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: AppColors.themesWhiteColor }}>{'SAVE RIDE'}</Text>
            </TouchableOpacity>

            </View>


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