import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, Platform, TextInput, Pressable, FlatList, Dimensions, BackHandler, StyleSheet, Alert } from "react-native";
import { AppColors } from "../../components/constants/AppColor";
import { FindAndOfferRide } from "../../components/findandoffer/FindAndOfferRide";
import { PickupAndDrop } from "../../components/pickupanddrop/PickupAndDrop"
import moment from 'moment';
import DateTimeView from "../../components/datetimeview/DateTimeView";
import Toast from 'react-native-simple-toast'
import { hitApiToAllGetVehicle, hitApiToCheckExistingRide, hitApiToGetRecentSearch, hitApiToGetRoutes } from "./RideModal";
import { GetCurrentLocation, checkLocationPermission } from "../../components/location/GetCurrentLocation";
import { AvtarView, CotravellerView, NoRideFound, PendingKYC, SearchLoaderScreen, SeatsView } from "./RideComponent";
import { ButtonPrimary } from "../../components/button/buttonPrimary";
import { RecentHorizontal } from "../../components/RecentSearch/RecentHorizontal";
import { SearchLocation } from "../../components/GooglLocation/SearchLocation";
import MapComponent from "../../components/map/MapComponent";
import { hitApiToGetRideList } from "../findridelist/RideListModal";
import { Header } from "../../components/commomheader/CommonHeader";
import { connect } from "react-redux";
import { getProfileDataRequest } from '../../redux/actions/actions';
import { AppFontFamily } from "../../components/constants/AppFonts";
import { AddVehiclePopup } from "../../components/popupComponents/AddVehiclePopup";
import CommonLoaders from "../../components/loader/Loader";
import { decode } from "@mapbox/polyline";
import { showMessage } from "react-native-flash-message";
import { alertWithNav } from "../../components/commonfunction/CommonFunctions";
import { hitApiToGetProfile } from "../profile/ProfileModal";
import { CreateNotificationChannel, showNotification } from "../../components/notifications/LocalNotification";
import PushNotification from 'react-native-push-notification';
import { AppKeys } from "../../components/constants/AppKeys";
import FastImage from 'react-native-fast-image'
import { hitApiToSetSeenNotifications } from "../notification/NotificationModal";
import { HomeHeader } from "../../components/commomheader/HomeHeader";
import Wallet from "../wallet/Wallet";
import { hitApiToAddMoneyToWallet } from "../payment/PaymentModal";
class FindRide extends Component {

