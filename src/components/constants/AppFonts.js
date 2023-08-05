import { Platform } from "react-native"
export const AppFontFamily = {

    PoppinsBlack: Platform.OS === 'ios' ? 'Poppins-Black' : 'Poppins-Black',
    PoppinsBlackItalic: Platform.OS === 'ios' ? 'Poppins-BlackItalic' : 'Poppins-BlackItalic',
    PopinsBold: Platform.OS === 'ios' ? 'Roboto-Regular' : 'Poppins-Bold',
    PopinsBoldItalics: Platform.OS === 'ios' ? 'OpenSansSemiCondensed-Regular' : 'Poppins-BoldItalic',
    PopinsExtraBold: Platform.OS === 'ios' ? 'OpenSans-Regular' : 'Poppins-ExtraBold',
    PopinsExtraBoldItalics: Platform.OS === 'ios' ? 'OpenSansSemiCondensed-Bold' : 'Poppins-ExtraBoldItalic',
    PopinsExtraLight: Platform.OS === 'ios' ? 'OpenSans-Medium' : 'Poppins-ExtraLight',
    PopinsExtraLightItalics: Platform.OS === 'ios' ? 'OpenSans-Semibold' : 'Poppins-ExtraLightItalic',
    PopinsItalics: Platform.OS === 'ios' ? 'OpenSansSemiCondensed-SemiBold' : 'Poppins-Italic',
    PopinsLight: Platform.OS === 'ios' ? 'OpenSansSemiCondensed-Medium' : 'Poppins-Light',
    PopinsLightItalics: Platform.OS === 'ios' ? 'OpenSansSemiCondensed-SemiBold' : 'Poppins-LightItalic',
    PopinsMedium: Platform.OS === 'ios' ? 'OpenSans-Italic' : 'Poppins-Medium',
    PopinsMediumItalics: Platform.OS === 'ios' ? 'IndianRupee-Regular' : 'Poppins-MediumItalic',
    PopinsRegular: Platform.OS === 'ios' ? 'IndianRupee-Regular' : 'Poppins-Regular',
    PopinsSemiBold: Platform.OS === 'ios' ? 'IndianRupee-Regular' : 'Poppins-SemiBold',
    PopinsSemiBoldItalics: Platform.OS === 'ios' ? 'IndianRupee-Regular' : 'Poppins-SemiBoldItalic',
    PopinsThin: Platform.OS === 'ios' ? 'IndianRupee-Regular' : 'Poppins-Thin',
    PopinsThinItalics: Platform.OS === 'ios' ? 'IndianRupee-Regular' : 'Poppins-ThinItalic',

  }