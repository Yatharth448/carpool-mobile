import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { AppColors } from '../constants/AppColor'
import { Menu } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
export default function IdentityView(label, open, selectedId) {

const [on, setOn] = React.useState(false)
    const handlePress = () => setOn(!on);
    const docTypeData = [{ "back": true, "enable": true, "front": true, "label": "Aadhaar Card", "value": "aadhaar" }, { "back": true, "enable": true, "front": true, "label": "Pan Card", "value": "pan" }]

    const renderItem =(item) =>{
        return (
            <>
                {
                    <View style={{
                        padding: 12,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%'
                    }}>
                        <Text style={{
                            flex: 1,
                            fontSize: 14,
                            color: AppColors.themeBlackColor
                            // fontFamily: themes.appFontFamily.semiCondencedMedium,
                        }}>{item.label}</Text>
                    </View>    

                }

            </>
        );
    }

    const iD = () => {

        console.log( 'date')
        return (

            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={docTypeData}
                //search
                maxHeight={300}
                // fontFamily={themes.appFontFamily.semiCondencedMedium}
                labelField="label"
                valueField="value"
                activeColor={AppColors.themePrimaryColor}
                placeholder="Select Document"
                searchPlaceholder="Search..."
                onChange={item => {
                    console.log(item)
                    // item.enable === true ?
                    //     this.setState({ selectedValue: item.label, selectedKey: item.value, frontImageRequired: item.front, backImageRequired: item.back })
                    //     : this.reloadList()
                }}
                renderItem={renderItem}
            />
        )
    }


    return (
        <View style={{ width: '100%', marginTop: 20 }}>

            <Text style={{ fontSize: 16, fontWeight: '400', marginBottom: 5, color: AppColors.themeBlackColor }}>{label}</Text>

            {/* <TouchableOpacity onPress={()=> handlePress()} style={{ borderRadius: 10, alignItems: 'center', width: '100%',  backgroundColor: AppColors.themesWhiteColor, borderWidth: 1, borderColor: AppColors.themeCardBorderColor, justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, height: 40, fontWeight: '400', width: '96%', color: AppColors.themeTextGrayColor }}>
                    {'abc'}
                </Text>
            </TouchableOpacity> */}

             {iD()}
        </View>
    )
}

const styles = StyleSheet.create({
   
    dropdown: {
        width: "100%",
        // margin: 14,
        height: 45,
        borderColor: '#B1B1B1',
        borderWidth: 0.45,
        borderRadius: 5
    },

    icon: {
        marginRight: 5,
    },

    placeholderStyle: {
        marginLeft: 5,
        color: AppColors.themeTextGrayColor,
        fontSize: 14,
    },

    selectedTextStyle: {
        color: AppColors.themeBlackColor,
        marginLeft: 5,
        fontSize: 14,
    },

    iconStyle: {
        width: 25,
        height: 25,
    },

    inputSearchStyle: {
        height: 40,
        fontSize: 14,
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
