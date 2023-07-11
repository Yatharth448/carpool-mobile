import React from 'react'
import { Modal, View, Image, Text, StyleSheet, Pressable } from 'react-native';

import { AppColors } from '../components/constants/AppColor';

function SelectImagePopup(props) {

    return (
        <Modal visible={props.isLoading} animationType="slide"
            onRequestClose={() => console.log('closed')} transparent={true}>
            <Pressable onPress={props.closePopup}>
            <View style={styles.popupBg}>

                <View style={styles.smallCont}>
                   
                        <Pressable onPress={props.onPressCam} style={{ marginTop: 20, flexDirection: 'row', width: "90%", height: 40, borderRadius: 0, alignItems: "center", justifyContent: "center", backgroundColor: AppColors.themePrimaryColor }}>
                            <Text style={styles.btnText}>
                                {"Open Camera"}
                            </Text>
                    </Pressable>

                    <Pressable onPress={ props.onPressGal} style={{ borderRadius: 5, marginTop: 10, flexDirection: 'row', width: "90%", height: 40, alignItems: "center", justifyContent: "center", backgroundColor: AppColors.themePrimaryColor }}>
                            <Text style={styles.btnText}>
                                {"Select from Gallery"}
                            </Text>
                    </Pressable>

                        <Pressable onPress={props.closePopup} style={{ borderRadius: 5, marginTop: 10, flexDirection: 'row', width: "90%", height: 40, alignItems: "center", justifyContent: "center", borderColor: AppColors.themeCardBorderColor, borderWidth: 1 }}>
                        <Text style={{
                            color: AppColors.themePrimaryColor,
                            fontSize: 16,
                            // fontFamily: themes.appFontFamily.medium,
                        }}>
                            {"Close"}
                        </Text>

                    </Pressable>

                </View>

            </View>
            </Pressable>
        </Modal>
    )
}



const styles = StyleSheet.create({
    popupBg: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    smallCont: {
       position: 'absolute',
        alignItems: 'center',
        // marginTop: 50,
        bottom: 0,
        width: "100%",
        // width: '100%',
        borderRadius: 10,
        height: 180,
        backgroundColor: AppColors.themesWhiteColor,

    },
    btnText: {
        color: AppColors.themesWhiteColor,
        fontSize: 16,
        // fontFamily: themes.appFontFamily.medium,
    },
    
   
})

export default SelectImagePopup;