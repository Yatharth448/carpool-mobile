import React from 'react';
import {Text, Image, View, FlatList, Pressable} from 'react-native';
import {AppColors} from '../../components/constants/AppColor';
import {AppFontFamily} from '../../components/constants/AppFonts';

export const FindRideFilterView = ({data, selectedIndex, setSelectedIndex}) => {
  return (
    <View style={{with: '100%', justifyContent: 'space-between', marginTop: 0}}>
      {/* 
            <View style={{ width: '40%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>

                <Image source={require('../../assets/carseat.png')} style={{ height: 28, resizeMode: 'contain'  }} />
                <Text style={{ marginLeft: 0, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsRegular, fontSize: 16 }}>
                    {'Seats needed'}
                </Text>

            </View> */}

      <View style={{width: '100%', alignItems: 'flex-end'}}>
        <FlatList
          data={data}
          horizontal={true}
          keyExtractor={(item, index) => index}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <>
              <View style={{padding: 0}}>
                <Pressable
                  onPress={() => setSelectedIndex(index)}
                  style={{
                    marginRight: 5,
                    backgroundColor:
                      selectedIndex == index
                        ? AppColors.themePrimaryColor
                        : AppColors.themesWhiteColor,
                    borderRadius: 10,
                    borderWidth: 1.5,
                    borderColor:
                      selectedIndex == index
                        ? AppColors.themePrimaryColor
                        : AppColors.themeCardBorderColor,
                  }}>
                  {/* <View style={{ padding: 10 }}> */}
                  <Text
                    numberOfLines={3}
                    style={{
                      paddingLeft: 10,
                      paddingBottom: 5,
                      paddingRight: 10,
                      paddingTop: 5,
                      color:
                        selectedIndex == index
                          ? AppColors.themesWhiteColor
                          : AppColors.themeTextGrayColor,
                      fontSize: 16,
                      fontWeight: '700',
                    }}>
                    {item.name}
                  </Text>
                  {/* </View> */}
                </Pressable>
              </View>
            </>
          )}
        />
      </View>
    </View>
  );
};
