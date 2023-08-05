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

export const SeatsView = ({selectedIndex, setSelectedIndex }) => {
    return (
        <View style={{ with: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>

            <View style={{ width: '40%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>

                <Image source={require('../../assets/carseat.png')} style={{ width: 24, height: 24 }} />
                <Text style={{ marginLeft: 10, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsRegular, fontSize: 16 }}>
                    {'Seats needed'}
                </Text>

            </View>

            <View style={{ width: '53%', alignItems: 'flex-end' }}>

                <FlatList
                    data={['1', '2', '3', '4']}
                    columnWrapperStyle={{ flexWrap: 'wrap' }}
                    numColumns={5}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <>
                            <View style={{ padding: 0 }}>
                                <Pressable onPress={()=> setSelectedIndex(index)} style={{ marginLeft: 5, backgroundColor: AppColors.themesWhiteColor, borderRadius: 5, borderWidth: 2, borderColor: selectedIndex == index ? AppColors.themePrimaryColor : AppColors.themeCardBorderColor }}>
                                    {/* <View style={{ padding: 10 }}> */}
                                    <Text numberOfLines={3} style={{ paddingLeft: 10, paddingBottom: 5, paddingRight: 10, paddingTop: 5, color: AppColors.themeBlackColor, fontSize: 16, fontWeight: '700' }}>{item}</Text>
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
        <View style={{ with: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <View style={{ width: '73%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>

                <Image source={require('../../assets/carseat.png')} style={{ width: 24, height: 24 }} />
                <Text style={{ marginLeft: 10, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsRegular, fontSize: 16 }}>
                    {'Need a female co traveller'}
                </Text>
            </View>

            <Pressable onPress={onCheck} style={{ width: '20%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Icon name={image} size={24} color={AppColors.themePrimaryColor} />
            </Pressable>

        </View>
    )

}