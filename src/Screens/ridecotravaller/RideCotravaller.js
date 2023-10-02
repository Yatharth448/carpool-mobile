import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Linking,
} from 'react-native';
import {AppColors} from '../../components/constants/AppColor';
import moment from 'moment';
import {Header} from '../../components/commomheader/CommonHeader';
import messaging from '@react-native-firebase/messaging';
import KeepAwake from 'react-native-keep-awake';

import Toast from 'react-native-simple-toast';
import MapView, {Polyline, Marker} from 'react-native-maps';
import {PriceSelection} from '../../components/priceselection/PriceSelection';
import {AppFontFamily} from '../../components/constants/AppFonts';
import {
  apiUpdateRideRunningStatus,
  apigetRideDetails,
} from './RideCotravallerModel';
import {ButtonPrimary} from '../../components/button/buttonPrimary';
import MapComponent from '../../components/map/MapComponent';
import {Surface} from 'react-native-paper';
import Switch from '../../Utils/Switch';
import {RaiseIssueModal} from '../../components/popupComponents/RaiseIssueModal';

const latitudeArrays = [
  [29.87149, 77.866261],
  [29.871461, 77.866454],
  [29.871352, 77.866636],
  [29.871254, 77.866784],
  [29.871121, 77.866969],
  [29.871042, 77.867127],
  [29.870942, 77.867285],
  [29.870854, 77.867427],
  [29.870728, 77.867636],
  [29.87062, 77.867777],
  [29.870546, 77.867895],
  [29.870469, 77.867994],
  [29.870355, 77.868219],
];

