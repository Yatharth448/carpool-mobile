import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { AppColors } from '../constants/AppColor'
import DatePicker from 'react-native-date-picker'
export default function DateInput(open, date, onConfirm, onCancel, openDatePicker, selectedDate) {

   
    const selectDate = () => {

console.log(date, 'date')
        return (

            <DatePicker
                modal={true}
                mode='date'
                open={open}
                date={date}
                onConfirm={(date)=> onConfirm(date)}
                onCancel={() => {
                    onCancel()
                }}
            />
        )
    }


    return (
        <View style={{ width: '100%', marginTop: 20 }}>

            <Text style={{ fontSize: 16, fontWeight: '400',marginBottom: 5 , color: AppColors.themeBlackColor}}>{'Date of birth'}</Text>

            <TouchableOpacity onPress={openDatePicker} style={{ borderRadius: 10, alignItems: 'center', width: '100%', height: 50, backgroundColor: AppColors.themesWhiteColor, borderWidth: 1, borderColor: AppColors.themeCardBorderColor, justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: '400', width: '96%', color: selectedDate === 'Select DOB' ? AppColors.themeTextGrayColor : AppColors.themeBlackColor }}>
                    {selectedDate}
                </Text>
            </TouchableOpacity>

                    {open ?  selectDate() : null}
        </View>
    )
}
