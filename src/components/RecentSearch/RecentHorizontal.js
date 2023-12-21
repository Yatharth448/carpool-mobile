import React from 'react';
import moment from 'moment';
import {Text, Image, View, FlatList, Pressable, Dimensions} from 'react-native';
import {AppColors} from '../../components/constants/AppColor';
import {AppFontFamily} from '../../components/constants/AppFonts';

export const RecentHorizontal = ({
  title = 'Recent Searches',
  recentArray,
  onPress,
}) => {
  return (
    <>
      <View style={{with: '100%', marginTop: 0}}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: AppColors.themeBlackColor,
              fontFamily: AppFontFamily.PopinsMedium,
              fontSize: 16,
            }}>
            {title}
          </Text>

          {/* <Text style={{ color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsRegular, fontSize: 14 }}>
                    {'See all'}
                </Text> */}
        </View>

        <View style={{width: '100%', justifyContent: 'center', marginTop: 10}}>
          <FlatList
            data={recentArray}
            // columnWrapperStyle={{ flexWrap: 'wrap' }}
            // numColumns={4}
            keyExtractor={(item, index) => index}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            renderItem={({item, index}) => (
              <>
                <View style={{padding: 0}}>
                  <Pressable
                    onPress={() => onPress(item)}
                    style={{
                      marginRight: 5,
                      backgroundColor: AppColors.themePickupDropSearchBg,
                      borderRadius: 5,
                      width: Dimensions.get('screen').width * 0.6,
                    }}>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 20,
                      }}>
                      <View
                        style={{
                          width: '20%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={require('../../assets/dottow.png')}
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
                            height: 25,
                            resizeMode: 'contain',
                          }}
                        />
                        <Image
                          source={require('../../assets/dottow.png')}
                          style={{
                            marginLeft: 0,
                            width: 10,
                            height: 10,
                            resizeMode: 'contain',
                          }}
                        />
                      </View>

                      <View style={{width: '80%', justifyContent: 'center'}}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: AppColors.themeText2Color,
                            fontFamily: AppFontFamily.PopinsRegular,
                          }}>
                          {item?.pick_main_text || item.origin}
                        </Text>
                        <Text
                          style={{
                            marginTop: 5,
                            fontSize: 12,
                            color: AppColors.themeText2Color,
                            fontFamily: AppFontFamily.PopinsRegular,
                          }}>
                          {item?.drop_main_text || item.destination}
                        </Text>
                      </View>
                    </View>

                    {item.pay ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          marginTop: 20,
                          borderTopColor: AppColors.themeCardBorderColor,
                          borderTopWidth: 0.3,
                        }}>
                        <View
                          style={{
                            width: '33.3%',
                            borderRightColor: AppColors.themeCardBorderColor,
                            borderRightWidth: 1,
                            padding: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 10,
                              color: AppColors.themeText2Color,
                              fontFamily: AppFontFamily.PopinsRegular,
                            }}>
                            {'Time'}
                          </Text>
                          <Text
                            style={{
                              marginTop: 5,
                              fontSize: 10,
                              color: AppColors.themeText2Color,
                              fontFamily: AppFontFamily.PopinsRegular,
                            }}>
                            {item.journey_start_at
                              ? moment(new Date(item?.journey_start_at)).format(
                                  'HH:mm',
                                )
                              : item.time}
                          </Text>
                        </View>
                        <View style={{width: '33.3%', padding: 10}}>
                          <Text
                            style={{
                              fontSize: 10,
                              color: AppColors.themeText2Color,
                              fontFamily: AppFontFamily.PopinsRegular,
                            }}>
                            {'Seats'}
                          </Text>
                          <Text
                            style={{
                              marginTop: 5,
                              fontSize: 10,
                              color: AppColors.themeText2Color,
                              fontFamily: AppFontFamily.PopinsRegular,
                            }}>
                            {item?.seat_available || item.seat}
                          </Text>
                        </View>
                        <View style={{width: '33.3%', padding: 10}}>
                          <Text
                            style={{
                              fontSize: 10,
                              color: AppColors.themeText2Color,
                              fontFamily: AppFontFamily.PopinsRegular,
                            }}>
                            {'Pay'}
                          </Text>
                          <Text
                            style={{
                              marginTop: 5,
                              fontSize: 10,
                              color: AppColors.themeText2Color,
                              fontFamily: AppFontFamily.PopinsRegular,
                            }}>
                            {item.pay}
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          marginTop: 20,
                          borderTopColor: AppColors.themeCardBorderColor,
                          borderTopWidth: 0.3,
                        }}>
                        <View
                          style={{
                            width: '50%',
                            borderRightColor: AppColors.themeCardBorderColor,
                            borderRightWidth: 1,
                            padding: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 10,
                              color: AppColors.themeText2Color,
                              fontFamily: AppFontFamily.PopinsRegular,
                            }}>
                            {item.journey_start_at ? 'Time' : 'Date'}
                          </Text>
                          <Text
                            style={{
                              marginTop: 5,
                              fontSize: 10,
                              color: AppColors.themeText2Color,
                              fontFamily: AppFontFamily.PopinsRegular,
                            }}>
                            {item.journey_start_at
                              ? moment(new Date(item?.journey_start_at)).format(
                                  'HH:mm',
                                )
                              : item.time}
                          </Text>
                        </View>
                        <View style={{width: '50%', padding: 10}}>
                          <Text
                            style={{
                              fontSize: 10,
                              color: AppColors.themeText2Color,
                              fontFamily: AppFontFamily.PopinsRegular,
                            }}>
                            {'Seats'}
                          </Text>
                          <Text
                            style={{
                              marginTop: 5,
                              fontSize: 10,
                              color: AppColors.themeText2Color,
                              fontFamily: AppFontFamily.PopinsRegular,
                            }}>
                            {item?.seat_available || item.seat}
                          </Text>
                        </View>
                      </View>
                    )}

                    {/* <Text numberOfLines={3} style={{ paddingLeft: 10, paddingBottom: 5, paddingRight: 10, paddingTop: 5, color: AppColors.themeBlackColor, fontSize: 16, fontWeight: '700' }}>{item}</Text> */}
                    {/* </View> */}
                  </Pressable>
                </View>
              </>
            )}
          />
        </View>
      </View>
      <View
        style={{
          width: Dimensions.get('screen').width - 30,
          marginBottom: 10,
          marginTop: 30,
          height: 2,
          backgroundColor: AppColors.themePickupDropSearchBg,
        }}></View>
    </>
  );
};
