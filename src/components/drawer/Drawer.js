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

const DrawerScreen = ({data, getProfileDataRequest, navigation}) => {
  const [menu, setMenu] = React.useState([
    {screen: 'FindRide', name: 'HOME'},
    {screen: 'ActiveRideCarpooler', name: 'ACTIVE RIDE'},
    {screen: 'RideHistory', name: 'RIDE HISTORY'},
    {screen: 'MessageRoom', name: 'MESSAGES'},
    {screen: 'Payment', name: 'PAYMENT'},
    {screen: 'Support', name: 'SUPPORT'},
    {screen: 'Signout', name: 'SIGN OUT'},
  ]);
  const [ind, setInd] = React.useState(0);
  const handleDrawerItemPress = (screenName, index) => {
    selectedInd(index);
    if (screenName == 'Payment') {
    } else if (screenName == 'FindRide') {
      navigation.navigate(screenName, {from: 'reset'});
    } else if (screenName == 'Signout') {
      LogoutAlert();
    } else if (screenName == 'ActiveRideCarpooler') {
      navigation.navigate(screenName, {id: '65054e7de6c2a06a12e6304c'});
    } else {
      navigation.navigate(screenName);
    }
  };

  useEffect(() => {
    getProfileDataRequest();

    console.log(data, 'result');
  }, []);

  const selectedInd = index => {
    setInd(index);
  };

  const clearAllData = nav => {
    AsyncStorage.getAllKeys()

      .then(keys => AsyncStorage.multiRemove(keys))
      .then(() =>
        nav.reset({
          index: 0,
          routes: [{name: 'SplashScreen'}],
        }),
      );
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
            <Image
              source={require('../../assets/avtar.png')}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                borderRadius: 40,
                borderColor: AppColors.themesWhiteColor,
                borderWidth: 0.5,
                resizeMode: 'contain',
              }}
            />
          </View>
          <Image
            source={require('../../assets/edit.png')}
            style={{
              marginLeft: 60,
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
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => handleDrawerItemPress(item.screen, index)}>
              <Text
                style={{
                  fontFamily: AppFontFamily.PopinsBold,
                  width: '80%',
                  color:
                    index == ind
                      ? AppColors.themePrimaryColor
                      : AppColors.themeText2Color,
                  fontSize: 14,
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
