import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {AppColors} from '../constants/AppColor';
import {AppFontFamily} from '../constants/AppFonts';

<<<<<<< HEAD
export const ButtonPrimary = ({
  text,
  onPress,
  style,
  textStyle,
  loader = false,
  disabled = false,
}) => {
  return (
    <Pressable
      style={({pressed}) => [
        {
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: 47,
          // borderColor: loader ? AppColors.themeBorderLightDarkColor : AppColors.themePrimaryColor,
          backgroundColor: disabled
            ? AppColors.themeBtnDisableColor
            : AppColors.themePrimaryColor,
        },
        pressed && styles.pressed,
        style,
      ]}
      onPress={onPress}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={[
            styles.buttonText,
            {color: AppColors.themesWhiteColor},
            textStyle,
          ]}>
          {text}
        </Text>
        {loader ? (
          <ActivityIndicator
            size={'small'}
            color={AppColors.themesWhiteColor}
            style={{marginLeft: 10}}
          />
        ) : null}
=======
export const ButtonPrimary = ({ text, onPress, style, textStyle, loader = false, disabled =false, loaderColor = AppColors.themesWhiteColor }) => {
  return (
    <Pressable
      style={({ pressed }) => [{
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 47,
        // borderColor: loader ? AppColors.themeBorderLightDarkColor : AppColors.themePrimaryColor,
        backgroundColor: disabled ? AppColors.themeBtnDisableColor : AppColors.themePrimaryColor,
      }, pressed && styles.pressed, style]}
      onPress={onPress}
    >
      <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
        <Text style={[styles.buttonText,{color: AppColors.themesWhiteColor}, textStyle]}>{text}</Text>
       {loader ? <ActivityIndicator size={'small'} color={loaderColor} style={{marginLeft: 10}} /> : null}
>>>>>>> ab477ef (fixes)
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.themePrimaryColor,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 14,
    color: AppColors.themesWhiteColor,
    fontFamily: AppFontFamily.PopinsMedium,
  },
});
