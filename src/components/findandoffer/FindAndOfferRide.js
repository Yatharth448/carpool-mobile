import React, { useEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { AppColors } from '../constants/AppColor'

export function FindAndOfferRide(onFindClick, onOfferClick) {

    const [selected, setSelected] = React.useState(true)

    // useEffect(() => {
    //     // console.log('se', selected)
    //     // setSelectedIdType('image')
    //   }, [selected]);

    const handleClick = (val) => {
        if (val == 'find') {
            onFindClick()
        }
        else {

            onOfferClick()
        }
        setSelected(!selected)
    }

    return (


        <View style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-evenly', marginTop: 10 }}>

            <TouchableOpacity style={{ width: '45%', height: 50, alignItems: 'center', justifyContent: 'center' }} onPress={() => handleClick('find')}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('../../assets/searchride.png')} style={{ width: 24, height: 24 }} />
                    <Text style={{ width: '70%', textAlign: 'center', color: selected ? AppColors.themePrimaryColor : AppColors.themeTextPrimaryColor, fontSize: 18 }}>{'Search Ride'}</Text>
                </View>
                <View style={{ marginTop: 10, width: '100%', height: 2.5, backgroundColor: selected ? AppColors.themePrimaryColor : null }} />
            </TouchableOpacity>

            <TouchableOpacity style={{ width: '45%', height: 50, alignItems: 'center', justifyContent: 'center' }} onPress={() => handleClick('ride')}>
                <Text style={{ width: '100%', textAlign: 'center', color: selected ? AppColors.themeTextPrimaryColor : AppColors.themePrimaryColor, fontSize: 18 }}>{'Offer Ride'}</Text>
                <View style={{ marginTop: 10, width: '100%', height: 2.5, backgroundColor: selected ? null : AppColors.themePrimaryColor }} />
            </TouchableOpacity>

        </View>

    )
}
