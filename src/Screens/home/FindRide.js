import React, { Component } from "react";
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
import { hitApiToAllGetVehicle, hitApiToCheckExistingRide, hitApiToGetRoutes } from "./RideModal";
import { GetCurrentLocation, checkLocationPermission } from "../../components/location/GetCurrentLocation";
import { AvtarView, CotravellerView, SeatsView } from "./RideComponent";
import { ButtonPrimary } from "../../components/button/buttonPrimary";
import { RecentHorizontal } from "../../components/RecentSearch/RecentHorizontal";
import { SearchLocation } from "../../components/GooglLocation/SearchLocation";
import MapComponent from "../../components/map/MapComponent";
import { hitApiToGetRideList } from "../findridelist/RideListModal";
import { Surface } from "react-native-paper";
import { Header } from "../../components/commomheader/CommonHeader";
import { Switch } from 'react-native-paper';
import { connect } from "react-redux";
import { reducer } from '../../redux/reducers/reducers'
import { getProfileDataRequest, getExistingDataRequest } from '../../redux/actions/actions';
import { AppFontFamily } from "../../components/constants/AppFonts";
import { AddVehiclePopup } from "../../components/popupComponents/AddVehiclePopup";
import CommonLoaders from "../../components/loader/Loader";

class FindRide extends Component {

