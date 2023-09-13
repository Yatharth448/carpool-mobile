import React, {useEffect, useState} from 'react';
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
import moment from 'moment';
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
import {apiStartRide, apigetRideDetails} from './StartRideModel';
import {ButtonPrimary} from '../../components/button/buttonPrimary';
import {
  GetCurrentLocation,
  checkLocationPermission,
} from '../../components/location/GetCurrentLocation';
import MapComponent from '../../components/map/MapComponent';

export default function StartRideCarpooler({navigation, route}) {
  // let  path1 = [];
  const mapRef = React.useRef(null);
  const {id} = route.params;
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [routeData, setRouteData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [selectedDistance, setSelectedDistance] = React.useState(0);
  const [openPrice, setOpenPrice] = React.useState(false);
  const [estimatedPrice, setEstimatedPrice] = React.useState('');
  const [journeyId, setJourneyId] = React.useState('');
  // openPrice
  const fetchRideDetails = async () => {
    const result = await apigetRideDetails(id);
    if (result.status === false) {
      Toast.showWithGravity(
        result.message ?? result.error ?? 'Something went wrong',
        2,
        Toast.TOP,
      );
    } else {
      let path = result.ride.lat_long_points.map(tempItem => {
        return {
          latitude: tempItem[0],
          longitude: tempItem[1],
        };
      });
      setUserDetails(result.user);
      setRouteData({
        ...result.ride,
        paths: path,
      });
      setMap();
    }
  };
  useEffect(() => {
    (async () => {
      await fetchRideDetails();
    })();

    return () => {
      // clear/remove event listener
    };
  }, []);

  const setMap = () => {
    mapRef.animateToRegion({
      latitude: routeData.paths[0].latitude,
      longitude: routeData.paths[0].longitude,
    });
  };

  const handleMapLayout = () => {
    const coordinates = routeData.paths.reduce((acc, path) => {
      acc.push(path.origin, path.destination);
      return acc;
    }, []);

    mapRef.current.fitToCoordinates(coordinates, {
      edgePadding: {top: 50, right: 50, bottom: 50, left: 100},
      animated: true,
    });
  };

  const saveRide = async () => {
    if (routeData.status) {
      Toast.showWithGravity(
        result.message ?? result.error ?? 'Something went wrong',
        2,
        Toast.TOP,
      );
      return;
    }
    const result = await apiStartRide(id);
    console.log(result);
    if (result.status) {
      Toast.showWithGravity('Ride has started', 2, Toast.TOP);
      await fetchRideDetails();
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

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: 400,
        backgroundColor: AppColors.themePickupDropSearchBg,
        alignItems: 'center',
      }}>
      {routeData && routeData.paths.length > 0 ? (
        <MapView
          ref={mapRef}
          style={styles.maps}
          onLayout={handleMapLayout}
          initialRegion={{
            latitude: routeData.paths[0].latitude,
            longitude: routeData.paths[0].longitude,
            latitudeDelta: 0.922,
            longitudeDelta: 0.0421,
          }}>
          <React.Fragment key={0}>
            <Polyline
              coordinates={routeData.paths}
              strokeColor={AppColors.themeMapColorBorder}
              zIndex={1}
              strokeWidth={7}
            />
          </React.Fragment>

          <React.Fragment key={1}>
            <Polyline
              coordinates={routeData.paths}
              strokeColor={AppColors.themeMapColor}
              zIndex={1}
              strokeWidth={4}
            />

            <Marker coordinate={routeData.paths[routeData.paths.length - 1]}>
              <Image
                source={require('../../assets/mapmarker3.png')}
                style={{width: 30, height: 33}}
                resizeMode="contain"
              />
            </Marker>
          </React.Fragment>
        </MapView>
      ) : (
        <View style={styles.maps}>
          <MapComponent
            initialRegion={{
              latitude: 28.6539952,
              longitude: 76.973255,
              latitudeDelta: 0.922,
              longitudeDelta: 0.0421,
            }}
            markers={{latitude: 28.6539952, longitude: 76.973255}}
            loading={false}
            customMapStyle={[
              {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [
                  {
                    color: '#eeeeee',
                  },
                ],
              },
              {
                featureType: 'poi',
                elementType: 'labels.text',
                stylers: [
                  {
                    visibility: 'off',
                  },
                ],
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#9e9e9e',
                  },
                ],
              },
            ]}
          />
        </View>
      )}

      <View style={{position: 'absolute', top: 0}}>
        <Header
          isBack={false}
          close={() => {
            navigation.openDrawer();
          }}
          text=""
        />
      </View>

      <View
        style={{
          marginTop: -20,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height / 1.25,
          backgroundColor: AppColors.themesWhiteColor,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}>
        {userDetails ? (
          <View
            style={{
              left: 0,
              marginTop: 20,
              backgroundColor: 'white',
            }}>
            <View
              style={{
                width: 'auto',
                display: 'inline-block',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: 100,
                  height: 100,
                  marginTop: -60,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                }}>
                <Image
                  source={require('../../assets/avtar.png')}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 5,
                    resizeMode: 'contain',
                  }}
                />
              </View>
            </View>
          </View>
        ) : (
          ''
        )}
        {routeData ? (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  width: '100%',
                  color: AppColors.themeBlackColor,
                  fontFamily: AppFontFamily.PopinsBold,
                  fontSize: 18,
                  marginLeft: 15,
                  color: AppColors.textColor,
                }}>
                {userDetails ? userDetails.name : ''}
              </Text>
            </View>
            <View
              style={{
                marginRight: 10,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <View>
                <Text
                  style={{
                    width: '100%',
                    color: AppColors.themeBlackColor,
                    fontFamily: AppFontFamily.PopinsRegular,
                    fontSize: 16,
                    color: AppColors.textColor,
                  }}>
                  {routeData.vehicle_name}
                </Text>
              </View>

              <View style={{width: 'auto'}}>
                <Text
                  style={{
                    width: '100%',
                    color: AppColors.themeBlackColor,
                    fontFamily: AppFontFamily.PopinsExtraBold,
                    fontSize: 16,
                    textAlign: 'center',
                    borderRadius: 20,
                    padding: 5,
                    paddingHorizontal: 15,
                    backgroundColor: '#D5DDE0',
                    color: AppColors.textColor,
                  }}>
                  {routeData.vehicle_number}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          ''
        )}

        {routeData ? (
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '25%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontFamily: AppFontFamily.PopinsRegular,
                    color: AppColors.themeTextPrimaryColor,
                    fontSize: 13,
                  }}>
                  {routeData
                    ? moment(routeData.journey_start_at).format('HH:mm')
                    : ''}
                </Text>
                <Image
                  source={require('../../assets/dotone.png')}
                  style={{
                    marginLeft: 10,
                    width: 10,
                    height: 10,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontFamily: AppFontFamily.PopinsRegular,
                    color: AppColors.themesWhiteColor,
                    fontSize: 13,
                    marginLeft: 10,
                  }}>
                  {'15:30'}
                </Text>
                <View
                  style={{
                    width: 2,
                    height: 25,
                    backgroundColor: AppColors.themeBlackColor,
                  }}></View>
                {/* <Image source={require('../../assets/dotline.png')} style={{ marginLeft: 0, width: 5, height: 50, resizeMode: 'contain' }} /> */}
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Image
                  source={require('../../assets/triangle.png')}
                  style={{
                    marginLeft: 40,
                    width: 10,
                    height: 10,
                    resizeMode: 'contain',
                  }}
                />
              </View>
            </View>

            <View
              style={{
                marginLeft: 0,
                width: '75%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: 20,
                  marginBottom: 0,
                }}>
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontFamily: AppFontFamily.PopinsRegular,
                      width: '100%',
                      color: AppColors.themeTextPrimaryColor,
                      fontSize: 15,
                    }}>
                    {routeData.journey_origin_address}
                  </Text>
                </View>
              </View>
              <View style={{marginLeft: 0, width: '100%', height: 0}}></View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginBottom: 20,
                  marginTop: 20,
                }}>
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontFamily: AppFontFamily.PopinsRegular,
                      width: '100%',
                      color: AppColors.themeTextPrimaryColor,
                      fontSize: 15,
                    }}>
                    {routeData.journey_destination_address}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          ''
        )}
        {routeData && !routeData.status ? (
          <View
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }}>
            <ButtonPrimary
              style={{width: '90%'}}
              text={'Start Ride'}
              onPress={() => {
                saveRide();
              }}
              loader={false}
            />
          </View>
        ) : (
          ''
        )}
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
    height: Dimensions.get('screen').height / 1.75,
  },
});
