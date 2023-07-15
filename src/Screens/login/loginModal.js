import connection from "../../network/connection"

export const hitApiForLogin = async (mobile) => {

    try {
        const loginData = await connection.postAPI('/api/auth/send/otp', { 'contactNumber': mobile })

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