import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { AppColors } from '../constants/AppColor'
import DatePicker from 'react-native-date-picker'
import { AppFontFamily } from '../constants/AppFonts'
export default function DOBView(mode, open, date, onConfirm, onCancel, openDatePicker, selectedDate) {


    const selectDate = () => {

        // console.log(date, 'date')
        return (

            <DatePicker
                modal={true}
                mode="date"
                open={open}
                minimumDate={new Date("1900-01-01")}
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

            <TouchableOpacity onPress={openDatePicker} style={{ borderRadius: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: AppColors.themesWhiteColor, flexDirection: 'row', alignItems: 'center', width: '100%', height: 45,justifyContent: 'space-between' }}>
                <View style={{ width: '80%', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: AppFontFamily.PopinsRegular, fontSize: 14, fontWeight: '400', width: '100%', color: selectedDate == 'DOB as per Driving Licence' ? AppColors.themeTextGrayColor : AppColors.themeBlackColor }}>
                        {selectedDate}
                    </Text>

                </View>
                <View style={{ width: '20%', justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Image source={require('../../assets/calendar.png')} style={{ marginRight: 0, width: 24, resizeMode: 'contain' }} />
                </View>
            </TouchableOpacity>

            {open ? selectDate() : null}
        </View>
    )
}
