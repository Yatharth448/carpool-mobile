import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { AppColors } from '../constants/AppColor'

export function PickupAndDrop(pickupText,dropText, pickupClicked, dropClick) {

    const [selected, setSelected] = React.useState(true)

    useEffect(() => {
        // console.log('se', selected)
        // setSelectedIdType('image')
    }, [selected]);

    const handleClick = (val) => {
        if (val == 'find') {
            pickupClicked()
        }
        else {

            dropClick()
        }
        setSelected(!selected)
    }

    return (


        <View style={{ flexDirection: 'row', width: '95%', height: 100, marginTop: 30, backgroundColor: AppColors.themePickupDropSearchBg, borderRadius: 10, alignItems: 'center' }}>

            <View style={{ width: '85%', justifyContent: 'center', alignItems: 'center' }}>

                <View style={{ width: '85%', alignItems: 'center', flexDirection: 'row' }}>
                    <Image source={require('../../assets/loc.png')} style={{ marginLeft: 0, width: 15, height: 15, resizeMode: 'contain' }} />
                    <TouchableOpacity style={{ width: '98%', height: 40, justifyContent: 'center' }} onPress={() => handleClick('find')}>
                        <Text style={{ paddingLeft: 10, width: '100%', color: AppColors.themeTextGrayColor, fontSize: 16 }}>{ pickupText ? pickupText :'Pick up location'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginLeft: 50, width: '90%', height: 1, backgroundColor: AppColors.themeTextGrayColor }}></View>
                <View style={{ width: '85%', alignItems: 'center', flexDirection: 'row' }}>
                    <Image source={require('../../assets/circle.png')} style={{ marginLeft: 0, width: 15, height: 15, resizeMode: 'contain' }} />
                    <TouchableOpacity style={{ width: '98%', height: 40, justifyContent: 'center' }} onPress={() => handleClick('offer')}>
                        <Text style={{ paddingLeft: 10, width: '100%', color: AppColors.themeTextGrayColor, fontSize: 16 }}>{dropText ? dropText : 'Drop location'}</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View style={{ width: '10%' }}>

                <Image source={require('../../assets/fromto.png')} style={{ marginRight: 10, width: 25, height: 60, resizeMode: 'contain' }} />

            </View>


        </View>

    )
}
