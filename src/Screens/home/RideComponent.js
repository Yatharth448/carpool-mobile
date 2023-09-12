import React from "react"
import { Text, Image, View, FlatList, Pressable } from "react-native"
import { AppColors } from "../../components/constants/AppColor"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppFontFamily } from "../../components/constants/AppFonts"
export const AvtarView = ({ image, name, type }) => {
    return (
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>

            <View style={{ width: '13%', justifyContent: 'center', alignItems: 'flex-start' }}>

                <Image source={image} style={{ width: 50, height: 50, borderRadius: 5, resizeMode: 'contain' }} />

            </View>

            <View style={{ width: '78%', justifyContent: 'center', alignItems: 'flex-start' }}>
                <Text style={{ width: '100%', color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsBold, fontSize: 18 }}>
                    {'Hey ' + name + ","}
                </Text>
                <Text style={{ width: '100%', color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsRegular, fontSize: 14 }}>
                    {type ? 'Enter details below to find your ride' : 'Enter details below to offer ride'}
                </Text>

            </View>

        </View>
    )
}

export const SeatsView = ({ data, selectedIndex, setSelectedIndex }) => {
    return (
        <View style={{ with: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>

            <View style={{ width: '40%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>

                <Image source={require('../../assets/carseat.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                <Text style={{ marginLeft: 10, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsRegular, fontSize: 14 }}>
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
                                <Pressable onPress={() => setSelectedIndex(index)} style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 5, width: 26, height: 26, backgroundColor: selectedIndex == index ? AppColors.themePrimaryColor : AppColors.themesWhiteColor, borderRadius: 5, borderWidth: 1.5, borderColor: AppColors.themePrimaryColor }}>
                                    {/* <View style={{ padding: 10 }}> */}
                                    <Text numberOfLines={1} style={{ marginTop: 2, fontFamily: AppFontFamily.PopinsRegular, color: selectedIndex == index ? AppColors.themesWhiteColor : AppColors.themePrimaryColor, fontSize: 14 }}>{item}</Text>
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

                <Image source={require('../../assets/cotraveller.png')} style={{ width: 18, resizeMode: 'contain' }} />
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

export const PendingKYC = ({ message, onOkPress }) => {
    return (
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: 0, backgroundColor: '#ffcc00', height: 30 }}>

            <View style={{ width: '85%',alignItems: 'flex-start', justifyContent: 'center' }}>
                <Text style={{ marginLeft: 10, color: AppColors.themesWhiteColor, fontFamily: AppFontFamily.PopinsBold, fontSize: 12 }}>
                    {message}
                </Text>
            </View>

            <Pressable onPress={onOkPress} style={{ width: '15%', alignItems: 'flex-end', justifyContent: 'center' }}>
                <Image source={require('../../assets/close.png')} style={{ marginRight: 10, width: 10, resizeMode: 'contain' }} />
            </Pressable>

        </View>
    )

}