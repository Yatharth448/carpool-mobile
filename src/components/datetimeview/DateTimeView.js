import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { AppColors } from '../constants/AppColor'
import DatePicker from 'react-native-date-picker'
export default function DateTimeView(mode, open, date, onConfirm, onCancel, openDatePicker, selectedDate) {


    const selectDate = () => {

        console.log(date, 'date')
        return (

            <DatePicker
                modal={true}
                mode={mode}
                open={open}
                date={date}
                onConfirm={(date) => onConfirm(date)}
                onCancel={() => {
                    onCancel()
                }}
            />
        )
    }


    return (
        <View style={{ width: '100%', marginTop: 0 }}>

            {/* <Text style={{ fontSize: 16, fontWeight: '400',marginBottom: 5 , color: AppColors.themeBlackColor}}>{'Date of birth'}</Text> */}

            <TouchableOpacity onPress={openDatePicker} style={{ flexDirection: 'row', alignItems: 'center', width: '100%', height: 30, backgroundColor: AppColors.themesWhiteColor, justifyContent: 'flex-start' }}>
                <Image source={mode == 'date' ? require('../../assets/calendar.png') : require('../../assets/timer.png')} style={{ tintColor: AppColors.themePrimaryColor, marginRight: 0, width: 32, resizeMode: 'contain' }} />
                <Text style={{ fontSize: 16, fontWeight: '400', width: '96%', color: selectedDate == 'Select ride date' || 'Select ride time' ? AppColors.themeTextGrayColor : AppColors.themeBlackColor }}>
                    {selectedDate}
                </Text>
            </TouchableOpacity>

            {open ? selectDate() : null}
        </View>
    )
}
