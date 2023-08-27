import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { AppColors } from '../constants/AppColor';

const width = Dimensions.get('window').width - 40
const CommonLoaders =
{
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
                        <View style={{ width: 260, height: 20,}} />
                        <View style={{ alignItems: 'flex-end', width: width - 20}}>
                            <Text style={{ marginTop: 16, fontSize: 14, lineHeight: 38, width: 260,}}>Hello world</Text>
                            <Text style={{ marginTop: 16, fontSize: 14, lineHeight: 38, width: 260,}}>Hello world</Text>
                        </View>
                    </View>
                </SkeletonPlaceholder>
                <SkeletonPlaceholder borderRadius={1} >
                    <View style={{ width: width, alignItems: 'flex-start', marginTop: 10 }}>
                        {/* <View style={{ width: 60, height: 20}} /> */}
                        <View style={{ marginLeft: 20 , marginTop: 10}}>
                            <Image style={{ width: 120, height: 20 }} src={require('../../assets/location.png')} />
                            <Text style={{ marginTop: 6, fontSize: 14, lineHeight: 18 }}>Hello world</Text>
                        </View>
                    </View>
                </SkeletonPlaceholder>


                <SkeletonPlaceholder borderRadius={1}>
                    <View style={{ width: width, alignItems: 'flex-start', marginTop: 40 }}>
                        <View style={{ width: 260, height: 20, }} />
                        <View style={{ alignItems: 'flex-end', width: width - 20}}>
                            <Text style={{ marginTop: 16, fontSize: 14, lineHeight: 38, width: 260,}}>Hello world</Text>
                            <Text style={{ marginTop: 16, fontSize: 14, lineHeight: 38, width: 260,}}>Hello world</Text>
                        </View>
                    </View>
                </SkeletonPlaceholder>
                <SkeletonPlaceholder borderRadius={1} >
                    <View style={{ width: width, alignItems: 'flex-start', marginTop: 10 }}>
                        {/* <View style={{ width: 60, height: 20}} /> */}
                        <View style={{ marginLeft: 20 , marginTop: 10}}>
                            <Image style={{ width: 120, height: 20 }} src={require('../../assets/location.png')} />
                            <Text style={{ marginTop: 6, fontSize: 14, lineHeight: 18 }}>Hello world</Text>
                        </View>
                    </View>
                </SkeletonPlaceholder>
            </>
        )
    }

}
export default CommonLoaders;

