import connection from "../../network/connection"

export const hitApiForLogin = async (email, password) => {

    try {
        const loginData = await connection.postAPI('/api/auth/verify/email/login', { 'email': email, 'password': password })

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

export const hitApiForGoogleLogin = async (email, id) => {

    try {
        const loginData = await connection.postAPI('/api/auth/login/google', { 'email': email, 'id': id })

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