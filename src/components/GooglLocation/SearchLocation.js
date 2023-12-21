import React, {useEffect, useState} from 'react';
import {
  View,
  Modal,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {AppKeys} from '../constants/AppKeys';
import {AppColors} from '../constants/AppColor';
import {AppFontFamily} from '../constants/AppFonts';
import {Surface} from 'react-native-paper';
import {getCurrentLocationFromLatLong} from '../location/GetCurrentLocation';

export default function SearchLocation({navigation, route}) {
  const [selectedInput, setSelectedInput] = useState('1');
  const [pick, setPick] = useState('');
  const [pickMain, setPickMain] = useState('');
  const [drop, setDrop] = useState('');
  const [dropMain, setDropMain] = useState('');
  const [predictions, setPredictions] = useState([]);
  const {headerText, lat, lng} = route.params;

  //   useEffect(async () => {
  //     return () => {
  //       setPick('');
  //       setDropMain('');
  //       setPickMain('');
  //       setDrop('');
  //     };
  //   }, []);

  console.log(lat, lng, 'lat');
  const fetchPredictions = async text => {
    console.log(text, 'search text');
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${AppKeys.API_KEY}&input=${text}&components=country:in&location=${lat},${lng}&radius=5000`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.predictions) {
        console.log(data.predictions, 'data');
        setPredictions(data.predictions);
      }
    } catch (error) {
      console.error('Error fetching predictions:', error);
    }
  };
  const handleFocus = inputName => {
    setSelectedInput(inputName);
  };

  const handlePickInputChange = text => {
    setPick(text);
    setSelectedInput('1');
    // setQuery(text)
    fetchPredictions(text);
  };
  const handleDropInputChange = text => {
    setDrop(text);
    setSelectedInput('2');
    // setQuery(text)
    fetchPredictions(text);
  };

  const setPickup = (description, mainText) => {
    console.log(selectedInput, description, 'maintext', mainText, 'sel');
    setPredictions([]);
    if (selectedInput === '1') {
      setPick(description);
      setPickMain(mainText);
      if (drop) {
        navigation.navigate('FindRide', {
          pick: description,
          pickMain: mainText,
          drop: drop,
          dropMain: dropMain,
          from: 'search',
        });
      }
    } else {
      setDrop(description);
      setDropMain(mainText);
      if (pick) {
        navigation.navigate('FindRide', {
          pick: pick,
          pickMain: pickMain,
          drop: description,
          dropMain: mainText,
          from: 'search',
        });
      }
      // onSelectionPress({ pick: pick, pickMain: pickMain, drop: v, dropMain: mainText })
    }
  };

  const pickClear = () => {
    setPick('');
    setPickMain('');
    setPredictions([]);
  };

  const dropClear = () => {
    setDrop('');
    setDropMain('');
    setPredictions([]);
  };

  const currentLocationClick = async () => {
    console.log('select input ', selectedInput);
    if (selectedInput == '1') {
      let location = await getCurrentLocationFromLatLong(lat, lng);
      setPick(location);
      setPickMain(location);
      if (drop) {
        navigation.navigate('FindRide', {
          pick: location,
          pickMain: location,
          drop: drop,
          dropMain: dropMain,
          from: 'search',
        });
      }
    } else if (selectedInput == '2') {
      let location = await getCurrentLocationFromLatLong(lat, lng);
      setDrop(location);
      setDropMain(location);
      // console.log(pick, 'pickMain', pickMain, 'drop', drop, 'dropMain',  'from', 'search')
      if (pick) {
        navigation.navigate('FindRide', {
          pick: pick,
          pickMain: pickMain,
          drop: location,
          dropMain: location,
          from: 'search',
        });
      }
    }
  };

  const itemHeader = id => {
    return (
      <>
        <Pressable
          onPress={async () => await currentLocationClick()}
          style={{flexDirection: 'row', width: '100%'}}>
          <View style={{width: '15%', justifyContent: 'center'}}>
            <Image
              source={require('../../assets/currentlocation.png')}
              style={{
                marginLeft: 0,
                width: 30,
                height: 30,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View style={{width: '75%', justifyContent: 'center'}}>
            <Text style={styles.itemText}>{'Use current location'}</Text>
          </View>
        </Pressable>
        <View
          style={{
            marginLeft: 50,
            width: '85%',
            backgroundColor: AppColors.themeCardBorderColor,
            height: 1,
            marginTop: 5,
            marginBottom: 10,
          }}></View>
      </>
    );
  };

  return (
    <View style={styles.popupBg}>
      <View style={styles.container}>
        <View
          style={{
            marginTop: Platform.OS == 'ios' ? 40: 0,
            height: 70,
            backgroundColor: AppColors.themesWhiteColor,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <Pressable
            onPress={() => navigation.navigate('FindRide', {from: 'reset'})}
            style={{
              width: '20%',
              height: 60,
              alignItems: 'flex-start',
              paddingLeft: 10,
              justifyContent: 'center',
            }}>
            <Surface style={{borderRadius: 20}} elevation={4}>
              <Image
                source={require('../../assets/bckarrow.png')}
                style={{width: 40, height: 40}}
              />
            </Surface>
          </Pressable>
          <View
            style={{
              width: '60%',
              height: 60,
              alignItems: 'center',
              paddingRight: 20,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: AppFontFamily.PopinsMedium,
                fontSize: 18,
                color: AppColors.themeBlackColor,
              }}>
              {headerText}
            </Text>
          </View>

          <Pressable
            style={{
              width: '20%',
              height: 60,
              alignItems: 'flex-end',
              paddingRight: 20,
              justifyContent: 'center',
            }}>
            {/* <Image source={require('../../assets/profile.png')} style={{ width: 30, height: 30 }} /> */}
          </Pressable>
        </View>

        <View
          style={{
            alignItems: 'center',
            backgroundColor: AppColors.themesWhiteColor,
            marginTop: 0,
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              height: Dimensions.get('window').height * 0.15,
              marginTop: 0,
              backgroundColor: AppColors.themePickupDropSearchBg,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <View style={{width: '15%', alignItems: 'center'}}>
              <Image
                source={require('../../assets/dotone.png')}
                style={{
                  marginLeft: 0,
                  width: 10,
                  height: 10,
                  resizeMode: 'contain',
                }}
              />
              <Image
                source={require('../../assets/dotline.png')}
                style={{
                  marginLeft: 0,
                  width: 5,
                  height: 40,
                  resizeMode: 'contain',
                }}
              />
              <Image
                source={require('../../assets/triangle.png')}
                style={{
                  marginLeft: 0,
                  width: 10,
                  height: 10,
                  resizeMode: 'contain',
                }}
              />
            </View>

            <View
              style={{
                width: '85%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: '100%',
                    height: 50,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    style={styles.input}
                    value={pick}
                    autoFocus
                    onPressIn={() => handleFocus('1')}
                    // onFocus={() => handleFocus('1')}
                    // onBlur={handleBlur}
                    onChangeText={handlePickInputChange}
                    placeholder="Enter Source Location"
                    placeholderTextColor={AppColors.themeTextGrayColor}
                  />
                  <TouchableOpacity
                    onPress={pickClear}
                    style={{padding: 5, width: '20%', alignItems: 'center'}}>
                    <Image source={require('../../assets/close.png')} style={{ width: 10, height: 10, tintColor: AppColors.themeBlackColor}} />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  marginLeft: 0,
                  width: '100%',
                  height: 1,
                  backgroundColor: AppColors.themeTextGrayColor,
                }}></View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: '100%',
                    height: 50,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    onPressIn={() => {
                      console.log('set focust ', 2);
                      handleFocus('2');
                    }}
                    style={styles.input}
                    value={drop}
                    // onFocus={() => handleFocus('2')}
                    // onBlur={handleBlur}
                    onChangeText={handleDropInputChange}
                    placeholder="Enter Destination Location"
                    placeholderTextColor={AppColors.themeTextGrayColor}
                  />
                  <TouchableOpacity
                    onPress={dropClear}
                    style={{padding: 5, width: '20%', alignItems: 'center'}}>
                    <Image source={require('../../assets/close.png')} style={{ width: 10, height: 10, tintColor: AppColors.themeBlackColor}} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <FlatList
            contentContainerStyle={{
              height: Dimensions.get('window').height * 0.73,
              marginTop: 20,
            }}
            data={predictions}
            scrollEnabled={true}
            keyboardShouldPersistTaps={'always'}
            ListHeaderComponent={itemHeader}
            keyExtractor={item => item.place_id}
            renderItem={({item, index}) => (
              <>
                <Pressable
                  onPress={() => {
                    console.log('clicked select');
                    setPickup(
                      item.description,
                      item.structured_formatting.main_text,
                    );
                  }}
                  style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{width: '15%', justifyContent: 'center'}}>
                    <Image
                      source={require('../../assets/searchlist.png')}
                      style={{
                        marginLeft: 0,
                        width: 40,
                        height: 40,
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                  <View style={{width: '75%', justifyContent: 'center'}}>
                    <Text style={styles.itemText}>{item.description}</Text>
                    <Text style={styles.itemText2}>
                      {item?.structured_formatting?.secondary_text}
                    </Text>
                  </View>
                </Pressable>
                <View
                  style={{
                    marginLeft: 50,
                    width: '85%',
                    backgroundColor: AppColors.themeCardBorderColor,
                    height: 1,
                    marginTop: 5,
                    marginBottom: 10,
                  }}></View>
              </>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    color: AppColors.themeTextGrayColor,
  },
});
