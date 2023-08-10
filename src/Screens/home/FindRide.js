import React, { useEffect } from "react";
import { Text, View, Image, TouchableOpacity, Platform, TextInput, Pressable, FlatList, Dimensions } from "react-native";
import { AppColors } from "../../components/constants/AppColor";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FindAndOfferRide } from "../../components/findandoffer/FindAndOfferRide";
import { PickupAndDrop } from "../../components/pickupanddrop/PickupAndDrop"
import { SearchAutocompleteView } from "../../components/GooglLocation/SearchAutocompleteView";
import { DefaultOrMap } from "../../components/defaultormap/DefaultOrMap";
import DateInput from "../../components/Input/DateInput";
import moment from 'moment';
import DateTimeView from "../../components/datetimeview/DateTimeView";
import DropDownList from "../../components/droplist/DropDownList";
import Toast from 'react-native-simple-toast'
import { AppTexts } from "../../components/constants/AppTexts";
import MapView, { Marker } from 'react-native-maps';
import { hitApiToGetRoutes } from "./RideModal";
import { GetCurrentLocation, checkLocationPermission } from "../../components/location/GetCurrentLocation";
import { AvtarView, CotravellerView, SeatsView } from "./RideComponent";
import { ButtonPrimary } from "../../components/button/buttonPrimary";
import { RecentHorizontal } from "../../components/RecentSearch/RecentHorizontal";
import { SearchLocation } from "../../components/GooglLocation/SearchLocation";
import MapComponent from "../../components/map/MapComponent";
import { hitApiToGetRideList } from "../findridelist/RideListModal";
import { Surface } from "react-native-paper";

