import React from "react"
import { Text, Image, View, FlatList, Pressable } from "react-native"
import { AppColors } from "../../components/constants/AppColor"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppFontFamily } from "../../components/constants/AppFonts"
export const AvtarView = ({ image, name }) => {
    return (
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>

            <View style={{ width: '16%' }}>

                <Image source={image} style={{ width: 60, height: 60, borderColor: 'red', borderWidth: 1, borderRadius: 5 }} />

            </View>

            <View style={{ width: '75%' }}>
                <Text style={{ width: '100%', color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsBold, fontSize: 20 }}>
                    {'Hey ' + name + ","}
                </Text>
                <Text style={{ width: '100%', color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsRegular, fontSize: 16 }}>
                    {'Enter details below to find your ride'}
                </Text>

            </View>

        </View>
    )
}

export const SeatsView = ({ data, selectedIndex, setSelectedIndex }) => {
    return (
        <View style={{ with: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>

            <View style={{ width: '40%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>

                <Image source={require('../../assets/carseat.png')} style={{  width: 26, height: 26, resizeMode: 'contain'  }} />
                <Text style={{ marginLeft: 10, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsRegular, fontSize: 16 }}>
                    {'Seats needed'}
                </Text>

            </View>

            <View style={{ width: '55%', alignItems: 'flex-end' }}>

                <FlatList
                    data={data}
                    columnWrapperStyle={{ flexWrap: 'wrap' }}
                    numColumns={5}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <>
                            <View style={{ padding: 0 }}>
                                <Pressable onPress={()=> setSelectedIndex(index)} style={{ marginLeft: 5, backgroundColor: selectedIndex == index ? AppColors.themePrimaryColor : AppColors.themesWhiteColor, borderRadius: 5, borderWidth: 1.5, borderColor: AppColors.themePrimaryColor }}>
                                    {/* <View style={{ padding: 10 }}> */}
                                    <Text numberOfLines={3} style={{ paddingLeft: 10, paddingBottom: 5, paddingRight: 10, paddingTop: 5, color: selectedIndex == index ? AppColors.themesWhiteColor : AppColors.themePrimaryColor, fontSize: 16, fontWeight: '700' }}>{item}</Text>
                                    {/* </View> */}
                                </Pressable>
                            </View>

                        </>
                    )}
                />


            </View>

        </View>
    )
}

export const CotravellerView = ({ onCheck, image }) => {
    return (
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
            <View style={{ width: '68%', flexDirection: 'row', alignItems: 'center' }}>

                <Image source={require('../../assets/cotraveller.png')} style={{ width: 24, resizeMode: 'contain'}} />
                <Text style={{ marginLeft: 10, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsRegular, fontSize: 16 }}>
                    {'Need a female co traveller'}
                </Text>
            </View>

            <Pressable onPress={onCheck} style={{ width: '27%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Icon name={image} size={24} color={AppColors.themePrimaryColor} />
            </Pressable>

        </View>
    )

}