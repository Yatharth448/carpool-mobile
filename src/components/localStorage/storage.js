import AsyncStorage from "@react-native-community/async-storage"

const Storage = {

    getSavedItem: async (key) => {
        let token
        token = await AsyncStorage.getItem(key)
        return token

    },
    saveItem: async (key, value) => {
        try {

            let jsonValue
            if (typeof value === 'object') {

                jsonValue = JSON.stringify(value);
            }
            else {

                jsonValue = String(value);
            }

            await AsyncStorage.setItem(key, jsonValue);
        }
        catch (e) {
            // saving error
        }
    }

}

export default Storage;