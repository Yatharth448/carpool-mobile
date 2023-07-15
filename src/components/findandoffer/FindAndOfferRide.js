import React, {useEffect} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { AppColors } from '../constants/AppColor'

export function FindAndOfferRide(onFindClick, onOfferClick) {

    const [selected, setSelected] = React.useState(true)

    // useEffect(() => {
    //     // console.log('se', selected)
    //     // setSelectedIdType('image')
    //   }, [selected]);

    const handleClick = (val) => {
       if (val == 'find'){
        onFindClick()
       } 
       else{

           onOfferClick()
       } 
        setSelected(!selected)
    }

    return (


        <View style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-evenly' , marginTop: 30}}>

            <TouchableOpacity style={{ borderRadius: 25, width: '45%', height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: selected ? AppColors.themePrimaryColor : AppColors.themePickupDropSearchBg }} onPress={()=> handleClick('find')}>
                <Text style={{ width: '100%',textAlign: 'center', color: selected ? AppColors.themesWhiteColor : AppColors.themePrimaryColor, fontSize: 16 }}>{'Find a ride'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ borderRadius: 25, width: '45%', height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: selected ? AppColors.themePickupDropSearchBg : AppColors.themePrimaryColor }} onPress={()=> handleClick('ride')}>
                <Text style={{ width: '100%', textAlign: 'center', color: selected ? AppColors.themePrimaryColor : AppColors.themesWhiteColor, fontSize: 16 }}>{'Offer a ride'}</Text>
            </TouchableOpacity>

        </View>

    )
}
