import React from 'react'
import { View, Text } from 'react-native'
import { TextInput } from 'react-native-paper'
import { AppColors } from '../constants/AppColor'
export default function TextInputView(style, label, text, changeText) {
  return (
      <View style={[{ width: '100%', marginTop: 20 }, ...style ]}>

          <Text style={{ fontSize: 16, fontWeight: '400', color: AppColors.themeBlackColor }}>{label}</Text>

          <TextInput
              style={{ width: '100%', height: 50 , backgroundColor: AppColors.themesWhiteColor}}
              mode="outlined"
              theme={{roundness: 10}}
              outlineColor={AppColors.themeSeperatorColor}
              activeOutlineColor={AppColors.themePrimaryColor}
            //   outlineStyle={borderRadius= 20}
              label=""
              value={text}
              onChangeText={text => changeText(text)}
          />



      </View>
  )
}
