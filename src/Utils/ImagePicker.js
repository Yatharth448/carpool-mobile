
import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
// import DocumentPicker, {
//   DirectoryPickerResponse,
//   DocumentPickerResponse,
//   isInProgress,
//   types,
// } from 'react-native-document-picker'
import { Platform } from 'react-native';



const selectImage = {

    // Launch Camera
    cameraLaunch : async () => {

        try {

            const image = await ImagePicker.openCamera({
                // width: 300,
                // height: 400,
                // quality: 0.2,
                // cropping: true,
            });

            console.log(image, image.size, 'image size camera')

            if (image.size > 5242880){
                const err = new Error('File size cannot exceed 5MB');
                err.code = 'file_size';
                throw err;
            }

            return image;
        }
        catch (error) {
            throw error;
        }
    },

    // GAllery Camera
    imageGalleryLaunch : async () => {
        try {
            const image = await ImagePicker.openPicker({
                // width: 300,
                // height: 400,
                // quality: 0.2,
                // cropping: true
                forceJpg: false
            });
            console.log(image, image.size, 'gallery data')

            if (image.size > 5242880){
                const err = new Error('File size cannot exceed 5MB');
                err.code = 'file_size';
                throw err;
            }
             return image;
        }
        catch (error) {
            // console.log([pickerResult], 'assa')
            throw error;
        }
    },
    // openDocumentDirectory : async () => {

    //     try {
    //       const data =  await DocumentPicker.pickSingle({
    //           presentationStyle: 'fullScreen',
    //           copyTo: 'cachesDirectory',
    //           type: Platform.OS == 'android' ? 'application/pdf' : 'com.adobe.pdf',
    //         })
    //         console.log(data, 'data')
    //         return data    
    //     } catch (e) {
    //         console.log(e, 'assa')
    //         handleError(e)
    //     }

    // }

}

export default selectImage;