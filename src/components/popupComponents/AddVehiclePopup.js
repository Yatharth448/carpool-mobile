import React from 'react'
import { Modal, View, Text, Image, StyleSheet, Pressable, FlatList, Dimensions } from 'react-native'
import { AppColors } from '../constants/AppColor';
import { AppFontFamily } from '../constants/AppFonts';
import CommonLoaders from '../loader/Loader';
export const AddVehiclePopup = ({ data, headerText, isLoading, closePopup, selectedVehicle, addCar }) => {


    // const carArray = [{ 'value': '1', 'label': 'Tata Nexon' }, { 'value': '2', 'label': 'MG Hector' }]
    React.useEffect(() => {
        // console.log('se', selectedIdType)


    }, []);

    const NoData = () =>{
        return(
            CommonLoaders.NoDataInList('No vehicle found, Please add your vehicle', { height: 100 })
        )
    }

    return (
        <Modal visible={isLoading} animationType="slide"
            onRequestClose={() => console.log('closed')} transparent={true}>
            <Pressable>
                {/* onPress={closePopup}> */}
                <View style={styles.popupBg}>

                    <View style={styles.smallCont}>

                        <View style={{ width: '100%', height: 60, justifyContent: 'center', backgroundColor: AppColors.themePrimaryColor }}>
                            <View style={{ marginLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
                                <Pressable onPress={closePopup} style={{ width: '20%' }}>

                                    <Image source={require('../../assets/close.png')} style={{ marginRight: 10, width: 15, height: 15, resizeMode: 'contain' }} />
                                </Pressable>
                                <View style={{ width: '60%', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, color: AppColors.themesWhiteColor, fontFamily: AppFontFamily.PopinsMedium }}>
                                        {headerText}
                                    </Text>

                                </View>

                            </View>

                        </View>


                        <View style={{ width: '100%', height: Dimensions.get('screen').height / 3.5, marginTop: 30 }}>

                            <FlatList
                                data={data.length > 0 ? data 
                                : [1] }
                                // columnWrapperStyle={{ flexWrap: 'wrap' }}
                                // numColumns={4}
                                keyExtractor={(item, index) => index}
                                showsHorizontalScrollIndicator={false}
                                // horizontal={true}
                                renderItem={({ item, index }) => (
                                    data.length > 0 ?
                                    <Pressable onPress={() => selectedVehicle(item)} style={{ width: '100%', padding: 10, alignItems: 'center' }}>
                                        <Text style={{ color: AppColors.themeBlackColor, fontSize: 14, fontFamily: AppFontFamily.PopinsRegular }}>{item.label}</Text>
                                    </Pressable> : <NoData/>

                                )}
                            />



                        </View>

                        <View style={{width: '100%', alignItems: 'center', marginBottom: 10}}>

                            <Pressable onPress={addCar} style={{ width: '80%', height: 40, borderRadius: 5, alignItems: 'center', justifyContent: 'center', backgroundColor: AppColors.themePrimaryColor }}>
                                <Text style={{ color: AppColors.themesWhiteColor, fontSize: 14, fontFamily: AppFontFamily.PopinsMedium }}>{'Add new vehicle'}</Text>
                            </Pressable>
                        </View>

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
        position: 'absolute',
        // alignItems: 'center',
        // justifyContent: 'center',
        // marginTop: 50,
        bottom: 0,
        width: '100%',
        // height: '60%',
        // paddingTop: 10,
        // paddingBottom: 10,
        borderRadius: 10,
        backgroundColor: AppColors.themePickupDropSearchBg,

    },
    btnText: {
        color: AppColors.themesWhiteColor,
        fontSize: 16,
        // fontFamily: themes.appFontFamily.medium,
    },


})