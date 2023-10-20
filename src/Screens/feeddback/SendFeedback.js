import React, { useEffect } from 'react'
import { View, TextInput, Text, Dimensions } from 'react-native'
import { AppColors } from '../../components/constants/AppColor';
import { Header } from '../../components/commomheader/CommonHeader';
import MapComponent from '../../components/map/MapComponent';
import MapView from 'react-native-maps';
import StarRating from 'react-native-star-rating-widget';
import { connect } from 'react-redux';
import { getProfileDataRequest } from '../../redux/actions/actions';
import { AppFontFamily } from '../../components/constants/AppFonts';
import { ButtonPrimary } from '../../components/button/buttonPrimary';
import { hitApiToPostFeedback } from './feedbackModal';
import { ImageLoader } from '../../components/imageloader/ImageLoader';
function SendFeedback({ navigation, route, data, loading, error, getProfileDataRequest }) {

    const [rating, setRating] = React.useState(0);
    const [message, setMessage] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(null);
    useEffect(() => {

        (async () => {
            if (getProfileDataRequest) {
                getProfileDataRequest();
            }
            console.log('feedback data')




        })();

        return () => {
            // clear/remove event listener

        }
    }, []);


    const setRatingFeedback = async () => {


        // toBeRatedUserIds: [{ userId: '1234', rating: '' }],
        // rideId: RideId
        // message: "message"

        const result = await hitApiToPostFeedback()
        if (result.status) {

        }
        else {

        }

    }

    return (
        <View style={{ flex: 1, width: '100%', backgroundColor: AppColors.themesWhiteColor, alignItems: 'center' }}>
            <Header close={() => { navigation.goBack() }} isBack={true} text='Send Feedback' />

            <View
                style={{
                    height: '70%',
                    width: '100%',
                }}>

                <MapView
                    style={{ flex: 1 }}
                />

                <View style={{ height: '50%' }}>

                    <View style={{ width: 80, height: 80, marginLeft: 10, marginTop: -40, borderRadius: 40, overflow: 'hidden', backgroundColor: AppColors.themesWhiteColor, alignItems: 'center', justifyContent: 'center' }}>
                        <ImageLoader
                            image={
                                data && data?.profilePath
                                    ? { uri: data?.profilePath }
                                    : ""
                            }
                            width={60}
                            height={60}
                            borderRadius={30}
                        />
                    </View>
                    <View>
                        <Text style={{
                            width: '100%',
                            color: AppColors.themeBlackColor,
                            fontFamily: AppFontFamily.PopinsBold,
                            fontSize: 18,
                            marginLeft: 15,
                            color: AppColors.textColor,
                        }}>{data?.name}</Text>
                    </View>
                    <View style={{ width: '100%', alignItems: 'center', height: 50, marginTop: 20 }}>

                        <StarRating
                            rating={rating}
                            onChange={setRating}
                            color={AppColors.themePrimaryColor}
                            enableHalfStar={false}
                        />
                    </View>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Text style={{ color: AppColors.themeBlackColor, fontSize: 17, fontFamily: AppFontFamily.PopinsMedium }}>
                            {'Excellent'}
                        </Text>
                    </View>
                    <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
                        <View style={{ width: '90%', backgroundColor: AppColors.themeBgColor, height: 150, borderRadius: 20, borderColor: AppColors.themeCardBorderColor, borderWidth: 1 }}>
                            <TextInput
                                style={{ padding: 10, fontSize: 15, fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeBlackColor }}
                                placeholder={'Message'}
                                placeholderTextColor={AppColors.themeTextGrayColor}
                                value={message}
                                autoFocus
                                multiline
                                onChangeText={(text) => setMessage(text)}

                            />
                        </View>
                    </View>

                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <ButtonPrimary
                            text={'Rate'}
                            style={{ width: '90%' }}
                            onPress={() => isLoading ? console.log('already clicked') : setRatingFeedback()}
                            loader={isLoading}
                        />
                    </View>

                </View>


            </View>


        </View>
    )
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