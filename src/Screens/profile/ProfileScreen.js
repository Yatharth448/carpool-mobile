import React, {useEffect} from 'react';
import {Text, View, Image, Platform, Pressable, Dimensions} from 'react-native';
import {AppColors} from '../../components/constants/AppColor';
import {Header} from '../../components/commomheader/CommonHeader';
import {connect} from 'react-redux';
import {getProfileDataRequest} from '../../redux/actions/actions';
import {AppFontFamily} from '../../components/constants/AppFonts';
import {Surface} from 'react-native-paper';
import {Switch} from 'react-native-paper';
import {ButtonPrimary} from '../../components/button/buttonPrimary';
import {ImageLoader} from '../../components/imageloader/ImageLoader';
function ProfileScreen({
  data,
  loading,
  error,
  getProfileDataRequest,
  navigation,
}) {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  useEffect(() => {
    if (getProfileDataRequest) {
      getProfileDataRequest();
    }

    // console.log(data, 'result')
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: AppColors.themePickupDropSearchBg}}>
      <Header
        close={() => {
          navigation.goBack();
        }}
        text="Profile"
        isRight={true}
        right={require('../../assets/edit.png')}
        rightClick={() => navigation.navigate('UpdateProfile')}
      />

      <View
        style={{
          alignItems: 'center',
          width: '100%',
          height: Platform.OS == 'android' ? '92%' : '84%',
        }}>
        <Pressable
          onPress={() => navigation.navigate('UpdateProfile')}
          style={{
            width: '96%',
            borderRadius: 10,
            marginTop: 30,
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '96%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ImageLoader
              image={
                data && data?.profilePath
                  ? {uri: data?.profilePath}
                  : ""
              }
              width={80}
              height={80}
              borderRadius={40}
            />
          </View>
          <Image
            source={require('../../assets/edit.png')}
            style={{
              marginLeft: Dimensions.get('window').width / 2 + 5,
              position: 'absolute',
              width: 20,
              height: 20,
              borderRadius: 40,
              borderRadius: 40,
              borderColor: AppColors.themesWhiteColor,
              borderWidth: 0.5,
              resizeMode: 'contain',
            }}
          />

          <View
            style={{
              width: '96%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: AppFontFamily.PopinsBold,
                color: AppColors.themeBlackColor,
              }}>
              {data?.name}
            </Text>
          </View>
        </Pressable>

        <Surface
          style={{
            width: '92%',
            borderRadius: 10,
            marginTop: 30,
            justifyContent: 'center',
            padding: 20,
            alignItems: 'flex-end',
          }}>
          <View style={{width: '100%', flexDirection: 'row'}}>
            <View style={{width: '15%', justifyContent: 'center'}}>
              <Image
                source={require('../../assets/phone.png')}
                style={{width: 30, height: 30, resizeMode: 'contain'}}
              />
            </View>
            <View style={{width: '85%', justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: AppFontFamily.PopinsRegular,
                  color: AppColors.themeText2Color,
                }}>
                {data?.contact_number}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              marginBottom: 15,
              marginLeft: 45,
              width: '88%',
              height: 1,
              backgroundColor: AppColors.themeCardBorderColor,
            }}></View>

          <View style={{width: '100%', flexDirection: 'row'}}>
            <View style={{width: '15%', justifyContent: 'center'}}>
              <Image
                source={require('../../assets/mail.png')}
                style={{width: 30, height: 30, resizeMode: 'contain'}}
              />
            </View>
            <View style={{width: '85%', justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: AppFontFamily.PopinsRegular,
                  color: AppColors.themeText2Color,
                }}>
                {data?.email}
              </Text>
            </View>
          </View>
          {/* <View style={{ marginTop: 10, marginBottom: 15, marginLeft: 45, width: '88%', height: 1, backgroundColor: AppColors.themeCardBorderColor }}></View>


                    <View style={{ width: '80%', flexDirection: 'row', }}>

                        <View style={{ width: '20%', justifyContent: 'center' }}>
                            <Image source={require('../../assets/facebook.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                        </View>
                        <View style={{ width: '80%', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeText2Color }}>{data.name}</Text>
                        </View>

                    </View> */}
        </Surface>

        <Surface
          style={{
            width: '92%',
            borderRadius: 10,
            marginTop: 30,
            justifyContent: 'center',
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{width: '80%'}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: AppFontFamily.PopinsBold,
                color: AppColors.themeBlackColor,
              }}>
              {'Notifications'}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: AppFontFamily.PopinsRegular,
                color: AppColors.themeText2Color,
              }}>
              {'For receiving driver messages'}
            </Text>
          </View>

          <View style={{width: '20%'}}>
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          </View>
        </Surface>
      </View>

      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginTop: 10,
          position: 'absolute',
          bottom: 30,
        }}>
        <View style={{width: '92%', alignItems: 'center'}}>
          <ButtonPrimary
            style={{backgroundColor: '#E84343'}}
            text={'Delete Account'}
            onPress={() => console.log('delete')}
            loader={false}
          />
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = state => ({
  data: state.data,
  loading: state.loading,
  error: state.error,
});

const mapDispatchToProps = {
  getProfileDataRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
