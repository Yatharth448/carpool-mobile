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
                // mode={mode}
                open={open}
                minimumDate={new Date()}
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

            <TouchableOpacity onPress={openDatePicker} style={{ borderRadius: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: AppColors.themePickupDropSearchBg, flexDirection: 'row', alignItems: 'center', width: '100%', height: 45,justifyContent: 'space-between' }}>
                <View style={{ width: '80%', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: '400', width: '100%', color: selectedDate == 'Date and time of departure' ? AppColors.themeTextGrayColor : AppColors.themeBlackColor }}>
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