export default function RideCotravaller({navigation, route}) {
  // let  path1 = [];
  const mapRef = React.useRef(null);
  const markerRef = useRef(null);
  const {id} = route.params;
  const [raiseIssueModal, setRaiseIssueModa] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [insideRide, setInsideRide] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [chatId, setChatId] = useState(null);
  let {width, height} = Dimensions.get('window');
  let totalHeight = height / 1.75;
  const ASPECT_RATIO = width / totalHeight;
  const LATITUDE_DELTA = 0.003;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [newLocation, setNewLocation] = useState(null);
  const [state, setState] = useState({
    curLoc: {
      latitude: null,
      longitude: null,
    },
    curAng: 67.5,
    prevLoc: {
      latitude: null,
      longitude: null,
    },
    nextLoc: {
      latitude: null,
      longitude: null,
    },
    destinationCords: {},
    isLoading: false,
  });
  // openPrice
  const fetchRideDetails = async () => {
    const result = await apigetRideDetails(id);
    console.log('result ', result);
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
      if (result.chatId) {
        setChatId(result.chatId);
      }
      if (result.active_ride && result.active_ride.inside_ride) {
        setInsideRide(true);
      } else {
        setInsideRide(false);
      }
      setRouteData({
        ...result.ride,
        paths: path,
      });
      if (result)
        if (result.ride.status == 'running') {
          KeepAwake.activate();
        } else {
          KeepAwake.deactivate();
        }
      if (result.ride.status == 'running' && result.ride.current_lat) {
        let tempState = JSON.parse(JSON.stringify(state));
        setState({
          ...tempState,
          prevLoc: {
            latitude: state.curLoc.latitude,
            longitude: state.curLoc.longitude,
          },
          curLoc: {
            latitude: result.ride.current_lat,
            longitude: result.ride.current_long,
          },
          nextLoc: {
            latitude: result.ride.current_nearer_lat,
            longitude: result.ride.current_nearer_long,
          },
        });
      } else {
        let tempState = JSON.parse(JSON.stringify(state));
        setState({
          ...tempState,
          prevLoc: {
            latitude: state.curLoc.latitude,
            longitude: state.curLoc.longitude,
          },
          curLoc: {
            latitude: path[0].latitude,
            longitude: path[0].longitude,
          },
        });
      }
    }
  };

  const onCenter = () => {
    if (mapRef.current) {
      updateMap();
    }
  };

  const getRotation = (prevPos, curPos) => {
    if (!prevPos) {
      return 0;
    }
    const xDiff = curPos.latitude - prevPos.latitude;
    const yDiff = curPos.longitude - prevPos.longitude;
    return (Math.atan2(yDiff, xDiff) * 180.0) / Math.PI;
  };

  const updateMap = async () => {
    const {curLoc, prevLoc, curAng, nextLoc} = state;
    let curRot;
    if (
      (!prevLoc ||
        (prevLoc &&
          (prevLoc.latitude == null ||
            (prevLoc.latitude == curLoc.latitude &&
              prevLoc.longitude == curLoc.longitude)))) &&
      nextLoc
    ) {
      curRot = getRotation(curLoc, nextLoc);
    } else {
      curRot = getRotation(prevLoc, curLoc);
    }
    if (mapRef.current) {
      mapRef.current.animateCamera({
        heading: curRot,
        center: curLoc,
        pitch: 90,
      });
    }
  };

  const onChange = async () => {
    if (insideRide) {
      setRaiseIssueModa(true);
    } else {
      setInsideRide(true);
      let result = await apiUpdateRideRunningStatus(id, true, null);
      if (result.status) {
        Toast.showWithGravity('You have boarded the ride', 2, Toast.TOP);
      } else {
        setInsideRide(false);
        Toast.showWithGravity(result.message, 2, Toast.TOP);
      }
    }
  };

  const onIssue = async message => {
    if (!message) {
      Toast.showWithGravity(
        'Please enter information about issue',
        2,
        Toast.TOP,
      );
      return;
    }
    let result = await apiUpdateRideRunningStatus(id, false, message);
    if (result.status) {
      Toast.showWithGravity('Issue is submitted', 2, Toast.TOP);
      setInsideRide(false);
      setRaiseIssueModa(false);
    } else {
      setRaiseIssueModa(false);
      Toast.showWithGravity(result.message, 2, Toast.TOP);
    }
  };

  const onResolve = async () => {
    let result = await apiUpdateRideRunningStatus(id, true, null);
    if (result.status) {
      Toast.showWithGravity('Issue has resolved', 2, Toast.TOP);
      setInsideRide(true);
      setRaiseIssueModa(false);
    } else {
      setRaiseIssueModa(false);
      Toast.showWithGravity(result.message, 2, Toast.TOP);
    }
  };

  useEffect(() => {
    if (state.curLoc.latitude && state.curLoc.longitude) {
      updateMap();
    }
  }, [state]);

  useEffect(() => {
    if (newLocation) {
      let tempState = JSON.parse(JSON.stringify(state));
      setState({
        ...tempState,
        prevLoc: {
          latitude: tempState.curLoc.latitude,
          longitude: tempState.curLoc.longitude,
        },
        curLoc: {
          latitude: newLocation.latitude,
          longitude: newLocation.longitude,
        },
      });
    }
  }, [newLocation]);

  const listenToMessage = () => {
    messaging().onMessage(async remoteMessage => {
      console.log('location received ', remoteMessage);
      if (remoteMessage.data && remoteMessage.data.type == 'location') {
        const {lat, long} = remoteMessage.data;
        setNewLocation({
          latitude: parseFloat(lat),
          longitude: parseFloat(long),
        });
      } else if (
        remoteMessage.data &&
        remoteMessage.data.type == 'ride_completed'
      ) {
        await fetchRideDetails();
      }
    });
  };
  useEffect(() => {
    (async () => {
      await fetchRideDetails();
      listenToMessage();
    })();

    return () => {
      // clear/remove event listener
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {routeData &&
        routeData.paths &&
        routeData.paths.length > 0 &&
        state.curLoc &&
        state.curLoc.latitude &&
        state.curLoc.longitude ? (
          <MapView
            minZoomLevel={4}
            maxZoomLevel={32}
            ref={mapRef}
            style={styles.maps}
            // onLayout={handleMapLayout}
            initialRegion={{
              latitude: state.curLoc.latitude,
              longitude: state.curLoc.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
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
              <Marker
                style={{
                  paddingVertical: 1,
                  paddingHorizontal: 1,
                  borderRadius: 1,
                  elevation: 1,
                }}
                anchor={{x: 0.5, y: 0.5}}
                ref={markerRef}
                coordinate={state.curLoc}>
                <Image
                  source={require('../../assets/car_top.png')}
                  style={{width: 30, height: 33}}
                  resizeMode="contain"
                />
              </Marker>
              <Marker
                coordinate={
                  routeData.paths[routeData.paths.length - 1]
                }></Marker>
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
            text={''}
          />
        </View>
        {routeData && routeData.status == 'running' ? (
          <Pressable
            style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'row',
              right: 10,
              top: 400,
              backgroundColor: AppColors.themesWhiteColor,
              padding: 10,
              borderRadius: 5,
            }}
            onPress={() => {
              console.log('pressed');
              onCenter();
            }}>
            <View>
              <Image
                source={require('../../assets/up-arrow.png')}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 5,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <Text style={{marginLeft: 5, fontWeight: 600, color: '#3bbdff'}}>
              RECENTRE
            </Text>
          </Pressable>
        ) : (
          ''
        )}
        <View
          style={{
            marginTop: -20,
            width: Dimensions.get('window').width,
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
                  {userDetails.profile ? (
                    <Image
                      src={userDetails.profile}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 50,
                        resizeMode: 'contain',
                      }}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/avtar.png')}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 5,
                        resizeMode: 'contain',
                      }}
                    />
                  )}
                </View>
              </View>
            </View>
          ) : (
            ''
          )}
          {userDetails ? (
            <View
              style={{
                width: 'auto',
                display: 'inline-block',
              }}>
              <View
                style={{
                  backgroundColor: '#aaa',
                  width: 40,
                  height: 4,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  marginTop: -40,
                }}></View>
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
                borderWidth: 1,
                marginTop: 10,
                marginLeft: 'auto',
                marginRight: 'auto',
                borderColor: AppColors.themeSeperatorColor,
                width: '90%',
                padding: 15,
                borderRadius: 10,
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

          {routeData && routeData.status == 'running' ? (
            <View
              style={{
                width: '90%',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 5,
                borderColor: AppColors.themeSeperatorColor,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                }}>
                <Image
                  source={require('../../assets/carseat.png')}
                  style={{height: 28, resizeMode: 'contain'}}
                />
                INSIDE THIS RIDE
              </Text>
              <Switch
                barHeight={30}
                switchWidth={50}
                switchHeight={20}
                value={insideRide}
                onValueChange={onChange}
                disabled={false}
                backgroundActive={'#0095ff'}
                backgroundInactive={'#d1d1d1'}
                circleActiveColor={'white'}
                circleInActiveColor={'white'}
                // renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
                changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                innerCircleStyle={{
                  borderWidth: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                }} // style for inner animated circle for what you (may) be rendering inside the circle
                outerCircleStyle={{}} // style for outer animated circle
                renderActiveText={false}
                renderInActiveText={false}
                switchLeftPx={3} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                switchRightPx={3} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
                switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
              />
            </View>
          ) : (
            ''
          )}

          {userDetails && routeData && routeData.status == 'running' ? (
            <View
              style={{
                justifyContent: 'space-around',
                width: '100%',
                marginTop: 10,
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: 5,
              }}>
              <Pressable
                onPress={() =>
                  Linking.openURL(`tel:${userDetails.contact_number}`)
                }
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Surface
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    elevation: 4,
                  }}>
                  <Image
                    source={require('../../assets/phone-call.png')}
                    style={{
                      marginLeft: 0,
                      marginBottom: 0,
                      width: 30,
                      height: 30,
                      resizeMode: 'contain',
                    }}
                  />
                </Surface>
              </Pressable>
              <Pressable
                onPress={() =>
                  navigation.navigate('Chat', {
                    coTravellerId: userDetails._id,
                    id: chatId,
                    cotravellerName: userDetails.name,
                    from: 'chat',
                    phone: userDetails.contact_number,
                  })
                }
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Surface
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    elevation: 4,
                  }}>
                  <Image
                    source={require('../../assets/chat.png')}
                    style={{
                      marginLeft: 0,
                      marginBottom: 0,
                      width: 30,
                      height: 30,
                      resizeMode: 'contain',
                    }}
                  />
                </Surface>
              </Pressable>

              <Pressable
                onPress={() => {
                  // code for issue modal
                  setRaiseIssueModa(true);
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Surface
                  style={{
                    padding: 8,
                    height: 60,
                    width: 60,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    elevation: 4,
                  }}>
                  <Image
                    source={require('../../assets/issue.png')}
                    style={{
                      marginLeft: 0,
                      width: 30,
                      height: 30,
                      resizeMode: 'contain',
                    }}
                  />
                </Surface>
              </Pressable>
            </View>
          ) : (
            ''
          )}
          <RaiseIssueModal
            onSubmit={text => {
              onIssue(text);
            }}
            onResolve={() => {
              onResolve();
            }}
            visible={raiseIssueModal}
            onClose={setRaiseIssueModa}
          />
          {routeData && routeData.status == 'completed' ? (
            <View
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                borderRadius: 5,
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: '90%',
                  backgroundColor: AppColors.themeGreenColor,
                  height: 47,
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: AppColors.themesWhiteColor}}>
                  Ride Completed
                </Text>
              </View>
            </View>
          ) : (
            ''
          )}
          {/* <View
            style={{
              paddingLeft: 20,
              width: '88%',
              alignItems: 'left',
              marginTop: 10,
              marginBottom: 10,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: AppFontFamily.PopinsBold,
                color: AppColors.themeBlackColor,
              }}>
              Reviews
            </Text>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    width: '100%',
    height: 400,
    backgroundColor: AppColors.themePickupDropSearchBg,
  },
  maps: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 1.75,
  },
});
