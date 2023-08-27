import React, {useEffect} from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import { AppColors } from '../constants/AppColor'
// import { Menu } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { AppFontFamily } from '../constants/AppFonts';
export default function DropDownList( label, selectedId ) {

    // const passengerArray = [{ 'value': '1', 'label': '1 passenger' }, { 'value': '2', 'label': '2 passenger' }, { 'value': '3', 'label': '3 passenger' }, { 'value': '4', 'label': '4 passenger' }, { 'value': '5', 'label': '5 passenger' }, { 'value': '6', 'label': '6 passenger' }]
    const carArray = [{ 'value': '1', 'label': 'Tata Nexon' }, { 'value': '2', 'label': 'MG Hector' }, { 'value': '3', 'label': 'Add New Car' }]

    // const seaterArray = [{ 'value': '1', 'label': '1 seater' }, { 'value': '2', 'label': '2 seater' }, { 'value': '3', 'label': '3 seater' }, { 'value': '4', 'label': '4 seater' }, { 'value': '5', 'label': '5 seater' }, { 'value': '6', 'label': '6 seater' }]
   
    const renderItem = (item) => {
    
        return (
            <>
                {
                    <View style={{
                        padding: 5,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: 30,
                        paddingLeft: 10,
                        borderRadius: 10,
                        backgroundColor: AppColors.themePickupDropSearchBg
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            flex: 1,
                            fontSize: 14,
                            fontFamily: AppFontFamily.PopinsRegular,
                            fontWeight: '600',
                            color: AppColors.themeBlackColor
                            // fontFamily: themes.appFontFamily.semiCondencedMedium,
                        }}>{item.label}</Text>
                    </View>

                }

            </>
        );
    }

    const iD = () => {

        // console.log( 'date')
        return (

            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={carArray}
                //search
                maxHeight={300}
                // fontFamily={themes.appFontFamily.semiCondencedMedium}
                labelField="label"
                valueField="value"
                activeColor={AppColors.themePrimaryColor}
                placeholder={label == 'Identity' ? 'Select' : label}
                searchPlaceholder="Search..."
                onChange={item => {
                    console.log(item)
                    selectedId(item)
                    // item.enable === true ?
                    //     this.setState({ selectedValue: item.label, selectedKey: item.value, frontImageRequired: item.front, backImageRequired: item.back })
                    //     : this.reloadList()
                }}
                renderItem={renderItem}
                // renderLeftIcon={() => 
                //      <Image source={require('../../assets/profile.png')} style={{ tintColor: AppColors.themePrimaryColor, marginLeft: 0, marginRight: 10, width: 25, resizeMode: 'contain' }} />
                //     }
            />
        )
    }


    return (
        <View style={{ width: '100%', marginTop: 0 , flexDirection: 'row', alignItems: 'center'}}>

           
            {iD()}

        </View>
    )
}

const styles = StyleSheet.create({

    dropdown: {
         width: '100%',
        // margin: 14,
        height: 50,
        backgroundColor: AppColors.themePickupDropSearchBg,
        borderColor: AppColors.themesWhiteColor,
        borderWidth: 1,
        borderRadius: 10
    },

    icon: {
        marginRight: 5,
    },

    placeholderStyle: {
        marginLeft: 10,
        color: AppColors.themeTextGrayColor,
        fontFamily: AppFontFamily.PopinsRegular,
        fontSize: 14,
    },

    selectedTextStyle: {
        color: AppColors.themeBlackColor,
        marginLeft: 10,
        fontFamily: AppFontFamily.PopinsRegular,
        fontSize: 14,
    },

    iconStyle: {
        width: 25,
        height: 25,
        marginRight: 10
    },

    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    Icon: {

        width: 95,
        height: 95
    },
    IconN: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
        marginTop: 10,
    },
    itemView2: {
        width: '95%',
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },



});
