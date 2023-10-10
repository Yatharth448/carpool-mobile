import React, { useEffect, useState } from 'react';
import { View, Modal, TextInput, FlatList, Text, StyleSheet, Image, Dimensions, Pressable, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { AppKeys } from '../constants/AppKeys';
import { AppColors } from '../constants/AppColor';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { AppFontFamily } from '../constants/AppFonts';
import { Surface } from 'react-native-paper';
import { getCurrentLocationFromLatLong } from '../location/GetCurrentLocation';

export default function SearchLocation({ navigation, route }) {
    const [selectedInput, setSelectedInput] = useState(null);
    const [pick, setPick] = useState('');
    const [pickMain, setPickMain] = useState('');
    const [drop, setDrop] = useState('');
    const [predictions, setPredictions] = useState([]);
    const { headerText, lat, lng } = route.params;

    useEffect(async () => {



        return () => {
            setPick('')
            setDrop('')

        }
    }, [])


    console.log(lat, lng, 'lat')
    const fetchPredictions = async (text) => {
        console.log(text, 'search text')
        const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${AppKeys.API_KEY}&input=${text}&components=country:in&location=${lat},${lng}&radius=5000`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.predictions) {
                console.log(data.predictions, 'data')
                setPredictions(data.predictions);
            }
        } catch (error) {
            console.error('Error fetching predictions:', error);
        }
    };
    const handleFocus = (inputName) => {
        setSelectedInput(inputName);
    };

    const handlePickInputChange = (text) => {
        setPick(text);
        // setQuery(text)
        fetchPredictions(text);
    };
    const handleDropInputChange = (text) => {
        setDrop(text);
        // setQuery(text)
        fetchPredictions(text);
    };

    const setPickup = (description, mainText) => {
        console.log(selectedInput, description, mainText, 'sel')
        setPredictions([])
        if (selectedInput === '1') {
            setPick(description)
            setPickMain(mainText)
        }
        else {
            setDrop(description)
            navigation.navigate('FindRide', { 'pick': pick, 'pickMain': pickMain, 'drop': description, 'dropMain': mainText, 'from': 'search' })
            // onSelectionPress({ pick: pick, pickMain: pickMain, drop: v, dropMain: mainText })
        }
    }

    const pickClear = () => {
        setPick('');
        setPredictions([])
    };

    const dropClear = () => {
        setDrop('');
        setPredictions([])
    };


    const currentLocationClick = async () => {

        if (selectedInput === '1') {
            setPick(await getCurrentLocationFromLatLong(lat, lng))
        }
        else {
            setDrop(await getCurrentLocationFromLatLong(lat, lng))
            // console.log(pick, 'pickMain', pickMain, 'drop', drop, 'dropMain',  'from', 'search')
            navigation.navigate('FindRide', { 'pick': pick, 'pickMain': pickMain, 'drop': await getCurrentLocationFromLatLong(lat, lng), 'dropMain': await getCurrentLocationFromLatLong(lat, lng), 'from': 'search' })
        }
    }

    const itemHeader = () => {
        return (
            <>
                <Pressable onPress={async () => await currentLocationClick()} style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ width: '15%', justifyContent: 'center' }}>
                        <Image source={require('../../assets/currentlocation.png')} style={{ marginLeft: 0, width: 30, height: 30, resizeMode: 'contain' }} />
                    </View>
                    <View style={{ width: '75%', justifyContent: 'center' }}>

                        <Text style={styles.itemText}>{'Use current location'}</Text>

                    </View>
                </Pressable>
                <View style={{ marginLeft: 50, width: '85%', backgroundColor: AppColors.themeCardBorderColor, height: 1, marginTop: 5, marginBottom: 10 }}>

                </View>
            </>
        )
    }


    return (

        <View style={styles.popupBg}>

            <View style={styles.container}>

                <View style={{ height: 70, backgroundColor: AppColors.themesWhiteColor, width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Pressable onPress={() => navigation.navigate('FindRide', { 'from': 'reset' })} style={{ width: '20%', height: 60, alignItems: 'flex-start', paddingLeft: 10, justifyContent: 'center' }}>
                        <Surface style={{ borderRadius: 20 }} elevation={4}>
                            <Image source={require('../../assets/bckarrow.png')} style={{ width: 40, height: 40 }} />
                        </Surface>
                    </Pressable>
                    <View style={{ width: '60%', height: 60, alignItems: 'center', paddingRight: 20, justifyContent: 'center' }}>
                        <Text style={{ fontFamily: AppFontFamily.PopinsMedium, fontSize: 18, color: AppColors.themeBlackColor }}>{headerText}</Text>
                    </View>

                    <Pressable style={{ width: '20%', height: 60, alignItems: 'flex-end', paddingRight: 20, justifyContent: 'center' }}>
                        {/* <Image source={require('../../assets/profile.png')} style={{ width: 30, height: 30 }} /> */}
                    </Pressable>

                </View>


                <View style={{
                    alignItems: 'center', backgroundColor: AppColors.themesWhiteColor, marginTop: 0,
                    width: '100%'
                }}>

                    <View style={{ flexDirection: 'row', width: '90%', height: Dimensions.get('window').height * 0.15, marginTop: 0, backgroundColor: AppColors.themePickupDropSearchBg, borderRadius: 10, alignItems: 'center' }}>

                        <View style={{ width: '15%', alignItems: 'center' }}>

                            <Image source={require('../../assets/dotone.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />
                            <Image source={require('../../assets/dotline.png')} style={{ marginLeft: 0, width: 5, height: 40, resizeMode: 'contain' }} />
                            <Image source={require('../../assets/triangle.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />

                        </View>

                        <View style={{ width: '85%', justifyContent: 'center', alignItems: 'center' }}>


                            <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row' }}>

                                <View style={{ width: '100%', height: 50, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                    <TextInput
                                        style={styles.input}
                                        value={pick}
                                        autoFocus
                                        onPressIn={() => handleFocus('1')}
                                        // onFocus={() => handleFocus('1')}
                                        // onBlur={handleBlur}
                                        onChangeText={handlePickInputChange}
                                        placeholder="Enter Pickup Location"
                                        placeholderTextColor={AppColors.themeTextGrayColor}
                                    />
                                    <TouchableOpacity onPress={pickClear} style={{ padding: 5, width: '20%', alignItems: 'center' }}>
                                        <AntDesign name="close" size={20} color="gray" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ marginLeft: 0, width: '100%', height: 1, backgroundColor: AppColors.themeTextGrayColor }}></View>
                            <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row' }}>

                                <View style={{ width: '100%', height: 50, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                    <TextInput
                                        onPressIn={() => handleFocus('2')}
                                        style={styles.input}
                                        value={drop}
                                        // onFocus={() => handleFocus('2')}
                                        // onBlur={handleBlur}
                                        onChangeText={handleDropInputChange}
                                        placeholder="Enter Drop Location"
                                        placeholderTextColor={AppColors.themeTextGrayColor}
                                    />
                                    <TouchableOpacity onPress={dropClear} style={{ padding: 5, width: '20%', alignItems: 'center' }}>
                                        <AntDesign name="close" size={20} color="gray" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>




                    </View>


                    <FlatList
                        contentContainerStyle={{ height: Dimensions.get('window').height * .73, marginTop: 20 }}
                        data={predictions}
                        scrollEnabled={true}
                        keyboardShouldPersistTaps={'always'}
                        ListHeaderComponent={itemHeader}
                        keyExtractor={(item) => item.place_id}
                        renderItem={({ item, index }) => (
                            <>

                                <Pressable onPress={() => setPickup(item.description, item.structured_formatting.main_text)} style={{ flexDirection: 'row', width: '100%' }}>
                                    <View style={{ width: '15%', justifyContent: 'center' }}>
                                        <Image source={require('../../assets/searchlist.png')} style={{ marginLeft: 0, width: 40, height: 40, resizeMode: 'contain' }} />
                                    </View>
                                    <View style={{ width: '75%', justifyContent: 'center' }}>

                                        <Text style={styles.itemText}>{item.description}</Text>
                                        <Text style={styles.itemText2}>{item?.structured_formatting?.secondary_text}</Text>

                                    </View>
                                </Pressable>
                                <View style={{ marginLeft: 50, width: '85%', backgroundColor: AppColors.themeCardBorderColor, height: 1, marginTop: 5, marginBottom: 10 }}>

                                </View>
                            </>
                        )}

                    />

                </View>
            </View>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    popupBg: {
        width: '100%',
        height: '100%',
        // justifyContent: 'center',

    },
    input: {
        height: 40,
        // borderColor: '#ccc',
        // borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        paddingLeft: 0,
        width: '80%',
        color: AppColors.themeBlackColor,
        // marginBottom: 10,
    },
    itemText: {
        fontSize: 16,
        // padding: 10,
        color: AppColors.themeBlackColor,
        paddingLeft: 0,
    },
    itemText2: {
        fontSize: 16,
        // padding: 10,
        color: AppColors.themeBlackColor,
        paddingLeft: 0,
        color: AppColors.themeTextGrayColor
    },
});
