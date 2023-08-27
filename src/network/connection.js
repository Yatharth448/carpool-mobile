import axios from 'axios';
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
import Storage from '../components/localStorage/storage';
import { AppKeys } from '../components/constants/AppKeys';

const apiCaller = async (method, url, params = {}, headerOptions = {}, onUploadProgress) => {

    try {

       
        const stagingApiURL = AppKeys.BASE_URL
        axios.defaults.baseURL = stagingApiURL
        const authToken = await Storage.getSavedItem(AppKeys.SECRET_KEY)

        const options = {
            method: method,
            url: url,
            headers: {
                'Accept': "application/json",
                "Content-Type": "application/json",
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            },

        }
       
        if (Object.keys(headerOptions).length) {

            options.headers = Object.assign({}, options.headers, headerOptions);
            options.onUploadProgress = onUploadProgress;
           
        }

        if (authToken) {

            options.headers['authorization'] = "Bearer "+authToken
        }

        // console.log('header token', options.headers.authorization, "Bearer "+authToken);
        // Sending Version and Platform of App
        // options.headers['app-version'] = DeviceInfo.getVersion();
        // options.headers['api-version'] = 2;
        // options.headers['app-source'] = 'club';
        // options.headers['app-platform'] = Platform.OS
        // options.headers['app-device-token'] = fcmToken
        // options.headers['app-device-id'] = DeviceInfo?.getUniqueId()


        if (method != 'GET') {
            options.data = params
        }

        const response = await axios(options);
        // if (response?.headers?.authorization) {

            console.log('header response token', options.headers.authorization);

        //     LocalStorage.storeData('token', response.headers.authorization)
        // }
        // console.log(response, 'main res')
        return response.data;

    }
    catch (error) {

        console.log(error.response.status, 'error')
        const { message: errorMessage } = error;
        let errorMsg = error?.response?.data ?? error?.response;
        console.log(JSON.stringify(error), 'error')

        if (errorMessage === 'Network Error') {

            Toast.show('No Internet Connection');
        }
        else if (error.response.status == 403 || error.response.status == 401) {
            if (typeof errorMsg === 'string') {
                errorMsg = {
                    success: false,
                    error: errorMsg
                }
            }

            errorMsg.code = 401;
            Toast.show('Session Expired');
        }
        return errorMsg;
    }
}

const connection = {

    getAPI: async (endPoint, params = {}) => {

        try {
            const start = new Date();
            let queryParams = ``;
            for (const [key, value] of Object.entries(params)) {
                queryParams += `${key}=${value}&`
            }

            queryParams = queryParams.substring(0, queryParams.length - 1);

            let url = `${endPoint}${queryParams.length ? `?${queryParams}` : ''}`;
            console.log('get url', url);

            const response = await apiCaller('GET', url);
            const timeTaken = (new Date()) - start;
            console.log("time taken & endpoint", timeTaken / 1000, endPoint)
            return response;

        }
        catch (error) {

            console.error("error ", error);
            throw error;

        }

    },


    postAPI: async (endPoint, params = {}) => {
        try {
            const start = new Date();
            console.log('post params', params);
            const response = await apiCaller('POST', endPoint, params);
            const timeTaken = (new Date()) - start;
            console.log("time taken & endpoint", timeTaken / 1000, endPoint)
            return response;

        }
        catch (error) {
            console.error("error", error);
            return error
        }


    },

    putAPI: async (endPoint, params = {}) => {

        try {
            const start = new Date();
            console.log('put params', params);

            const response = await apiCaller('PUT', endPoint, params);
            const timeTaken = (new Date()) - start;
            console.log("time taken & endpoint", timeTaken / 1000, endPoint)
            return response;

        }
        catch (error) {

            console.error("error", error);
            throw error;
        }
    },
    deleteAPI: async (endPoint, params = {}) => {

        try {
            let queryParams = ``;
            for (const [key, value] of Object.entries(params)) {
                queryParams += `${key}=${value}&`
            }

            queryParams = queryParams.substring(0, queryParams.length - 1);

            let url = `${endPoint}${queryParams.length ? `?${queryParams}` : ''}`;

            const response = await apiCaller('DELETE', url);
            return response;

        }
        catch (error) {

            console.error("error ", error);
            throw error;

        }

    },
    uploadDocument: async (endPoint, params = {}, onUploadProgress) => {

        try {

            console.log('post params', params);

            const response = await apiCaller('POST', endPoint, params, { 'Content-Type': 'multipart/form-data' }, onUploadProgress);
            return response;

        }
        catch (error) {

            console.error("error ", error);
            throw error;

        }

    },

}

export default connection;