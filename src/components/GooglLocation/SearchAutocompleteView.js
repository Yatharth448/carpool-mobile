import React from 'react'
import { Modal, View, Text, Image, StyleSheet, Pressable, Dimensions, Keyboard } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { AppKeys } from '../constants/AppKeys';
import { AppColors } from '../constants/AppColor';



export const SearchAutocompleteView = ({ headerText, isLoading, closePopup, onSelectionPress }) => {

    //    'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places'
    // React.useEffect(() => {
    //     // console.log('se', selectedIdType)
    //     Keyboard.isVisible(true)
    // }, []);


    // const selectLocation = (val) => {

    //     console.log('abcsd', isLoading)
    //     selectedText(val)
    //     // closePopup
    // }


    return (
        <Modal visible={isLoading} animationType="slide"
            onRequestClose={() => console.log('closed')} transparent={true}>
            <Pressable>
                {/* onPress={closePopup}> */}
                <View style={styles.popupBg}>

                    <View style={styles.smallCont}>
                        <View style={{ width: '100%', height: 60, justifyContent: 'center', backgroundColor: AppColors.themePrimaryColor }}>
                            <Pressable onPress={closePopup} style={{ marginLeft: 20, flexDirection: 'row', alignItems: 'center' }}>

                                <Image source={require('../../assets/close.png')} style={{ marginRight: 10, width: 18, height: 18, resizeMode: 'contain' }} />
                                <Text style={{ fontSize: 18, color: AppColors.themesWhiteColor }}>
                                    {headerText}
                                </Text>
                            </Pressable>

                        </View>

                        {/* <SafeAreaView> */}
                        <GooglePlacesAutocomplete

                            style={{ width: '100%', }}
                            styles={{
                                textInput: { color: AppColors.themeBlackColor, fontSize: 16, borderColor: AppColors.themeCardBorderColor, borderWidth: 5, height: 50, padding: 1 },
                                row: {
                                    backgroundColor: '#FFFFFF',
                                    padding: 13,
                                    height: 60,
                                    fontSize: 16,
                                    flexDirection: 'row',
                                    color: AppColors.themeBlackColor,
                                },
                                separator: {
                                    height: 0.5,
                                    backgroundColor: '#c8c7cc',
                                },
                                description: {
                                    color: AppColors.themeBlackColor,
                                    fontSize: 16
                                },
                            }}
                            textInputProps={{
                                placeholderTextColor: AppColors.themeText2Color,
                                returnKeyType: "search",
                                autoFocus: true
                            }}
                            // width={300}
                            // autoFocus= {true}
                            borderColor={AppColors.themeCardBorderColor}
                            placeholder="Type a place"
                            color={AppColors.themeBlackColor}
                            fontSize={18}
                            backgroundColor={AppColors.themeTextGrayColor}
                            onPress={(data, details = null) => onSelectionPress(data.description)}
                            // onPress={onSelectionPress}
                            query={{ key: AppKeys.API_KEY }}
                            fetchDetails={true}
                            onFail={error => console.log(error)}
                            onNotFound={() => console.log('no results')}
                            listEmptyComponent={() => (
                                <View style={{ flex: 1, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text>No results were found</Text>
                                </View>
                            )}
                        />
                        {/* </SafeAreaView> */}


                    </View>

                </View>
            </Pressable>
        </Modal>
    )



};
const styles = StyleSheet.create({
    popupBg: {
        width: '100%',
        height: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    smallCont: {
        //    position: 'absolute',
        // alignItems: 'center',
        // justifyContent: 'center',
        // marginTop: 50,
        // bottom: 0,
        width: '100%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: AppColors.themesWhiteColor,

    },
    btnText: {
        color: AppColors.themesWhiteColor,
        fontSize: 16,
        // fontFamily: themes.appFontFamily.medium,
    },


})