    constructor(props) {
        super(props);
        this.closeVehPopUp = this.closeVehPopUp.bind(this);
        this.selectedVehicle = this.selectedVehicle.bind(this);
        this.addCar = this.addCar.bind(this);
        this.onDownloadProgress = this.onDownloadProgress.bind(this);
        this.state = {
            customMapStyle: [
                {
                    featureType: "poi",
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#eeeeee",
                        },
                    ],
                },
                {
                    featureType: "poi",
                    elementType: "labels.text",
                    stylers: [
                        {
                            visibility: "off",
                        },
                    ],
                },
                {
                    featureType: "water",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#9e9e9e",
                        },
                    ],
                },
            ],
            openDate: false,
            cotraveller: false,
            selectedIndex: 0,
            find: true,
            openTime: false,
            date: new Date(),
            selectedDate: 'Date and time of departure',
            selectedTime: 'Select ride time',
            openSearch: '',
            pickupLocation: '',
            dropLocation: '',
            noOfPassenger: 'No of passengers',
            selectCar: 'Select car',
            seater: 'No of seats',
            seatCount: 0,
            passengerValue: 1,
            seatPrice: '',
            rawDate: '',
            isSearch: 'cancel',
            location: {},
            initialRegion: {},
            markers: {},
            permission: false,
            addVehicle: 'Select Vehicle',
            avilSeat: '',
            perSeat: '',
            isSwitchOn: false,
            coordinate: '',
            existingData: {},
            progress: 0,
            loading: false,
            openAddVeh: false,
            vehicleArray: [],
            pickMainText: '',
            dropMainText: '',


            // const [location, setLocation] = React.useState({ latitude: 28.693072, longitude: 76.981635 })

        }
    }

    onToggleSwitch = () => {
        this.setState(!isSwitchOn)
    }


    componentWillUnmount() {
        this._unsubscribe();


    }
    async componentDidMount() {

        this._unsubscribe = this.props.navigation.addListener('focus', async () => {

            await this.getRideNotificationData()
            await this.getSavedVehicles()

        });

        //    await this.getRideNotificationData()



    }


    async getSavedVehicles() {

        const result = await hitApiToAllGetVehicle()
        if (result.status) {

            const vehData = result.data?.vehicle_info
            console.log(result.data, 'all vehicle')
            for (const data of vehData) {
                data.label = data.vehicle_name
            }
            // const updatedArray = vehData.map((obj) =>  ...obj, obj.vehicle_name = 'vehicle_name');
            this.setState({ vehicleArray: vehData })
            console.log(vehData, 'all vehicle')
        }
        else {

        }
    }

    async getRideNotificationData() {
        const result = await hitApiToCheckExistingRide()
        console.log(result, 'data')
        this.reloadMap()
        this.setState({ existingData: result })
    }

    reloadMap = async () => {

        // Add your code here to perform tasks that need to run every 10 minutes
        console.log('relod 1')

        const perm = await checkLocationPermission()

        if (perm) {

            const loc = await GetCurrentLocation()
            console.log(loc, 'loaction')

            if (loc) {
                // setLocation(loc)
                this.setState({ location: { latitude: loc.latitude, longitude: loc.longitude } })
                console.log('relod 2', this.state.initialRegion, this.state.markers)

                this.setState({
                    initialRegion: {
                        latitude: loc.latitude,
                        longitude: loc.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }
                });

                this.setState({ markers: { coordinate: { latitude: loc.latitude, longitude: loc.longitude } }, permission: true })

            }

            console.log(this.state.markers, this.state.initialRegion, 'marker')
        }

    };


    findRide = () => {
        this.setState({ find: true })

        console.log('find ride')
    }

    offerRide = () => {

        this.setState({ find: false })
        console.log('offer ride')
    }

    pickUp = () => {
        // navigation.navigate('SearchLocation')
        this.setState({ openSearch: 'pick' })

        console.log('pick up', this.openSearch)
    }

    dropOff = () => {
        this.setState({ openSearch: 'drop' })
        console.log('drop off')
    }
    openLocationSearch = () => {
        this.openSearch == 'pick' ? this.setState({ pickupLocation: '' }) : this.setState({ dropLocation: '' })
        this.setState({ openSearch: '' })
    }
    onSelectionPress = (val) => {
        console.log(val, 'gog')
        // openSearch == 'pick' ? setPickupLocation(val.pick) : openSearch == 'drop' ? setDropLocation(val.drop) : ''

        this.setState({ pickupLocation: val.pick, pickMainText: val.pickMain })
        this.setState({ dropLocation: val.drop, dropMainText: val.dropMain })

        this.setState({ openSearch: '' })

    }


    onDateConfirm = (date) => {
        this.setState({ openDate: false })
        // setOpenDate(false)
        // setDate(date)
        this.setState({ date: date })
        this.setState({ selectedDate: moment(date).format('DD-MM-YYYY HH:mm:ss A'), rawDate: String(date) })
        // setSelectedDate()
        // setrawDate(String(date))

    }
    onDateCancel = () => {
        this.setState({ openDate: false })
        // setOpenDate(false)
    }




    openDatePicker = () => {
        this.setState({ openDate: true })
        // setOpenDate(true)
        console.log('date open')
    }


    onDownloadProgress(data) {
        // const percentCompleted = Math.round(
        //     (progressEvent.loaded * 100) / progressEvent.total
        //   );

        //   console.log(percentCompleted, ' % progress')
        //   this.setState({ progress:  percentCompleted})

        var progress = data.loaded / data.total;
        this.setState({ progress })
        console.log(progress, 'aaaaaa------')

    }

    getSearchData = async (pick, drop, date, seat) => {
        const result = await hitApiToGetRideList(pick, drop, date, seat, this.onDownloadProgress);
        console.log("ride list", result);

        this.setState({ loading: false })
        if (result.status) {

            // setRideList(result.data ?? [])

            this.setState({ isSearch: 'cancel' })
            // setIsSearch('cancel')
            this.props.navigation.navigate('FindRideList', { data: result.data, seat: this.state.passengerValue })


        }
        else {
            console.log(result)
            if (result.message == 'No ride found') {
                // setIsSearch('notfound')
                this.setState({ isSearch: 'notfound' })
            }

        }
    }


    searchRide = async () => {


        if (!this.state.pickupLocation) {

            Toast.showWithGravity('Select pickup location', 2, Toast.TOP);
        }
        else if (!this.state.dropLocation) {

            Toast.showWithGravity('Select drop location', 2, Toast.TOP);
        }
        else if (this.state.selectedDate === 'Date and time of departure') {

            Toast.showWithGravity('Select Date', 2, Toast.TOP);
        }

        else if (!this.state.passengerValue) {

            Toast.showWithGravity('Select no of passengers', 2, Toast.TOP);
        }
        else {
            console.log('search ride')

            // setIsSearch('start')
            this.setState({ isSearch: 'start', loading: true })
            await this.getSearchData(this.state.pickupLocation, this.state.dropLocation, this.state.rawDate, this.state.passengerValue)
            // console.log(pickupLocation, dropLocation,selectedDate, 'check data')

        }

    }


    searchLoaderScreen = () => {
        console.log(this.state.pickupLocation, this.state.dropLocation, 'loc')
        return (

            <View style={{
                alignItems: 'center', backgroundColor: AppColors.themesWhiteColor, marginTop: 0,
                width: '100%', borderTopRightRadius: 30, borderTopLeftRadius: 30, height: Dimensions.get('window').height * .35, justifyContent: 'center'
            }}>

                {/* <Surface style={{ width: '95%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} elevation={4}>


                    <View style={{ width: '15%', alignItems: 'center' }}>

                        <Image source={require('../../assets/dotone.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />
                        <Image source={require('../../assets/dotline.png')} style={{ marginLeft: 0, width: 5, height: 40, resizeMode: 'contain' }} />
                        <Image source={require('../../assets/triangle.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />

                    </View>

                    <View style={{ width: '85%', justifyContent: 'center', alignItems: 'center' }}>


                        <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row' }}>

                            <TouchableOpacity style={{ width: '98%', justifyContent: 'center', paddingTop: 10, paddingBottom: 10 }} >
                                <Text style={{ width: '100%', color: AppColors.themeTextGrayColor, fontSize: 16 }}>{this.state.pickupLocation}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginLeft: 0, width: '100%', height: 1, backgroundColor: AppColors.themeTextGrayColor }}></View>
                        <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row' }}>

                            <TouchableOpacity style={{ width: '98%', justifyContent: 'center', paddingTop: 10, paddingBottom: 10 }} >
                                <Text style={{ width: '100%', color: AppColors.themeTextGrayColor, fontSize: 16 }}>{this.state.dropLocation}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </Surface>

                <View style={{ width: '95%', alignItems: 'center', marginTop: 20 }}>
                    <ButtonPrimary
                        text={'Cancel Booking'}
                        onPress={() => this.setState({ isSearch: 'cancel' })}
                        loader={false}
                    />
                </View> */}
                <CommonLoaders.SearchRide/>

            </View>

        )
    }

    NoRideFound = () => {
        return (

            <View style={{
                alignItems: 'center', backgroundColor: AppColors.themesWhiteColor, marginTop: 0,
                width: '100%', borderTopRightRadius: 30, borderTopLeftRadius: 30, height: Dimensions.get('window').height * .35, justifyContent: 'center'
            }}>

                <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center' }} elevation={4}>


                    <View style={{ width: '100%', alignItems: 'center' }}>

                        <Image source={require('../../assets/avtar.png')} style={{ borderRadius: 40, width: 80, height: 80, resizeMode: 'contain' }} />

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
                        onPress={() => this.chooseAnother()}
                        loader={false}
                    />
                </View>

            </View>

        )
    }

    chooseAnother = () => {
        this.setState({ openSearch: 'pick', isSearch: 'cancel' })
        // setOpenSearch('pick')
        // setIsSearch('cancel')
    }

    procced = async () => {

        if (!this.state.pickupLocation) {

            Toast.showWithGravity('Select pickup location', 2, Toast.TOP);
        }
        else if (!this.state.dropLocation) {

            Toast.showWithGravity('Select drop location', 2, Toast.TOP);
        }
        else if (this.state.selectedDate === 'Date and time of departure') {

            Toast.showWithGravity('Select Date', 2, Toast.TOP);
        }

        else if (!this.state.avilSeat) {

            Toast.showWithGravity('Select no of seats available', 2, Toast.TOP);
        }
        // else if (this.state.perSeat.length < 1) {

        //     Toast.showWithGravity('Enter price per seat', 2, Toast.TOP);
        // }
        else {

            // console.log(pickupLocation, dropLocation,selectedDate, 'check data')
            const routeData = await this.getPolylineCoordinats(this.state.pickupLocation, this.state.dropLocation)

            this.props.navigation.navigate('MapRoutes',
                {
                    pick: this.state.pickupLocation,
                    pickMainText: this.state.pickMainText,
                    drop: this.state.dropLocation,
                    dropMainText: this.state.dropMainText,
                    date: this.state.rawDate,
                    seat: this.state.avilSeat,
                    routeData,
                    // price: this.state.perSeat
                })
        }

    }


    getPolylineCoordinats = async (pick, drop) => {

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


    setSelectedIndex = (i) => {
        this.setState({ selectedIndex: i, passengerValue: i + 1 })
        // setIndex(i)
        // setPassengerValue(i + 1)


    }
    onCheck = () => {
        this.setState({ cotraveller: !this.state.cotraveller })
        // setCotraveller(!cotraveller)
    }

    onViewClick() {

        const from = this.state.existingData?.from

        this.props.navigation.navigate(this.state.existingData?.screenname, { id: this.state.existingData?.id, from: from })
    }

    checkExistingRequest() {
        return (
            <View style={{
                alignItems: 'center', backgroundColor: AppColors.themeNotificationBg, marginTop: -50,
                width: '100%', borderTopRightRadius: 30, borderTopLeftRadius: 30, padding: 10, minHeight: 90
            }}>
                <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ width: '80%', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={{ color: AppColors.themeBlackColor, fontSize: 12, fontFamily: AppFontFamily.PopinsRegular }}>{this.state.existingData?.text}</Text>
                    </View>
                    <View style={{ width: 53, justifyContent: 'center', alignItems: 'center' }}>
                        <ButtonPrimary
                            style={{ height: 22 }}
                            textStyle={{ fontFamily: AppFontFamily.PopinsRegular, fontSize: 12 }}
                            text={'View'}
                            onPress={() => this.onViewClick()}
                            loader={false}
                        />
                    </View>
                </View>
            </View>
        )
    }

    SearchOffer = (name, gender) => {
        return (
            <>
                {this.state.existingData?.status ? this.checkExistingRequest() : null}
                {/* {this.checkExistingRequest()} */}
                <View style={{
                    alignItems: 'center', backgroundColor: AppColors.themesWhiteColor, marginTop: -50,
                    width: '100%', borderTopRightRadius: 30, borderTopLeftRadius: 30, borderColor: AppColors.themeCardBorderColor, borderWidth: 1
                }}>

                    <View style={{ alignItems: 'center', width: '96%', marginTop: 0 }}>



                        {FindAndOfferRide(this.findRide, this.offerRide, this.state.find)}

                        <AvtarView image={require('../../assets/avtar.png')} name={name} type={this.state.find} />
                        <View style={{ width: '94%', height: 1, marginTop: 20, backgroundColor: AppColors.themeCardBorderColor }} />
                        {this.state.find ?
                            <>
                                <SeatsView
                                    data={['1', '2', '3', '4']}
                                    selectedIndex={this.state.selectedIndex}
                                    setSelectedIndex={this.setSelectedIndex}
                                />
                                {gender === 'f' ?
                                    <CotravellerView onCheck={this.onCheck} image={this.state.cotraveller ? 'checkbox-outline' : 'checkbox-blank-outline'} /> : null}
                                <View style={{ width: '94%', height: 1, marginTop: 20, backgroundColor: AppColors.themeCardBorderColor }} />
                            </>
                            :
                            null
                        }
                        {PickupAndDrop(this.state.pickupLocation, this.state.dropLocation, this.pickUp, this.dropOff)}
                        <View style={{ marginTop: 10, width: '95%', height: 70, justifyContent: 'center', alignItems: 'center' }}>

                            {DateTimeView('date', this.state.openDate, this.state.date, this.onDateConfirm, this.onDateCancel, this.openDatePicker, this.state.selectedDate)}

                        </View>


                        <View style={{ alignItems: 'center', width: '95%', justifyContent: 'center' }}>

                            {this.state.find ?
                                <>


                                    <View style={{ width: '100%', height: 70, alignItems: 'center', marginTop: 10 }}>
                                        <ButtonPrimary
                                            text={'Search for rides'}
                                            onPress={() => this.searchRide()}
                                            loader={false}
                                        />
                                    </View>



                                </>

                                :


                                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>


                                    {this.offerRideView()}

                                    <View style={{ width: '100%', height: 70, alignItems: 'center', marginTop: 10 }}>
                                        <ButtonPrimary
                                            text={'Next'}
                                            onPress={() => this.procced()}
                                            loader={false}
                                        />
                                    </View>

                                </View>

                            }
                            <View style={{ width: '100%', height: 1, marginBottom: 20, backgroundColor: AppColors.themeCardBorderColor }} />

                            <View style={{ width: '100%', alignItems: 'flex-start', marginBottom: 20 }}>
                                <RecentHorizontal recentArray={['1', '2']} onPress={() => console.log('item pressed')} />
                            </View>

                        </View>

                    </View>



                </View>
            </>
        )



    }

    selectedVehicle(val) {


        console.log(val, 'abc')
        this.setState({ addVehicle: val.label, openAddVeh: false })

    }

    closeVehPopUp() {
        this.setState({ openAddVeh: false })
    }
    addCar() {
        this.props.navigation.navigate('AddVehicle')
    }
    offerRideView = () => {
        return (
            <View style={{ width: '100%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>

                    <Pressable onPress={() => this.setState({ openAddVeh: true })} style={{ paddingLeft: 10, justifyContent: 'center', backgroundColor: AppColors.themePickupDropSearchBg, height: 50, width: '48%', borderRadius: 10 }}>

                        <Text style={{ color: this.state.addVehicle == 'Select Vehicle' ? AppColors.themeTextGrayColor : AppColors.themeBlackColor, fontSize: 14, fontFamily: AppFontFamily.PopinsRegular }}>{this.state.addVehicle}</Text>
                        <AddVehiclePopup
                            data={this.state.vehicleArray}
                            headerText={'Select Vehicle'}
                            isLoading={this.state.openAddVeh}
                            closePopup={this.closeVehPopUp}
                            selectedVehicle={this.selectedVehicle}
                            addCar={this.addCar}
                        />
                        {/* <TextInput
                            onChangeText={text => this.setState({ addVehicle: text })}
                            value={this.state.addVehicle}
                            placeholder={"Add your vehicle"}
                            placeholderTextColor={AppColors.themeTextGrayColor}
                            style={{ fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeBlackColor, padding: 10, width: '95%', fontSize: 14, textAlign: 'left' }}
                        /> */}
                    </Pressable>

                    <View style={{ backgroundColor: AppColors.themePickupDropSearchBg, width: '48%', borderRadius: 10 }}>
                        <TextInput
                            onChangeText={text => this.setState({ avilSeat: text })}
                            value={this.state.avilSeat}
                            placeholder={"Available seats"}
                            placeholderTextColor={AppColors.themeTextGrayColor}
                            style={{ fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeBlackColor, padding: 10, width: '95%', fontSize: 14, textAlign: 'left' }}
                            keyboardType={
                                Platform.OS === 'android' ? 'numeric' : 'number-pad'
                            }
                        />
                    </View>

                </View>

                {/* <View>
                    <View style={{ backgroundColor: AppColors.themesWhiteColor, width: '100%', height: 40, borderRadius: 10, marginTop: 20, marginBottom: 10 }}>
                        <TextInput
                            onChangeText={text => this.setState({ perSeat: text })}
                            value={this.state.perSeat}
                            placeholder={"Price per seat"}
                            placeholderTextColor={AppColors.themeTextGrayColor}
                            style={{ fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeBlackColor, padding: 10, width: '95%', fontSize: 14, textAlign: 'left' }}
                            keyboardType={
                                Platform.OS === 'android' ? 'numeric' : 'number-pad'
                            }
                        />
                    </View>
                </View> */}

                {/* resturn Trip View */}
                {/* <View>
                    <View style={{ flexDirection: 'row', backgroundColor: AppColors.themePickupDropSearchBg, width: '100%', borderRadius: 10, padding: 8, marginTop: 10, marginBottom: 20 }}>
                        <View style={{ width: '12%', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/returntrip.png')} style={{ tintColor: AppColors.themePrimaryColor, marginRight: 10, width: 25, resizeMode: 'contain' }} />
                        </View>
                        <View style={{ width: '73%', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 16, color: AppColors.themeBlackColor, fontWeight: '600' }}>{'Return trip'}</Text>
                        </View>
                        <View style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }}>
                            <Switch value={this.state.isSwitchOn} onValueChange={this.onToggleSwitch} />
                        </View>

                    </View>
                </View> */}

            </View>
        )
    }


    HeaderView = ({ name, gender }) => {
        return (
            <>
                <View style={{ height: this.state.isSearch == 'cancel' ? 300 : Dimensions.get('window').height * .65, width: '100%' }}>
                    {this.state.permission ?
                        <MapComponent initialRegion={this.state.initialRegion} markers={this.state.markers} loading={this.state.loading} customMapStyle={this.state.customMapStyle} /> :
                        null}

                </View>



                {this.state.isSearch == 'cancel' ? this.SearchOffer(name, gender) : this.state.isSearch == 'start' ? this.searchLoaderScreen() : this.NoRideFound()}


            </>
        )
    }








    render() {

        const { data } = this.props;

        return (
            <View style={{ flex: 1, alignItems: 'center' }}>

                {/* <View style={{ width: '100%', height: Platform.OS == 'android' ? '10%' : '16%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}> */}


                < FlatList
                    data={['1']}
                    // columnWrapperStyle={{ flexWrap: 'wrap' }}
                    // numColumns={5}
                    contentContainerStyle={{ width: Dimensions.get('window').width }}
                    ListHeaderComponent={<this.HeaderView name={data.name} gender={data.gender} />}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <>
                            <View style={{ padding: 0 }}>

                            </View>

                        </>
                    )}
                />

                <View style={{ width: '100%', position: 'absolute', top: 0 }}>
                    <Header isBack={false} close={() => this.props.navigation.openDrawer()} isRight={true} right={require('../../assets/notification.png')} />
                </View>

                < SearchLocation
                    headerText={'Select address'}
                    isLoading={this.state.openSearch ? true : false}
                    closePopup={this.openLocationSearch}
                    onSelectionPress={this.onSelectionPress}
                />
            </View >
        )
    }
}


const mapStateToProps = (state) => ({
    data: state.data,
    loading: state.loading,
    error: state.error,
});

const mapDispatchToProps = {
    getProfileDataRequest

};

export default connect(mapStateToProps, mapDispatchToProps)(FindRide);