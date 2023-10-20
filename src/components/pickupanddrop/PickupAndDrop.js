import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { AppColors } from '../constants/AppColor'
import { AppFontFamily } from '../constants/AppFonts'

export function PickupAndDrop(pickupText, dropText, pickupClicked, dropClick) {

    // const [selected, setSelected] = React.useState(true)

    // useEffect(() => {
    //     // console.log('se', selected)
    //     // setSelectedIdType('image')
    // }, [selected]);

    // const handleClick = (val) => {
    //     if (val == 'find') {
    //         pickupClicked()
    //     }
    //     else {

    //         dropClick()
    //     }
    //     setSelected(!selected)
    // }

    return (


        <View style={{ flexDirection: 'row', width: '95%', height: 100, marginTop: 30, backgroundColor: AppColors.themePickupDropSearchBg, borderRadius: 10, alignItems: 'center' }}>

            <View style={{ width: '15%', alignItems: 'center'}}>

                <Image source={require('../../assets/dotone.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />
                <Image source={require('../../assets/dotline.png')} style={{ marginLeft: 0, width: 5, height: 40, resizeMode: 'contain' }} />
                <Image source={require('../../assets/triangle.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />

            </View>

            <View style={{ width: '85%', justifyContent: 'center', alignItems: 'center' }}>


                <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row' }}>

                    <TouchableOpacity style={{ width: '98%', height: 50, justifyContent: 'center' }} onPress={pickupClicked}>
                        <Text numberOfLines={1} style={{ width: '100%', color: pickupText ? AppColors.themeBlackColor :  AppColors.themeTextGrayColor, fontSize: 14, fontFamily: AppFontFamily.PopinsRegular }}>{pickupText ? pickupText : 'Source'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginLeft: 0, width: '100%', height: 1, backgroundColor: AppColors.themeTextGrayColor }}></View>
                <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row' }}>

                    <TouchableOpacity style={{ width: '98%', height: 50, justifyContent: 'center' }} onPress={dropClick}>
                        <Text numberOfLines={1} style={{ width: '100%', color: dropText ? AppColors.themeBlackColor :  AppColors.themeTextGrayColor, fontSize: 14, fontFamily: AppFontFamily.PopinsRegular }}>{dropText ? dropText : 'Destination'}</Text>
                    </TouchableOpacity>
                </View>

            </View>




        </View>

    )
}
