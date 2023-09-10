import React from 'react';
import { Modal, Dimensions, Image, Text, View, ActivityIndicator } from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { AppColors } from '../constants/AppColor';
import { AppFontFamily } from '../constants/AppFonts';

const width = Dimensions.get('window').width - 40
const CommonLoaders =
{

    NoDataInList: (message, style) => {
        return (
            <View style={[{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }, style]}>
                <Text style={{ fontFamily: AppFontFamily.PopinsBold, fontSize: 24, color: AppColors.themeTextGrayColor }}>{message}</Text>
            </View>
        )
    },

    RideHistoryLoader: () => {
        return (
            Array.from({ length: 5 }).map((_, index) => (
                <View key={index} style={{ marginBottom: 12, marginTop: 20 }}>
                    <SkeletonPlaceholder borderRadius={4}>
                        <SkeletonPlaceholder.Item >
                            {/* <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} /> */}
                            <SkeletonPlaceholder.Item marginLeft={20} width={width} height={150}>
                                <SkeletonPlaceholder.Item width={80} height={20} />
                                <SkeletonPlaceholder.Item marginTop={10} width={width - 120} height={20} />
                                <SkeletonPlaceholder.Item marginTop={10} width={width - 60} height={20} />
                                <SkeletonPlaceholder.Item marginTop={10} width={width - 50} height={20} />
                                <SkeletonPlaceholder.Item marginTop={10} width={width - 30} height={20} />
                            </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder>
                </View>
            )))
    },

    RideDetailLoader: () => {
        return (
            <>

                <SkeletonPlaceholder borderRadius={1}>
                    <View style={{ width: width, alignItems: 'flex-start' }}>
                        <View style={{ width: 260, height: 20, }} />
                        <View style={{ alignItems: 'flex-end', width: width - 20 }}>
                            <Text style={{ marginTop: 16, fontSize: 14, lineHeight: 38, width: 260, }}>Hello world</Text>
                            <Text style={{ marginTop: 16, fontSize: 14, lineHeight: 38, width: 260, }}>Hello world</Text>
                        </View>
                    </View>
                </SkeletonPlaceholder>
                <SkeletonPlaceholder borderRadius={1} >
                    <View style={{ width: width, alignItems: 'flex-start', marginTop: 10 }}>
                        {/* <View style={{ width: 60, height: 20}} /> */}
                        <View style={{ marginLeft: 20, marginTop: 10 }}>
                            <Image style={{ width: 120, height: 20 }} src={require('../../assets/location.png')} />
                            <Text style={{ marginTop: 6, fontSize: 14, lineHeight: 18 }}>Hello world</Text>
                        </View>
                    </View>
                </SkeletonPlaceholder>


                <SkeletonPlaceholder borderRadius={1}>
                    <View style={{ width: width, alignItems: 'flex-start', marginTop: 40 }}>
                        <View style={{ width: 260, height: 20, }} />
                        <View style={{ alignItems: 'flex-end', width: width - 20 }}>
                            <Text style={{ marginTop: 16, fontSize: 14, lineHeight: 38, width: 260, }}>Hello world</Text>
                            <Text style={{ marginTop: 16, fontSize: 14, lineHeight: 38, width: 260, }}>Hello world</Text>
                        </View>
                    </View>
                </SkeletonPlaceholder>
                <SkeletonPlaceholder borderRadius={1} >
                    <View style={{ width: width, alignItems: 'flex-start', marginTop: 10 }}>
                        {/* <View style={{ width: 60, height: 20}} /> */}
                        <View style={{ marginLeft: 20, marginTop: 10 }}>
                            <Image style={{ width: 120, height: 20 }} src={require('../../assets/location.png')} />
                            <Text style={{ marginTop: 6, fontSize: 14, lineHeight: 18 }}>Hello world</Text>
                        </View>
                    </View>
                </SkeletonPlaceholder>
            </>
        )
    },
    SearchRide: () => {
        return (
            Array.from({ length: 1 }).map((_, index) => (
                <View key={index} style={{ marginBottom: 12, marginTop: 20 }}>
                    <SkeletonPlaceholder borderRadius={4}>
                        <SkeletonPlaceholder.Item >
                            {/* <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} /> */}
                            <SkeletonPlaceholder.Item marginLeft={20} width={width} height={150}>
                                {/* <SkeletonPlaceholder.Item width={80} height={20} /> */}
                                <SkeletonPlaceholder.Item marginTop={10} width={width - 120} height={20} />
                                <SkeletonPlaceholder.Item marginTop={10} width={width - 60} height={20} />
                                {/* <SkeletonPlaceholder.Item marginTop={10} width={width - 50} height={20} /> */}
                                <SkeletonPlaceholder.Item marginTop={30} width={width - 30} height={20} />
                            </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder>
                </View>
            )))
    },
    ChatLoader: ({ isLoading, loaderText }) => {
        return (
            <Modal visible={isLoading}
                onRequestClose={() => console.log('closed')} transparent={true}>
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.3)' }} >

                    <ActivityIndicator size={'large'} color={AppColors.themePrimaryColor} >

                    </ActivityIndicator>
                    <View style={{ alignItems: 'center', justifyContent: 'center', width: '80%', marginTop: 20 }}>
                        <Text style={{ marginTop: 0, fontSize: 15, color: AppColors.themeTextGrayColor, textAlign: 'center', fontFamily: AppFontFamily.PopinsSemiBold }}>{loaderText} </Text>
                    </View>
                </View>
            </Modal>
        )
    },

}
export default CommonLoaders;

