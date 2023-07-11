import React from 'react'
import { View, Text,Image, TouchableOpacity } from 'react-native'
import { AppColors } from '../constants/AppColor'
import { Menu } from 'react-native-paper';
export default function UploadIdView(label, onUploadClick) {

    const [on, setOn] = React.useState(false)
    const handlePress = () => setOn(!on);
    const iD = () => {

        console.log('date')
        return (

            <View style={{ flex: 1, backgroundColor: AppColors.themeTextGrayColor }}>
                <Menu.Item title="Redo" />
                <Menu.Item title="Undo" />
                <Menu.Item title="Cut" disabled />
                <Menu.Item title="Copy" disabled />
                <Menu.Item title="Paste" />
            </View>
        )
    }


    return (
        <View style={{ width: '100%', marginTop: 20 }}>

            <Text style={{ fontSize: 16, fontWeight: '400', marginBottom: 5 }}>{label}</Text>

            <TouchableOpacity onPress={()=>onUploadClick()} style={{ flexDirection: 'row', borderRadius: 10, alignItems: 'center', width: '100%', height: 100, backgroundColor: AppColors.themeIdentityBgColor, borderWidth: 1, borderColor: AppColors.themeCardBorderColor, justifyContent: 'center' }}>

                <View style={{width: '80%', alignItems: 'center', justifyContent: 'center', height: '100%'}}>

                    <Text style={{ fontSize: 16, fontWeight: '400', width: '96%', height: '25%', color: AppColors.themeBlackColor }}>
                        {'Country Identity card'}
                    </Text>
                    <Text style={{ fontSize: 14, fontWeight: '400', width: '96%', height: '40%', color: AppColors.themeText2Color }}>
                        {'Upload your Govt. Identity card. acceptable formats: JPEG, JPG or PNG.'}
                    </Text>

                    <Text style={{ fontSize: 12, fontWeight: '400', width: '96%', height: '20%', color: AppColors.themeTextGrayColor }}>
                        {'Only Aadhaar/PAN/DL acceptable'}
                    </Text>

                </View>

                <View style={{ width: '20%' }}>
                    <Image source={require('../../assets/uploadId.png')} style={{ marginRight: 10, width: '100%', resizeMode: 'contain' }} />
                </View>
            </TouchableOpacity>

        </View>
    )
}