export default function FindRide({ navigation }) {

    const customMapStyle = [
        // Paste your custom map style JSON here
        // Example:
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": '#ffffff',
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#403ADD"
                }
            ]
        },
        // ... add more styles
    ];
    const [openDate, setOpenDate] = React.useState(false)
    const [cotraveller, setCotraveller] = React.useState(false)
    const [selectedIndex, setIndex] = React.useState(0)
    const [find, setFind] = React.useState(true)
    const [openTime, setOpenTime] = React.useState(false)
    const [date, setDate] = React.useState(new Date())
    const [selectedDate, setSelectedDate] = React.useState('Date and time of departure')
    const [selectedTime, setSelectedTime] = React.useState('Select ride time')
    const [openSearch, setOpenSearch] = React.useState('')
    const [pickupLocation, setPickupLocation] = React.useState('')
    const [dropLocation, setDropLocation] = React.useState('')
    const [noOfPassenger, setNoOfPassenger] = React.useState('No of passengers')
    const [selectCar, setSelectedCar] = React.useState('Select car')
    const [seater, setSeater] = React.useState('No of seats')
    const [seatCount, setSeatCount] = React.useState(0)
    const [passengerValue, setPassengerValue] = React.useState(1)
    const [seatPrice, setSeatPrice] = React.useState('')
    const [rawDate, setrawDate] = React.useState('')
    const [isSearch, setIsSearch] = React.useState('cancel')
    const [location, setLocation] = React.useState({})
    const [initialRegion, setInitialRegion] = React.useState({})
    const [markers, setMarker] = React.useState({})
    const [permission, setPermission] = React.useState(false)

    // const [location, setLocation] = React.useState({ latitude: 28.693072, longitude: 76.981635 })


    useEffect(() => {
        // console.log('se', selectedIdType)

        (async () => {



            // Set up the interval to run the function every 10 minutes (600,000 milliseconds)
            reloadMap();




            return () => {

            };

        })();


    }, []);


    // const passengerArray = [{ 'value': '1', 'label': '1 passenger' }, { 'value': '2', 'label': '2 passenger' }, { 'value': '3', 'label': '3 passenger' }, { 'value': '4', 'label': '4 passenger' }, { 'value': '5', 'label': '5 passenger' }, { 'value': '6', 'label': '6 passenger' }]
    // const carArray = [{ 'value': '1', 'label': 'Tata Nexon' }, { 'value': '2', 'label': 'MG Hector' }]

    // const seaterArray = [{ 'value': '1', 'label': '1 seater' }, { 'value': '2', 'label': '2 seater' }, { 'value': '3', 'label': '3 seater' }, { 'value': '4', 'label': '4 seater' }, { 'value': '5', 'label': '5 seater' }, { 'value': '6', 'label': '6 seater' }]

    const reloadMap = async () => {

        // Add your code here to perform tasks that need to run every 10 minutes
        console.log('relod 1')

        const perm = await checkLocationPermission()

        if (perm) {

            const loc = await GetCurrentLocation()
            console.log(loc, 'loaction')

            if (loc) {
                setLocation(loc)
                console.log('relod 2', initialRegion, markers)

                setInitialRegion({
                    latitude: loc.latitude,
                    longitude: loc.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });

                setMarker({ coordinate: { latitude: loc.latitude, longitude: loc.longitude } })
                setPermission(true)
            }
        }

    };


    const findRide = () => {
        setFind(true)
        console.log('find ride')
    }

    const offerRide = () => {
        setFind(false)
        console.log('offer ride')
    }

    const pickUp = () => {
        // navigation.navigate('SearchLocation')
        setOpenSearch('pick')
        console.log('pick up', openSearch)
    }

    const dropOff = () => {
        setOpenSearch('drop')
        console.log('drop off')
    }
    const openLocationSearch = () => {
        openSearch == 'pick' ? setPickupLocation('') : setDropLocation('')
        setOpenSearch('')
    }
    const onSelectionPress = (val) => {
        console.log(openSearch, val, 'gog')
        // openSearch == 'pick' ? setPickupLocation(val.pick) : openSearch == 'drop' ? setDropLocation(val.drop) : ''
        setPickupLocation(val.pick)
        setDropLocation(val.drop)

        setOpenSearch('')
    }


    const onDateConfirm = (date) => {
        setOpenDate(false)
        setDate(date)

        setSelectedDate(moment(date).format('DD-MM-YYYY HH:mm:ss A'))
        setrawDate(String(date))

    }
    const onDateCancel = () => {
        setOpenDate(false)
    }

    const onTimeConfirm = (date) => {
        setOpenTime(false)
        setDate(date)

        setSelectedTime(moment(date).format('hh:mm A'))

    }
    const onTimeCancel = () => {
        setOpenTime(false)
    }

    const openDatePicker = () => {

        setOpenDate(true)
        console.log('date open')
    }
    const openTimePicker = (date) => {

        setOpenTime(true)
        // console.log(date, 'date')
    }

    const passengersAvailable = (text) => {
        setNoOfPassenger(text.label)
        setPassengerValue(text.value)
    }


    const carAvailable = (text) => {
        setSelectedCar(text.label)
    }

    const seatAvailable = (text) => {
        setSeater(text.label)
        setSeatCount(text.value)
    }


    const getSearchData = async (pick, drop, date, seat) => {
        const result = await hitApiToGetRideList(pick, drop, date, seat);
        console.log("ride list", result);
        if (result.status) {

            // setRideList(result.data ?? [])


            setIsSearch('cancel')
            navigation.navigate('FindRideList', { data: result.data })


        }
        else {
            console.log(result)
            if (result.message == 'No ride found') {
                setIsSearch('notfound')
            }

        }
    }


    const searchRide = async () => {

        if (passengerValue <= 0) {

            Toast.showWithGravity('Select no of passengers', 2, Toast.TOP);
        }
        if (!pickupLocation) {

            Toast.showWithGravity('Select pickup location', 2, Toast.TOP);
        }
        else if (!dropLocation) {

            Toast.showWithGravity('Select drop location', 2, Toast.TOP);
        }
        else if (!selectedDate) {

            Toast.showWithGravity('Select Date', 2, Toast.TOP);
        }

        // else if (!passengerValue) {

        //     Toast.showWithGravity('Select no of passengers', 2, Toast.TOP);
        // }
        else {
            console.log('search ride')

            setIsSearch('start')
            await getSearchData(pickupLocation, dropLocation, rawDate, passengerValue)
            // console.log(pickupLocation, dropLocation,selectedDate, 'check data')

        }

    }


    const searchLoaderScreen = () => {
        console.log(pickupLocation, dropLocation, 'loc')
        return (

            <View style={{
                alignItems: 'center', backgroundColor: AppColors.themesWhiteColor, marginTop: 0,
                width: '100%', borderTopRightRadius: 30, borderTopLeftRadius: 30, height: Dimensions.get('window').height * .32, justifyContent: 'center'
            }}>

                <Surface style={{ width: '95%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} elevation={4}>


                    <View style={{ width: '15%', alignItems: 'center' }}>

                        <Image source={require('../../assets/dotone.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />
                        <Image source={require('../../assets/dotline.png')} style={{ marginLeft: 0, width: 5, height: 40, resizeMode: 'contain' }} />
                        <Image source={require('../../assets/triangle.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />

                    </View>

                    <View style={{ width: '85%', justifyContent: 'center', alignItems: 'center' }}>


                        <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row' }}>

                            <TouchableOpacity style={{ width: '98%', justifyContent: 'center', paddingTop: 10, paddingBottom: 10 }} >
                                <Text style={{ width: '100%', color: AppColors.themeTextGrayColor, fontSize: 16 }}>{pickupLocation}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginLeft: 0, width: '100%', height: 1, backgroundColor: AppColors.themeTextGrayColor }}></View>
                        <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row' }}>

                            <TouchableOpacity style={{ width: '98%', justifyContent: 'center', paddingTop: 10, paddingBottom: 10 }} >
                                <Text style={{ width: '100%', color: AppColors.themeTextGrayColor, fontSize: 16 }}>{dropLocation}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </Surface>

                <View style={{ width: '95%', alignItems: 'center', marginTop: 20 }}>
                    <ButtonPrimary
                        text={'Cancel Booking'}
                        onPress={() => setIsSearch('cancel')}
                        loader={false}
                    />
                </View>

            </View>

        )
    }

    const NoRideFound = () => {
        return (

            <View style={{
                alignItems: 'center', backgroundColor: AppColors.themesWhiteColor, marginTop: 0,
                width: '100%', borderTopRightRadius: 30, borderTopLeftRadius: 30, height: Dimensions.get('window').height * .32, justifyContent: 'center'
            }}>

                <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center' }} elevation={4}>


                    <View style={{ width: '100%', alignItems: 'center' }}>

                        <Image source={require('../../assets/dotone.png')} style={{ borderRadius: 40, width: 80, height: 80, resizeMode: 'contain' }} />

                    </View>

                    <View style={{ width: '85%', justifyContent: 'center', alignItems: 'center' }}>




                        <TouchableOpacity style={{ width: '70%', justifyContent: 'center', paddingTop: 10, paddingBottom: 10 }} >
                            <Text style={{ textAlign: 'center', width: '100%', color: AppColors.themeTextGrayColor, fontSize: 16 }}>{'Sorry, there are no vehicles in the area'}</Text>
                        </TouchableOpacity>


                    </View>

                </View>

                <View style={{ width: '95%', alignItems: 'center', marginTop: 20 }}>
                    <ButtonPrimary
                        text={'Choose another location'}
                        onPress={() => chooseAnother()}
                        loader={false}
                    />
                </View>

            </View>

        )
    }

    const chooseAnother = () => {
        setOpenSearch('pick')
        setIsSearch('cancel')
    }

    const procced = async () => {

        if (!pickupLocation) {

            Toast.showWithGravity('Select pickup location', 2, Toast.TOP);
        }
        else if (!dropLocation) {

            Toast.showWithGravity('Select drop location', 2, Toast.TOP);
        }
        else if (!selectedDate) {

            Toast.showWithGravity('Select Date', 2, Toast.TOP);
        }

        else if (!seater) {

            Toast.showWithGravity('Select no of seats available', 2, Toast.TOP);
        }
        else if (seatPrice.length < 1) {

            Toast.showWithGravity('Enter price per seat', 2, Toast.TOP);
        }
        else {

            // console.log(pickupLocation, dropLocation,selectedDate, 'check data')
            const routeData = await getPolylineCoordinats(pickupLocation, dropLocation)

            navigation.navigate('MapRoutes', { pick: pickupLocation, drop: dropLocation, date: rawDate, seat: seatCount, routeData, price: seatPrice })
        }

    }


    const getPolylineCoordinats = async (pick, drop) => {

        const result = await hitApiToGetRoutes(pick, drop)
        console.log(result.data)
        let myData = []
        let i = 0;
        for (let data of result.data) {


            for (let leg of data.legs) {


                let arr = []
                for (let step of leg.steps) {
                    let data2 = { 'latitude': step.start_location.lat, 'longitude': step.start_location.lng, }
                    arr.push(data2)

                }

                let abc = {
                    "cords": arr,
                    "distance": leg.distance.text,
                    "duration": leg.duration.text,
                    "origin": { 'latitude': leg.start_location.lat, 'longitude': leg.start_location.lng },
                    "destination": { 'latitude': leg.end_location.lat, 'longitude': leg.end_location.lng },
                    "summary": data.summary,


                }
                myData.push(abc)
                console.log(myData, 'data')
                i = i + 1

            }


        }

        return myData

    }


    const setSelectedIndex = (i) => {
        setIndex(i)
        setPassengerValue(i + 1)


    }
    const onCheck = () => {
        setCotraveller(!cotraveller)
    }



    const SearchOffer = () => {
        return (
            <View style={{
                alignItems: 'center', backgroundColor: AppColors.themesWhiteColor, marginTop: -50,
                width: '100%', borderTopRightRadius: 30, borderTopLeftRadius: 30
            }}>
                <View style={{ alignItems: 'center', width: '96%', marginTop: 0 }}>



                    {FindAndOfferRide(findRide, offerRide, find)}

                    <AvtarView image={require('../../assets/profile.png')} name={'Yatharth'} />
                    <View style={{ width: '94%', height: 1, marginTop: 20, backgroundColor: AppColors.themeCardBorderColor }} />
                    <SeatsView
                        data={['1', '2', '3', '4']}
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}
                    />
                    <CotravellerView onCheck={onCheck} image={cotraveller ? 'checkbox-outline' : 'checkbox-blank-outline'} />
                    <View style={{ width: '94%', height: 1, marginTop: 20, backgroundColor: AppColors.themeCardBorderColor }} />
                    {PickupAndDrop(pickupLocation, dropLocation, pickUp, dropOff)}

                    {/* {DefaultOrMap(useDefault, useMap)} */}

                    <View style={{ alignItems: 'center', width: '95%', justifyContent: 'center' }}>

                        {find ?
                            <>
                                <View style={{ marginTop: 10, width: '100%', height: 70, justifyContent: 'center', alignItems: 'center' }}>


                                    {DateTimeView('date', openDate, date, onDateConfirm, onDateCancel, openDatePicker, selectedDate)}


                                </View>

                                <View style={{ width: '100%', height: 70, alignItems: 'center', marginTop: 10 }}>
                                    <ButtonPrimary
                                        text={'Search for rides'}
                                        onPress={() => searchRide()}
                                        loader={false}
                                    />
                                </View>

                                <View style={{ width: '100%', height: 1, marginBottom: 20, backgroundColor: AppColors.themeCardBorderColor }} />

                                <View style={{ width: '100%', alignItems: 'flex-start', marginBottom: 20 }}>
                                    <RecentHorizontal recentArray={['1', '2']} onPress={() => console.log('item pressed')} />
                                </View>

                            </>

                            :


                            <View style={{ width: '100%', height: 70, justifyContent: 'center', alignItems: 'center' }}>

                                <View style={{ flexDirection: 'row', width: '100%', }}>

                                    <View style={{ width: '50%' }}>
                                        {DateTimeView('date', openDate, date, onDateConfirm, onDateCancel, openDatePicker, selectedDate)}
                                    </View>
                                    <View style={{ width: '50%' }}>
                                        {DateTimeView('time', openTime, date, onTimeConfirm, onTimeCancel, openTimePicker, selectedTime)}
                                    </View>
                                </View>
                                <View style={{ marginTop: 10, width: '90%', height: 1, marginLeft: 20, backgroundColor: AppColors.themeCardBorderColor }}></View>

                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                    <View style={{ width: '50%' }}>

                                        {DropDownList('car', selectCar, carAvailable)}
                                    </View>
                                    <View style={{ width: '50%' }}>

                                        {DropDownList('seat', seater, seatAvailable)}
                                    </View>
                                </View>


                            </View>

                        }

                    </View>

                </View>



            </View>

        )


        // {
        //     find ?


        // <View style={{ width: '80%', marginTop: 20, alignItems: 'center', paddingLeft: 10, backgroundColor: AppColors.themesWhiteColor }}>
        //     <View style={{ width: '90%' }}>

        //         {DropDownList('passenger', noOfPassenger, passengersAvailable)}
        //     </View>

        // </View>
        //         null

        //         :
        //         <View style={{ height: 50, borderRadius: 5, flexDirection: 'row', width: '80%', marginTop: 20, alignItems: 'center', paddingLeft: 20, backgroundColor: AppColors.themesWhiteColor }}>
        //             <Image source={require('../../assets/profile.png')} style={{ tintColor: AppColors.themePrimaryColor, marginLeft: 0, marginRight: 10, width: 25, resizeMode: 'contain' }} />
        //             <Text style={{ fontSize: 16, color: AppColors.themeBlackColor, fontWeight: '600' }}>{'Price per seat'}</Text>
        //             <TextInput
        //                 onChangeText={text => setSeatPrice(text)}
        //                 value={seatPrice}
        //                 placeholder={AppTexts.Rupee_Symbol + " price"}
        //                 placeholderTextColor={AppColors.themeText2Color}
        //                 style={{ color: AppColors.themeBlackColor, marginLeft: 20, width: '20%', fontSize: 16, textAlign: 'center', fontWeight: '700' }}
        //             />
        //         </View>

        // }


        {/* <TouchableOpacity onPress={() => find ? searchRide() : procced()} style={{ marginTop: 20, backgroundColor: AppColors.themePrimaryColor, width: '55%', height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: AppColors.themesWhiteColor }}>{find ? 'SEARCH' : 'PROCCED'}</Text>
                </TouchableOpacity> */}


    }



    const HeaderView = () => {
        return (
            <>
                <View style={{ height: isSearch == 'cancel' ? 300 : Dimensions.get('window').height * .65, width: '100%' }}>
                    {permission ?
                        <MapComponent initialRegion={initialRegion} markers={markers} /> :
                        null}

                </View>

                <View style={{ position: 'absolute', top: 20, width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Pressable onPress={() => navigation.openDrawer()} style={{ width: '50%', height: 70, alignItems: 'flex-start', paddingLeft: 10, justifyContent: 'center' }}>


                        <Image source={require('../../assets/menu.png')} style={{ width: 70, height: 70 }} />

                    </Pressable>
                    <Pressable style={{ width: '50%', height: 50, alignItems: 'flex-end', paddingRight: 20, justifyContent: 'center' }}>
                        <Surface style={{ backgroundColor: AppColors.themesWhiteColor, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} elevation={4}>
                            <Image source={require('../../assets/notification.png')} style={{ width: 30, height: 30 }} />
                        </Surface>
                    </Pressable>

                </View>

                {isSearch == 'cancel' ? SearchOffer() : isSearch == 'start' ? searchLoaderScreen() : NoRideFound()}


            </>
        )
    }









    return (
        <View style={{ flex: 1, alignItems: 'center' }}>

            {/* <View style={{ width: '100%', height: Platform.OS == 'android' ? '10%' : '16%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}> */}


            <FlatList
                data={['1']}
                // columnWrapperStyle={{ flexWrap: 'wrap' }}
                // numColumns={5}
                contentContainerStyle={{ width: Dimensions.get('window').width }}
                ListHeaderComponent={<HeaderView />}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <>
                        <View style={{ padding: 0 }}>

                        </View>

                    </>
                )}
            />

            <SearchLocation
                headerText={'Select address'}
                isLoading={openSearch ? true : false}
                closePopup={openLocationSearch}
                onSelectionPress={onSelectionPress}
            />
        </View>
    )
}
