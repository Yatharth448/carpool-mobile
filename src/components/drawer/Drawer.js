import React, {useEffect} from 'react';
import { FlatList, View, Text, Alert, Image, TouchableOpacity, StyleSheet, Dimensions, Pressable } from 'react-native';
import { AppColors } from '../constants/AppColor';
import { AppFontFamily } from '../constants/AppFonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { getProfileDataRequest } from '../../redux/actions/actions';
import reducer from '../../redux/reducers/reducers';

const DrawerScreen = ({ data, getProfileDataRequest, navigation }) => {

    const [menu, setMenu] = React.useState([{ 'screen': 'FindRide', 'name': 'HOME' }, { 'screen': 'RideHistory', 'name': 'RIDE HISTORY' }, { 'screen': 'MessageRoom', 'name': 'MESSAGES' }, { 'screen': 'Payment', 'name': 'PAYMENT' }, { 'screen': 'Support', 'name': 'SUPPORT' },])
    const [ind, setInd] = React.useState(0)
    const handleDrawerItemPress = (screenName, index) => {
        selectedInd(index)
        if (screenName == 'Payment')
        {
            
        }
        else{

            navigation.navigate(screenName);
        }
    };

    useEffect(() => {
        getProfileDataRequest();

        console.log(data, 'result')
    }, []);

    const selectedInd = (index) => {
        setInd(index)
    }

    const clearAllData = (nav) => {
        AsyncStorage.getAllKeys()

            .then(keys => AsyncStorage.multiRemove(keys))
            .then(() => nav.reset({
                index: 0,
                routes: [{ name: 'SplashScreen' }],
            }));
    }

    const LogoutAlert = (navigation) => {
        Alert.alert(
            '',
            'Are you sure you want to logout ?',
            [
                { text: 'OK', onPress:()=> clearAllData(navigation) },
            ],
            {
                cancelable: false,
            },
        );
    }

    return (
        <View style={styles.container}>
            <View style={{ paddingTop: 60, width: '100%', backgroundColor: AppColors.themePrimaryColor, height: Dimensions.get('window').height * .32, alignItems: 'center' }}>
                <Pressable onPress={()=> navigation.navigate('ProfileScreen')} style={{ width: '80%', height: '90%', justifyContent: 'center' }}>
                    <View style={{ width: 80, height: 80, marginBottom: 10 }}>
                        <Image source={require('../../assets/avtar.png')} style={{ width: 80, height: 80, borderRadius: 40, borderRadius: 40, borderColor: AppColors.themesWhiteColor, borderWidth: .5, resizeMode: 'contain' }} />
                    </View>
                    <Image source={require('../../assets/edit.png')} style={{marginLeft: 60, position: 'absolute', width: 20, height: 20, borderRadius: 40, borderRadius: 40, borderColor: AppColors.themesWhiteColor, borderWidth: .5, resizeMode: 'contain' }} />
                    <Text style={{ fontSize: 20, fontFamily: AppFontFamily.PopinsBold, color: AppColors.themesWhiteColor }}>
                        {data?.name}
                    </Text>
                    <Text style={{ fontSize: 14, fontFamily: AppFontFamily.PopinsMedium, color: AppColors.themesWhiteColor }}>
                        {data?.email}
                    </Text>
                </Pressable>
            </View>

            <FlatList
                contentContainerStyle={{ height: Dimensions.get('window').height * .6 }}
                data={menu}
                keyExtractor={(item, index) => index}
                renderItem={({ item , index}) => (
                    <>

                        <TouchableOpacity
                            style={{ width: '100%', height: 80, justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => handleDrawerItemPress(item.screen, index)}
                        >
                            <Text style={{ fontFamily: AppFontFamily.PopinsBold, width: '80%', color: index == ind ? AppColors.themePrimaryColor : AppColors.themeText2Color, fontSize: 14 }}>{item.name}</Text>
                        </TouchableOpacity>
                    </>
                )}

            />


            <TouchableOpacity
                style={{ width: '100%', position: 'absolute', bottom: 30, height: 40, alignItems: 'center' }}
                onPress={() => LogoutAlert(navigation)} 
            >
                <Text style={{ width: '80%', color: AppColors.themePrimaryColor, fontFamily: AppFontFamily.PopinsMedium, fontSize: 14 }}>Sign out</Text>
                <View style={{ width: '80%' }}>
                    <View style={{ width: '28%', height: 1, backgroundColor: AppColors.themePrimaryColor }}>
                    </View>
                </View>
            </TouchableOpacity>

            {/* Add more drawer items as needed */}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});

const mapStateToProps = (state) => ({
    data: state.data,
    loading: state.loading,
    error: state.error,
});

const mapDispatchToProps = {
    getProfileDataRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerScreen);