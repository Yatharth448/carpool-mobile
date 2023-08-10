import connection from "../../network/connection"

export const hitApiForSignUp = async (name, email, password, mobile, gender) => {

    try {
        const signupData = await connection.postAPI('/api/auth/send/email/otp', {'name': name, 'email': email, 'password': password, 'contactNumber': mobile, gender: gender })

        if (signupData.success) {
            return signupData
        }
        else {
            return signupData
        }

    } catch (error) {

        console.error('login modal', error);
        throw error
    }

}