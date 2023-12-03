import React, {useEffect, useState} from 'react';
import {View, TextInput, Text, Dimensions, Platform} from 'react-native';
import {AppColors} from '../../components/constants/AppColor';
import {Header} from '../../components/commomheader/CommonHeader';
import MapComponent from '../../components/map/MapComponent';
import StarRating from 'react-native-star-rating-widget';
import {connect} from 'react-redux';
import {getProfileDataRequest} from '../../redux/actions/actions';
import {AppFontFamily} from '../../components/constants/AppFonts';
import {ButtonPrimary} from '../../components/button/buttonPrimary';
import {hitApiToPostFeedback} from './feedbackModal';
import {ImageLoader} from '../../components/imageloader/ImageLoader';
import Toast from 'react-native-simple-toast';
import {
  GetCurrentLocation,
  checkLocationPermission,
  checkLocationPermissionIOS,
} from '../../components/location/GetCurrentLocation';
const ratingText = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
};
function SendFeedback({
  navigation,
  route,
  data,
  loading,
  error,
  getProfileDataRequest,
}) {
  const [rating, setRating] = React.useState(0);
  const [message, setMessage] = React.useState(null);
  const [permission, setPermisson] = useState(false);
  const [mapDetails, setMapDetails] = useState(null);
  const [isLoading, setIsLoading] = React.useState(null);
  const {userId, userName, userImage} = route.params;
  console.log('data ', userId, userName, userImage);
  const reloadMap = async () => {
    const perm = Platform.OS == 'android' ?  await checkLocationPermission() : await checkLocationPermissionIOS();

    if (perm) {
      const loc = await GetCurrentLocation();
      // console.log(loc, 'loaction')

      if (loc) {
        // setLocation(loc)

        // console.log('relod 2', this.state.initialRegion, this.state.markers)

        setMapDetails({
          latitude: loc.latitude,
          longitude: loc.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setPermisson(true);
      }

      // console.log(this.state.markers, this.state.initialRegion, 'marker')
    }
  };

  useEffect(() => {
    reloadMap();
    (async () => {
      if (getProfileDataRequest) {
        getProfileDataRequest();
      }
      console.log('feedback data');
    })();

    return () => {
      // clear/remove event listener
    };
  }, []);

  const setRatingFeedback = async () => {
    // toBeRatedUserIds: [{ userId: '1234', rating: '' }],
    // rideId: RideId
    // message: "message"
    if (!rating) {
      Toast.show('Please select rating');
      return;
    }
    if (!message) {
      Toast.show('Please enter a message');
      return;
    }
    const result = await hitApiToPostFeedback(
      [
        {
          userId: userId,
          rating: rating,
        },
      ],
      message,
    );
    if (result.status) {
      Toast.show('Feedback sent successfully');
      navigation.goBack();
    } else {
      Toast.show('Something went wrong');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: AppColors.themesWhiteColor,
        alignItems: 'center',
      }}>
      <Header
        close={() => {
          navigation.goBack();
        }}
        isBack={true}
        text="Send Feedback"
      />

      <View
        style={{
          height: '70%',
          width: '100%',
        }}>
        {permission ? (
          <MapComponent
            initialRegion={mapDetails}
            markers={{
              coordinate: {
                latitude: mapDetails.latitude,
                longitude: mapDetails.longitude,
              },
            }}
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
        ) : null}

        <View style={{height: '50%'}}>
          <View
            style={{
              width: 80,
              height: 80,
              marginLeft: 10,
              marginTop: -40,
              borderRadius: 40,
              overflow: 'hidden',
              backgroundColor: AppColors.themesWhiteColor,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ImageLoader
              image={userImage ? {uri: userImage} : ''}
              width={60}
              height={60}
              borderRadius={30}
            />
          </View>
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
              {userName}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              height: 50,
              marginTop: 20,
            }}>
            <StarRating
              rating={rating}
              onChange={setRating}
              color={AppColors.themePrimaryColor}
              enableHalfStar={false}
            />
          </View>
          <View style={{width: '100%', alignItems: 'center'}}>
            <Text
              style={{
                color: AppColors.themeBlackColor,
                fontSize: 17,
                fontFamily: AppFontFamily.PopinsMedium,
              }}>
              {rating ? ratingText[rating] : 'Select Rating'}
            </Text>
          </View>
          <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
            <View
              style={{
                width: '90%',
                backgroundColor: AppColors.themeBgColor,
                height: 150,
                borderRadius: 20,
                borderColor: AppColors.themeCardBorderColor,
                borderWidth: 1,
              }}>
              <TextInput
                style={{
                  padding: 10,
                  fontSize: 15,
                  fontFamily: AppFontFamily.PopinsRegular,
                  color: AppColors.themeBlackColor,
                }}
                placeholder={'Message'}
                placeholderTextColor={AppColors.themeTextGrayColor}
                value={message}
                autoFocus
                multiline
                onChangeText={text => setMessage(text)}
              />
            </View>
          </View>

          <View style={{alignItems: 'center', marginTop: 20}}>
            <ButtonPrimary
              text={'Rate'}
              style={{width: '90%'}}
              onPress={() =>
                isLoading ? console.log('already clicked') : setRatingFeedback()
              }
              loader={isLoading}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = state => ({
  data: state.data,
  loading: state.loading,
  error: state.error,
});

const mapDispatchToProps = {
  getProfileDataRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(SendFeedback);
