import React, { useState } from "react"
import {  View, ActivityIndicator } from "react-native"
import { AppColors } from "../../components/constants/AppColor"
import FastImage from "react-native-fast-image"
export const ImageLoader = ({ image, width, height, borderRadius, loaderColor=AppColors.themePrimaryColor }) => {
    const [loading, setLoading] = React.useState(false)

    const combinedObject = {
        ...image,
        ...{priority: FastImage.priority.high, cache: FastImage.cacheControl.immutable},
      };
      
// console.log(Object.keys(image), 'image 6')
    return (
       

            <View style={{ width: width, justifyContent: 'center', alignItems: 'center', borderRadius: borderRadius, overflow: 'hidden' }}>

                <FastImage
                    style={{ width: width, height: height }}
                    defaultSource={require('../../assets/avtar.png')}
                    source={Object.keys(image ?? [])?.length == 0 ? image : combinedObject}
                    onLoadStart={(e) => setLoading(true)}
                    onLoadEnd={(e) => setLoading(false)}
                    resizeMode={FastImage.resizeMode.cover}
                    
                />

                {loading ?
                    <View style={{ width: width, height: height, position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size={'large'} color={loaderColor} />
                    </View>
                    : null
                }



        </View>
    )
}