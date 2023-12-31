import React, {useEffect} from 'react';
import {
  FlatList,
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import {AppColors} from '../constants/AppColor';
import {AppFontFamily} from '../constants/AppFonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {getProfileDataRequest} from '../../redux/actions/actions';
import reducer from '../../redux/reducers/reducers';
import {ImageLoader} from '../imageloader/ImageLoader';
import Storage from '../localStorage/storage';
import {AppKeys} from '../constants/AppKeys';

const DrawerScreen = ({data, getProfileDataRequest, navigation}) => {
  const [menu, setMenu] = React.useState([
    {screen: 'FindRide', name: 'HOME', icon: require('../../assets/home.png')},
    {
      screen: 'RideHistory',
      name: 'RIDE HISTORY',
      icon: require('../../assets/ridehistory.png'),
    },
    {
      screen: 'MessageRoom',
      name: 'MESSAGES',
      icon: require('../../assets/messages.png'),
    },
    {
      screen: 'PaymentHistory',
      name: 'PAYMENT',
      icon: require('../../assets/payment.png'),
    },
    {
      screen: 'Support',
      name: 'SUPPORT',
      icon: require('../../assets/support.png'),
    },
    {
      screen: 'Signout',
      name: 'SIGN OUT',
      icon: require('../../assets/logout.png'),
    },
  ]);
  const [ind, setInd] = React.useState(0);
  const handleDrawerItemPress = (screenName, index) => {
    selectedInd(index);

    if (screenName == 'FindRide') {
      navigation.navigate(screenName, {from: 'reset'});
    } else if (screenName == 'Signout') {
      LogoutAlert();
    } else {
      navigation.navigate(screenName);
    }
  };

  useEffect(() => {
    // getProfileDataRequest();
    // console.log(data, 'result');
  }, []);

  const selectedInd = index => {
    setInd(index);
  };

  const clearAllData = nav => {
    AsyncStorage.getAllKeys()

      .then(keys => AsyncStorage.multiRemove(keys))
      .then(() => {
        Storage.saveItem(AppKeys.LOCATION_PERMISSION_KEY, 'yes');
        nav.reset({
          index: 0,
          routes: [{name: 'SplashScreen'}],
        });
      });
  };

  const LogoutAlert = () => {
    Alert.alert(
      '',
      'Are you sure you want to logout ?',
      [{text: 'cancel'}, {text: 'OK', onPress: () => clearAllData(navigation)}],
      {
        cancelable: false,
      },
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingTop: 60,
          width: '100%',
          backgroundColor: AppColors.themePrimaryColor,
          height: Dimensions.get('window').height * 0.32,
          alignItems: 'center',
        }}>
        <Pressable
          onPress={() => navigation.navigate('ProfileScreen')}
          style={{width: '80%', height: '90%', justifyContent: 'center'}}>
          <View style={{width: 80, height: 80, marginBottom: 10}}>
            <ImageLoader
              width={80}
              height={80}
              borderRadius={40}
              image={data?.profilePath ? {uri: data.profilePath} : ''}
              loaderColor={AppColors.themesWhiteColor}
            />
          </View>
          <Text
            style={{
              fontSize: 20,
              fontFamily: AppFontFamily.PopinsBold,
              color: AppColors.themesWhiteColor,
            }}>
            {data?.name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: AppFontFamily.PopinsMedium,
              color: AppColors.themesWhiteColor,
            }}>
            {data?.email}
          </Text>
        </Pressable>
      </View>

      <FlatList
        contentContainerStyle={{
          marginTop: 30,
          height: Dimensions.get('window').height * 0.8,
        }}
        data={menu}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => (
          <>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 60,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => handleDrawerItemPress(item.screen, index)}>
              <Image
                source={item.icon}
                style={{
                  marginLeft: 10,
                  width: 25,
                  height: 25,
                  resizeMode: 'contain',
                  tintColor:
                    index == ind
                      ? AppColors.themePrimaryColor
                      : AppColors.themeText2Color,
                }}
              />
              <Text
                style={{
                  fontFamily: AppFontFamily.PopinsBold,
                  width: '80%',
                  color:
                    index == ind
                      ? AppColors.themePrimaryColor
                      : AppColors.themeText2Color,
                  fontSize: 14,
                  marginLeft: 10,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          </>
        )}
      />

      {/* Add more drawer items as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => ({
  data: state.data,
  loading: state.loading,
  error: state.error,
});

const mapDispatchToProps = {
  getProfileDataRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerScreen);