    constructor(props) {
        super(props);
        this.closeVehPopUp = this.closeVehPopUp.bind(this);
        this.selectedVehicle = this.selectedVehicle.bind(this);
        this.addCar = this.addCar.bind(this);
        this.recentSearchPress = this.recentSearchPress.bind(this);
        this.okPress = this.okPress.bind(this);
        this.walletClick = this.walletClick.bind(this)
        this.payPressed = this.payPressed.bind(this)
        this.chooseAnother = this.chooseAnother.bind(this)


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
            rideVehicle: {},
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
            recentSearchArray: [],
            offerSearchLoader: false,
            kycStatus: 1,
            textHeight: 90,
            openWallet: false,
            walletLoader: false,


        }
    }

    onToggleSwitch = () => {
        this.setState(!isSwitchOn)
    }

    backActionHandler() { };


    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backActionHandler);
        this._unsubscribe();

    }
    async componentDidMount() {

        this._unsubscribe = this.props.navigation.addListener('focus', async () => {
            BackHandler.addEventListener("hardwareBackPress", this.backActionHandler);

            // if (this.props?.data?.kyc_status != 1)
            // {

            // }
            // console.log('loaded', res)
            if (this.props.route.params?.from == 'reset') {
                this.setState({ pickupLocation: '', dropLocation: '', selectedIndex: 0, selectedDate: 'Date and time of departure' })
            }
            else if (this.props.route.params?.from == 'search') {
                this.setState({
                    pickupLocation: this.props.route.params?.pick,
                    pickMainText: this.props.route.params?.pickMain,
                    dropLocation: this.props.route.params?.drop,
                    dropMainText: this.props.route.params?.dropMain,
                })

            }




            this.props.getProfileDataRequest()
            await this.getRideNotificationData()
            await this.getSavedVehicles()
            await this.getRecentSearch()


        });




    }

    // onOkPress() {
    //     this.setState({ kycStatus: 1 })
    // }

    async getSavedVehicles() {

        const result = await hitApiToAllGetVehicle()
        // await CreateNotificationChannel()
        if (result.status) {

            const vehData = result.data?.vehicle_info
            // console.log(result.data, 'all vehicle')
            for (const data of vehData) {
                data.label = data.vehicle_name
            }
            // const updatedArray = vehData.map((obj) =>  ...obj, obj.vehicle_name = 'vehicle_name');
            this.setState({ vehicleArray: vehData })
            // console.log(vehData, 'all vehicle')
        }
        else {

        }
    }

    async getRecentSearch() {

        const result = await hitApiToGetRecentSearch()
        // console.log(result, 'recent')
        if (result.status) {
            this.setState({ recentSearchArray: result.data })
        }
    }

    async getRideNotificationData() {
        const result = await hitApiToCheckExistingRide()
        console.log(result, 'data')
        this.reloadMap()
        this.setState({ existingData: result })
    }

    reloadMap = async () => {

        const perm = await checkLocationPermission()

        if (perm) {

            const loc = await GetCurrentLocation()
            // console.log(loc, 'loaction')

            if (loc) {
                // setLocation(loc)
                this.setState({ location: { latitude: loc.latitude, longitude: loc.longitude } })
                // console.log('relod 2', this.state.initialRegion, this.state.markers)

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

            // console.log(this.state.markers, this.state.initialRegion, 'marker')
        }

    };


    findRide = () => {
        this.setState({ find: true, selectedDate: 'Date and time of departure' })
    }

    offerRide = () => {

        this.setState({ find: false, selectedDate: 'Date and time of departure' })

    }

    pickUp = () => {
        this.props.navigation.navigate('SearchLocation', {
            'headerText': 'Search Location',
            'lat': this.state.location.latitude,
            'lng': this.state.location.longitude
        })
    }

    dropOff = () => {
        this.props.navigation.navigate('SearchLocation', {
            'headerText': 'Search Location',
            'lat': this.state.location.latitude,
            'lng': this.state.location.longitude
        })
    }

    // const animation = createAnimation({
    //     type: 'slide',
    //     duration: 500,
    //     easing: 'easeInOut',
    //   });

    onSelectionPress = (val) => {

        this.setState({
            pickupLocation: val.pick,
            pickMainText: val.pickMain,
            dropLocation: val.drop,
            dropMainText: val.dropMain,
            openSearch: ''
        })

    }

    onDateConfirm = (date) => {
        this.setState({
            openDate: false,
            date: date,

            selectedDate: this.state.find ? moment(date).format('ddd DD MMM YYYY ') : moment(date).format('ddd DD MMM YYYY HH:mm A'),
            rawDate: String(date)
        })

    }

    onDateCancel = () => {
        this.setState({ openDate: false })
    }


    openDatePicker = () => {
        this.setState({ openDate: true })
    }


    getSearchData = async (pick, drop, date, seat) => {

        // if (this.props?.data?.kyc_status == 1) {

            this.setState({ isSearch: 'start', loading: true })
            const result = await hitApiToGetRideList(pick, drop, date, seat, this.state.pickMainText, this.state.dropMainText);

            this.setState({ loading: false })
            if (result.status) {

                this.setState({ isSearch: 'cancel' })
                this.props.navigation.navigate('FindRideList', { data: result.data, seat: this.state.passengerValue })

            }
            else {
                // console.log(result)
                if (result.message == 'No ride found') {
                    this.setState({ isSearch: 'notfound' })
                }

            }
        // }
        // else if (this.props?.data?.kyc_status == 0) {

        //     alertWithNav('', 'Your kyc is pending, Please update your kyc', this.okPress)
        // }
        // else if (this.props?.data?.kyc_status == 2) {

        //     Alert.alert('', 'Your kyc is under review, You will get a message/notification once review is completed')
        // }

        // else  
        // {

        // }


    }

    okPress() {
        // console.log('hello')
        this.props.navigation.navigate('KycScreen')
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


            await this.getSearchData(this.state.pickupLocation, this.state.dropLocation, this.state.rawDate, this.state.passengerValue)

        }

    }




    chooseAnother = () => {
        this.setState({ openSearch: 'pick', isSearch: 'cancel' })
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
        else if (!Object.keys(this.state.rideVehicle).length) {

            Toast.showWithGravity('Select your vehicle', 2, Toast.TOP);
        }
        else if (!this.state.avilSeat) {

            Toast.showWithGravity('Select no of seats available', 2, Toast.TOP);
        }
        else {

            // if (this.props?.data?.kyc_status == 1) {
                this.setState({ offerSearchLoader: true })
                const routeData = await this.getPolylineCoordinats(this.state.pickupLocation, this.state.dropLocation)

                this.setState({ offerSearchLoader: false })
                this.props.navigation.navigate('MapRoutes',
                    {
                        pick: this.state.pickupLocation,
                        pickMainText: this.state.pickMainText,
                        drop: this.state.dropLocation,
                        dropMainText: this.state.dropMainText,
                        date: this.state.rawDate,
                        seat: this.state.avilSeat,
                        routeData,
                        vehicle: this.state.rideVehicle,
                    })
            // }
            // else if (this.props?.data?.kyc_status == 0) {

            //     alertWithNav('', 'Your kyc is pending, Please update your kyc', this.okPress)
            // }
            // else if (this.props?.data?.kyc_status == 2) {

            //     Alert.alert('', 'Your kyc is under review, You will get a message/notification once review is completed')
            // }
        }

    }

    getCoords(result) {

        let coordsArray = []
        for (let data of result) {

            let points = decode(data.overview_polyline.points);
            let coords = points.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                };
            });
            coordsArray.push(coords)
        }

        return coordsArray
    }

    getPolylineCoordinats = async (pick, drop) => {

        const result = await hitApiToGetRoutes(pick, drop)
        // console.log(result.data)
        const coordsData = this.getCoords(result.data)

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
                    'coords': coordsData[i],
                    "cords": arr,
                    "distance": leg.distance.text,
                    "duration": leg.duration.text,
                    "origin": { 'latitude': leg.start_location.lat, 'longitude': leg.start_location.lng },
                    "destination": { 'latitude': leg.end_location.lat, 'longitude': leg.end_location.lng },
                    "summary": data.summary,


                }
                myData.push(abc)
                // console.log(myData, 'data')
                i = i + 1

            }


        }

        return myData

    }


    setSelectedIndex = (i) => {
        this.setState({ selectedIndex: i, passengerValue: i + 1 })
    }
    onCheck = () => {
        this.setState({ cotraveller: !this.state.cotraveller })

    }

    onViewClick() {

        if (this.state.existingData?.multi) {
            const from = this.state.existingData?.from
            this.props.navigation.navigate('RideHistory', { from: from })
        }
        else {
            const from = this.state.existingData?.from
            this.props.navigation.navigate(this.state.existingData?.screenname, { id: this.state.existingData?.id, from: from })
        }

    }

    onTextLayout = (e) => {
        const { height } = e.nativeEvent.layout;
        this.setState({ textHeight: height });
    };

    checkExistingRequest() {

        return (
            <View style={{
                alignItems: 'center', backgroundColor: AppColors.themeNotificationBg, marginTop: -50,
                width: '100%', borderTopRightRadius: 30, borderTopLeftRadius: 30, padding: 10, minHeight: this.state.textHeight + 70
            }}>
                <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ width: '80%', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={{ color: AppColors.themeBlackColor, fontSize: 12, fontFamily: AppFontFamily.PopinsRegular }} onLayout={this.onTextLayout}>{this.state.existingData?.text}</Text>
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


    KycNotification(kycStatus) {

        return (
            <View style={{
                alignItems: 'center', backgroundColor: AppColors.themeNotificationBg, marginTop: -50,
                width: '100%', borderTopRightRadius: 30, borderTopLeftRadius: 30, padding: 10, minHeight: this.state.textHeight + 70
            }}>
                <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ width: '80%', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={{ color: AppColors.themeBlackColor, fontSize: 12, fontFamily: AppFontFamily.PopinsRegular }} onLayout={this.onTextLayout}>{kycStatus == 0 ? 'Your kyc is pending, Please update your kyc' : kycStatus == 2 ? 'Your kyc document is under review' : ''}</Text>
                    </View>
                    {kycStatus == 0 ?
                        <View style={{ width: 53, justifyContent: 'center', alignItems: 'center' }}>
                            <ButtonPrimary
                                style={{ height: 22 }}
                                textStyle={{ fontFamily: AppFontFamily.PopinsRegular, fontSize: 12 }}
                                text={'View'}
                                onPress={() => this.props.navigation.navigate('KycScreen')}
                                loader={false}
                            />
                        </View> : null}
                </View>
            </View>
        )
    }



    SearchOffer = (name, gender, image, kycStatus) => {
        return (
            <>
                {kycStatus == 0 || kycStatus == 2 ? this.KycNotification(kycStatus) : null}

                {this.state.existingData?.status ? this.checkExistingRequest() : null}
                <View style={{
                    alignItems: 'center', backgroundColor: AppColors.themesWhiteColor, marginTop: -50,
                    width: '100%', borderTopRightRadius: 30, borderTopLeftRadius: 30, borderColor: AppColors.themeCardBorderColor, borderWidth: 1
                }}>

                    <View style={{ alignItems: 'center', width: '96%', marginTop: 0 }}>

                        {FindAndOfferRide(this.findRide, this.offerRide, this.state.find)}

                        <AvtarView image={image ? { uri: image } : require('../../assets/avtar.png')} name={name} type={this.state.find} />
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

                            {DateTimeView(this.state.find ? 'date' : 'datetime', this.state.openDate, this.state.date, this.onDateConfirm, this.onDateCancel, this.openDatePicker, this.state.selectedDate)}

                        </View>


                        <View style={{ alignItems: 'center', width: '95%', justifyContent: 'center' }}>

                            {this.state.find ?
                                <>


                                    <View style={{ width: '100%', height: 70, alignItems: 'center', marginTop: 10 }}>
                                        <ButtonPrimary
                                            text={'Search for rides'}
                                            onPress={() => this.searchRide()}
                                            loader={this.state.loading}
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
                                            loader={this.state.offerSearchLoader}
                                        />
                                    </View>

                                </View>

                            }

                            {this.state.recentSearchArray.length > 0 ?
                                <>
                                    <View style={{ width: '100%', height: 1, marginBottom: 20, backgroundColor: AppColors.themeCardBorderColor }} />
                                    <View style={{ width: '100%', alignItems: 'flex-start', marginBottom: 20 }}>
                                        <RecentHorizontal recentArray={this.state.recentSearchArray} onPress={this.recentSearchPress} />
                                    </View>
                                </>
                                : null
                            }

                        </View>

                    </View>



                </View>
            </>
        )



    }

    async recentSearchPress(item) {

        // console.log(item, 'recent search pressed')
        if (this.state.find) {//search ride

            // await this.getSearchData(item.origin, item.destination, item.journey_start_at, item.seat_available)
            // this.state.pickupLocation, this.state.dropLocation, this.state.rawDate, this.state.passengerValue
            this.setState({ pickupLocation: item.origin, dropLocation: item.destination, passengerValue: item.seat_available, selectedIndex: Number(item.seat_available - 1), selectedDate: 'Date and time of departure' })

        }
        else {//offer ride

        }

    }

    selectedVehicle(val) {

        this.setState({ addVehicle: val.label, rideVehicle: val, openAddVeh: false })

    }

    closeVehPopUp() {
        this.setState({ openAddVeh: false })
    }
    addCar() {
        this.closeVehPopUp()
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

            </View>
        )
    }

    menuBtnClick() {
        if (this.state.isSearch == 'cancel') {

            this.props.navigation.openDrawer()
        }
        else if (this.state.isSearch == 'start') {

            this.props.navigation.openDrawer()
        }
        else {
            this.setState({ isSearch: 'cancel' })
        }
    }


    HeaderView = ({ name, gender, count, image, kycStatus, walletAmount }) => {
        return (
            <>
                <View style={{ height: this.state.isSearch == 'cancel' ? 300 : Dimensions.get('window').height * .65, width: '100%' }}>
                    {this.state.permission ?
                        <MapComponent initialRegion={this.state.initialRegion} markers={this.state.markers} loading={this.state.loading} customMapStyle={this.state.customMapStyle} /> :
                        null}

                </View>
                <View style={{ position: 'absolute', width: '100%', backgroundColor: 'transparent' }}>
                    {/* <Header isBack={false} close={() => this.props.navigation.openDrawer()} isRight={true} right={require('../../assets/notification.png')} /> */}
                    <HomeHeader isBack={this.state.isSearch == 'notfound' ? true : false} close={() => this.menuBtnClick()} isRight={true} right={require('../../assets/notification.png')} rightClick={() => this.notiClick(count)} count={count} walletAmount={walletAmount} walletClick={this.walletClick} />
                </View>


                {
                    this.state.isSearch == 'cancel' ?
                        this.SearchOffer(name, gender, image, kycStatus)
                        : this.state.isSearch == 'start' ?
                            <SearchLoaderScreen />
                            :
                            <NoRideFound chooseAnother={this.chooseAnother} />
                }


            </>
        )
    }



    async notiClick(count) {

        if (count > 0) {
            await hitApiToSetSeenNotifications()
        }

        this.props.navigation.navigate('Notification')

    }


    async walletClick() {

        this.setState({openWallet: true})
        // this.props.navigation.navigate('Notification')

    }

    async payPressed (amount)  {
        if (amount == '') {
            Alert.alert('enter amount')

        }
        else {
            this.setState({walletLoader: true})
            const result = await hitApiToAddMoneyToWallet(amount)
            if (result.status) {
                this.setState({openWallet: false})
                Alert.alert('amount added successfully')
            }
            this.setState({walletLoader: false})
            console.log(result)
        }

    }



    render() {

        const { data } = this.props;

        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                {/* {
                    this.state.kycStatus == 0 ?
                        <PendingKYC message={'Your kyc is pending, Please update your kyc'} onOkPress={this.onOkPress} />
                        : this.state.kycStatus == 2 ?
                            <PendingKYC message={'Your kyc document is under review'} onOkPress={this.onOkPress} />
                            :
                            null
                } */}
                < FlatList
                    data={['1']}
                    contentContainerStyle={{ width: Dimensions.get('window').width }}
                    ListHeaderComponent={<this.HeaderView name={data?.name ?? ''} gender={data?.gender} count={data?.notification_count} image={data?.profilePath} kycStatus={data?.kyc_status} walletAmount={data?.wallet_amount} />}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <>
                            <View style={{ padding: 0 }}>

                            </View>

                        </>
                    )}
                />



                <Wallet
                    isLoading={this.state.openWallet}
                    closePopup={() => this.setState({openWallet: false})}
                    onPaymentPress={this.payPressed}
                    loader={this.state.walletLoader}

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