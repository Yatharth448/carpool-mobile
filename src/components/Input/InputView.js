import { View, Image, TextInput, Text, Pressable } from 'react-native'
import { AppColors } from '../constants/AppColor'
import { AppFontFamily } from '../constants/AppFonts'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const InputView = ({ left = '', headText, placeHolder, val, onChange, right = '', rightClick, secureText }) => {
    return (
        <View style={{ width: '100%', marginTop: 20 }}>
            <Text style={{ fontSize: 16, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsRegular }}>{headText}</Text>
            <View style={{ marginTop: 5, width: '100%', height: 50, borderColor: AppColors.themeCardBorderColor, borderWidth: 1, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                {left ? <View style={{ width: '10%', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={left} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
                </View> : null}
                <View style={{ paddingLeft: left ? 0 : 5, width: left ? '80%' : '88%', justifyContent: 'center' }}>
                    <TextInput
                        style={{ textAlign: 'left', fontSize: 17, width: '100%', backgroundColor: 'transparent', color: AppColors.themeBlackColor }}
                        placeholder={placeHolder}
                        placeholderTextColor={AppColors.themeTextGrayColor}
                        value={val}
                        secureTextEntry={secureText}
                        // maxLength={10}
                        onChangeText={(text) => onChange(text)}
                    // left={<TextInput.Icon source={"../../assets/indFlag.png"} size={30} style={{ marginRight: 5 }} color={AppColors.themeBlackColor} />}
                    />
                </View>
                {right ?
                    <Pressable onPress={rightClick} style={{ width: '10%', alignItems: 'center', justifyContent: 'center' }}>
                        {/* <Icon name={right} size={20} color={AppColors.themeCardBorderColor} /> */}
                        <Image source={right} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                    </Pressable> : null}
            </View>
        </View>
    )
}