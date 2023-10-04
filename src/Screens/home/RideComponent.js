import React from 'react';
import {
  Text,
  Image,
  View,
  FlatList,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {AppColors} from '../../components/constants/AppColor';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppFontFamily} from '../../components/constants/AppFonts';
import {ButtonPrimary} from '../../components/button/buttonPrimary';
import CommonLoaders from '../../components/loader/Loader';
import {ImageLoader} from '../../components/imageloader/ImageLoader';
export const AvtarView = ({image, name, type}) => {
  const [loading, setLoading] = React.useState(false);
  // console.log(image, 'image')

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
      }}>
      <View
        style={{
          width: 60,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 30,
          overflow: 'hidden',
        }}>
        <ImageLoader image={image} width={60} height={60} borderRadius={30} />
      </View>

      <View
        style={{
          width: '78%',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <Text
          style={{
            width: '100%',
            color: AppColors.themeBlackColor,
            fontFamily: AppFontFamily.PopinsBold,
            fontSize: 18,
          }}>
          {'Hey' + ', ' + name}
        </Text>
        <Text
          style={{
            width: '100%',
            color: AppColors.themeBlackColor,
            fontFamily: AppFontFamily.PopinsRegular,
            fontSize: 14,
          }}>
          {type
            ? 'Enter details below to find your ride'
            : 'Enter details below to offer ride'}
        </Text>
      </View>
    </View>
  );
};

export const SeatsView = ({data, selectedIndex, setSelectedIndex}) => {
  return (
    <View
      style={{
        with: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
      }}>
      <View
        style={{
          width: '40%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Image
          source={require('../../assets/carseat.png')}
          style={{width: 20, height: 20, resizeMode: 'contain'}}
        />
        <Text
          style={{
            marginLeft: 10,
            color: AppColors.themeBlackColor,
            fontFamily: AppFontFamily.PopinsRegular,
            fontSize: 14,
          }}>
          {'Seats needed'}
        </Text>
      </View>

      <View style={{width: '55%', alignItems: 'flex-end'}}>
        <FlatList
          data={data}
          columnWrapperStyle={{flexWrap: 'wrap'}}
          numColumns={5}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <>
              <View style={{padding: 0}}>
                <Pressable
                  onPress={() => setSelectedIndex(index)}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 5,
                    width: 26,
                    height: 26,
                    backgroundColor:
                      selectedIndex == index
                        ? AppColors.themePrimaryColor
                        : AppColors.themesWhiteColor,
                    borderRadius: 5,
                    borderWidth: 1.5,
                    borderColor: AppColors.themePrimaryColor,
                  }}>
                  {/* <View style={{ padding: 10 }}> */}
                  <Text
                    numberOfLines={1}
                    style={{
                      marginTop: 2,
                      fontFamily: AppFontFamily.PopinsRegular,
                      color:
                        selectedIndex == index
                          ? AppColors.themesWhiteColor
                          : AppColors.themePrimaryColor,
                      fontSize: 14,
                    }}>
                    {item}
                  </Text>
                  {/* </View> */}
                </Pressable>
              </View>
            </>
          )}
        />
      </View>
    </View>
  );
};

export const CotravellerView = ({onCheck, image}) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
      }}>
      <View style={{width: '68%', flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('../../assets/cotraveller.png')}
          style={{width: 18, resizeMode: 'contain'}}
        />
        <Text
          style={{
            marginLeft: 10,
            color: AppColors.themeBlackColor,
            fontFamily: AppFontFamily.PopinsRegular,
            fontSize: 16,
          }}>
          {'Need a female co traveller'}
        </Text>
      </View>

      <Pressable
        onPress={onCheck}
        style={{
          width: '27%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <Icon name={image} size={24} color={AppColors.themePrimaryColor} />
      </Pressable>
    </View>
  );
};

export const PendingKYC = ({message, onOkPress}) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 0,
        backgroundColor: '#ffcc00',
        height: 30,
      }}>
      <View
        style={{
          width: '85%',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            marginLeft: 10,
            color: AppColors.themesWhiteColor,
            fontFamily: AppFontFamily.PopinsBold,
            fontSize: 12,
          }}>
          {message}
        </Text>
      </View>

      <Pressable
        onPress={onOkPress}
        style={{
          width: '15%',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../assets/close.png')}
          style={{marginRight: 10, width: 10, resizeMode: 'contain'}}
        />
      </Pressable>
    </View>
  );
};

export const NoRideFound = ({chooseAnother}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: AppColors.themesWhiteColor,
        marginTop: 0,
        width: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        height: Dimensions.get('window').height * 0.35,
        justifyContent: 'center',
      }}>
      <View
        style={{width: '95%', justifyContent: 'center', alignItems: 'center'}}
        elevation={4}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Image
            source={require('../../assets/avtar.png')}
            style={{
              borderRadius: 40,
              width: 80,
              height: 80,
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
          <TouchableOpacity
            style={{
              width: '70%',
              justifyContent: 'center',
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                width: '100%',
                color: AppColors.themeTextGrayColor,
                fontSize: 16,
              }}>
              {'Sorry, there are no vehicles in the area'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{width: '95%', alignItems: 'center', marginTop: 20}}>
        <ButtonPrimary
          text={'Choose another location'}
          onPress={() => chooseAnother()}
          loader={false}
        />
      </View>
    </View>
  );
};

export const SearchLoaderScreen = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: AppColors.themesWhiteColor,
        marginTop: 0,
        width: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        height: Dimensions.get('window').height * 0.35,
        justifyContent: 'center',
      }}>
      <CommonLoaders.SearchRide />
    </View>
  );
};
