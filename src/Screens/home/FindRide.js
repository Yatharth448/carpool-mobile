import React, { useEffect } from "react";
import { Text, View, Image, TouchableOpacity, Platform, TextInput, Pressable, ScrollView } from "react-native";
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
import { hitApiToGetRoutes } from "./RideModal";
import MapView, { Marker } from 'react-native-maps';
import { GetCurrentLocation } from "../../components/location/GetCurrentLocation";
import { AvtarView, CotravellerView, SeatsView } from "./RideComponent";

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
    const [selectedDate, setSelectedDate] = React.useState('Select ride date')
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
    const [location, setLocation] = React.useState({ latitude: 28.693072, longitude: 76.981635 })


    useEffect(() => {
        // console.log('se', selectedIdType)

        (async () => {




            const location = await GetCurrentLocation()
            // setLocation(location)
            console.log(location, 'loaction')


        })();


    }, [find, openDate, openTime, date, selectedDate, selectedTime, openSearch, pickupLocation, dropLocation, noOfPassenger, selectCar, seater]);


    // const passengerArray = [{ 'value': '1', 'label': '1 passenger' }, { 'value': '2', 'label': '2 passenger' }, { 'value': '3', 'label': '3 passenger' }, { 'value': '4', 'label': '4 passenger' }, { 'value': '5', 'label': '5 passenger' }, { 'value': '6', 'label': '6 passenger' }]
    // const carArray = [{ 'value': '1', 'label': 'Tata Nexon' }, { 'value': '2', 'label': 'MG Hector' }]

    // const seaterArray = [{ 'value': '1', 'label': '1 seater' }, { 'value': '2', 'label': '2 seater' }, { 'value': '3', 'label': '3 seater' }, { 'value': '4', 'label': '4 seater' }, { 'value': '5', 'label': '5 seater' }, { 'value': '6', 'label': '6 seater' }]


    const findRide = () => {
        setFind(true)
        console.log('find ride')
    }

    const offerRide = () => {
        setFind(false)
        console.log('offer ride')
    }

    const pickUp = () => {
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
    const selectedLoc = (val) => {
        console.log(openSearch, val)
        openSearch == 'pick' ? setPickupLocation(val) : openSearch == 'drop' ? setDropLocation(val) : ''

        setOpenSearch('')
    }

    const useDefault = () => {

    }

    const useMap = () => {

    }

    const onDateConfirm = (date) => {
        setOpenDate(false)
        setDate(date)

        setSelectedDate(moment(date).format('DD-MM-YYYY'))
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

    const openDatePicker = (date) => {

        setOpenDate(true)
        console.log(date, 'date')
    }
    const openTimePicker = (date) => {

        setOpenTime(true)
        console.log(date, 'date')
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


    const searchRide = () => {

        if (!pickupLocation) {

            Toast.showWithGravity('Select pickup location', 2, Toast.TOP);
        }
        else if (!dropLocation) {

            Toast.showWithGravity('Select drop location', 2, Toast.TOP);
        }
        else if (!selectedDate) {

            Toast.showWithGravity('Select Date', 2, Toast.TOP);
        }

        else if (!passengerValue) {

            Toast.showWithGravity('Select no of passengers', 2, Toast.TOP);
        }
        else {

            // console.log(pickupLocation, dropLocation,selectedDate, 'check data')
            navigation.navigate('FindRideList', { pick: pickupLocation, drop: dropLocation, date: rawDate, seat: passengerValue })
        }

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


    }
    const onCheck = () => {
        setCotraveller(!cotraveller)
    }


    return (
        <View style={{ flex: 1, alignItems: 'center' }}>

            {/* <View style={{ width: '100%', height: Platform.OS == 'android' ? '10%' : '16%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}> */}


            <ScrollView>


                <View style={{ height: 300, width: '100%' }}>
                    {location ?
                        <MapView style={{ flex: 1 }}
                            initialRegion={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            customMapStyle={customMapStyle}
                        >
                            <Marker title="Location" coordinate={location} />

                        </MapView>
                        : null}
                </View>

                <View style={{ position: 'absolute', top: 30, width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Pressable onPress={() => console.log('pressed')} style={{ width: '50%', height: 50, alignItems: 'flex-start', paddingLeft: 20, justifyContent: 'center' }}>

                        <Image source={require('../../assets/menu.png')} style={{ width: 40, height: 40 }} />
                    </Pressable>
                    <Pressable style={{ width: '50%', height: 50, alignItems: 'flex-end', paddingRight: 20, justifyContent: 'center' }}>
                        {/* <Image source={require('../../assets/profile.png')} style={{ width: 30, height: 30 }} /> */}
                    </Pressable>

                </View>

                <View style={{
                    alignItems: 'center', backgroundColor: AppColors.themesWhiteColor, marginTop: -50,
                    width: '100%', height: Platform.OS == 'android' ? '65%' : '84%', borderRadius: 30
                }}>
                    <View style={{ alignItems: 'center', width: '96%', marginTop: 0 }}>



                        {FindAndOfferRide(findRide, offerRide)}

                        <AvtarView image={require('../../assets/profile.png')} name={'Yatharth'} />
                        <View style={{ width: '94%', height: 1, marginTop: 20, backgroundColor: AppColors.themeCardBorderColor }} />
                        <SeatsView
                            selectedIndex={selectedIndex}
                            setSelectedIndex={setSelectedIndex}
                        />
                        <CotravellerView onCheck={onCheck} image={cotraveller ? 'checkbox-outline' : 'checkbox-blank-outline'} />
                        <View style={{ width: '94%', height: 1, marginTop: 20, backgroundColor: AppColors.themeCardBorderColor }} />
                        {PickupAndDrop(pickupLocation, dropLocation, pickUp, dropOff)}

                        {/* {DefaultOrMap(useDefault, useMap)} */}

                        <View style={{ alignItems: 'center', width: '90%', height: '35%', justifyContent: 'center' }}>

                            {find ?

                                <View style={{ width: '100%', height: 70, justifyContent: 'center', alignItems: 'center' }}>


                                    {DateTimeView('date', openDate, date, onDateConfirm, onDateCancel, openDatePicker, selectedDate)}
                                    <View style={{ marginTop: 10, marginBottom: 10, width: '80%', height: 1, marginLeft: 20, backgroundColor: AppColors.themeCardBorderColor }}></View>
                                    {DateTimeView('time', openTime, date, onTimeConfirm, onTimeCancel, openTimePicker, selectedTime)}

                                </View>

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


                {
                    find ?


                        // <View style={{ width: '80%', marginTop: 20, alignItems: 'center', paddingLeft: 10, backgroundColor: AppColors.themesWhiteColor }}>
                        //     <View style={{ width: '90%' }}>

                        //         {DropDownList('passenger', noOfPassenger, passengersAvailable)}
                        //     </View>

                        // </View>
null

                        :
                        <View style={{ height: 50, borderRadius: 5, flexDirection: 'row', width: '80%', marginTop: 20, alignItems: 'center', paddingLeft: 20, backgroundColor: AppColors.themesWhiteColor }}>
                            <Image source={require('../../assets/profile.png')} style={{ tintColor: AppColors.themePrimaryColor, marginLeft: 0, marginRight: 10, width: 25, resizeMode: 'contain' }} />
                            <Text style={{ fontSize: 16, color: AppColors.themeBlackColor, fontWeight: '600' }}>{'Price per seat'}</Text>
                            <TextInput
                                onChangeText={text => setSeatPrice(text)}
                                value={seatPrice}
                                placeholder={AppTexts.Rupee_Symbol + " price"}
                                placeholderTextColor={AppColors.themeText2Color}
                                style={{ color: AppColors.themeBlackColor, marginLeft: 20, width: '20%', fontSize: 16, textAlign: 'center', fontWeight: '700' }}
                            />
                        </View>

                }


                <TouchableOpacity onPress={() => find ? searchRide() : procced()} style={{ marginTop: 20, backgroundColor: AppColors.themePrimaryColor, width: '55%', height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: AppColors.themesWhiteColor }}>{find ? 'SEARCH' : 'PROCCED'}</Text>
                </TouchableOpacity>

                {SearchAutocompleteView(openSearch == 'pick' ? 'Search pick up location' : 'Search drop off location', openSearch ? true : false, openLocationSearch, selectedLoc)
                    // onPressCam={() => { openCam() }}
                    // onPressGal={() => { openGall() }}
                }
            </ScrollView>
        </View>
    )
}
