import React, { useState } from "react"
import {  View, ActivityIndicator } from "react-native"
import { AppColors } from "../../components/constants/AppColor"
import FastImage from "react-native-fast-image"
export const ImageLoader = ({ image, width, height, borderRadius, loaderColor=AppColors.themePrimaryColor }) => {
    const [loading, setLoading] = React.useState(false)
    console.log(image, 'image')

    const combinedObject = {
        ...image,
        ...{priority: FastImage.priority.high, cache: FastImage.cacheControl.immutable},
      };
      

    return (
       

            <View style={{ width: width, justifyContent: 'center', alignItems: 'center', borderRadius: borderRadius, overflow: 'hidden' }}>

                <FastImage
                    style={{ width: width, height: height }}
                    defaultSource={require('../../assets/avtar.png')}
                    source={combinedObject}
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