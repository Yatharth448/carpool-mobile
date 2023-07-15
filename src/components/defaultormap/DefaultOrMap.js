import React, {useEffect} from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { AppColors } from '../constants/AppColor'

export function DefaultOrMap(onDefaultClick, onMapClick) {

    const [selected, setSelected] = React.useState(true)

    useEffect(() => {
        // console.log('se', selected)
        // setSelectedIdType('image')
      }, [selected]);

    const handleClick = (val) => {
       if (val == 'find'){
        onDefaultClick()
       } 
       else{

        onMapClick()
       } 
        setSelected(!selected)
    }

    return (


        <View style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-evenly' , marginTop: 30}}>

            <TouchableOpacity style={{ flexDirection: 'row', borderWidth: 1, borderColor:  selected ? AppColors.themePrimaryColor : AppColors.themeCardBorderColor, borderRadius: 25, width: '45%', height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: selected ? AppColors.themePrimaryColor : AppColors.themesWhiteColor }} onPress={()=> handleClick('find')}>
            <Image source={require('../../assets/save.png')} style={{tintColor: selected ? AppColors.themesWhiteColor : AppColors.themeCardBorderColor, marginLeft: 0, width: 20, height: 20, resizeMode: 'contain' }} />
                <Text style={{ width: '60%',textAlign: 'center', color: selected ? AppColors.themesWhiteColor : AppColors.themeCardBorderColor, fontSize: 16 }}>{'Use Default'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ flexDirection: 'row', borderWidth: 1, borderColor:  selected ? AppColors.themeCardBorderColor : AppColors.themePrimaryColor, borderRadius: 25, width: '45%', height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: selected ? AppColors.themesWhiteColor : AppColors.themePrimaryColor }} onPress={()=> handleClick('ride')}>
            <Image source={require('../../assets/map.png')} style={{ tintColor: selected ? AppColors.themeCardBorderColor : AppColors.themesWhiteColor, marginLeft: 0, width: 20, height: 20, resizeMode: 'contain' }} />
                <Text style={{ width: '60%', textAlign: 'center', color: selected ? AppColors.themeCardBorderColor : AppColors.themesWhiteColor, fontSize: 16 }}>{'Use Map'}</Text>
            </TouchableOpacity>

        </View>

    )
}
