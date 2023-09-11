import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {AppColors} from '../../components/constants/AppColor';
import {Header} from '../../components/commomheader/CommonHeader';
import {
  hitApiToRequestGetEstimatedPrice,
  hitApiToRequestUpdateEstimatedPrice,
  hitApiToSaveRide,
} from '../home/RideModal';
import Toast from 'react-native-simple-toast';
import MapView, {Polyline, Marker} from 'react-native-maps';
import {PriceSelection} from '../../components/priceselection/PriceSelection';
import {AppFontFamily} from '../../components/constants/AppFonts';
export default function MapRoutes({navigation, route}) {
  // let  path1 = [];
  const mapRef = React.useRef(null);

  const {
    pick,
    drop,
    date,
    seat,
    routeData,
    pickMainText,
    dropMainText,
    vehicle,
  } = route.params;
  console.log('router data ', routeData[0].coords);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedDistance, setSelectedDistance] = React.useState(0);
  const [openPrice, setOpenPrice] = React.useState(false);
  const [estimatedPrice, setEstimatedPrice] = React.useState('');
  const [journeyId, setJourneyId] = React.useState('');
  // openPrice

  useEffect(() => {
    (async () => {
      console.log(routeData[0].distance, 'new data');

      // const result = await hitApiToRequestGetEstimatedPrice(routeData[0]?.distance ?? 0)

      // console.log(result.data, 'price result')
      // setEstimatedPrice(String(result.data))

      const item = {distance: routeData[0].distance};
      // console.log(price, 'abc')
      setData(0, item);
    })();

    return () => {
      // clear/remove event listener
    };
  }, []);

  const handleMapLayout = () => {
    const coordinates = routeData.reduce((acc, path) => {
      acc.push(path.origin, path.destination);
      return acc;
    }, []);

    mapRef.current.fitToCoordinates(coordinates, {
      edgePadding: {top: 50, right: 50, bottom: 50, left: 100},
      animated: true,
    });
  };

  const saveRide = async () => {
    const result = await hitApiToSaveRide(
      pick,
      drop,
      seat,
      date,
      selectedIndex,
      estimatedPrice,
      pickMainText,
      dropMainText,
      vehicle,
    );
    console.log(result);
    if (result.status) {
      let itemData = {
        price: estimatedPrice,
        pick: pick,
        drop: drop,
      };

      navigation.navigate('Success', {item: itemData});
    } else {
      Toast.showWithGravity(
        result.message ?? result.error ?? 'Something went wrong',
        2,
        Toast.TOP,
      );
    }
  };

  // const updateEstimatedRide = async (estimatedPrice) => {

  //     const result = await hitApiToRequestUpdateEstimatedPrice(journeyId, estimatedPrice)
  //     console.log(result)
  //     if (result.status) {

  //         // {"data": 952.4361, "status": true}
  //         let itemData = {
  //             'price': estimatedPrice,
  //             'pick': pick,
  //             'drop': drop,

  //         }

  //         navigation.navigate('Success', { item: itemData })
  //         setOpenPrice(false)

  //     }
  //     else {
  //         Toast.showWithGravity(result.message ?? result.error ?? 'Something went wrong', 2, Toast.TOP);
  //     }

  // }

  const save = val => {
    if (!val) {
      Toast.showWithGravity('Please enter estimated price', 2, Toast.TOP);
    } else {
      updateEstimatedRide(val);
    }
    console.log(val, 'price');
  };

  const selectedPrice = val => {
    setOpenPrice(false);
  };
  const closeEstimatePopup = () => {
    setOpenPrice(false);
  };

  const setData = async (index, item) => {
    const result = await hitApiToRequestGetEstimatedPrice(item.distance);

    console.log(result.data, 'price result');
    setEstimatedPrice(String(result.data));
    setSelectedIndex(index);
    // setSelectedDistance(item.distance)
  };

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: AppColors.themePickupDropSearchBg,
        alignItems: 'center',
      }}>
      {routeData.length > 0 ? (
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
                strokeColor={
                  index === selectedIndex
                    ? AppColors.themeMapColorBorder
                    : AppColors.themeSecondarMapBorderColor
                }
                zIndex={index === selectedIndex ? 1 : 0}
                strokeWidth={7}
              />
            </React.Fragment>
          ))}
          {routeData.map((path, index) => (
            <React.Fragment key={index}>
              <Polyline
                coordinates={path.cords}
                strokeColor={
                  index === selectedIndex
                    ? AppColors.themeMapColor
                    : AppColors.themeSecondaryMapColor
                }
                zIndex={index === selectedIndex ? 1 : 0}
                strokeWidth={4}
              />
              {/* <Marker coordinate={path.origin}></Marker> */}

              <Marker coordinate={path.destination}>
                <Image
                  source={require('../../assets/mapmarker3.png')}
                  style={{width: 30, height: 33}}
                  resizeMode="contain"
                />
              </Marker>
            </React.Fragment>
          ))}
        </MapView>
      ) : null}

      <View style={{position: 'absolute', top: 0}}>
        <Header
          close={() => {
            navigation.goBack();
          }}
          text="Select your route"
        />
      </View>

      <View
        style={{
          marginTop: -30,
          backgroundColor: AppColors.themesWhiteColor,
          height: Dimensions.get('window').height / 1.5,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
        }}>
        <FlatList
          data={routeData}
          // columnWrapperStyle={{ flexWrap: 'wrap' }}
          // numColumns={3}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <>
              <View
                style={{
                  width: '100%',
                  padding: 20,
                  backgroundColor: AppColors.themesWhiteColor,
                  borderRadius: 10,
                }}>
                <Pressable
                  onPress={() => {
                    setData(index, item);
                  }}
                  style={{flexDirection: 'row'}}>
                  <View style={{width: '90%', justifyContent: 'center'}}>
                    <Text
                      numberOfLines={3}
                      style={{
                        fontFamily: AppFontFamily.PopinsMedium,
                        color: AppColors.themeBlackColor,
                        fontSize: 16,
                      }}>
                      {item.duration}
                      <Text
                        numberOfLines={3}
                        style={{
                          fontFamily: AppFontFamily.PopinsMedium,
                          color: AppColors.themeText2Color,
                          fontSize: 12,
                        }}>
                        {' (' + item.distance + ')'}
                      </Text>
                    </Text>
                    <Text
                      numberOfLines={3}
                      style={{
                        fontFamily: AppFontFamily.PopinsMedium,
                        color: AppColors.themeText2Color,
                        fontSize: 12,
                      }}>
                      {item.summary}
                    </Text>
                  </View>
                  <View style={{width: '10%', justifyContent: 'center'}}>
                    <Image
                      source={
                        selectedIndex == index
                          ? require('../../assets/bluecircle.png')
                          : require('../../assets/greycircle.png')
                      }
                      style={{
                        marginRight: 5,
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                </Pressable>
                <View
                  style={{
                    width: '98%',
                    height: 2,
                    marginTop: 10,
                    backgroundColor: AppColors.themeCardBorderColor,
                  }}
                />
              </View>
            </>
          )}
        />

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height / 3,
          }}>
          <View style={{width: '95%'}}>
            <Text
              style={{
                marginTop: 0,
                marginBottom: 10,
                fontFamily: AppFontFamily.PopinsBold,
                fontSize: 16,
                color: AppColors.themeBlackColor,
              }}>
              {'Price per seat'}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: AppColors.themePickupDropSearchBg,
              width: '95%',
              borderRadius: 10,
            }}>
            <TextInput
              onChangeText={text => setEstimatedPrice(text)}
              value={estimatedPrice}
              placeholder={'Price per seat'}
              placeholderTextColor={AppColors.themeTextGrayColor}
              style={{
                fontFamily: AppFontFamily.PopinsRegular,
                color: AppColors.themeBlackColor,
                padding: 10,
                width: '95%',
                fontSize: 14,
                textAlign: 'left',
              }}
              keyboardType={
                Platform.OS === 'android' ? 'numeric' : 'number-pad'
              }
            />
          </View>

          <TouchableOpacity
            onPress={() => saveRide()}
            style={{
              marginTop: 10,
              backgroundColor: AppColors.themePrimaryColor,
              width: '95%',
              height: 50,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: AppColors.themesWhiteColor,
              }}>
              {'Proceed'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* {PriceSelection('Estimated Price', openPrice ? true : false, closeEstimatePopup, selectedPrice, estimatedPrice, price, save)} */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maps: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 2.5,
  },
});
