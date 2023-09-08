import connection from "../../network/connection"

export const hitApiForLogin = async (email, password, token) => {

    try {
        const loginData = await connection.postAPI('/api/auth/verify/email/login', { 'email': email, 'password': password, 'device_token': token })

        if (loginData.success) {
            return loginData
        }
        else {
            return loginData
        }

    } catch (error) {

        console.error('login modal', error);
        throw error
    }

}

export const hitApiForGoogleLogin = async (email, id, token) => {

    try {
        const loginData = await connection.postAPI('/api/auth/login/google', { 'email': email, 'id': id, 'device_token': token })

        if (loginData.success) {
            return loginData
        }
        else {
            return loginData
        }

    } catch (error) {

        console.error('login modal', error);
        throw error
    }

}