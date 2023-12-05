import React, {useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  FlatList,
  Dimensions,
  Pressable,
  Linking,
} from 'react-native';
import {AppColors} from '../../components/constants/AppColor';
import {hitApiToGetRideList, hitApiToRequestARide} from './RideListModal';
import {Header} from '../../components/commomheader/CommonHeader';
import moment from 'moment';
import {AppTexts} from '../../components/constants/AppTexts';
import {
  CalculateTimeFromMilies,
  calculatedJourneyDuration,
  calculatedJourneyEndTime,
  convertToKms,
} from '../../components/commonfunction/CommonFunctions';
import {AppFontFamily} from '../../components/constants/AppFonts';
import {FindRideFilterView} from './FindRideComp';
import {Surface} from 'react-native-paper';
import {ButtonPrimary} from '../../components/button/buttonPrimary';
import CommonLoaders from '../../components/loader/Loader';
import Toast from 'react-native-simple-toast';
import {showNotification} from '../../components/notifications/LocalNotification';
import Wallet from '../wallet/Wallet';
import {
  hitApiToAddMoneyToWallet,
  hitApiToGetPaymentURL,
} from '../payment/PaymentModal';
import {createOpenLink} from 'react-native-open-maps';
import {GetCurrentLocation} from '../../components/location/GetCurrentLocation';
import CouponPopup from '../../components/couponPopup/CouponPopup';
import {hitApiToGetWalletAndNotification} from '../home/RideModal';
export default function FindRideList({navigation, route}) {
  const [rideList, setRideList] = React.useState([]);
  const {data, seat, pick, drop} = route.params;
  const [walletBal, setWalletBal] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [startLoader, setStartLoader] = React.useState(false);
  const [openWallet, setOpenWallet] = React.useState(false);
  const [walletLoader, setWalletLoader] = React.useState(false);

  useEffect(() => {
    (async () => {
      console.log(data, 'find ride');
      await getWalletBalance();
      //Put your logic here
      // const result = await hitApiToGetRideList(pick, drop, date, seat);
      // console.log("ride list", result);
      // if (result.status) {

      const updatedArray = data.map(obj => {
        return {...obj, loader: false};
      });

      setRideList(updatedArray ?? []);
      setIsLoading(true);
      // }
      // else {
      console.log(updatedArray);
      // }
    })();

    return () => {
      // clear/remove event listener
    };
  }, []);

  const getWalletBalance = async () => {
    const result = await hitApiToGetWalletAndNotification();
    if (result.status) {
      setWalletBal(result.data?.wallet ?? 0);
    } else {
    }
  };

  const setSelectedIndex = i => {
    setIndex(i);
  };

  const requestRide = async (item, itemIndex) => {
    const updatedArray = rideList.map((obj, index) =>
      index === itemIndex ? {...obj, loader: true} : obj,
    );
    updatedArray.reverse();
    setRideList(updatedArray);

    const result = await hitApiToRequestARide(
      item._id,
      seat,
      item.intresected_source_lat,
      item.intresected_source_long,
      item.intresected_destination_lat,
      item.intresected_destination_long,
      item.request_charge,
    );
    console.log(result, 'request ride response');
    if (result.status) {
      const updatedArra = rideList.map((obj, index) =>
        index === itemIndex
          ? {...obj, alreadyRequest: true, loader: false}
          : obj,
      );
      updatedArra.reverse();
      setRideList(updatedArra);

      showNotification({
        title: 'Congratulations!',
        message:
          'Your ride request has been sent succesfully to ' + item.user_name,
      });
    } else {
      const updatedArra = rideList.map((obj, index) =>
        index === itemIndex
          ? {...obj, alreadyRequest: false, loader: false}
          : obj,
      );
      updatedArra.reverse();
      setRideList(updatedArra);
      setStartLoader(false);

      if (result.message == 'Please add money to wallet') {
        setOpenWallet(true);
      }
    }
  };

  const openGoogleMapDirections = async (sourceLat, sourceLng) => {
    const loc = await GetCurrentLocation();
    const source = `${loc.latitude},${loc.longitude}`;
    const destination = `${sourceLat},${sourceLng}`;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${source}&destination=${destination}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.error("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  const openNavigation = item => {
    console.log('nav clicked', item);
    openGoogleMapDirections(
      item.intresected_source_lat,
      item.intresected_source_long,
      item.intresected_destination_lat,
      item.intresected_destination_long,
    );
    // createOpenLink({ latitude: 37.865101, longitude: -119.538330, query: 'Yosemite Trails', zoom: 0 })
  };

  const ListView = () => {
    return (
      <>
        {/* <View style={{ width: '98%', alignItems: 'center' }}> */}

        {/* <FindRideFilterView
                        data={[{ 'name': 'Female co-traveller' }, { 'name': 'Smoking Allowed' }, { 'name': 'Pets Allowed' }]}
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}
                    /> */}
        {/* </View> */}

        <FlatList
          data={rideList.reverse()}
          // refreshControl={
          //     <RefreshControl
          //         onRefresh={() => this.getCartList()}
          //         refreshing={this.state.isFetching}
          //         title={themes.appCustomTexts.PullToRefreshText}
          //         tintColor={themes.appColors.themeBackgroundBlackColor}
          //         titleColor={themes.appColors.themeBackgroundBlackColor}
          //     />
          // }
          keyExtractor={(item, index) => index}
          // ListHeaderComponent={this.headerView()}
          showsVerticalScrollIndicator={false}
          // extraData={this.state}
          // onEndReached={() => this.getCartList()}
          renderItem={({item, index}) => (
            <View
              style={{
                width: Dimensions.get('window').width,
                alignItems: 'center',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Surface
                elevation={4}
                style={{
                  width: '95%',
                  backgroundColor: AppColors.themesWhiteColor,
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      width: '60%',
                      flexDirection: 'row',
                      paddingLeft: 10,
                    }}>
                    <View style={{width: '22%'}}>
                      <Image
                        source={require('../../assets/avtar.png')}
                        style={{
                          marginRight: 5,
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                    <View style={{justifyContent: 'center', width: '78%'}}>
                      <Text
                        style={{
                          paddingLeft: 0,
                          padding: 10,
                          paddingTop: 0,
                          paddingBottom: 0,
                          fontFamily: AppFontFamily.PopinsBold,
                          fontSize: 14,
                          color: AppColors.themeText2Color,
                        }}>
                        {item.user_name ?? 'Sachin Gupta'}
                      </Text>
                      {item?.rating ? (
                        <View
                          style={{
                            paddingLeft: 0,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={require('../../assets/Star.png')}
                            style={{
                              marginRight: 5,
                              width: 12,
                              height: 12,
                              marginBottom: 3,
                              resizeMode: 'contain',
                            }}
                          />
                          <Text
                            style={{
                              paddingTop: 0,
                              fontFamily: AppFontFamily.PopinsRegular,
                              fontSize: 12,
                              color: AppColors.themeText2Color,
                            }}>
                            {item?.rating + ' rating'}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </View>

                  <View
                    style={{
                      width: '40%',
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      style={{
                        padding: 10,
                        fontFamily: AppFontFamily.PopinsBold,
                        fontSize: 13,
                        color: AppColors.themePrimaryColor,
                      }}>
                      {moment(item.journey_start_at).format(
                        'DD MMM YYYY, HH:mm',
                      )}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: '100%',
                    marginBottom: 10,
                    height: 2,
                    backgroundColor: AppColors.themePickupDropSearchBg,
                  }}></View>

                <View
                  style={{flexDirection: 'row', width: '100%', marginTop: 10}}>
                  <View
                    style={{
                      width: '75%',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={{width: '25%', alignItems: 'center'}}>
                      <View style={{width: '100%', alignItems: 'center'}}>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontFamily: AppFontFamily.PopinsRegular,
                            color: AppColors.themeTextPrimaryColor,
                            fontSize: 12,
                          }}>
                          {moment(item.journey_start_at).format('HH:mm') +
                            '   '}
                        </Text>
                      </View>
                      <View style={{width: '100%', alignItems: 'center'}}>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontFamily: AppFontFamily.PopinsRegular,
                            color: AppColors.themeTextPrimaryColor,
                            fontSize: 10,
                          }}>
                          {calculatedJourneyDuration(item.journey_approx_time) +
                            '   '}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          alignItems: 'center',
                          marginTop: 10,
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontFamily: AppFontFamily.PopinsRegular,
                            color: AppColors.themeTextPrimaryColor,
                            fontSize: 12,
                          }}>
                          {calculatedJourneyEndTime(
                            item.journey_start_at,
                            item.journey_approx_time,
                          ) + '   '}
                        </Text>
                      </View>
                    </View>

                    <View style={{width: '10%'}}>
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
                          marginLeft: 2,
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
                        width: '65%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: '100%',
                          alignItems: 'center',
                          marginTop: 10,
                        }}>
                        <View
                          style={{
                            width: '100%',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontFamily: AppFontFamily.PopinsRegular,
                              width: '100%',
                              color: AppColors.themeTextPrimaryColor,
                              fontSize: 12,
                            }}>
                            {item.intresected_source_address}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          marginLeft: 0,
                          width: '100%',
                          height: 20,
                        }}></View>
                      <View
                        style={{
                          width: '100%',
                          alignItems: 'center',
                          marginBottom: 10,
                        }}>
                        <View
                          style={{
                            width: '100%',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontFamily: AppFontFamily.PopinsRegular,
                              width: '100%',
                              color: AppColors.themeTextPrimaryColor,
                              fontSize: 12,
                            }}>
                            {item.intresected_destination_address}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={{width: '25%', alignItems: 'flex-end'}}>
                    <Text
                      style={{
                        paddingTop: 8,
                        paddingRight: 10,
                        paddingBottom: 0,
                        fontFamily: AppFontFamily.PopinsBold,
                        fontSize: 16,
                        color: AppColors.themeText2Color,
                      }}>
                      {AppTexts.Rupee_Symbol +
                        Number(item.request_charge).toFixed(0)}
                    </Text>

                    <Text
                      style={{
                        padding: 10,
                        paddingTop: 5,
                        paddingLeft: 0,
                        paddingBottom: 0,
                        fontFamily: AppFontFamily.PopinsRegular,
                        fontSize: 13,
                        color: AppColors.themeBlackColor,
                      }}>
                      {item.seat_left + ' seats left'}
                    </Text>
                  </View>
                </View>
                {item.coupon_name ? (
                  <Text
                    style={{
                      textAlign: 'right',
                      paddingTop: 0,
                      paddingRight: 10,
                      fontFamily: AppFontFamily.PopinsSemiBold,
                      fontSize: 12,
                      color: AppColors.themeGreenColor,
                    }}>
                    Get{' '}
                    {AppTexts.Rupee_Symbol +
                      Number(item.coupon_value).toFixed(0)}{' '}
                    off with {item.coupon_name}
                  </Text>
                ) : (
                  ''
                )}
                <View
                  style={{
                    width: '100%',
                    marginBottom: 10,
                    height: 2,
                    backgroundColor: AppColors.themePickupDropSearchBg,
                  }}></View>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginBottom: 10,
                    justifyContent: 'center',
                  }}>
                  <Pressable
                    onPress={() => openNavigation(item)}
                    style={{width: '40%', alignItems: 'center'}}>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        backgroundColor: AppColors.themePickupDropSearchBg,
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        borderColor: AppColors.themePrimaryColor,
                        borderWidth: 1,
                        height: 35,
                      }}>
                      <Image
                        source={require('../../assets/direction.png')}
                        style={{
                          marginLeft: 0,
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          tintColor: AppColors.themePrimaryColor,
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: AppFontFamily.PopinsMedium,
                          fontSize: 12,
                          color: AppColors.themePrimaryColor,
                        }}>
                        {'Nearest pickup'}
                      </Text>
                    </View>
                  </Pressable>

                  <View style={{width: '55%', alignItems: 'flex-end'}}>
                    {item?.alreadyRequest ? (
                      <View style={{width: '70%'}}>
                        <ButtonPrimary
                          style={{height: 35}}
                          textStyle={{
                            fontFamily: AppFontFamily.PopinsRegular,
                            fontSize: 12,
                          }}
                          disabled={true}
                          text={'Requested'}
                          onPress={() => console.log('Requested')}
                          loader={false}
                        />
                      </View>
                    ) : (
                      <View style={{width: startLoader ? '75%' : '70%'}}>
                        <ButtonPrimary
                          style={{height: 35}}
                          textStyle={{
                            fontFamily: AppFontFamily.PopinsRegular,
                            fontSize: 12,
                          }}
                          text={'Request Ride'}
                          onPress={() =>
                            startLoader
                              ? console.log('empty')
                              : requestRide(item, index)
                          }
                          // onPress={() => setOpenWallet(true)}
                          loader={item.loader}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </Surface>
            </View>
          )}
        />
      </>
    );
  };

  const payPressed = async amount => {
    if (amount == '') {
      Alert.alert('enter amount');
    } else {
      const result = await hitApiToGetPaymentURL(amount);
      console.log(result);
      if (result.status) {
        console.log(result.data.payLink);
        setOpenWallet(false);
        navigation.navigate('PayGateway', {payURL: result.data.payLink});
      } else {
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: AppColors.themePickupDropSearchBg,
        alignItems: 'center',
      }}>
      <Header
        close={() => {
          navigation.navigate('RideDrawer', {
            screen: 'FindRide',
            params: {from: 'reset'},
          });
        }}
        text="Ride options"
      />
      <View style={{width: '100%', alignItems: 'center'}}>
        <Text
          style={{
            width: '94%',
            fontFamily: AppFontFamily.PopinsMedium,
            fontSize: 12,
            color: AppColors.themePrimaryColor,
          }}>{`${pick}  ->  ${drop}`}</Text>
      </View>

      {isLoading
        ? rideList.length
          ? ListView()
          : CommonLoaders.NoDataInList('No rides found')
        : CommonLoaders.RideHistoryLoader()}

      <Wallet
        isLoading={openWallet}
        closePopup={() => setOpenWallet(false)}
        onPaymentPress={payPressed}
        loader={walletLoader}
      />

      <CouponPopup
        walletBal={walletBal}
        isLoading={openWallet}
        closePopup={() => setOpenWallet(false)}
        onPaymentPress={payPressed}
        loader={walletLoader}
      />
    </View>
  );
}
